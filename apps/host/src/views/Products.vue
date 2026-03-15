<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";

const ProductList = defineAsyncComponent(
  () => import("remote_products/ProductList"),
);
const ProductDetail = defineAsyncComponent(
  () => import("remote_products/ProductDetail"),
);

const selectedProductId = ref<string | null>(null);

const handleProductSelect = (id: string) => {
  selectedProductId.value = id;
};
</script>

<template>
  <div class="products-view">
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
