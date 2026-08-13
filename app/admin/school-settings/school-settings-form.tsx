"use client";

import { useEffect, useState } from "react";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function SchoolSettingsForm() {
  const [tdlrNumber, setTdlrNumber] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [driverEdSchoolNumber, setDriverEdSchoolNumber] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [instructorSignatureImage, setInstructorSignatureImage] = useState("");
  const [chiefOfficialName, setChiefOfficialName] = useState("");
  const [chiefOfficialSignatureImage, setChiefOfficialSignatureImage] = useState("");
  const [coursePriceUsd, setCoursePriceUsd] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/school-settings")
      .then((res) => res.json())
      .then((data) => {
        setTdlrNumber(data.tdlrNumber || "");
        setSchoolName(data.schoolName || "");
        setDriverEdSchoolNumber(data.driverEdSchoolNumber || "");
        setInstructorName(data.instructorName || "");
        setInstructorSignatureImage(data.instructorSignatureImage || "");
        setChiefOfficialName(data.chiefOfficialName || "");
        setChiefOfficialSignatureImage(data.chiefOfficialSignatureImage || "");
        setCoursePriceUsd(data.coursePriceUsd != null ? String(data.coursePriceUsd) : "");
      })
      .catch(() => setError("Couldn't load settings."));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);

    const res = await fetch("/api/admin/school-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tdlrNumber,
        schoolName,
        driverEdSchoolNumber,
        instructorName,
        instructorSignatureImage,
        chiefOfficialName,
        chiefOfficialSignatureImage,
        coursePriceUsd: coursePriceUsd ? Number(coursePriceUsd) : undefined,
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    setSaved(true);
  }

  async function handleSignatureUpload(
    file: File | undefined,
    setter: (v: string) => void
  ) {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setter(dataUrl);
  }

  const signaturesMissing = !instructorSignatureImage || !chiefOfficialSignatureImage;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 24px 80px" }}>
      <div className="admin-page-header" style={{ marginTop: 8 }}>
        <h1>School certificate settings</h1>
      </div>
      <p style={{ color: "#666" }}>
        These details are stamped onto every certificate a student is issued —
        set them once here.
      </p>

      {signaturesMissing && (
        <div className="admin-card-alert" style={{ display: "block", marginTop: 12 }}>
          Both signature images are required before any certificate can be issued. Students who pass
          will see a blocked-download message until both are uploaded below.
        </div>
      )}

      <form onSubmit={handleSave} style={{ marginTop: 24 }}>
        <div className="field">
          <label htmlFor="tdlrNumber">TDLR Number</label>
          <input id="tdlrNumber" type="text" value={tdlrNumber} onChange={(e) => setTdlrNumber(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="schoolName">Name of School</label>
          <input id="schoolName" type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="driverEdSchoolNumber">Driver Education School Number</label>
          <input
            id="driverEdSchoolNumber"
            type="text"
            value={driverEdSchoolNumber}
            onChange={(e) => setDriverEdSchoolNumber(e.target.value)}
          />
        </div>

        <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #eee" }} />

        <div className="field">
          <label htmlFor="coursePriceUsd">Course price (USD)</label>
          <input
            id="coursePriceUsd"
            type="number"
            min={0}
            step="0.01"
            value={coursePriceUsd}
            onChange={(e) => setCoursePriceUsd(e.target.value)}
            placeholder="25"
          />
        </div>

        <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #eee" }} />

        <div className="field">
          <label htmlFor="instructorName">Driver Education Instructor name</label>
          <input
            id="instructorName"
            type="text"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="instructorSig">Instructor signature image</label>
          <input
            id="instructorSig"
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => handleSignatureUpload(e.target.files?.[0], setInstructorSignatureImage)}
          />
          {instructorSignatureImage && (
            <img
              src={instructorSignatureImage}
              alt="Instructor signature preview"
              style={{ marginTop: 8, maxHeight: 50, background: "#f5f5f5", padding: 4, borderRadius: 4 }}
            />
          )}
        </div>

        <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #eee" }} />

        <div className="field">
          <label htmlFor="chiefOfficialName">Chief School Official name</label>
          <input
            id="chiefOfficialName"
            type="text"
            value={chiefOfficialName}
            onChange={(e) => setChiefOfficialName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="chiefSig">Chief Official signature image</label>
          <input
            id="chiefSig"
            type="file"
            accept="image/png,image/jpeg"
            onChange={(e) => handleSignatureUpload(e.target.files?.[0], setChiefOfficialSignatureImage)}
          />
          {chiefOfficialSignatureImage && (
            <img
              src={chiefOfficialSignatureImage}
              alt="Chief official signature preview"
              style={{ marginTop: 8, maxHeight: 50, background: "#f5f5f5", padding: 4, borderRadius: 4 }}
            />
          )}
        </div>

        {error && <p className="error-text">{error}</p>}
        {saved && <p style={{ color: "#15803d", fontSize: "0.9rem", marginBottom: 16 }}>Saved.</p>}

        <button
          className="admin-btn admin-btn-primary"
          style={{ ["--btn-color" as any]: "#475569" }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving…" : "Save settings"}
        </button>
      </form>
    </div>
  );
}
