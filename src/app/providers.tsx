"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { makeStore } from "@/store";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lazy initializer, so each client gets exactly one store and the server
  // builds a fresh one per request.
  const [store] = useState(makeStore);

  // Enables RTK Query's `refetchOnFocus` / `refetchOnReconnect` options.
  useEffect(() => setupListeners(store.dispatch), [store]);

  return <Provider store={store}>{children}</Provider>;
}
