import FirmaForm from '@/components/Forms/Firma/FirmaForm';
import { findFirmaById } from '@/lib/actions/firmaActions';
import { FirmaDTO } from '@/lib/types/firmaTypes';

export default async function FirmaView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const firma = await findFirmaById(id);
  const editValues: FirmaDTO = {
    fullName: firma.fullName,
    shortName: firma.shortName,
    street: firma.street,
    houseNumber: firma.houseNumber,
    localNumber: firma.localNumber,
    postCode: firma.postCode,
    city: firma.city,
    tel: firma.tel,
    contactEmail: firma.contactEmail,
    locations: firma.locations,
  };

  return <FirmaForm mode="edit" defaultValues={editValues} id={id} />;
}
