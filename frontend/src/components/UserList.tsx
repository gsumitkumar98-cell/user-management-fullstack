import React from "react";
import { User } from "../types/user.types";

interface Props {
  users: User[];
  loading: boolean;
  onDelete: (id: string) => Promise<void> | void;
  onEdit: (user: User) => void;
}

const UserList: React.FC<Props> = ({ users, loading, onDelete, onEdit }) => {
  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Users</h5>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.city}</td>
                    <td>{u.role}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => onEdit(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
