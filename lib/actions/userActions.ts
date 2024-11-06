'use server';

import { prisma } from '../db/db';
import { UserDTO } from '../types/userTypes';

export async function createUser(data: UserDTO) {
  console.log('zaczynam');
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
      return new Error('Użytkownik o podanym emailu istnieje');
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
    console.error(`Error in createUser, ${error}`);
  }
}
