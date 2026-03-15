// Декларации для удаленных Vue-компонентов
declare module "remote_products/App" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "remote_products/ProductList" {
  import { DefineComponent } from "vue";
  interface ProductListProps {
    limit?: number;
    onProductSelect?: (id: string) => void;
  }
  const component: DefineComponent<ProductListProps>;
  export default component;
}

declare module "remote_products/ProductDetail" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{ id: string }>;
  export default component;
}

declare module "remote_products/store" {
  import { StoreDefinition } from "pinia";
  export const useProductsStore: StoreDefinition;
}

// declare module "remote_cart/Cart" {
//   import { DefineComponent } from "vue";
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }
