import ValveProtocol from '@/components/Protocols/ValveProtocol/ValveProtocol';
import { getValveProtocolOptimized } from '@/lib/actions/commonActions';

export default async function Valve({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const valve = await getValveProtocolOptimized(id);

  return <ValveProtocol valve={valve} />;
}
