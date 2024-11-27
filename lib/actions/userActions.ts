'use server';

import { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { prisma } from '../db/db';
import { errorMessages } from '../errorMessages/errorMessages';
import { UserDTO } from '../types/userTypes';
import { handleError } from '../utils';

export default async function findUserById(id: string): Promise<User> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw Error(errorMessages.userNotExist);
    }

    return user;
  } catch (error) {
    handleError(error, 'Unexpected error finding user by ID.');
  }
}

export async function createUser(data: UserDTO): Promise<UserDTO> {
  const { firstName, lastName, email, userSignature } = data;
  try {
    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (exist) {
      throw new Error(errorMessages.userExist);
    }
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        userSignature,
        email,
      },
    });
    if (process.env.NODE_ENV === 'development') {
      console.log(`User created: ${JSON.stringify(user, null, 2)}`);
    }
    return user;
  } catch (error) {
    handleError(error, errorMessages.userNotExist);
  }
}

export async function editUser(data: UserDTO, id: string): Promise<void> {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: data,
    });

    console.log(`User edited: ${id}`);
  } catch (error) {
    handleError(error, errorMessages.edit || 'Error editing user.');
  }
}

export async function findAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    revalidatePath('/user');
    console.log(`User succesfully deleted: ${deletedUser}`);
  } catch (error) {
    handleError(error, errorMessages.userNotExist || 'User does not exist.');
  }
}
