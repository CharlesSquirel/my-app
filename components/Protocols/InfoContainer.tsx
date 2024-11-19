interface InfoContainerProps {
  children: React.ReactNode;
  title: string;
}

export default function InfoContainer({ children, title }: InfoContainerProps) {
  return (
    <div className="relative flex w-[420px] flex-col rounded-sm bg-[#ededed] p-[10px] pl-[10px] font-roboto">
      <div className="absolute left-0 top-0 h-full w-[2px] rounded-lg bg-customBlue"></div>
      <p className="text-lg font-[500] uppercase">{title}</p>
      <div className="flex justify-between">
        <p className="font-[500] uppercase text-[#5E6470]">Nazwa</p>
        <p className="font-[500] uppercase text-[#5E6470]">Wartość</p>
      </div>
      {children}
    </div>
  );
}
