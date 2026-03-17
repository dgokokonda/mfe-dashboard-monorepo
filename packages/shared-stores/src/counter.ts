import { defineStore, type Pinia } from "pinia";
import { ref } from "vue";
import { getSharedPinia } from "./pinia";

export const useCounterStore = (pinia?: Pinia) => {
  return defineStore("counter", () => {
    const count = ref(0);
    const lastUpdated = ref<Date | null>(null);

    function increment() {
      count.value++;
      lastUpdated.value = new Date();
    }

    function decrement() {
      count.value--;
      lastUpdated.value = new Date();
    }

    return { count, lastUpdated, increment, decrement };
  })(pinia ?? getSharedPinia());
};

export const createCounterStore = useCounterStore;
