/// <reference types="vite/client" />

// Декларации для remote модулей
declare module "remote_products/ProductList" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "remote_products/ProductDetail" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{ id?: string }, {}, any>;
  export default component;
}

declare module "remote_products/*" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "remote_sales_graph/SalesGraph" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "remote_weather/Forecast" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "remote_currency_rate/CurrencyRate" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Декларации для Vue файлов
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
