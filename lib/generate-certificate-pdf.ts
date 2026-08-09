import fs from "fs";
import path from "path";
import { PDFDocument, PDFFont, StandardFonts } from "pdf-lib";

const TEMPLATE_PATH = path.join(process.cwd(), "certificate-assets", "ADEE-1317-template.pdf");

// Exact rectangles for the two signature fields, measured directly from the
// real template ([x0, y0, x1, y1] in PDF points, identical on both pages).
const SIGNATURE_RECTS = {
  instructor: { x0: 21.6, y0: 482.8, x1: 227.0, y1: 500.0 },
  chiefOfficial: { x0: 21.6, y0: 455.5, x1: 224.8, y1: 472.8 },
};

function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

function splitDate(d: Date): { month: string; day: string; year: string } {
  return {
    month: pad2(d.getMonth() + 1),
    day: pad2(d.getDate()),
    year: d.getFullYear().toString(),
  };
}

async function embedSignatureImage(
  doc: PDFDocument,
  dataUrl: string
): Promise<{ image: Awaited<ReturnType<PDFDocument["embedPng"]>>; }> {
  const isPng = dataUrl.startsWith("data:image/png");
  const base64 = dataUrl.split(",")[1] ?? "";
  const bytes = Buffer.from(base64, "base64");
  const image = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
  return { image };
}

function drawSignatureOnBothPages(
  doc: PDFDocument,
  image: Awaited<ReturnType<PDFDocument["embedPng"]>>,
  rect: { x0: number; y0: number; x1: number; y1: number }
) {
  const boxWidth = rect.x1 - rect.x0;
  const boxHeight = rect.y1 - rect.y0;
  const scale = Math.min(boxWidth / image.width, boxHeight / image.height, 1) * 0.9;
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const x = rect.x0 + (boxWidth - drawWidth) / 2;
  const y = rect.y0 + (boxHeight - drawHeight) / 2;

  for (const page of doc.getPages()) {
    page.drawImage(image, { x, y, width: drawWidth, height: drawHeight });
  }
}

function drawTypedSignatureOnBothPages(
  doc: PDFDocument,
  font: PDFFont,
  name: string,
  rect: { x0: number; y0: number; x1: number; y1: number }
) {
  for (const page of doc.getPages()) {
    page.drawText(name, {
      x: rect.x0 + 4,
      y: rect.y0 + (rect.y1 - rect.y0 - 10) / 2,
      size: 12,
      font,
    });
  }
}

export async function generateCertificatePdf({
  lastName,
  firstName,
  middleInitial,
  dateOfBirth,
  sex,
  controlNumber,
  completionDate,
  schoolSettings,
}: {
  lastName: string;
  firstName: string;
  middleInitial: string | null;
  dateOfBirth: Date;
  sex: "Male" | "Female";
  controlNumber: string;
  completionDate: Date;
  schoolSettings: {
    tdlrNumber: string | null;
    schoolName: string | null;
    driverEdSchoolNumber: string | null;
    instructorName: string | null;
    instructorSignatureImage: string | null;
    chiefOfficialName: string | null;
    chiefOfficialSignatureImage: string | null;
  };
}): Promise<Uint8Array> {
  const templateBytes = fs.readFileSync(TEMPLATE_PATH);
  const doc = await PDFDocument.load(templateBytes);
  const form = doc.getForm();

  const dob = splitDate(dateOfBirth);
  const completion = splitDate(completionDate);
  const dateIssuedStr = `${completion.month}/${completion.day}/${completion.year}`;

  // --- Text fields ---
  form.getTextField("Last Name").setText(lastName);
  form.getTextField("First Name").setText(firstName);
  if (middleInitial) form.getTextField("Middle Initial").setText(middleInitial);

  form.getTextField("Birth Month").setText(dob.month);
  form.getTextField("Birth Day").setText(dob.day);
  form.getTextField("Birth Year").setText(dob.year);

  form.getTextField("Online Completion Month").setText(completion.month);
  form.getTextField("Online Completion Day").setText(completion.day);
  form.getTextField("Online Completion Year").setText(completion.year);

  form.getTextField("Road Rules grade").setText("P");
  form.getTextField("Road Signs grade").setText("P");

  form.getTextField("Control Number").setText(controlNumber);

  if (schoolSettings.tdlrNumber) {
    form.getTextField("TDLR Number").setText(schoolSettings.tdlrNumber);
  }
  if (schoolSettings.schoolName) {
    form.getTextField("Name of School").setText(schoolSettings.schoolName);
  }
  if (schoolSettings.driverEdSchoolNumber) {
    form.getTextField("Driver Education School Number").setText(schoolSettings.driverEdSchoolNumber);
  }
  form.getTextField("Date Issued_es_:date").setText(dateIssuedStr);

  // --- Checkboxes ---
  form.getCheckBox("Driver Education Provider").check();
  form.getCheckBox("6 hour online course").check();
  form
    .getCheckBox("Has taken and passed the Class CRoad Rules and Class CRoad Signs examinations")
    .check();
  form.getCheckBox("Must take vision examination at the Department of Public Safety").check();

  // --- Sex radio ---
  form.getRadioGroup("Male or Female").select(sex);

  // --- Signatures: real uploaded image if available, otherwise a typed
  // fallback so a certificate can still generate before signatures are set.
  const helv = await doc.embedFont(StandardFonts.HelveticaOblique);

  if (schoolSettings.instructorSignatureImage) {
    const { image } = await embedSignatureImage(doc, schoolSettings.instructorSignatureImage);
    drawSignatureOnBothPages(doc, image, SIGNATURE_RECTS.instructor);
  } else if (schoolSettings.instructorName && helv) {
    drawTypedSignatureOnBothPages(doc, helv, schoolSettings.instructorName, SIGNATURE_RECTS.instructor);
  }

  if (schoolSettings.chiefOfficialSignatureImage) {
    const { image } = await embedSignatureImage(doc, schoolSettings.chiefOfficialSignatureImage);
    drawSignatureOnBothPages(doc, image, SIGNATURE_RECTS.chiefOfficial);
  } else if (schoolSettings.chiefOfficialName && helv) {
    drawTypedSignatureOnBothPages(doc, helv, schoolSettings.chiefOfficialName, SIGNATURE_RECTS.chiefOfficial);
  }

  // Bake all field values into the page content — the issued PDF should be
  // a static record, not something a student could edit in a PDF viewer.
  form.flatten();

  return doc.save();
}
