<template>
  <div class="main-screen">
    <Sidepanel></Sidepanel>
    <div class="main main-panel centered-wrapper main-panel-nonscroll">
      <div class="col chart-col">
        <h2>Заявки за неделю</h2>
        <WeekBarChart class="chart-wrap"></WeekBarChart>
      </div>
      <div class="col chart-col">
        <h2>Заявки за месяц</h2>
        <MonthPieChart class="chart-wrap"></MonthPieChart>
      </div>

      <div class="col chart-col">
        <h2>Общее количество</h2>
        <CommonChart class="chart-wrap"></CommonChart>
      </div>

      <div class="col">
        <h2>Оповещения</h2>
        <div class="info-block scroll-bar rounded-corners">
          <div class="loading-box" v-if="messagesLoading">
            <Loading></Loading>
          </div>
          <div class="messages" v-else>
            <MessageBox
              v-for="message in messages"
              :key="message.message_id"
              :message="message"
            ></MessageBox>
          </div>
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
          <div class="loading-box" v-if="requestsLoading">
            <Loading></Loading>
          </div>
          <div class="messages" v-else>
            <div
              class="message-box rounded-corners"
              v-for="(request, index) in activeReq"
              :key="index"
              :class="{
                'considiration-box': request.status === 'На рассмотрении',
                'inwork-box': request.status === 'В работе',
                'rejected-box': request.status === 'Отклонено',
                'completed-box': request.status === 'Завершено',
              }"
            >
              <!-- <div class="btn-wrap">
              <button class="delete-btn">Отменить</button>
            </div> -->
              <h4>{{ dateformat(request.timestamp) }}</h4>
              <h3>Заявка №{{ request.request_id }}</h3>
              <p>
                <span v-for="(type, index) in request.content" :key="index">
                  {{ type.name }}<br /></span
                ><br />Статус: {{ request.status }}
              </p>
              <div class="btn-wrap">
                <!-- <button class="more-btn">Подробнее →</button> -->
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-btn">
          <router-link to="list">Посмотреть активные заявки</router-link>
        </div>
      </div>
      <div class="col">
        <h2>Архив заявок</h2>
        <div class="info-block scroll-bar rounded-corners">
          <div class="loading-box" v-if="requestsLoading">
            <Loading></Loading>
          </div>
          <div class="messages" v-else>
            <div
              class="message-box rounded-corners"
              v-for="(request, index) in archieveReq"
              :key="index"
              :class="{
                'considiration-box': request.status === 'На рассмотрении',
                'inwork-box': request.status === 'В работе',
                'rejected-box': request.status === 'Отклонено',
                'completed-box': request.status === 'Завершено',
              }"
            >
              <h4>{{ dateformat(request.timestamp) }}</h4>
              <h3>Заявка №{{ request.request_id }}</h3>
              <p>
                <span v-for="(type, index) in request.content" :key="index">
                  {{ type.name }}<br /></span
                ><br />Статус: {{ request.status }}
              </p>
              <div class="btn-wrap">
                <!-- <button class="more-btn">Подробнее →</button> -->
              </div>
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
import Loading from "@/components/Loading.vue";
import WeekBarChart from "@/components/WeekBarChart.vue";
import MonthPieChart from "@/components/MonthPieChart.vue";
import CommonChart from "@/components/CommonChart.vue";

import axios from "axios";
import JWT from "jwt-client";
import moment from "moment";

export default {
  name: "Main",
  components: {
    Sidepanel,
    MessageBox,
    Loading,
    WeekBarChart,
    MonthPieChart,
    CommonChart,
  },
  data() {
    return {
      messages: [],
      activeReq: [],
      archieveReq: [],
      messagesLoading: false,
      requestsLoading: false,
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
    this.messagesLoading = true;
    this.requestsLoading = true;
    axios.get("http://localhost:8080/api/messages").then(
      (res) => {
        res.data.forEach((el) => {
          this.messages.push(el);
        });

        this.messagesLoading = false;
      },
      (err) => {
        console.log("Main. Error: ", err);
        this.messagesLoading = false;
      }
    );
    axios.get("http://localhost:8080/api/requests").then(
      (res) => {
        res.data.forEach((el) => {
          if (el.status === "Завершено") {
            this.archieveReq.push(el);
          } else {
            this.activeReq.push(el);
          }
        });
        this.sortRequests();
        this.requestsLoading = false;
      },
      (err) => {
        console.log("Main. Error: ", err);
        this.requestsLoading = false;
      }
    );
  },
  methods: {
    dateformat(date) {
      moment.locale("ru");
      return moment(date).format("lll");
    },
    sortRequests() {
      this.activeReq.sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        return 0;
      });
      this.activeReq.sort((a, b) => {
        if (a.status > b.status) {
          return -1;
        }
        if (a.status < b.status) {
          return 1;
        }
        return 0;
      });
    },
  },
};
</script>

<style>
.chart-col {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}
.chart-col > h2 {
  display: block;
  /* min-height: 10%; */
  height: unset !important;
  box-sizing: border-box;
}
.chart-wrap {
  height: 90%;
  width: 90%;
  /* max-width: 100%; /*/
  /* max-height: 90%; */
}
/* .chart-wrap > div {
  height: 50%;
}
.chart-wrap > div > div {
  height: 50%;
}
.chart-wrap > div > div > div {
  height: 50%;
} */
.main-screen {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1.4fr 6fr;
  width: 100vw;
  /* max-height: 100vh; */
  min-height: 100vh;
}
.main-panel-nonscroll {
  overflow-y: hidden !important;
}
.main {
  display: grid;
  grid-gap: 20px;
  width: 94%;
  grid-template-rows: (50% 50%);
  /* grid-auto-columns: minmax(1fr, 1fr) 1fr 1fr; */
  grid-template-columns: calc(33% - 10px) calc(33% - 10px) calc(33% - 10px);
  height: 100vh;
  justify-content: space-between;
  max-width: 80vw;
}
.info-block {
  border: 1px solid #000;
  height: calc(48vh - 70px);
  background-color: #f4f7fb;
  overflow-y: auto;
}
.bottom-btn {
  position: absolute;
  bottom: 24px;
  z-index: 200;
  left: 0;
  width: calc(100% - 10px);
  background: linear-gradient(
    to top,
    rgba(10, 61, 98, 0.9) 0%,
    rgba(74, 105, 189, 1) 100%
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
  height: 48vh;
  max-width: 100%;
  max-height: 100%;
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
.messages {
  padding-bottom: 2rem;
}
.message-box,
.add-btn {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #dfdfdf;
  box-sizing: border-box;
  padding: 16px;
}
.add-btn {
  border: 0px;
  width: calc(100% - 20px);
  font-family: "Montserrat Regular";
  font-size: 1.2rem;
  background-color: rgba(30, 55, 153, 1);
  color: #fff;
  cursor: pointer;
  outline: none;
  position: sticky;
  top: 0.2rem;
}
.add-btn:hover {
  background-color: rgba(74, 105, 189, 1);
}
.add-btn:active {
  background-color: rgba(60, 99, 130, 1);
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
  background: transparent;
}
.scroll-bar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: linear-gradient(left, #c8cdd4, #c2c2ff);
}

.scroll-bar::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #c2c2ff;
}

.scroll-bar::-webkit-scrollbar-thumb:hover {
  /* background: #a0a0f5; */
}
.bottom-btn a {
  color: #fff;
}

.delete-btn,
.more-btn {
  text-decoration: underline;
  background: none;
  border: 0px;
  cursor: pointer;
  outline: 0px;
  display: block;
}
.btn-wrap {
  display: flex;
  justify-content: flex-end;
}
</style>
