interface ProtocolRowProps {
  label: string;
  value: string;
}

export default function ProtocolRow({ label, value }: ProtocolRowProps) {
  return (
    <div className="flex justify-between font-roboto text-[#1A1C21]">
      <p className="">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
