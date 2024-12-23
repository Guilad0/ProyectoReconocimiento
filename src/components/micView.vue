<template>
  <div>
    <div class="card-body shadow d-flex flex-column align-items-center">
      <h2 class="text-success">Reconocimiento de Voz</h2>
      <button @click="startRecognition" :disabled="isListening" class="btn btn-primary">
        Iniciar Reconocimiento
      </button>
      <button class="btn btn-danger" @click="stopRecognition" :disabled="!isListening">
        Detener
      </button>
      <p v-if="isListening">Escuchando...</p>
      <div v-if="transcription">
        <h3>Transcripción:</h3>
        <p>{{ transcription }}</p>
      </div>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const transcription = ref("");
const isListening = ref(false);
const errorMessage = ref("");

let recognition;

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  recognition.lang = "es-ES";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    transcription.value = event.results[0][0].transcript;
    isListening.value = false;
  };

  recognition.onerror = (event) => {
    errorMessage.value = `Error: ${event.error}`;
    isListening.value = false;
  };

  recognition.onend = () => {
    isListening.value = false;
  };
} else {
  errorMessage.value =
    "La API de reconocimiento de voz no está disponible en este navegador.";
}

const startRecognition = () => {
  errorMessage.value = "";
  transcription.value = "";
  recognition.start();
  isListening.value = true;
};

const stopRecognition = () => {
  recognition.stop();
  isListening.value = false;
};
</script>
