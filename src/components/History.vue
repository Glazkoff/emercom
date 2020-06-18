<template>
  <div class="main-screen">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="messages-wrap">
        <input
          class="find-input"
          v-model="findString"
          type="text"
          placeholder="Поиск по сообщениям"
        />
      </div>
      <div class="loading-box" v-if="loading">
        <Loading></Loading>
      </div>

      <div class="messages-wrap" v-else>
        <div class="common-messages">
          <h3>Общие оповещения</h3>
          <MessageBox
            v-for="message in filterCommon"
            :key="message.message_id"
            :message="message"
          ></MessageBox>
        </div>
        <div class="personal-messages">
          <h3>Личные оповещения</h3>
          <MessageBox
            v-for="message in filterPersonal"
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
import Loading from "@/components/Loading.vue";
import axios from "axios";

export default {
  name: "History",
  components: {
    Sidepanel,
    MessageBox,
    Loading,
  },
  data() {
    return {
      common: [],
      personal: [],
      loading: false,
      findString: "",
    };
  },
  computed: {
    filterCommon() {
      if (this.findString !== "") {
        return this.common.filter((el) => {
          return (
            (el.title.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 &&
              el.title !== "") ||
            (el.body.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 &&
              el.body !== "")
          );
        });
      } else {
        return this.common;
      }
    },
    filterPersonal() {
      return this.personal.filter((el) => {
        return (
          (el.title.toLowerCase().indexOf(this.findString.toLowerCase()) !==
            -1 &&
            el.title !== "") ||
          (el.body.toLowerCase().indexOf(this.findString.toLowerCase()) !==
            -1 &&
            el.body !== "")
        );
      });
    },
  },
  // при рендере компонента загрузка списка оповещений, связанных с пользователем
  async mounted() {
    try {
      this.loading = true;
      axios.get(process.env.VUE_APP_API_URL + "/messages?common=true").then(
        (res) => {
          res.data.forEach((el) => {
            this.common.push(el);
          });
        },
        (err) => {
          console.log("Main. Error: ", err);
        }
      );
      axios.get(process.env.VUE_APP_API_URL + "/messages?personal=true").then(
        (res) => {
          res.data.forEach((el) => {
            this.personal.push(el);
          });
          this.loading = false;
        },
        (err) => {
          console.log("Main. Error: ", err);
          this.loading = false;
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
.personal-messages h3,
.common-messages h3 {
  position: sticky;
  top: 0;
  margin: 0;
  padding-top: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.find-input {
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  width: 100%;
}
</style>
