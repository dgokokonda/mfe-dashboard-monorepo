/**
 * Типы для продуктового микрофронтенда
 */

export interface Product {
  /** Уникальный идентификатор продукта */
  id: string;
  /** Название продукта */
  name: string;
  /** Цена продукта */
  price: number;
  /** Описание продукта */
  description: string;
  /** Категория продукта */
  category?: ProductCategory;
  /** Наличие на складе */
  inStock?: boolean;
  /** Рейтинг продукта */
  rating?: number;
  /** Количество отзывов */
  reviewCount?: number;
  /** Список изображений */
  images?: string[];
  /** Дата создания */
  createdAt?: Date;
  /** Дата обновления */
  updatedAt?: Date;
  /** Бренд продукта */
  brand?: string;
  /** Теги продукта */
  tags?: string[];
  /** Характеристики продукта */
  attributes?: Record<string, string | number | boolean>;
}

/**
 * Категории продуктов
 */
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  children?: ProductCategory[];
}

/**
 * Фильтры для списка продуктов
 */
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  tags?: string[];
  sortBy?:
    | "price_asc"
    | "price_desc"
    | "name_asc"
    | "name_desc"
    | "rating_desc";
  page?: number;
  limit?: number;
}

/**
 * Ответ API со списком продуктов
 */
export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Запрос на создание продукта
 */
export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  category?: string;
  inStock?: boolean;
  images?: string[];
  brand?: string;
  tags?: string[];
  attributes?: Record<string, string | number | boolean>;
}

/**
 * Запрос на обновление продукта
 */
export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

/**
 * Краткая информация о продукте (для списков)
 */
export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  category?: string;
  inStock?: boolean;
  rating?: number;
  mainImage?: string;
}
