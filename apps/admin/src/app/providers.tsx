/* eslint-disable turbo/no-undeclared-env-vars */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { PropsWithChildren } from "react";

/**
 * Create a QueryClient with sane defaults:
 * - modest staleTime to leverage cache between navigations
 * - shorter gcTime to avoid memory bloat
 * - no refetch on window focus to reduce chattiness
 * - minimal retries for better UX
 */
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000, // 30s
        gcTime: 5 * 60_000, // 5m
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

/**
 * Keep a single client instance on the browser across HMR/route transitions.
 * On the server, return a fresh client per request to avoid leak.
 */
let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV !== "production" ? (
        <ReactQueryDevtools buttonPosition="bottom-right" />
      ) : null}
    </QueryClientProvider>
  );
}
