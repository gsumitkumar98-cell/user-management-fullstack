import React, { useEffect, useState } from "react";
import { fetchUsers, createUser, deleteUser, updateUser } from "./services/api";
import { User, UserInput } from "./types/user.types";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import UserEditModal from "./components/UserEditModal";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreate = async (data: UserInput) => {
    const newUser = await createUser(data);
    setUsers((prev) => [...prev, newUser]);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleSaveEdit = async (id: string, data: UserInput) => {
    const updated = await updateUser(id, data);
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">User Management</h1>
      <div className="row g-4">
        <div className="col-md-5">
          <UserForm onCreate={handleCreate} />
        </div>
        <div className="col-md-7">
          <UserList
            users={users}
            loading={loading}
            onDelete={handleDelete}
            onEdit={handleOpenEdit}
          />
        </div>
      </div>

      <UserEditModal
        show={showEditModal}
        user={selectedUser}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default App;
