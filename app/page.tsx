import { Suspense } from "react";

import { BookGridSkeleton } from "@/components/ui/book-grid-skeleton";
import { HomeBookCatalog } from "@/features/home-book-catalog/home-book-catalog";
import { getBookCatalogForHomePage } from "@/lib/get-book-catalog";

async function HomeBookCatalogLoader() {
  const { catalogBooks, catalogLoadWarning } = await getBookCatalogForHomePage();
  return (
    <HomeBookCatalog
      initialCatalogBooks={catalogBooks}
      catalogLoadWarning={catalogLoadWarning}
    />
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<BookGridSkeleton />}>
      <HomeBookCatalogLoader />
    </Suspense>
  );
}
