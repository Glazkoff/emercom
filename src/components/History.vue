<template>
  <div class="main-screen">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="messages-wrap">
        <div class="common-messages">
          <h3>Общие оповещения</h3>
          <MessageBox
            v-for="message in common"
            :key="message.message_id"
            :message="message"
          ></MessageBox>
        </div>
        <div class="personal-messages">
          <h3>Личные оповещения</h3>
          <MessageBox
            v-for="message in personal"
            :key="message.message_id"
            :message="message"
          ></MessageBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
import MessageBox from "@/components/MessageBox.vue";
import axios from "axios";

export default {
  name: "History",
  components: {
    Sidepanel,
    MessageBox,
  },
  data() {
    return {
      common: [],
      personal: [],
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
      axios.get("http://localhost:8080/api/messages?personal=true").then(
        (res) => {
          res.data.forEach((el) => {
            this.personal.push(el);
          });
        },
        (err) => {
          console.log("Main. Error: ", err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.messages-wrap {
  width: 94%;
  margin: 0 auto;
  display: flex;
}
.messages-wrap > *:not(:last-child) {
  margin-right: 16px;
}
.messages-wrap * .message-box {
  margin-left: 0px;
}
.personal-messages,
.common-messages {
  width: calc(50% - 8px);
}
</style>
