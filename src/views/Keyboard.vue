<template>
  <div class="justify-content-center shadow card-body text-center">
    <h2 class="text-success">Reconocimiento de Teclado</h2>
    <p class="text-primary">PRESIONA CUALQUIER TECLA</p>

    <p>
      Última tecla presionada: <strong>{{ lastKey }}</strong>
    </p>
    <p>
      Código de la tecla: <strong>{{ lastKeyCode }}</strong>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const lastKey = ref(null);
const lastKeyCode = ref(null);

const handleKeydown = (event) => {
  lastKey.value = event.key;
  lastKeyCode.value = event.code;
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
