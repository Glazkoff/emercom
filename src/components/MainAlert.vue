<template>
  <div class="alerts-wrapper" id="main-alert-panel">
    <h2 class="alerts-title">Общие оповещения</h2>
    <div class="alerts-wrap">
      <MessageBox
        v-for="message in common"
        :key="message.message_id"
        :message="message"
      ></MessageBox>
    </div>
  </div>
</template>

<script>
import MessageBox from "@/components/MessageBox.vue";
import axios from "axios";

export default {
  name: "MainAlert",
  components: {
    MessageBox,
  },
  data() {
    return {
      common: [],
    };
  },
  async mounted() {
    try {
      axios.get("http://localhost:8080/api/messages?common=true").then(
        (res) => {
          res.data.forEach((el) => {
            this.common.push(el);
          });
        },
        (err) => {
          console.log("Main. Error: ", err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
.alerts-wrapper {
  display: flex;
  flex-direction: column;
  /* margin: 0 auto; */
  width: 100%;
  /* margin-right: 1.2rem; */
  /* padding: 1rem; */
  box-sizing: border-box;
}
.alerts-title {
  margin-left: 20px;
}
.alerts-wrap {
  margin-right: 1.2rem;
  width: 100%;
  height: calc(100vh - 6rem);
  overflow-y: scroll;
}
.alerts-wrap .message-box {
  width: unset;
}
.alerts-title {
  height: 1.5rem;
}
</style>
