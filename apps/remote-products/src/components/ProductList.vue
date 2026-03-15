<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Button } from "@mfe-dashboard/shared-ui";
import Card from "@mfe-dashboard/shared-ui/Card";
import { formatPrice } from "@mfe-dashboard/shared-utils";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

defineProps<{
  limit?: number;
}>();

const emit = defineEmits<{
  (e: "product-select", id: string): void;
}>();

const products = ref<Product[]>([]);

onMounted(async () => {
  // Здесь будет запрос к API
  products.value = [
    { id: "1", name: "Product 1", price: 100, description: "Description 1" },
    { id: "2", name: "Product 2", price: 200, description: "Description 2" },
  ];
});

const handleSelect = (id: string) => {
  emit("product-select", id);
};
</script>

<template>
  <div class="product-list">
    <h2>Products!</h2>
    <div class="grid">
      <Card v-for="product in products.slice(0, limit)" :key="product.id">
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">{{ formatPrice(product.price) }}</p>
        <Button @click="handleSelect(product.id)"> View Details </Button>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  padding: 1rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
.price {
  font-weight: bold;
  color: #42b883;
}
</style>
