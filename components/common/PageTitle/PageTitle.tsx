import { Badge } from '@/components/ui/badge';

interface PageTitleProps {
  title: string;
  subTitle?: string;
}

export default function PageTitle({ title, subTitle }: PageTitleProps) {
  return (
    <div className="flex flex-col">
      <h2 className="relative inline-block w-auto pb-1 text-2xl font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[calc(120%)] after:bg-[#0a0a0a]">
        {title}
      </h2>
      {subTitle && <Badge className="w-9">{subTitle}</Badge>}
    </div>
  );
}
