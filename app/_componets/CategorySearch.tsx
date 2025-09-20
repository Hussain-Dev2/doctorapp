"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Api from "../_utils/Api";
import Image from "next/image";
import Spinner from "@/components/ui/Loader";
import Link from "next/link";

function CategorySearch() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [CategoryList, setCategoryList] = useState<
    Array<{
      id?: string | number;
      name?: string;
      icon?: Array<{ url?: string }>;
    }>
  >([]);

  const GetCategoryList = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await Api.getCategories();
      const data = res?.data?.data ?? [];
      setCategoryList(data);
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err !== null && "message" in err
          ? (err as { message?: string }).message
          : String(err);
      setError(message || "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetCategoryList();
  }, []);

  return (
    <div className="mb-12 items-center flex flex-col">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 sm:mb-8 text-foreground">
        <span className="text-primary">Search</span> categories
      </h2>
      {/* small loader while fetching categories */}
      {isLoading && (
        <div className="mt-4">
          <Spinner size={20} />
        </div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex w-full items-center gap-2 max-w-xl">
        <Input
          type="text"
          placeholder="Search by category name"
          className="flex-1 rounded-full h-11 px-5"
        />
        <Button
          type="button"
          variant="default"
          className="h-11 rounded-full px-6"
        >
          Search
        </Button>
      </div>

      <div className="w-full mt-8 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {CategoryList.map((cat, index) => {
          const url = cat?.icon?.[0]?.url;
          if (!url)
            return (
              <div
                key={cat?.id ?? index}
                className="group cursor-default p-3 sm:p-4 bg-card text-card-foreground rounded-xl border border-border shadow-sm transition-all duration-200 ease-out text-center flex flex-col items-center justify-center gap-2 animate-pulse"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-muted ring-1 ring-border" />
                <span className="h-4 w-24 rounded bg-muted" />
              </div>
            );

          return (
            <Link
              className="group cursor-pointer p-4 sm:p-5 bg-card text-card-foreground rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-center flex flex-col items-center justify-center gap-3"
              key={cat?.id ?? index}
              href={`/search/${cat?.name}`}
              aria-label={cat?.name ?? "category"}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-muted ring-1 ring-border transition group-hover:ring-primary/40">
                <Image
                  src={`http://localhost:1337${url}`}
                  alt={cat?.name ?? "category"}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority={false}
                />
              </div>
              <span className="text-sm font-medium truncate max-w-full group-hover:text-primary transition-colors">
                {cat?.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySearch;
