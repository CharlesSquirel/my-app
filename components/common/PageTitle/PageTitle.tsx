interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div>
      <h2 className="relative inline-block w-auto pb-1 text-2xl font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[calc(120%)] after:bg-[#0a0a0a]">
        {title}
      </h2>
    </div>
  );
}
