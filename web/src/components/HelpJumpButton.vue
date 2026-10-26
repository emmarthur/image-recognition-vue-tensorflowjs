<script setup lang="ts">
function scrollToHelp() {
  document.getElementById("help-heading")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
</script>

<template>
  <button type="button" class="help-jump-btn" @click="scrollToHelp">Help</button>
</template>
