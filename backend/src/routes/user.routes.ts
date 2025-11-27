import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";
import { userService } from "../services/user.service";
import { UserRole } from "../types/user.types";

const router = Router();

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Email must be valid"),
  city: z.string().min(1, "City is required"),
  role: z.enum(["developer", "designer", "manager"])
});

// GET all users
router.get("/", (req: Request, res: Response) => {
  const data = userService.getAll();
  res.json({ users: data });
});

// GET one user
router.get("/:id", (req: Request, res: Response) => {
  const user = userService.getById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// POST create user
router.post(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = userSchema.parse(req.body);
      const newUser = userService.create(parsed as any);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

// PUT update user
router.put(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const existing = userService.getById(req.params.id);
      if (!existing) {
        return res.status(404).json({ message: "User not found" });
      }

      const parsed = userSchema.parse(req.body);
      const updated = userService.update(req.params.id, parsed as any);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE user
router.delete("/:id", (req: Request, res: Response) => {
  const deleted = userService.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(204).send();
});

export default router;
