export default function HomeLoading() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-12 md:px-6 md:pt-16">
      {/* Hero 骨架 */}
      <section className="mb-14 flex flex-col items-center text-center">
        <div className="shimmer h-10 w-48 rounded-lg" />
        <div className="shimmer mt-3 h-5 w-64 rounded-lg" />
        <div className="shimmer mt-2 h-4 w-80 rounded-lg" />
        <div className="shimmer mt-6 h-10 w-full max-w-md rounded-xl" />
      </section>

      {/* 书籍网格骨架 */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="shimmer h-32 rounded-xl" />
        ))}
      </div>
    </main>
  );
}
