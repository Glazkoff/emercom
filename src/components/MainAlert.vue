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
      errorMessage: "",
    };
  },
  // При рендере компонента в браузере запрашивает сообщения с меткой "common"
  async mounted() {
    try {
      axios
        .get(process.env.VUE_APP_API_URL + "/messages?common=true")
        .then(
          (res) => {
            res.data.forEach((el) => {
              this.common.push(el);
            });
          },
          (err) => {
            this.errorMessage = err;
            console.log("Main. Error: ", err);
          }
        )
        .catch((err) => {
          this.errorMessage = err;
        });
    } catch (err) {
      console.log(err);
      this.errorMessage = err;
    }
  },
};
</script>

<style>
.alerts-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
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
  color: #fff;
}
</style>
