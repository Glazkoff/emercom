<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="loading-box" v-if="loading">
        <Loading></Loading>
      </div>
      <div class="requests-wrap" v-else>
        <div class="considiration">
          <h3>На рассмотрении</h3>
          <RequestBox
            v-for="(request, index) in inconsidiration"
            :request="request"
            :key="index"
            @delete="delreq(index)"
            @more="morereq"
          >
          </RequestBox>
        </div>
        <div class="rejected">
          <h3>Отклонено</h3>
          <RequestBox
            v-for="(request, index) in rejected"
            :request="request"
            :key="index"
            @more="morereq"
          ></RequestBox>
        </div>
        <div class="inwork">
          <h3>В работе</h3>
          <RequestBox
            v-for="(request, index) in inwork"
            :request="request"
            :key="index"
            @more="morereq"
          ></RequestBox>
        </div>
        <div class="completed">
          <h3>Завершено</h3>
          <RequestBox
            v-for="(request, index) in completed"
            :request="request"
            :key="index"
            @more="morereq"
          ></RequestBox>
        </div>
      </div>
    </div>
    <div
      class="modal-wrap"
      v-if="this.delete"
      @click.self="closeModal()"
      tabindex="0"
    >
      <div class="outer">
        <div class="relative">
          <h2>
            Вы уверены, что хотите <br />
            отменить заявку?
          </h2>
          <button class="deleteBtn" @click="closeModal()">
            &times;
          </button>
          <div class="inner">
            <p>
              Ваша заявка больше не будет доступна ни вам, ни специалистам
              IT-отдела
            </p>
            <div v-if="modalrequest">
              <RequestBox :request="modalrequest" inmodal="true"> </RequestBox>
            </div>
            <div class="modal-btn-wrap">
              <button @click="killRequest()">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal-wrap"
      v-if="this.more"
      @click.self="closeModal()"
      tabindex="0"
    >
      <div class="outer">
        <div class="relative">
          <h2>Заявка №{{ morerequest.request_id }}</h2>
          <button class="deleteBtn" @click="closeModal()">
            &times;
          </button>
          <div class="inner">
            <div v-if="morerequest">
              <RequestBox :request="morerequest" inmodal="true"> </RequestBox>
              <h4>Комментарий:</h4>
              <p>{{ morerequest.comment }}</p>
              <p v-if="!morerequest.comment">
                <small><i>Нет комментария</i></small>
              </p>
              <h4>Исполнитель:</h4>
              <p>
                {{
                  morerequest.executor_id == null ? "Не назначен" : "Назначен"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
import RequestBox from "@/components/RequestBox.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";

export default {
  name: "List",
  data() {
    return {
      inconsidiration: [],
      inwork: [],
      rejected: [],
      completed: [],
      modal: false,
      delete: false,
      more: false,
      modalrequest: false,
      morerequest: false,
      loading: false
    };
  },
  components: {
    Sidepanel,
    RequestBox,
    Loading
  },
  methods: {
    // При нажатии на кнопку удаления заявки, добавить в модальное окно данные заявки
    delreq(index) {
      this.delete = true;
      this.modalrequest = this.inconsidiration[index];
    },
    // При нажатии на кнопку "Подробнее", добавить в модальное окно данные заявки
    morereq(status, id) {
      console.log("MORE", status, id);
      switch (status) {
        case "На рассмотрении":
          this.morerequest = this.inconsidiration.find(el => {
            return el.request_id === id;
          });
          break;
        case "Отклонено":
          this.morerequest = this.rejected.find(el => {
            return el.request_id === id;
          });
          break;
        case "В работе":
          this.morerequest = this.inwork.find(el => {
            return el.request_id === id;
          });
          break;
        case "Завершено":
          this.morerequest = this.completed.find(el => {
            return el.request_id === id;
          });
          break;
        default:
          break;
      }
      console.log(this.morerequest);
      this.more = true;
    },
    // Закрыть модальное окно
    closeModal() {
      this.delete = false;
      this.more = false;
    },
    // Удалить заявку из базы данных
    async killRequest() {
      let index = this.inconsidiration.findIndex(
        el => el.request_id === this.modalrequest.request_id
      );
      try {
        await axios.delete(
          process.env.VUE_APP_API_URL+"/requests/" + this.modalrequest.request_id
        );
      } catch (error) {
        console.log(error);
      }
      this.inconsidiration.splice(index, 1);
      this.delete = false;
    }
  },
  // При рендере компонента запрашивать список всех заявок, отправленных пользователем
  async mounted() {
    this.loading = true;
    try {
      axios.get(process.env.VUE_APP_API_URL+"/requests").then(
        res => {
          res.data.forEach(el => {
            console.log(el.content[0]);
            switch (el.status) {
              case "На рассмотрении":
                this.inconsidiration.push(el);
                break;
              case "В работе":
                this.inwork.push(el);
                break;
              case "Завершено":
                this.completed.push(el);
                break;
              case "Отклонено":
                this.rejected.push(el);
                break;
              default:
                this.considiration.push(el);
                break;
            }
          });
          this.loading = false;
        },
        err => {
          console.log("Main. Error: ", err);
          this.loading = false;
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style>
.main-panel {
  overflow-y: scroll;
}
.requests-wrap {
  margin: 0 auto;
  display: flex;
  width: 94%;
}
.requests-wrap > div {
  width: 25%;
}
.requests-wrap > div:not(:last-child) {
  margin-right: 0.5rem;
}
.requests-wrap > div > h3 {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: block;
}
.requests-wrap > div > h3::before {
  display: block;
  height: 100%;
  width: 0.5rem;
  background-color: #fff;
  content: "";
  position: absolute;
  left: -0.5rem;
  top: 0;
}
.requests-wrap > div:last-child > h3::after {
  display: block;
  height: 100%;
  width: 0.2rem;
  background-color: #fff;
  content: "";
  position: absolute;
  right: -0.2rem;
  top: 0;
}
.considiration > .request-box,
.considiration-box {
  background-color: #e6e2e3;
}
.rejected > .request-box,
.rejected-box {
  background-color: #ffbebe;
}
.inwork > .request-box,
.inwork-box {
  background-color: #c2c2ff;
}
.completed > .request-box,
.completed-box {
  background-color: #c2ffc2;
}
</style>
