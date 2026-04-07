export default function BookLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center gap-4">
        <div className="shimmer h-8 w-48 rounded-lg" />
        <div className="shimmer h-4 w-32 rounded" />
        <div className="mt-4 shimmer h-1 w-24 rounded-full" />
      </div>
    </div>
  );
}
