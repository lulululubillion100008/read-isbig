export default function ExploreLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-8 md:px-6 md:pt-20">
      <div className="mb-8">
        <div className="shimmer h-4 w-12 rounded" />
        <div className="shimmer mt-2 h-8 w-32 rounded-lg" />
      </div>
      <div className="mb-6 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="shimmer h-8 w-16 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="shimmer h-32 rounded-xl" />
        ))}
      </div>
    </main>
  );
}
