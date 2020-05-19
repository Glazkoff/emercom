<template>
  <div>
    <div class="split-screen-wrapper">
      <div class="split-screen-half">
        <InForm></InForm>
      </div>
      <div class="split-screen-half">
        <MainAlert></MainAlert>
      </div>
    </div>
  </div>
</template>

<script>
import InForm from "@/components/InForm.vue";
import MainAlert from "@/components/MainAlert.vue";

export default {
  name: "Entrance",
  components: {
    InForm,
    MainAlert
  }
};
</script>

<style>
.split-screen-wrapper {
  height: 100vh;
  max-height: 100vh;
}
</style>
