import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormSectionContainerProps {
  title?: string;
  children: React.ReactNode;
}

export default function FormSectionContainer({
  title,
  children,
}: FormSectionContainerProps) {
  return (
    <Card className="mb-5">
      {title && (
        <CardHeader>
          <CardTitle>{title ? title : ' '}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="flex flex-col pb-0">{children}</CardContent>
    </Card>
  );
}
