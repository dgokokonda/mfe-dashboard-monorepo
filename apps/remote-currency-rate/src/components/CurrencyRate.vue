<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Card } from "@mfe-dashboard/shared-ui";

interface Rate {
  code: string;
  name: string;
  value: number;
  change: number; // процентное изменение
}

const rates = ref<Rate[]>([
  { code: "USD", name: "US Dollar", value: 90, change: 0 },
  { code: "EUR", name: "Euro", value: 100, change: 0 },
  { code: "RUB", name: "Russian Ruble", value: 1, change: 0 },
  { code: "BTC", name: "Bitcoin*", value: 65000, change: 0 },
]);

let timer: number | undefined;

const updateRates = () => {
  rates.value = rates.value.map((r) => {
    const deltaPercent = (Math.random() - 0.5) * 1.5; // -0.75%..+0.75%
    const newValue = Math.max(
      r.code === "BTC" ? 10000 : 0.1,
      r.value * (1 + deltaPercent / 100),
    );
    return {
      ...r,
      value: Math.round(newValue * 100) / 100,
      change: Math.round(deltaPercent * 100) / 100,
    };
  });
};

onMounted(() => {
  updateRates();
  timer = window.setInterval(updateRates, 4000);
});

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer);
});
</script>

<template>
  <Card>
    <h3 class="title">Currency rates</h3>
    <p class="subtitle">Updates every 4 seconds</p>
    <table class="table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Value</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rate in rates" :key="rate.code">
          <td>{{ rate.code }}</td>
          <td>{{ rate.name }}</td>
          <td>{{ rate.value }}</td>
          <td
            :class="['change', { up: rate.change > 0, down: rate.change < 0 }]"
          >
            <span v-if="rate.change > 0">▲</span>
            <span v-else-if="rate.change < 0">▼</span>
            <span v-else>•</span>
            {{ Math.abs(rate.change) }}%
          </td>
        </tr>
      </tbody>
    </table>
  </Card>
</template>

<style scoped>
.title {
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 8px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  padding: 4px 6px;
  text-align: left;
}

thead tr {
  border-bottom: 1px solid #eee;
}

.change {
  font-weight: 600;
}

.change.up {
  color: #16a34a;
}

.change.down {
  color: #dc2626;
}
</style>
