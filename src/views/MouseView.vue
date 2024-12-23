<template>
  <div class="card-body shadow">
    <h2 class="text-success">Reconocimiento de Mouse</h2>
    <p>Posición actual del mouse: X: {{ mouseX }}, Y: {{ mouseY }}</p>
    <p>
      Estado del clic: <strong>{{ isMouseDown ? "Presionado" : "Soltado" }}</strong>
    </p>
    <p v-if="lastClickPosition">
      Último clic: X: {{ lastClickPosition.x }}, Y: {{ lastClickPosition.y }}
    </p>
    <p v-if="lastClickType">
      Tipo de clic: <strong>{{ lastClickType }}</strong>
    </p>
    <div
      class="tracking-area"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="trackMouse"
      @contextmenu.prevent="handleRightClick"
    >
      <p>Mueve el mouse aquí para rastrear la posición y haz clic derecho o izquierdo.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const mouseX = ref(0);
const mouseY = ref(0);
const isMouseDown = ref(false);
const lastClickPosition = ref(null);
const lastClickType = ref("");

const trackMouse = (event) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
};

const handleMouseDown = (event) => {
  isMouseDown.value = true;
  lastClickPosition.value = { x: event.clientX, y: event.clientY };

  if (event.button === 0) {
    lastClickType.value = "Clic izquierdo";
  } else if (event.button === 1) {
    lastClickType.value = "Clic medio";
  } else if (event.button === 2) {
    lastClickType.value = "Clic derecho";
  }
};

const handleMouseUp = () => {
  isMouseDown.value = false;
};

const handleRightClick = (event) => {
  lastClickPosition.value = { x: event.clientX, y: event.clientY };
  lastClickType.value = "Clic derecho";
};
</script>

<style scoped>
.tracking-area {
  border: 2px dashed #4caf50;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
  background-color: #f9f9f9;
  height: 200px;
  position: relative;
  cursor: crosshair;
}
</style>
