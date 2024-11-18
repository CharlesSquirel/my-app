import { Badge } from '@/components/ui/badge';

interface PageTitleProps {
  title: string;
  subTitle?: string;
  badgeColor?: 'valve' | 'chiller';
}

export default function PageTitle({
  title,
  subTitle,
  badgeColor,
}: PageTitleProps) {
  if (subTitle && !badgeColor) {
    throw new Error(
      'You need to provide badgeColor prop when using subTitle prop',
    );
  }
  return (
    <div className="flex w-fit flex-col gap-2">
      <h2 className="relative inline-block w-auto pb-1 text-2xl font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[calc(120%)] after:bg-[#0a0a0a]">
        {title}
      </h2>
      {subTitle && (
        <Badge className="w-[165px]" variant={badgeColor}>
          {subTitle}
        </Badge>
      )}
    </div>
  );
}
