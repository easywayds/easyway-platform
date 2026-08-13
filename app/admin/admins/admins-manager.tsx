"use client";

import { useEffect, useState } from "react";

type AdminRole = "master_admin" | "student_admin" | "payment_admin" | "curriculum_admin";

type Admin = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  active: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

const ROLE_LABELS: Record<AdminRole, string> = {
  master_admin: "Master Admin",
  student_admin: "Student Admin",
  payment_admin: "Payment Admin",
  curriculum_admin: "Curriculum Admin",
};

const ROLE_COLORS: Record<AdminRole, string> = {
  master_admin: "#4f46e5",
  student_admin: "#2563eb",
  payment_admin: "#059669",
  curriculum_admin: "#7c3aed",
};

export default function AdminsManager({ currentAdminId }: { currentAdminId: string }) {
  const [admins, setAdmins] = useState<Admin[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<AdminRole>("student_admin");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);

  const [passwordDrafts, setPasswordDrafts] = useState<Record<string, string>>({});
  const [nameDrafts, setNameDrafts] = useState<Record<string, string>>({});

  async function load() {
    const res = await fetch("/api/admin/admins");
    const data = await res.json();
    if (res.ok) setAdmins(data.admins);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreating(true);
    const res = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, role, password }),
    });
    const data = await res.json();
    setCreating(false);
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Couldn't create admin.");
      return;
    }
    setEmail("");
    setName("");
    setPassword("");
    setRole("student_admin");
    load();
  }

  async function updateAdmin(id: string, patch: Record<string, unknown>) {
    setError(null);
    const res = await fetch(`/api/admin/admins/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(typeof data.error === "string" ? data.error : "Couldn't update admin.");
      return;
    }
    load();
  }

  async function deleteAdmin(id: string, name: string) {
    if (!confirm(`Permanently delete ${name}'s admin account? This can't be undone.`)) return;
    setError(null);
    const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(typeof data.error === "string" ? data.error : "Couldn't delete admin.");
      return;
    }
    load();
  }

  return (
    <div style={{ marginTop: 24 }}>
      {error && <p className="error-text">{error}</p>}

      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last login</th>
              <th>Reset password</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(admins ?? []).map((a) => {
              const isSelf = a.id === currentAdminId;
              return (
                <tr key={a.id}>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <input
                        className="admin-input"
                        style={{ width: 130 }}
                        value={nameDrafts[a.id] ?? a.name}
                        onChange={(e) => setNameDrafts((prev) => ({ ...prev, [a.id]: e.target.value }))}
                      />
                      {nameDrafts[a.id] !== undefined && nameDrafts[a.id] !== a.name && (
                        <button
                          className="admin-btn"
                          style={{ padding: "5px 10px" }}
                          onClick={() => {
                            updateAdmin(a.id, { name: nameDrafts[a.id] });
                            setNameDrafts((prev) => {
                              const next = { ...prev };
                              delete next[a.id];
                              return next;
                            });
                          }}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </td>
                  <td>{a.email}</td>
                  <td>
                    <select
                      className="admin-select"
                      value={a.role}
                      disabled={isSelf}
                      onChange={(e) => updateAdmin(a.id, { role: e.target.value })}
                    >
                      {Object.entries(ROLE_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <span
                      className="admin-role-badge"
                      style={{ ["--badge-color" as any]: ROLE_COLORS[a.role], marginLeft: 8 }}
                    >
                      {ROLE_LABELS[a.role]}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`admin-btn ${a.active ? "admin-btn-danger" : "admin-btn-primary"}`}
                      style={a.active ? {} : { ["--btn-color" as any]: "#059669" }}
                      disabled={isSelf}
                      onClick={() => updateAdmin(a.id, { active: !a.active })}
                    >
                      {a.active ? "Deactivate" : "Reactivate"}
                    </button>
                  </td>
                  <td>{a.lastLoginAt ? new Date(a.lastLoginAt).toLocaleString() : "Never"}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <input
                        className="admin-input"
                        type="password"
                        placeholder="New password"
                        style={{ width: 140 }}
                        value={passwordDrafts[a.id] ?? ""}
                        onChange={(e) => setPasswordDrafts((prev) => ({ ...prev, [a.id]: e.target.value }))}
                      />
                      <button
                        className="admin-btn"
                        disabled={!passwordDrafts[a.id] || passwordDrafts[a.id].length < 8}
                        onClick={() => {
                          updateAdmin(a.id, { newPassword: passwordDrafts[a.id] });
                          setPasswordDrafts((prev) => ({ ...prev, [a.id]: "" }));
                        }}
                      >
                        Set
                      </button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="admin-btn admin-btn-danger"
                      disabled={isSelf}
                      title={isSelf ? "You can't delete your own account" : undefined}
                      onClick={() => deleteAdmin(a.id, a.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="topic-content-placeholder" style={{ marginTop: 28, borderStyle: "solid" }}>
        <h3 style={{ marginTop: 0 }}>Create a new admin</h3>
        <form onSubmit={handleCreate} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 420 }}>
          <div className="field">
            <label htmlFor="new-admin-name">Name</label>
            <input id="new-admin-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="new-admin-email">Email</label>
            <input
              id="new-admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="new-admin-role">Role</label>
            <select
              id="new-admin-role"
              className="admin-select"
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              style={{ width: "100%" }}
            >
              {Object.entries(ROLE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="new-admin-password">Temporary password</label>
            <input
              id="new-admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>
          <button
            className="admin-btn admin-btn-primary"
            style={{ ["--btn-color" as any]: "#db2777", width: "fit-content" }}
            type="submit"
            disabled={creating}
          >
            {creating ? "Creating…" : "Create admin"}
          </button>
        </form>
      </div>
    </div>
  );
}
