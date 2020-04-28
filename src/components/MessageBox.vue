<template>
  <div
    class="message-box rounded-corners"
    :class="{ important: message.type === 'important' }"
  >
    <h4>{{ message.timestamp }}</h4>
    <h3>{{ message.title }}</h3>
    <p>{{ message.body }}</p>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: ["message"],
};
</script>

<style scoped>
.message-box {
  width: 100%;
  box-sizing: border-box;
}
.important {
  background-color: #fff975;
}
.important h3 {
  color: #7c0202;
}
</style>
