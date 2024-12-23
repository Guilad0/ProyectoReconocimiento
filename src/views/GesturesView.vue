<template>
  <div>
    <div style="position: relative; display: inline-block shadow card-body">
      <h2 class="mb-2">Reconocimiento de Gestos</h2>

      <video
        ref="videoRef"
        autoplay
        playsinline
        style="width: 640px; height: 480px"
      ></video>

      <canvas
        ref="canvasRef"
        width="640"
        height="480"
        style="position: absolute; top: 0; left: 0; pointer-events: none"
      ></canvas>
    </div>

    <p v-if="fingersCount !== null" class="fingers-count">
      Dedos levantados: {{ fingersCount }}
    </p>

    <p v-if="gestureActionMessage" class="actionMessage">{{ gestureActionMessage }}</p>

    <div class="action-box">
      <p v-if="isClicked" class="clicked-message">¡Has realizado un gesto!!!</p>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const videoRef = ref(null);
const canvasRef = ref(null);
const errorMessage = ref("");
const gestureActionMessage = ref("");
const isClicked = ref(false);
const fingersCount = ref(null);

const initializeRecognition = async () => {
  if (!videoRef.value || !canvasRef.value) {
    errorMessage.value = "El elemento <video> o <canvas> no está disponible.";
    return;
  }

  try {
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      if (!canvasRef.value) return;

      const canvasCtx = canvasRef.value.getContext("2d");
      canvasCtx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.value.width,
        canvasRef.value.height
      );

      results.multiHandLandmarks.forEach((landmarks) => {
        landmarks.forEach((landmark) => {
          canvasCtx.beginPath();
          canvasCtx.arc(
            landmark.x * canvasRef.value.width,
            landmark.y * canvasRef.value.height,
            5,
            0,
            2 * Math.PI
          );
          canvasCtx.fillStyle = "red";
          canvasCtx.fill();
        });

        countFingers(landmarks);
      });

      detectGesture(results);
    });

    const camera = new Camera(videoRef.value, {
      onFrame: async () => {
        await hands.send({ image: videoRef.value });
      },
      width: 640,
      height: 480,
    });

    camera.start();
  } catch (error) {
    errorMessage.value = `Error al inicializar la cámara: ${error.message}`;
  }
};

const countFingers = (landmarks) => {
  let count = 0;

  if (landmarks[4].y < landmarks[3].y) count++;
  if (landmarks[8].y < landmarks[6].y) count++;
  if (landmarks[12].y < landmarks[10].y) count++;
  if (landmarks[16].y < landmarks[14].y) count++;
  if (landmarks[20].y < landmarks[18].y) count++;
  fingersCount.value = count;
};

const detectGesture = (results) => {
  if (!results.multiHandLandmarks) return;

  results.multiHandLandmarks.forEach((landmarks) => {
    const thumbUp = landmarks[4];
    const indexUp = landmarks[8];

    if (indexUp.y < thumbUp.y) {
      gestureActionMessage.value = "¡Gestos detectados! Realiza un gesto.";
      isClicked.value = false;
    }

    if (
      Math.abs(thumbUp.x - indexUp.x) < 0.05 &&
      Math.abs(thumbUp.y - indexUp.y) < 0.05
    ) {
      isClicked.value = true;
      gestureActionMessage.value = "";
    }
  });
};

onMounted(() => {
  if (videoRef.value) {
    initializeRecognition();
  } else {
    errorMessage.value = "hubo un error con el video";
  }
});
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

.actionMessage {
  color: blue;
  font-size: 20px;
}

.clicked-message {
  color: green;
  font-size: 20px;
}

.fingers-count {
  font-size: 18px;
  color: green;
  font-weight: bold;
}

.action-box {
  margin-top: 20px;
  text-align: center;
}
</style>
