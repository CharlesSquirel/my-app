import FirmaViewComponent from '@/components/Views/FirmaView/FirmaView';
import { findFirmaById } from '@/lib/actions/firmaActions';

export default async function FirmaView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const firma = await findFirmaById(id);

  return <FirmaViewComponent firma={firma} />;
}
