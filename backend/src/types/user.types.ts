export type UserRole = "developer" | "designer" | "manager";

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  role: UserRole;
  createdAt: string;
}
