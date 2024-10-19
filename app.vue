<template>
  <div class="col-group">
    <div id="links" class="fixed top-4 right-5 underline">
      <a href="https://github.com/pi0/y-crossws" target="_blank" rel="noopener noreferrer">view source on Github</a>
    </div>
    <client-only>
      <tiptap-editor />
      <!-- <chatbox /> -->
    </client-only>
  </div>
</template>

<script setup lang="ts">
import "~/assets/style.css";
import "~/assets/theme.css";
</script>
