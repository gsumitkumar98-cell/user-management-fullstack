import axios from "axios";
import { User, UserInput } from "../types/user.types";

const API = "http://localhost:4000/api/users";

export async function fetchUsers(): Promise<User[]> {
  const res = await axios.get(API);
  return res.data.users;
}

export async function createUser(data: UserInput): Promise<User> {
  const res = await axios.post(API, data);
  return res.data;
}

export async function updateUser(id: string, data: UserInput): Promise<User> {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
}

export async function deleteUser(id: string): Promise<void> {
  await axios.delete(`${API}/${id}`);
}
