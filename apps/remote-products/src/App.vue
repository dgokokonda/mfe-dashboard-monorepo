<script setup lang="ts">
import { RouterView } from "vue-router";
// import Navigation from "./components/Navigation.vue";
</script>

<template>
  <div class="app">
    <!-- <header>
      <Navigation />
    </header> -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  line-height: 1.6;
  color: #2c3e50;
}

.app {
  min-height: 100vh;
}

header {
  background-color: #42b883;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

main {
  padding: 2rem;
}
</style>
