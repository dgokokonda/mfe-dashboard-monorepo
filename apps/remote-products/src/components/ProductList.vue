<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Button, Card } from "@mfe-dashboard/shared-ui";
import {
  eventBus,
  dispatchAppEvent,
  formatPrice,
} from "@mfe-dashboard/shared-utils";
import { useCounterStore } from "@mfe-dashboard/shared-stores";
import { api, type Product as ApiProduct } from "@mfe-dashboard/shared-api";

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
  (e: "edit-limit", limit: number): void;
}>();

const products = ref<Product[]>([]);
const counterStore = useCounterStore();
const increment = () => counterStore.increment();
const decrement = () => counterStore.decrement();

onMounted(() => {
  // Пример shared API: один и тот же клиент дергается из host и remote
  api
    .getProducts()
    .then((data: ApiProduct[]) => {
      products.value = data.map((p) => ({
        id: String(p.id),
        name: p.title,
        price: p.price,
        description: p.description,
      }));
    })
    .catch(() => {
      // fallback, чтобы UI не был пустым если сеть недоступна
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
        {
          id: "3",
          name: "Product 3",
          price: 300,
          description: "Description 3",
        },
      ];
    });
  // setTimeout(() => emit("edit-limit", 3), 3000);

  // слушаем событие от хоста
  const unsubscribe = eventBus.on("notification:show", (detail) => {
    console.log(detail.message + " " + detail.type);
  });

  // уведомляем хост через шину событий о монтировании
  eventBus.markRemoteReady();
  onUnmounted(() => unsubscribe());
});

const handleSelect = (id: string) => {
  emit("product-select", id);
};

const unshiftProduct = () => {
  const productId = String(products.value.length + 1);
  products.value.unshift({
    id: productId,
    name: `Product ${productId}`,
    price: 99.99,
    description:
      "This is a detailed product description. It contains all the information about the product, its features, specifications, and other important details that customers need to know before making a purchase.",
  });
  // Отправляем событие в хост
  dispatchAppEvent("notification:show", {
    message: `Product ${productId} added`,
    type: "success",
  });
  increment();
};
const shiftProduct = () => {
  if (products.value.length === 0) return;
  products.value.shift();
  // Отправляем событие в хост
  dispatchAppEvent("notification:show", {
    message: "Product removed",
    type: "success",
  });
  decrement();
};
</script>

<template>
  <div class="product-list">
    <h3 style="margin-bottom: 8px">Products</h3>
    <div class="btns">
      <Button @click="unshiftProduct">Добавить продукт</Button>
      <Button @click="shiftProduct">Удалить продукт</Button>
    </div>
    <div class="grid">
      <Card v-for="product in products" :key="product.id">
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

.btns {
  display: flex;
  gap: 10px;
}
</style>
