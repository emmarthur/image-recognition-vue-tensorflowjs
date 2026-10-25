<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { PoseClassifier } from "@/models/PoseClassifier";
import type { Keypoint } from "@tensorflow-models/posenet";

const classifier = new PoseClassifier();
const imageRef = ref<HTMLImageElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const keypoints = ref<Keypoint[] | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const defaultSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Stretching_after_jogging.jpg/640px-Stretching_after_jogging.jpg";

async function runPose(): Promise<void> {
  error.value = null;
  keypoints.value = null;
  loading.value = true;
  await nextTick();
  const image = imageRef.value;
  const canvas = canvasRef.value;
  if (!image || !canvas || !image.complete || image.naturalWidth === 0) {
    loading.value = false;
    return;
  }
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  try {
    keypoints.value = await classifier.Pose(image, canvas);
  } catch (e) {
    error.value =
      e instanceof Error ? e.message : "Pose detection failed. Try another image.";
  } finally {
    loading.value = false;
  }
}

function onImageLoad(): void {
  void runPose();
}

function onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || !imageRef.value) return;
  imageRef.value.src = URL.createObjectURL(file);
}

onMounted(() => {
  if (imageRef.value?.complete) {
    void runPose();
  }
});
</script>

<template>
  <div class="tf-card">
    <h2 class="tf-page-title">Pose detection (PoseNet)</h2>
    <div class="mb-3">
      <label class="tf-label">Upload a photo with a person</label>
      <input
        type="file"
        accept="image/*"
        class="tf-input"
        @change="onFileChange"
      />
    </div>
    <div class="pose-stack" style="max-width: 720px">
      <img
        ref="imageRef"
        crossorigin="anonymous"
        :src="defaultSrc"
        alt="Pose"
        @load="onImageLoad"
      />
      <canvas ref="canvasRef" />
    </div>
    <p v-if="loading" class="tf-status tf-status--loading">
      Loading model / detecting pose…
    </p>
    <p v-if="error" class="tf-status tf-status--error">{{ error }}</p>
    <div v-if="keypoints?.length" class="tf-table-wrap">
      <table class="tf-table">
        <thead>
          <tr>
            <th>Confidence</th>
            <th>Part</th>
            <th>X</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kp, index) in keypoints" :key="`${kp.part}-${index}`">
            <td>{{ kp.score.toFixed(3) }}</td>
            <td>{{ kp.part }}</td>
            <td>{{ kp.position.x.toFixed(1) }}</td>
            <td>{{ kp.position.y.toFixed(1) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
