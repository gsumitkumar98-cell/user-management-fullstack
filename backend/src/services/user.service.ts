import { User, UserRole } from "../types/user.types";

export let users: User[] = [
  {
    id: "1",
    name: "Amit Kumar",
    email: "amit@example.com",
    city: "Bangalore",
    role: "developer",
    createdAt: "2025-01-10T09:00:00Z"
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    city: "Mumbai",
    role: "designer",
    createdAt: "2025-01-12T14:30:00Z"
  }
];

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

interface UserInput {
  name: string;
  email: string;
  city: string;
  role: UserRole;
}

export const userService = {
  getAll() {
    return users;
  },

  getById(id: string) {
    return users.find((u) => u.id === id);
  },

  create(data: UserInput) {
    const newUser: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      city: data.city,
      role: data.role,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  update(id: string, data: UserInput) {
    const user = users.find((u) => u.id === id);
    if (!user) return null;

    user.name = data.name;
    user.email = data.email;
    user.city = data.city;
    user.role = data.role;

    return user;
  },

  delete(id: string) {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
};
