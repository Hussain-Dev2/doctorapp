"use client";

import Api from "@/app/_utils/Api";
const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") || "https://doctorstrapi.onrender.com";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";

function CategoryList() {
  const [categories, setCategories] = useState<Array<{
    id: string | number;
    name: string;
    icon: Array<{ url: string }>;
  }>>([]);
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const getCategories = () => {
    Api.getCategories().then((res) => {
      setCategories(res.data.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="h-screen fixed flex flex-col justify-center items-center">
      <Command>
        <CommandInput
          placeholder="Search by category name"
          value={query}
          onValueChange={(val: string) => setQuery(val)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              const q = query.trim();
              if (!q) return;
              router.push(`/search/${encodeURIComponent(q)}`);
            }
          }}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Suggestions">
            {categories
              .filter((c) => {
                if (!query) return true;
                return String(c.name ?? "")
                  .toLowerCase()
                  .includes(query.toLowerCase());
              })
              .map((cat, index) => {
              return (
                <CommandItem key={index}>
                  <Link
                    className="cursor-pointer flex items-center gap-2 p-2 w-full hover:bg-accent hover:text-accent-foreground"
                    href={`/search/${cat.name}`}
                  >
                    <Image
                      src={`${STRAPI_BASE}${cat?.icon?.[0]?.url}`}
                      alt={cat.name}
                      width={20}
                      height={20}
                    />
                    <label className="text-sm font-medium truncate max-w-full group-hover:text-primary transition-colors">
                      {cat.name}
                    </label>
                  </Link>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
