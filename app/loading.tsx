import { BookGridSkeleton } from "@/components/ui/book-grid-skeleton";

export default function HomeLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-64 animate-pulse rounded-full bg-slate-100" />
      <BookGridSkeleton />
    </div>
  );
}
