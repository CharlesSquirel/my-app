import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CardContainerProps {
  children: React.ReactNode;
  title: string;
}

export default function CardContainer({ children, title }: CardContainerProps) {
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">{children}</CardContent>
    </Card>
  );
}
