<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@mfe-dashboard/shared-ui";
import Card from "@mfe-dashboard/shared-ui/Card";
import { formatPrice } from "@mfe-dashboard/shared-utils";

// Типы
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  brand?: string;
  tags?: string[];
}

// Пропсы
const props = defineProps<{
  id?: string;
}>();

// Роутер (для изолированной навигации)
const route = useRoute();
const router = useRouter();

// Состояние
const product = ref<Product | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const selectedImage = ref(0);

// Определяем ID из пропсов или URL
const productId = computed(() => props.id || (route.params.id as string));

// Загрузка данных
const fetchProduct = async () => {
  if (!productId.value) {
    error.value = "Product ID not provided";
    loading.value = false;
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Тестовые данные
    product.value = {
      id: productId.value,
      name: `Product ${productId.value}`,
      price: 99.99,
      description:
        "This is a detailed product description. It contains all the information about the product, its features, specifications, and other important details that customers need to know before making a purchase.",
      category: "Electronics",
      inStock: true,
      rating: 4.5,
      reviewCount: 128,
      images: [
        "https://via.placeholder.com/600x400?text=Product+Image+1",
        "https://via.placeholder.com/600x400?text=Product+Image+2",
        "https://via.placeholder.com/600x400?text=Product+Image+3",
      ],
      brand: "Sample Brand",
      tags: ["electronics", "gadget", "new"],
    };

    // Здесь будет реальный API запрос:
    // const response = await fetch(`/api/products/${productId.value}`)
    // if (!response.ok) throw new Error('Failed to fetch product')
    // product.value = await response.json()
  } catch (err) {
    console.error("Error fetching product:", err);
    error.value = err instanceof Error ? err.message : "Failed to load product";
  } finally {
    loading.value = false;
  }
};

// Добавление в корзину
const addToCart = () => {
  if (!product.value) return;

  // Здесь будет логика добавления в корзину
  console.log("Added to cart:", product.value.id);

  // Можно эмитить событие для родительского компонента
  emit("add-to-cart", product.value.id);
};

// Назад к списку
const goBack = () => {
  if (router) {
    router.back();
  } else {
    emit("close");
  }
};

// Эмиты
const emit = defineEmits<{
  (e: "add-to-cart", productId: string): void;
  (e: "close"): void;
}>();

// Загрузка при монтировании
onMounted(() => {
  console.log("ProductDetail components:", Button, Card);
  fetchProduct();
});
</script>

<template>
  <div class="product-detail">
    <!-- Загрузка -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error-state">
      <p class="error-message">{{ error }}</p>
      <Button @click="fetchProduct">Try Again</Button>
      <Button variant="secondary" @click="goBack">Go Back</Button>
    </div>

    <!-- Товар не найден -->
    <div v-else-if="!product" class="not-found">
      <p>Product not found</p>
      <Button @click="goBack">Back to Products</Button>
    </div>

    <!-- Детали товара -->
    <Card v-else class="product-card">
      <div class="product-content">
        <!-- Галерея изображений -->
        <div class="product-gallery">
          <div class="main-image">
            <img
              :src="
                product.images?.[selectedImage] ||
                'https://via.placeholder.com/600x400?text=No+Image'
              "
              :alt="product.name"
            />
          </div>
          <div v-if="product.images?.length" class="thumbnail-list">
            <button
              v-for="(image, index) in product.images"
              :key="index"
              class="thumbnail"
              :class="{ active: selectedImage === index }"
              @click="selectedImage = index"
            >
              <img
                :src="image"
                :alt="`${product.name} thumbnail ${index + 1}`"
              />
            </button>
          </div>
        </div>

        <!-- Информация о товаре -->
        <div class="product-info">
          <h1 class="product-title">{{ product.name }}</h1>

          <div class="product-meta">
            <span v-if="product.brand" class="brand"
              >Brand: {{ product.brand }}</span
            >
            <span v-if="product.category" class="category"
              >Category: {{ product.category }}</span
            >
          </div>

          <div class="product-rating" v-if="product.rating">
            <span class="stars">
              {{ "★".repeat(Math.floor(product.rating)) }}
              {{ "☆".repeat(5 - Math.floor(product.rating)) }}
            </span>
            <span class="rating-value">({{ product.rating }} / 5)</span>
            <span v-if="product.reviewCount" class="review-count">
              {{ product.reviewCount }} reviews
            </span>
          </div>

          <div class="product-price">
            {{ formatPrice(product.price) }}
          </div>

          <div class="product-stock" :class="{ 'in-stock': product.inStock }">
            {{ product.inStock ? "✓ In Stock" : "✗ Out of Stock" }}
          </div>

          <div class="product-description">
            <h3>Description</h3>
            <p>{{ product.description }}</p>
          </div>

          <div v-if="product.tags?.length" class="product-tags">
            <span v-for="tag in product.tags" :key="tag" class="tag">
              #{{ tag }}
            </span>
          </div>

          <div class="product-actions">
            <Button
              size="large"
              :disabled="!product.inStock"
              @click="addToCart"
            >
              {{ product.inStock ? "Add to Cart" : "Out of Stock" }}
            </Button>
            <Button variant="secondary" size="large" @click="goBack">
              Back
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-state {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-state {
  text-align: center;
  padding: 2rem;
}

.error-message {
  color: #ff4d4f;
  margin-bottom: 1rem;
}

.not-found {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.product-card {
  overflow: hidden;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image {
  width: 100%;
  aspect-ratio: 3/2;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-list {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: none;
  transition: border-color 0.2s;
}

.thumbnail.active {
  border-color: #42b883;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-title {
  font-size: 2rem;
  margin: 0;
  color: #2c3e50;
}

.product-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  color: #ffc107;
  font-size: 1.2rem;
  letter-spacing: 2px;
}

.rating-value {
  font-weight: 600;
  color: #2c3e50;
}

.review-count {
  color: #666;
  font-size: 0.9rem;
}

.product-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #42b883;
}

.product-stock {
  font-size: 1.1rem;
  color: #ff4d4f;
}

.product-stock.in-stock {
  color: #52c41a;
}

.product-description {
  line-height: 1.6;
  color: #444;
}

.product-description h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.product-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

/* Адаптивность */
@media (max-width: 768px) {
  .product-detail {
    padding: 1rem;
  }

  .product-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .product-price {
    font-size: 2rem;
  }

  .product-actions {
    flex-direction: column;
  }
}
</style>
