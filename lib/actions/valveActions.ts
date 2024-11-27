'use server';

import { Prisma, Valve } from '@prisma/client';
import { prisma } from '../db/db';
import { errorMessages } from '../errorMessages/errorMessages';
import { handleError } from '../utils';
import { ValveDTO } from '../zod/zodSchema';

export async function findValveById(id: string): Promise<Valve> {
  try {
    const valve = await prisma.valve.findUnique({
      where: {
        id,
      },
    });
    if (!valve) {
      throw Error(errorMessages.valveNotExist);
    }

    return valve;
  } catch (error) {
    handleError(error, 'Unexpected error finding valve by ID.');
  }
}

export async function findAllValves(): Promise<
  Prisma.ValveGetPayload<{ include: { infoBlocks: true } }>[]
> {
  try {
    const valves = await prisma.valve.findMany({
      include: {
        infoBlocks: true,
      },
    });
    return valves;
  } catch (error) {
    handleError(error, errorMessages.disconnect);
  }
}

export async function createValve(data: ValveDTO): Promise<Valve> {
  const {
    firstName,
    location,
    type,
    userId,
    userSignature,
    lastName,
    firma,
    serialNumber,
    description,
    infoBlocks,
    protocolType,
  } = data;

  try {
    const newValve = await prisma.valve.create({
      data: {
        firstName,
        location,
        type,
        userId,
        userSignature,
        lastName,
        firma,
        serialNumber,
        description,
        protocolType,
        infoBlocks: {
          createMany: {
            data: infoBlocks,
          },
        },
      },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Valve protocol created: ${JSON.stringify(newValve, null, 2)}`,
      );
    }
    return newValve;
  } catch (error) {
    handleError(error, errorMessages.valveFailedCreation);
  }
}

export async function editValve(data: ValveDTO, id: string): Promise<void> {
  const {
    userId,
    userSignature,
    firstName,
    lastName,
    firma,
    location,
    type,
    serialNumber,
    description,
    protocolType,
    infoBlocks,
  } = data;
  const valveEditData: Omit<ValveDTO, 'infoBlocks'> = {
    userId,
    userSignature,
    firstName,
    lastName,
    firma,
    location,
    type,
    serialNumber,
    description,
    protocolType,
  };
  try {
    await prisma.$transaction(async (prisma) => {
      const currentInfoBlocks = await prisma.valvesInfoBlock.findMany({
        where: { valveId: id },
      });
      await prisma.valve.update({
        where: {
          id,
        },
        data: valveEditData,
      });
      const infoBlocksUpdate = currentInfoBlocks.map(
        async (currentInfoBlocks, index) => {
          if (infoBlocks[index]) {
            return prisma.valvesInfoBlock.update({
              where: {
                id: currentInfoBlocks.id,
              },
              data: infoBlocks[index],
            });
          } else {
            return prisma.valvesInfoBlock.delete({
              where: {
                id: currentInfoBlocks.id,
              },
            });
          }
        },
      );

      const infoBlocksCreate = infoBlocks.map(async (infoBlock, index) => {
        if (!currentInfoBlocks[index]) {
          return prisma.valvesInfoBlock.create({
            data: {
              ...infoBlock,
              valveId: id,
            },
          });
        }
      });
      await Promise.all([...infoBlocksUpdate, ...infoBlocksCreate]);
    });
  } catch (error) {
    handleError(error, errorMessages.valveFailedCreation);
  }
}

export async function deleteValve(id: string): Promise<void> {
  try {
    const deletedValve = await prisma.valve.delete({
      where: {
        id,
      },
      include: { infoBlocks: true },
    });
    console.log(`Valve successfully deleted: ${deletedValve}`);
  } catch (error) {
    handleError(error, errorMessages.valveNotExist);
  }
}
