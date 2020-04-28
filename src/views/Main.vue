<template>
  <div class="main-screen">
    <Sidepanel></Sidepanel>
    <div class="main main-panel centered-wrapper">
      <div class="col">
        <h2>Оповещения</h2>
        <div class="info-block scroll-bar rounded-corners">
          <MessageBox
            v-for="message in messages"
            :key="message.message_id"
            :message="message"
          ></MessageBox>
        </div>
        <div class="bottom-btn">
          <router-link to="history">Посмотреть все оповещения</router-link>
        </div>
      </div>
      <div class="col">
        <h2>Активные заявки</h2>
        <div class="info-block scroll-bar rounded-corners">
          <router-link to="write" tag="button" class="add-btn rounded-corners"
            ><span class="nav-logo cross"></span>Добавить заявку</router-link
          >
          <div class="message-box rounded-corners">
            <button class="delete-btn">Отменить</button>
            <h4>08.02.2020, 13:45</h4>
            <h3>Заявка №773</h3>
            <p>ПК #342325<br />Принтер #342323<br />Статус: на рассмотрении</p>
            <button class="more-btn">Подробнее →</button>
          </div>
        </div>
        <div class="bottom-btn">
          <router-link to="list">Посмотреть активные заявки</router-link>
        </div>
      </div>
      <div class="col">
        <h2>Архив заявок</h2>
        <div class="info-block scroll-bar rounded-corners">
          <div class="message-box rounded-corners">
            <h4>08.02.2020, 13:45</h4>
            <h3>Заявка №773</h3>
            <p>ПК #342325<br />Принтер #342323<br />Статус: на рассмотрении</p>
            <div class="btn-wrap">
              <button class="more-btn">Подробнее →</button>
            </div>
          </div>
        </div>
        <div class="bottom-btn">
          <router-link to="list">Посмотреть все заявки</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
import MessageBox from "@/components/MessageBox.vue";
import axios from "axios";
import JWT from "jwt-client";

export default {
  name: "Main",
  components: {
    Sidepanel,
    MessageBox,
  },
  data() {
    return {
      messages: [],
    };
  },
  beforeMount() {
    const token = localStorage.getItem("user-token");
    if (token) {
      this.$http.defaults.headers.common["Authorization"] = token;
      console.log(JWT.read(token));
      this.$store.state.session = JWT.read(token);
      this.$store.state.role = JWT.read(token).claim.role;
    }
  },
  mounted() {
    // axios.get("http://localhost:8080/test").then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log("Main. Error: ", err);
    //   }
    // );
    axios.get("http://localhost:8080/api/messages").then(
      (res) => {
        res.data.forEach((el) => {
          this.messages.push(el);
        });
      },
      (err) => {
        console.log("Main. Error: ", err);
      }
    );
  },
};
</script>

<style>
.main-screen {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1.4fr 6fr;
  width: 100vw;
  /* max-height: 100vh; */
  min-height: calc(100vh - 30px);
}
.main {
  display: grid;
  grid-gap: 20px;
  width: 94%;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100vh;
  justify-content: space-between;
  max-width: 80vw;
}
.info-block {
  border: 1px solid #000;
  height: calc(100vh - 45px - 45px);
  /* max-height: 82vh; */
  background-color: #c4c4c4;
  overflow-y: scroll;
}
.bottom-btn {
  position: absolute;
  bottom: 44px;
  z-index: 200;
  left: 0;
  width: calc(100% - 10px);
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  text-align: center;
  height: 40px;
  box-sizing: border-box;
  padding: 10px;
  color: #fff;
  text-decoration: none;
  border-radius: 0px 0px 0px 8px;
  margin-right: 10px;
}
.bottom-btn:visited {
  color: #fff;
}
.col {
  height: 100vh;
  position: relative;
}
.col h2 {
  margin: 0;
  height: 45px;
  padding: 5px;
  padding-top: 10px;
  box-sizing: border-box;
  font-weight: normal;
}
.col .message-box {
  width: unset;
}
.message-box,
.add-btn {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #f2f2f2;
  box-sizing: border-box;
  padding: 16px;
}
.add-btn {
  border: 0px;
  width: calc(100% - 20px);
  font-family: "Montserrat Regular";
  font-size: 1.2rem;
  background-color: #737373;
  color: #fff;
  cursor: pointer;
}
.message-box:last-child {
  margin-bottom: 20px;
}
.message-box h3,
.message-box h4,
.message-box p {
  margin: 0;
  margin-bottom: 4px;
}
.message-box h4 {
  margin-bottom: 8px;
  font-weight: normal;
}
.message-box p {
  margin-bottom: 16px;
}
.scroll-bar::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}
.scroll-bar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: linear-gradient(left, #96a6bf, #63738c);
  box-shadow: inset 0 0 1px 1px #5c6670;
}

.scroll-bar::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eee;
  box-shadow: 0 0 1px 1px #bbb, inset 0 0 7px rgba(0, 0, 0, 0.3);
}

.scroll-bar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(left, #8391a6, #536175);
}
.bottom-btn a {
  color: #fff;
}

.delete-btn,
.more-btn {
  text-decoration: underline;
  background: none;
  border: 0px;
  /* margin-left: calc(72%); */
  cursor: pointer;
  outline: 0px;
}
.btn-wrap {
  display: flex;
  justify-content: flex-end;
}
.more-btn {
  /* margin-left: calc(60%); */
}
</style>
