<script setup lang="ts">
import { computed } from "vue";

type CardVariant = "default" | "outlined" | "elevated";
type CardPadding = "none" | "small" | "medium" | "large";

interface Props {
  /** Вариант отображения карточки */
  variant?: CardVariant;
  /** Размер внутренних отступов */
  padding?: CardPadding;
  /** Добавляет тень при наведении */
  hoverable?: boolean;
  /** Делает карточку кликабельной */
  clickable?: boolean;
  /** Ширина карточки (любое CSS значение) */
  width?: string;
  /** Высота карточки (любое CSS значение) */
  height?: string;
  /** Пользовательские CSS классы */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  padding: "medium",
  hoverable: false,
  clickable: false,
  width: "auto",
  height: "auto",
  class: "",
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const cardClasses = computed(() => [
  "shared-card",
  `variant-${props.variant}`,
  `padding-${props.padding}`,
  {
    hoverable: props.hoverable,
    clickable: props.clickable,
  },
  props.class,
]);

const cardStyles = computed(() => ({
  width: props.width,
  height: props.height,
}));

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit("click", event);
  }
};
</script>

<template>
  <div :class="cardClasses" :style="cardStyles" @click="handleClick">
    <!-- Слот для контента -->
    <slot />
  </div>
</template>

<style scoped>
.shared-card {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

/* Варианты оформления */
.variant-default {
  background-color: #ffffff;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.variant-outlined {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: none;
}

.variant-elevated {
  background-color: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Отступы */
.padding-none {
  padding: 0;
}

.padding-small {
  padding: 0.75rem;
}

.padding-medium {
  padding: 1.25rem;
}

.padding-large {
  padding: 2rem;
}

/* Эффекты */
.hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.clickable {
  cursor: pointer;
}

.clickable:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .padding-large {
    padding: 1.5rem;
  }
}
</style>
