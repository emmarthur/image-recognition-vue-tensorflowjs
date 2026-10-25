<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-info mb-4">
      <div class="container">
        <span class="navbar-brand mb-0 h1">TensorFlow.js Demo</span>
        <div class="navbar-nav">
          <RouterLink class="nav-link" to="/">Classifier</RouterLink>
          <RouterLink class="nav-link" to="/pose">Pose</RouterLink>
        </div>
      </div>
    </nav>
    <main class="container pb-5">
      <p class="text-muted small">
        Book-guided demo #992 — Peter O'Hanlon, Ch. 9 (MobileNet + PoseNet)
      </p>
      <RouterView />
    </main>
  </div>
</template>
