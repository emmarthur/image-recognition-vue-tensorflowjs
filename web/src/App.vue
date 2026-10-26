<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import DemoHelpSection from "@/components/DemoHelpSection.vue";
import HelpJumpButton from "@/components/HelpJumpButton.vue";
</script>

<template>
  <div class="tf-shell">
    <div class="tf-blob tf-blob-a" aria-hidden="true" />
    <div class="tf-blob tf-blob-b" aria-hidden="true" />

    <header class="tf-nav">
      <div class="tf-brand">
        <span class="tf-brand-icon" aria-hidden="true">🧠</span>
        <h1 class="tf-title">TensorFlow.js Demo</h1>
      </div>
      <nav class="tf-nav-links" aria-label="Demo pages">
        <RouterLink to="/">Classifier</RouterLink>
        <RouterLink to="/pose">Pose</RouterLink>
        <HelpJumpButton />
      </nav>
    </header>

    <main class="tf-main">
      <RouterView />
      <DemoHelpSection />
    </main>
  </div>
</template>
