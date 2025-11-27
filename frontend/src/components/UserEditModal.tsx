import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { User, UserInput, UserRole } from "../types/user.types";

interface Props {
  show: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (id: string, data: UserInput) => Promise<void> | void;
}

const roles: UserRole[] = ["developer", "designer", "manager"];

const UserEditModal: React.FC<Props> = ({ show, user, onClose, onSave }) => {
  const [form, setForm] = useState<UserInput>({
    name: "",
    email: "",
    city: "",
    role: "developer"
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        city: user.city,
        role: user.role
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!user) return;
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
      await onSave(user.id, form);
      onClose();
    } catch (err: any) {
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            className="form-control"
            name="city"
            value={form.city}
            onChange={handleChange}
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserEditModal;
