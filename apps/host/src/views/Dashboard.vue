<template>
  <div class="dashboard-wrapper">
    <h2>Дашборд</h2>
    <div class="dashboard dashboard-grid">
      <div class="widget">
        <Suspense>
          <template #default>
            <SalesGraph />
          </template>
          <template #fallback>
            <div>Loading sales graph...</div>
          </template>
        </Suspense>
      </div>
      <div class="widget">
        <Suspense>
          <template #default>
            <ProductsList :limit="5" />
          </template>
          <template #fallback>
            <div>Loading products...</div>
          </template>
        </Suspense>
      </div>
      <div class="widget">
        <Suspense>
          <template #default>
            <Forecast />
          </template>
          <template #fallback>
            <div>Loading forecast data...</div>
          </template>
        </Suspense>
      </div>
      <div class="widget">
        <Suspense>
          <template #default>
            <CurrencyRate />
          </template>
          <template #fallback>
            <div>Loading currency rate data...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const SalesGraph = defineAsyncComponent(
  () => import("remote_sales_graph/SalesGraph"),
);
const ProductsList = defineAsyncComponent(
  () => import("remote_products/ProductList"),
);
const Forecast = defineAsyncComponent(() => import("remote_weather/Forecast"));
const CurrencyRate = defineAsyncComponent(
  () => import("remote_currency_rate/CurrencyRate"),
);
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

.widget {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.widget {
  height: 100%;
}

.dashboard-grid {
  grid-auto-rows: 1fr;
}

.dashboard-wrapper h2 {
  text-align: center;
}
</style>
