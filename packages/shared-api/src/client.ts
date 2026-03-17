import type { Product } from "./types";

class ApiClient {
  private baseURL: string;

  constructor() {
    // По умолчанию используем локальный json-server, чтобы пример
    // стабильно работал оффлайн. Можно переопределить через VITE_API_URL.
    // Например: VITE_API_URL=http://localhost:3001
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  }

  async getProducts(filters?: Record<string, string | number | boolean>) {
    const url = new URL(`${this.baseURL}/products`);
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        url.searchParams.set(key, String(value));
      }
    }
    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(
        `getProducts failed: ${response.status} ${response.statusText}`,
      );
    }
    return (await response.json()) as Product[];
  }

  async getProduct(id: number) {
    const response = await fetch(`${this.baseURL}/products/${id}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(
        `getProduct failed: ${response.status} ${response.statusText}`,
      );
    }
    return (await response.json()) as Product;
  }
}

export const api = new ApiClient();
