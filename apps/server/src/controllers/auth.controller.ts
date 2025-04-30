import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  console.log('registerUser', req.body);
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
