export function BookGridSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-card-gap sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading books"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm"
        >
          <div className="aspect-[3/4] w-full rounded-xl bg-slate-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-slate-200" />
          <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
          <div className="mt-4 h-9 w-full rounded-full bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
