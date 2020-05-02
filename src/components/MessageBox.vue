<template>
  <div
    class="message-box rounded-corners"
    :class="{ important: message.type === 'important' }"
  >
    <h4>{{ dateformat(message.timestamp) }}</h4>
    <h3>{{ message.title }}</h3>
    <p>{{ message.body }}</p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "MessageBox",
  props: ["message"],
  methods: {
    dateformat(date) {
      moment.locale("ru");
      return moment(date).format("lll");
    },
  },
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
