'use server';

import { prisma } from '../db/db';
import { formatDate } from '../utils';
export async function getValveProtocolOptimized(id: string) {
  try {
    const valveProtocol = await prisma.valve.findUnique({
      where: { id },
      include: { infoBlocks: true },
    });
    if (!valveProtocol) {
      throw Error('Valve protocol not found');
    }
    const valveFirma = await prisma.firma.findUnique({
      where: { id: valveProtocol.firma },
    });
    if (!valveFirma) {
      throw Error('Valve protocol company not found');
    }
    const valveLocation = await prisma.location.findUnique({
      where: { id: valveProtocol.location },
    });
    if (!valveLocation) {
      throw Error('Valve protocol location not found');
    }

    return {
      ...valveProtocol,
      createdAt: formatDate(valveProtocol.createdAt),
      firma: valveFirma,
      location: valveLocation,
    };
  } catch (error) {
    console.error('Error fetching valve protocol:', error);
    throw new Error('Failed to fetch valve protocol');
  }
}

export async function getValveProtocolsOptimized() {
  try {
    // Pobierz wszystkie protokoły
    const valves = await prisma.valve.findMany();

    // Pobierz wszystkie firmy i lokalizacje, które są używane w protokołach
    const firmaIds = [...new Set(valves.map((valve) => valve.firma))];
    const locationIds = [...new Set(valves.map((valve) => valve.location))];

    // Pobierz tylko `shortName` dla firm i lokalizacji
    const firms = await prisma.firma.findMany({
      where: { id: { in: firmaIds } },
      select: {
        id: true,
        shortName: true,
      },
    });
    const locations = await prisma.location.findMany({
      where: { id: { in: locationIds } },
      select: {
        id: true,
        shortName: true,
      },
    });

    // Mapowanie firm i lokalizacji po ID
    const firmaMap = Object.fromEntries(
      firms.map((firma) => [firma.id, firma.shortName]),
    );
    const locationMap = Object.fromEntries(
      locations.map((location) => [location.id, location.shortName]),
    );

    // Wzbogacenie protokołów o shortName firmy i lokalizacji
    const enrichedProtocols = valves.map((valve) => ({
      ...valve,
      firma: firmaMap[valve.firma] || 'Nieznana firma',
      location: locationMap[valve.location] || 'Nieznana lokalizacja',
    }));

    return enrichedProtocols;
  } catch (error) {
    console.error('Error fetching protocols:', error);
    throw new Error('Failed to fetch valve protocols');
  }
}
