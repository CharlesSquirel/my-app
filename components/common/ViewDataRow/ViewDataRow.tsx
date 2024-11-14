interface ViewDataRowProps {
  label: string;
  data?: string | null;
}

export default function ViewDataRow({ label, data }: ViewDataRowProps) {
  // console.log(data)
  if (!data) return null;
  return (
    <div className="flex gap-2">
      <p className="font-semibold">{`${label}:`}</p>
      <p>{data}</p>
    </div>
  );
}
