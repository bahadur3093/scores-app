import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt';

const prisma = new PrismaClient();

export const registerUser = async ({ name, email, password }: any) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already in use');

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return { id: user.id, name: user.name, email: user.email };
};

export const loginUser = async ({ email, password }: any) => {
    
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user);
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  return signToken({ id: user.id, email: user.email });
};
