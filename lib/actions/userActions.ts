'use server';

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
