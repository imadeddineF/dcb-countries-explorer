"use client";

import { useState } from "react";
import { configureCountriesApi } from "@dcb/shared";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

configureCountriesApi({
  apiKey: process.env.NEXT_PUBLIC_RESTCOUNTRIES_KEY ?? "",
});

const ReactQueryProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [queryClient] = useState(() => new QueryClient({}));
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
