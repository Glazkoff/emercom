<template>
  <div class="main-screen ">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="loading-box" v-if="loading">
        <Loading></Loading>
      </div>
      <div class="push push-success success-box" v-else-if="success">
        <h3>Успех!</h3>
        <p>
          Сообщение успешно отправлено. Вы можете отправить ещё одно или
          просмотреть весь список своих сообщений
        </p>
        <div class="input-form btn-row">
          <button @click="newMessage()">Отправить ещё одно</button>
          <router-link to="history" tag="button"
            >Просмотреть весь список</router-link
          >
        </div>
      </div>
      <div class="error-box" v-else-if="error">
        <h1>Error</h1>
        <div class="btn-row">
          <button @click="newMessage()">Отправить ещё одно</button>
          <router-link to="history" tag="button"
            >Просмотреть весь список</router-link
          >
        </div>
      </div>
      <div class="editor-box" v-else>
        <h2>Написать новое оповещение</h2>
        <div class="editor-wrap">
          <div class="input-form">
            <label for="header">Заголовок</label>
            <input
              type="text"
              id="header"
              placeholder="Введите заголовок"
              v-model="header"
            />
          </div>
          <div class="input-form">
            <label for="body">Основной текст сообщения</label>
            <textarea
              name="body"
              id="body"
              placeholder="Введите основной текст"
              v-model="body"
            ></textarea>
          </div>
          <div class="input-form">
            <label for="type">Тип сообщения</label>
            <select name="type" id="type" v-model="type">
              <option value="usual">Обычный</option>
              <option value="important">Важный</option>
            </select>
          </div>
          <div class="input-form">
            <label for="broadcast">Тип рассылки</label>
            <div class="radio-group">
              <div class="radio-point">
                <input
                  type="radio"
                  value="common"
                  name="broadcast"
                  id="common"
                  v-model="broadcast"
                /><label for="common">Общая</label>
              </div>
              <div class="radio-point">
                <input
                  type="radio"
                  value="personal"
                  name="broadcast"
                  id="personal"
                  v-model="broadcast"
                /><label for="personal" @click="loadUsers()">Личная</label>
              </div>
            </div>
          </div>
          <div class="input-form" v-if="broadcast !== 'common' && usersLoading">
            <Loading></Loading>
          </div>
          <div
            class="input-form"
            v-if="broadcast !== 'common' && !usersLoading"
          >
            <label for="destination_id">ID адресата</label>
            <select name="" id="" v-model="destination_id">
              <option
                :value="user.user_id"
                v-for="(user, index) in users"
                :key="index"
                >#{{ user.user_id }} - {{ user.fio }}</option
              >
            </select>
          </div>
          <div class="input-form">
            <button
              @click="sendMessage()"
              :disabled="!header || (broadcast !== 'common' && !destination_id)"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sidepanel from "@/components/Sidepanel.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "NewMessage",
  components: {
    Sidepanel,
    Loading,
  },
  data() {
    return {
      header: "",
      body: "",
      destination_id: "",
      type: "usual",
      broadcast: "common",
      success: false,
      error: false,
      loading: false,
      usersLoading: false,
      users: [],
    };
  },
  methods: {
    // Метод загрузки списка пользователей
    loadUsers() {
      this.usersLoading = true;
      axios.get(process.env.VUE_APP_API_URL + "/users").then(
        (res) => {
          this.users = [];
          console.log("USERS", res);
          res.data.forEach((el) => {
            this.users.push(el);
          });
          this.usersLoading = false;
          if (res.data.length !== 0) {
            this.destination_id = res.data[0].user_id;
          }
        },
        (err) => {
          console.log("Main. Error: ", err);
          this.usersLoading = false;
        }
      );
    },
    // Метод отправки сообщений
    sendMessage() {
      this.loading = true;
      let message = {
        title: this.header,
        body: this.body,
        destination_id: this.destination_id,
        type: this.type,
        broadcast: this.broadcast,
      };
      console.log(message);
      axios.post(process.env.VUE_APP_API_URL + "/messages", message).then(
        (res) => {
          console.log(res);
          this.loading = false;
          if (res.status == 200) {
            this.success = true;
          }
        },
        (err) => {
          this.loading = false;
          this.error = true;
          console.log("Write. Error: ", err);
        }
      );
    },
    // При отправке ещё одного сообщения обнулить данные
    newMessage() {
      this.header = "";
      this.body = "";
      this.destination_id = "";
      this.type = "usual";
      this.broadcast = "common";
      this.success = false;
      this.error = false;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.main-panel {
  overflow-y: scroll;
  position: relative;
  height: calc(100vh - 30px);
  padding-bottom: 1rem;
  box-sizing: border-box;
}
.main-panel h2 {
  margin: 0;
  padding: 1rem 1.5rem;
}
.editor-wrap {
  width: 94%;
  margin: 0 auto;
  background-color: #d2dae6;
  border-radius: 8px;
  border: 1px solid #000;
  min-height: 80vh;
  padding-top: 1rem;
}
.push {
  margin-top: 1rem;
}
.btn-row {
  margin-left: 0;
  margin-bottom: 0;
}
</style>
