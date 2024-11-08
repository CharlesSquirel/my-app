'use client';
import ErrorMessage from '@/components/common/ErrorMessage/ErrorMessage';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return <ErrorMessage error={error} />;
}
