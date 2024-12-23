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
import Keyboard from "../components/Keyboard.vue";
import MicView from "../components/micView.vue";
import MouseView from "../components/MouseView.vue";
import GesturesView from "../components/GesturesView.vue";
</script>

<style>
.carda {
  height: 30vh;
}
</style>
