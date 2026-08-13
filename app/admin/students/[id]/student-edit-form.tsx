"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  firstName: string;
  lastName: string;
  middleInitial: string | null;
  email: string;
  phone: string | null;
  dateOfBirth: Date;
  sex: string;
};

export default function StudentEditForm({ student }: { student: Student }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);
  const [middleInitial, setMiddleInitial] = useState(student.middleInitial ?? "");
  const [email, setEmail] = useState(student.email);
  const [phone, setPhone] = useState(student.phone ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(student.dateOfBirth).toISOString().slice(0, 10));
  const [sex, setSex] = useState(student.sex);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    const res = await fetch(`/api/admin/students/${student.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, middleInitial, email, phone, dateOfBirth, sex }),
    });
    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Couldn't save changes.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSave} style={{ marginTop: 12 }}>
      <div className="field">
        <label>First name</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div className="field">
        <label>Last name</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div className="field">
        <label>Middle initial</label>
        <input value={middleInitial} maxLength={1} onChange={(e) => setMiddleInitial(e.target.value)} />
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="field">
        <label>Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="field">
        <label>Date of birth</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
      </div>
      <div className="field">
        <label>Sex</label>
        <select className="admin-select" style={{ width: "100%" }} value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {error && <p className="error-text">{error}</p>}
      {saved && <p style={{ color: "#15803d", fontSize: "0.9rem", marginBottom: 12 }}>Saved.</p>}

      <button
        className="admin-btn admin-btn-primary"
        style={{ ["--btn-color" as any]: "#2563eb" }}
        type="submit"
        disabled={saving}
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
