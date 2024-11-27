'use server';

import { Chiller } from '@prisma/client';
import { prisma } from '../db/db';
import { errorMessages } from '../errorMessages/errorMessages';
import { handleError } from '../utils';
import { ChillerDTO } from '../zod/zodSchema';

export async function createChiller(data: ChillerDTO): Promise<Chiller> {
  const {
    firma,
    location,
    userId,
    userSignature,
    firstName,
    lastName,
    type,
    serialNumber,
    pollution,
    termalInsulation,
    termalAndPressureControl,
    protocolType,
    supplyVoltage,
    supplyPhase,
    measuredVoltage_1,
    measuredVoltage_2,
    measuredVoltage_3,
    interphaseOK,
    interphase,
    freonType,
    freonAmount,
    refrigerationCircuits,
    driverType,
    refrigerant,
    airTemperature,
    oilLevel,
    indicatorColor,
    tightSystem,
    currentConsumption,
    fansConsumption,
    highPressure,
    lowPressure,
    antiFrezzeTermostat,
    settingsTemperature,
    controlledParameter,
    controlMethod,
    leakGasTest,
    gasAdded,
    gasRegain,
    description,
    circuits,
    powerConsumptions,
  } = data;
  try {
    const newChiller = await prisma.chiller.create({
      data: {
        firma,
        location,
        userId,
        userSignature,
        firstName,
        lastName,
        type,
        serialNumber,
        pollution,
        termalInsulation,
        termalAndPressureControl,
        protocolType,
        supplyVoltage,
        supplyPhase,
        measuredVoltage_1,
        measuredVoltage_2,
        measuredVoltage_3,
        interphaseOK,
        interphase,
        freonType,
        freonAmount,
        refrigerationCircuits,
        driverType,
        refrigerant,
        airTemperature,
        oilLevel,
        indicatorColor,
        tightSystem,
        currentConsumption,
        fansConsumption,
        highPressure,
        lowPressure,
        antiFrezzeTermostat,
        settingsTemperature,
        controlledParameter,
        controlMethod,
        leakGasTest,
        gasAdded,
        gasRegain,
        description,
        circuits: {
          createMany: {
            data: circuits,
          },
        },
        powerConsumptions: {
          createMany: {
            data: powerConsumptions,
          },
        },
      },
    });
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Valve protocol created: ${JSON.stringify(newChiller, null, 2)}`,
      );
    }
    return newChiller;
  } catch (error) {
    handleError(error, errorMessages.chillerFailedCreation);
  }
}

export async function findAllChillers(): Promise<Chiller[]> {
  try {
    const allChillers = await prisma.chiller.findMany({
      include: { circuits: true, powerConsumptions: true },
    });
    return allChillers;
  } catch (error) {
    handleError(error, errorMessages.disconnect);
  }
}
