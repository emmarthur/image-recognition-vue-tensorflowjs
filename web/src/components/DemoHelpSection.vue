<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isPose = computed(() => route.path.includes("pose"));
</script>

<template>
  <section class="help-section mt-5 pt-4" aria-labelledby="help-heading">
    <h2 id="help-heading" class="h5 border-top pt-4">Help</h2>

    <template v-if="!isPose">
      <h3 class="h6 mt-3">About this app</h3>
      <p class="text-muted small mb-2">
        This page runs <strong>MobileNet</strong> in the browser with
        TensorFlow.js to guess what is in a photo. Everything runs locally in
        your browser after the model downloads.
      </p>
      <h3 class="h6 mt-3">How to use it</h3>
      <ul class="small text-muted">
        <li>
          A sample dog image loads first. Wait for the model; top labels and
          confidence scores appear in the list.
        </li>
        <li>
          Use <strong>Upload an image</strong> to pick a photo from your device.
        </li>
        <li>
          Read the ranked predictions; higher percentages mean the model is more
          confident.
        </li>
      </ul>
    </template>

    <template v-else>
      <h3 class="h6 mt-3">About this app</h3>
      <p class="text-muted small mb-2">
        This page uses <strong>PoseNet</strong> to find body joints in an image.
        Keypoints are drawn on the overlay canvas and listed in the table.
      </p>
      <h3 class="h6 mt-3">How to use it</h3>
      <ul class="small text-muted">
        <li>
          The default stretching photo runs pose detection on load (first load
          downloads models from the network).
        </li>
        <li>
          Upload a clear photo of a person for best results; joints appear on
          the canvas overlay.
        </li>
        <li>
          Use the table to inspect each part name, position (X/Y), and
          confidence score.
        </li>
      </ul>
    </template>

    <p class="small text-muted mt-3 mb-0">
      Switch between <strong>Classifier</strong> and <strong>Pose</strong> in
      the navigation bar above.
    </p>
  </section>
</template>

<style scoped>
.help-section {
  max-width: 40rem;
}
</style>
