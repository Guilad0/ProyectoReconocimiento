<template>
  <main>
    <h1 class="text-center p-3">Reconocimiento</h1>
    <div class="d-flex column gap-3 carda">
      <Keyboard />
      <MicView />
      <MouseView />
      <GesturesView />
    </div>
  </main>
</template>

<script setup>
import Keyboard from "./Keyboard.vue";
import MicView from "./micView.vue";
import MouseView from "./MouseView.vue";
import GesturesView from "./GesturesView.vue";
</script>

<style>
.carda {
  height: 30vh;
}
</style>
