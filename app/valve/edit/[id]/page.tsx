import ValveForm from '@/components/Forms/ValveForm';
import { findAllFirma } from '@/lib/actions/firmaActions';
import { prisma } from '@/lib/db/db';
import { ValveDTO } from '@/lib/zod/zodSchema';
import { notFound } from 'next/navigation';

export default async function ValveEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const valve = await prisma.valve.findUnique({
    where: {
      id,
    },
    include: {
      infoBlocks: true,
    },
  });
  if (!valve) {
    notFound();
  }
  const editValues: ValveDTO = {
    userId: valve.userId,
    userSignature: valve.userSignature,
    firstName: valve.firstName,
    lastName: valve.lastName,
    firma: valve.firma,
    location: valve.location,
    type: valve.type,
    serialNumber: valve.serialNumber,
    infoBlocks: valve.infoBlocks.map((block) => ({
      ...block,
      description: block.description ?? undefined,
    })),
    description: valve.description ?? undefined,
    protocolType: valve.protocolType,
  };
  const firms = await findAllFirma();
  return (
    <ValveForm
      mode="edit"
      defaultValues={editValues}
      firms={firms}
      id={valve.id}
    />
  );
}
