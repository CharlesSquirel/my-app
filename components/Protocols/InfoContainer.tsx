interface InfoContainerProps {
  children: React.ReactNode;
  title: string;
}

export default function InfoContainer({ children, title }: InfoContainerProps) {
  return (
    <div className="relative flex w-[420px] flex-col rounded-sm bg-[#ededed] p-[10px] font-roboto before:absolute before:left-[-10px] before:top-0 before:h-full before:w-[4px] before:rounded-lg before:bg-customBlue">
      <p className="text-lg font-[500] uppercase">{title}</p>
      <div className="flex justify-between">
        <p className="font-[500] uppercase text-[#5E6470]">Nazwa</p>
        <p className="font-[500] uppercase text-[#5E6470]">Wartość</p>
      </div>
      {children}
    </div>
  );
}
