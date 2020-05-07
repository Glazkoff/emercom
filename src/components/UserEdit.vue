<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">User edit</div>
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
export default {
  name: "UserEdit",
  components: {
    Sidepanel,
  },
};
</script>

<style scoped></style>
