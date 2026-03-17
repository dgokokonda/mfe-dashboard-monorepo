import { createPinia, type Pinia } from "pinia";

type GlobalWithSharedPinia = typeof globalThis & {
  __mfe_dashboard_shared_pinia__?: Pinia;
};

export function getSharedPinia(): Pinia {
  const g = globalThis as GlobalWithSharedPinia;
  if (!g.__mfe_dashboard_shared_pinia__) {
    g.__mfe_dashboard_shared_pinia__ = createPinia();
  }
  return g.__mfe_dashboard_shared_pinia__!;
}

