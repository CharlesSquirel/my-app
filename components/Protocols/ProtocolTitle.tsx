interface ProtocolTitleProps {
  subTitle: string;
}

export default function ProtocolTitle({ subTitle }: ProtocolTitleProps) {
  return (
    <div className="font-roboto flex flex-col gap-1 text-[32px] leading-[1]">
      <h2 className="">Protokół</h2>
      <p className="font-light">{subTitle}</p>
    </div>
  );
}
