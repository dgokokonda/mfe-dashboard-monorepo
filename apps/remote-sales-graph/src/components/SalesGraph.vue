<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Card } from "@mfe-dashboard/shared-ui";
import { Line } from "vue-chartjs";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
);

interface Point {
  time: string;
  value: number;
}

const points = ref<Point[]>([]);
const Utils = {
  months({ count = 7 }) {
    const monthNames = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    return monthNames.slice(0, count);
  },
};
const labels = Utils.months({ count: 12 });
const chartData = ref({
  type: "line",
  labels,
  datasets: [
    {
      label: "2025",
      data: [21, 5, 17, 67, 9, 34, 25, 40, 138, 55, 151, 125] as number[],
      borderColor: "#42b883",
      backgroundColor: "rgba(66, 184, 131, 0.2)",
      tension: 0.3,
      // fill: true,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
      beginAtZero: false,
    },
  },
} as const;

let timer: number | undefined;

const syncChart = () => {
  chartData.value.labels = points.value.map((p: Point) => p.time);
  chartData.value.datasets[0].data = points.value.map((p: Point) => p.value);
};

const pushPoint = () => {
  const now = new Date();
  const label = now.toLocaleTimeString("ru-RU", {
    minute: "2-digit",
    second: "2-digit",
  });
  const last = points.value[points.value.length - 1]?.value ?? 100;
  const next = Math.max(20, last + (Math.random() - 0.5) * 20);
  if (points.value.length > 20) {
    points.value.shift();
  }
  points.value.push({ time: label, value: Math.round(next) });
  syncChart();
};

onMounted(() => {
  for (let i = 0; i < 10; i += 1) {
    const base = new Date(Date.now() - (10 - i) * 1000);
    points.value.push({
      time: base.toLocaleTimeString("ru-RU", {
        minute: "2-digit",
        second: "2-digit",
      }),
      value: 80 + Math.round(Math.random() * 40),
    });
  }
  syncChart();
  timer = window.setInterval(pushPoint, 3000);
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});
</script>

<template>
  <Card>
    <h3 style="margin-bottom: 8px">Sales graph</h3>
    <div style="height: 260px">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </Card>
</template>
