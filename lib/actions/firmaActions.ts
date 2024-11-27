'use server';

import { Firma, Prisma } from '@prisma/client';
import { prisma } from '../db/db';
import { errorMessages } from '../errorMessages/errorMessages';
import { FirmaDTO } from '../types/firmaTypes';
import { handleError } from '../utils';

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

export async function editFirma(data: FirmaDTO, id: string): Promise<void> {
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

  const firmaEditData: Omit<FirmaDTO, 'locations'> = {
    fullName,
    shortName,
    street,
    houseNumber,
    localNumber,
    postCode,
    city,
    tel,
    contactEmail,
  };

  try {
    await prisma.$transaction(async (prisma) => {
      const currentLocations = await prisma.location.findMany({
        where: { locationId: id },
      });

      await prisma.firma.update({
        where: { id },
        data: firmaEditData,
      });

      const locationUpdates = currentLocations.map(async (currentLocation) => {
        const foundLocation = locations.find(
          (location) => location.fullName === currentLocation.fullName,
        );
        if (foundLocation) {
          await prisma.location.update({
            where: { id: currentLocation.id },
            data: foundLocation,
          });
        } else {
          await prisma.location.delete({
            where: { id: currentLocation.id },
          });
        }
      });

      const locationCreates = locations.map(async (location) => {
        const foundLocation = currentLocations.find(
          (currentLocation) => location.fullName === currentLocation.fullName,
        );
        if (!foundLocation) {
          await prisma.location.create({
            data: {
              ...location,
              locationId: id,
            },
          });
        }
      });

      await Promise.all([...locationUpdates, ...locationCreates]);
    });
  } catch (error) {
    handleError(error, errorMessages.disconnect);
  }
}

export async function deleteFirma(id: string): Promise<void> {
  try {
    const deletedFirma = await prisma.firma.delete({
      where: { id },
      include: { locations: true },
    });
    console.log(`User successfully deleted: ${deletedFirma}`);
  } catch (error) {
    handleError(error, errorMessages.firmaNotExist);
  }
}
