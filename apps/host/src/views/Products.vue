<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import { useCounterStore } from "@mfe-dashboard/shared-stores";
import { api } from "@mfe-dashboard/shared-api";

const ProductList = defineAsyncComponent(
  () => import("remote_products/ProductList"),
);
const ProductDetail = defineAsyncComponent(
  () => import("remote_products/ProductDetail"),
);

const selectedProductId = ref<string | null>(null);
const counterStore = useCounterStore();
const apiProductsCount = ref<number | null>(null);
const apiError = ref<string | null>(null);

const loadProductsViaSharedApi = async () => {
  apiError.value = null;
  try {
    const products = await api.getProducts();
    apiProductsCount.value = products.length;
  } catch (e) {
    apiError.value = e instanceof Error ? e.message : "Failed to load products";
    apiProductsCount.value = null;
  }
};

const handleProductSelect = (id: string) => {
  selectedProductId.value = id;
};
</script>

<template>
  <div class="products-view">
    <div class="header">
      <h2>Products</h2>
      <div class="counter">
        Counter: <strong>{{ counterStore.count }}</strong>
      </div>
      <div class="api">
        <button class="api-btn" type="button" @click="loadProductsViaSharedApi">
          Load via shared-api
        </button>
        <span v-if="apiProductsCount !== null" class="api-result">
          {{ apiProductsCount }} items
        </span>
        <span v-else-if="apiError" class="api-error">{{ apiError }}</span>
      </div>
    </div>
    <div class="sidebar">
      <Suspense>
        <template #default>
          <ProductList :limit="10" @product-select="handleProductSelect" />
        </template>
        <template #fallback>
          <div>Loading products...</div>
        </template>
      </Suspense>
    </div>

    <div class="detail">
      <Suspense v-if="selectedProductId">
        <template #default>
          <ProductDetail :id="selectedProductId" :key="selectedProductId" />
        </template>
        <template #fallback>
          <div>Loading product details...</div>
        </template>
      </Suspense>
      <div v-else class="placeholder">Select a product to view details</div>
    </div>
  </div>
</template>

<style scoped>
.header {
  grid-column: 1 / -1;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.counter {
  color: #2c3e50;
  background: #f5f5f5;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.api {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.api-btn {
  background: #42b883;
  color: white;
  border: 0;
  border-radius: 6px;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
}

.api-result {
  color: #2c3e50;
}

.api-error {
  color: #ff4d4f;
}

.products-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #666;
}
</style>
