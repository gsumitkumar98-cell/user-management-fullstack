import React, { useState } from "react";
import { UserInput, UserRole } from "../types/user.types";

interface Props {
  onCreate: (data: UserInput) => Promise<void> | void;
}

const roles: UserRole[] = ["developer", "designer", "manager"];

const UserForm: React.FC<Props> = ({ onCreate }) => {
  const [form, setForm] = useState<UserInput>({
    name: "",
    email: "",
    city: "",
    role: "developer"
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || form.name.length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    if (!form.email || !form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    if (!form.city) {
      setError("City is required");
      return;
    }

    try {
      setLoading(true);
      await onCreate(form);
      setForm({ name: "", email: "", city: "", role: "developer" });
    } catch (err: any) {
      setError("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Create New User</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              className="form-control"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
