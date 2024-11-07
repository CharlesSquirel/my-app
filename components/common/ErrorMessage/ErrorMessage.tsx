import { Ban } from 'lucide-react';

interface ErrorMessageProps {
  error: Error & { digest?: string };
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <section className="flex w-full justify-center">
      <div className="relative h-[58px] w-[350px] gap-4 rounded-lg border border-destructive/50 px-4 py-3 text-sm font-[500] text-destructive">
        <Ban
          size={24}
          className="absolute left-[16px] top-[50%] translate-y-[-50%]"
        />
        <h5 className="pl-[30px] pt-[2px] leading-[14px]">{error.message}</h5>
      </div>
    </section>
  );
}
