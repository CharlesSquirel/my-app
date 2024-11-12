'use server';

import { Firma, Prisma } from '@prisma/client';
import { prisma } from '../db/db';
import { errorMessages } from '../errorMessages/errorMessages';
import { FirmaDTO } from '../types/firmaTypes';

function handleError(error: unknown, defaultMessage: string): never {
  if (error instanceof Error) {
    throw new Error(error.message || defaultMessage);
  }
  throw new Error(defaultMessage);
}

export async function createFirma(data: FirmaDTO): Promise<Firma> {
  const {
    fullName,
    shortName,
    street,
    houseNumber,
    localNumber,
    postCode,
    city,
    tel,
    contactEmail,
    locations,
  } = data;
  try {
    const existingFirma = await prisma.firma.findFirst({ where: { fullName } });

    if (existingFirma) {
      throw new Error(errorMessages.firmaExist);
    }

    const newFirma = await prisma.firma.create({
      data: {
        fullName,
        shortName,
        street,
        houseNumber,
        localNumber,
        postCode,
        city,
        tel,
        contactEmail,
        locations: {
          createMany: {
            data: locations,
          },
        },
      },
    });
    if (process.env.NODE_ENV === 'development') {
      console.log(`User created: ${JSON.stringify(newFirma, null, 2)}`);
    }
    return newFirma;
  } catch (error) {
    handleError(error, errorMessages.firmaFailedCreation);
  }
}

export async function findFirmaById(
  id: string,
): Promise<Prisma.FirmaGetPayload<{ include: { locations: true } }>> {
  try {
    const existingFirma = await prisma.firma.findUnique({
      where: { id },
      include: { locations: true },
    });
    if (!existingFirma) {
      throw new Error(errorMessages.firmaNotExist);
    }
    return existingFirma;
  } catch (error) {
    handleError(error, errorMessages.firmaNotExist);
  }
}

export async function findAllFirma(): Promise<
  Prisma.FirmaGetPayload<{ include: { locations: true } }>[]
> {
  try {
    const firmas = await prisma.firma.findMany({
      include: { locations: true },
    });

    return firmas;
  } catch (error) {
    handleError(error, errorMessages.disconnect);
  }
}
