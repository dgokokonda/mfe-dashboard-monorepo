<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Card } from "@mfe-dashboard/shared-ui";

interface DayForecast {
  day: string;
  icon: string;
  tempMin: number;
  tempMax: number;
  description: string;
}

const days = ref<DayForecast[]>([]);

onMounted(() => {
  // простые моковые данные прогноза на 5 дней
  days.value = [
    { day: "Сегодня", icon: "☀️", tempMin: 18, tempMax: 25, description: "Солнечно" },
    { day: "Завтра", icon: "🌤️", tempMin: 17, tempMax: 23, description: "Переменная облачность" },
    { day: "Ср", icon: "🌧️", tempMin: 14, tempMax: 20, description: "Небольшой дождь" },
    { day: "Чт", icon: "⛅", tempMin: 16, tempMax: 22, description: "Облачно с прояснениями" },
    { day: "Пт", icon: "🌦️", tempMin: 15, tempMax: 21, description: "Кратковременные дожди" },
  ];
});
</script>

<template>
  <Card>
    <h3 class="title">Weather forecast (mock)</h3>
    <ul class="list">
      <li v-for="day in days" :key="day.day" class="row">
        <div class="day">
          <span class="icon">{{ day.icon }}</span>
          <span>{{ day.day }}</span>
        </div>
        <div class="temps">
          <span class="max">{{ day.tempMax }}°C</span>
          <span class="min">{{ day.tempMin }}°C</span>
        </div>
        <div class="desc">
          {{ day.description }}
        </div>
      </li>
    </ul>
  </Card>
</template>

<style scoped>
.title {
  margin-bottom: 8px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 2fr;
  align-items: center;
  font-size: 0.9rem;
}

.day {
  display: flex;
  align-items: center;
  gap: 6px;
}

.icon {
  font-size: 1.2rem;
}

.temps {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
}

.max {
  font-weight: 600;
}

.min {
  color: #64748b;
}

.desc {
  color: #4b5563;
}
</style>
