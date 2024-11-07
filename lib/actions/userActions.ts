'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../db/db';
import { errorMessages } from '../errorMessages/errorMessages';
import { UserDTO } from '../types/userTypes';

export async function createUser(data: UserDTO) {
  const userData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    userSignature: data.userSignature,
  };
  const { firstName, lastName, email, userSignature } = userData;
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
    console.log(`User created: ${JSON.stringify(user, null, 2)}`);
    return user;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === errorMessages.userExist) {
        throw new Error(errorMessages.userExist);
      }
      throw new Error(errorMessages.disconnect);
    }
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
}

export default async function findUserById(id: string) {
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
    if (error instanceof Error) {
      if (error.message === errorMessages.userNotExist) {
        throw new Error(`${errorMessages.userNotExist}: ${id}`);
      }
    }
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
}

export async function editUser(data: UserDTO, id: string) {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: data,
    });

    console.log(`User edited: ${id}`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === errorMessages.edit) {
        throw new Error(errorMessages.edit);
      }
    }
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
}

export async function findAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const user = await findUserById(id);

    if (!user) {
      throw new Error(errorMessages.userNotExist);
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    revalidatePath('/user');
    console.log(`User succesfully deleted: ${deletedUser}`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === errorMessages.userNotExist) {
        throw new Error(errorMessages.userNotExist);
      }
    }
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
}
