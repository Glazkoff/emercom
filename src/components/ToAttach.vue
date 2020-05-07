<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">ToAttach</div>
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
export default {
  name: "ToAttach",
  components: {
    Sidepanel,
  },
};
</script>

<style scoped></style>
