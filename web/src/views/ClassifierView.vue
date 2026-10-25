<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { ImageClassifier } from "@/models/ImageClassifier";
import type { TensorInformation } from "@/models/TensorInformation";

const classifier = new ImageClassifier();
const imageRef = ref<HTMLImageElement | null>(null);
const tensors = ref<TensorInformation[] | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const defaultSrc =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/640px-YellowLabradorLooking_new.jpg";

async function classifyFromImage(): Promise<void> {
  error.value = null;
  tensors.value = null;
  loading.value = true;
  await nextTick();
  const image = imageRef.value;
  if (!image || !image.complete || image.naturalWidth === 0) {
    loading.value = false;
    return;
  }
  try {
    tensors.value = await classifier.Classify(image);
  } catch (e) {
    error.value =
      e instanceof Error ? e.message : "Classification failed. Try another image.";
  } finally {
    loading.value = false;
  }
}

function onImageLoad(): void {
  void classifyFromImage();
}

function onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || !imageRef.value) return;
  imageRef.value.src = URL.createObjectURL(file);
}

onMounted(() => {
  if (imageRef.value?.complete) {
    void classifyFromImage();
  }
});
</script>

<template>
  <div class="tf-card">
    <h2 class="tf-page-title">Image classification (MobileNet)</h2>
    <div class="mb-3">
      <label class="tf-label">Upload an image</label>
      <input
        type="file"
        accept="image/*"
        class="tf-input"
        @change="onFileChange"
      />
    </div>
    <img
      ref="imageRef"
      crossorigin="anonymous"
      :src="defaultSrc"
      alt="Classify"
      class="tf-preview-img"
      @load="onImageLoad"
    />
    <p v-if="loading" class="tf-status tf-status--loading">
      Loading model / classifying…
    </p>
    <p v-if="error" class="tf-status tf-status--error">{{ error }}</p>
    <ul v-if="tensors?.length" class="tf-list">
      <li v-for="tensor in tensors" :key="tensor.className">
        <span>{{ tensor.className }}</span>
        <span>{{ (tensor.probability * 100).toFixed(1) }}%</span>
      </li>
    </ul>
  </div>
</template>
