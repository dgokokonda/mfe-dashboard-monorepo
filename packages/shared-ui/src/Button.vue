<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "danger";
    size?: "small" | "medium" | "large";
  }>(),
  {
    variant: "primary",
    size: "medium",
  },
);

defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();
</script>

<template>
  <button
    class="shared-button"
    :class="[`variant-${variant}`, `size-${size}`]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.shared-button {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.variant-primary {
  background-color: #42b883;
  color: white;
}
.variant-primary:hover {
  background-color: #33a06f;
}

.variant-secondary {
  background-color: #e5e5e5;
  color: #333;
}
.variant-secondary:hover {
  background-color: #d5d5d5;
}

.variant-danger {
  background-color: #ff4d4f;
  color: white;
}
.variant-danger:hover {
  background-color: #ff2d2f;
}

.size-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
.size-medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
.size-large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}
</style>
