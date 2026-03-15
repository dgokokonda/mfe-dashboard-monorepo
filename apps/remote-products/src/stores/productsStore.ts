import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "../types";

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const selectedProductId = ref<string | null>(null);

  const selectedProduct = computed(() =>
    products.value.find((p) => p.id === selectedProductId.value),
  );

  async function fetchProducts() {
    loading.value = true;
    try {
      // Здесь будет API запрос
      products.value = [
        {
          id: "1",
          name: "Product 1",
          price: 100,
          description: "Description 1",
        },
        {
          id: "2",
          name: "Product 2",
          price: 200,
          description: "Description 2",
        },
      ];
    } finally {
      loading.value = false;
    }
  }

  function selectProduct(id: string) {
    selectedProductId.value = id;
  }

  return {
    products,
    loading,
    selectedProduct,
    fetchProducts,
    selectProduct,
  };
});
