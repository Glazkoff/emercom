<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="requests-wrap">
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
          <button class="deleteBtn" @click="closeModal()">
            &times;
          </button>
          <div class="inner">
            <h2>
              Вы уверены, что хотите <br />
              отменить заявку?
            </h2>
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
          <button class="deleteBtn" @click="closeModal()">
            &times;
          </button>
          <div class="inner">
            <div v-if="morerequest">
              <h2>Заявка #{{ morerequest.request_id }}</h2>
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
    };
  },
  components: {
    Sidepanel,
    RequestBox,
  },
  methods: {
    delreq(index) {
      this.delete = true;
      this.modalrequest = this.inconsidiration[index];
    },
    morereq(status, id) {
      console.log("MORE", status, id);
      switch (status) {
        case "На рассмотрении":
          this.morerequest = this.inconsidiration.find((el) => {
            return el.request_id === id;
          });
          break;
        case "Отклонено":
          this.morerequest = this.rejected.find((el) => {
            return el.request_id === id;
          });
          break;
        case "В работе":
          this.morerequest = this.inwork.find((el) => {
            return el.request_id === id;
          });
          break;
        case "Завершено":
          this.morerequest = this.completed.find((el) => {
            return el.request_id === id;
          });
          break;
        default:
          break;
      }
      console.log(this.morerequest);
      this.more = true;
    },
    closeModal() {
      this.delete = false;
      this.more = false;
    },
    async killRequest() {
      let index = this.inconsidiration.findIndex(
        (el) => el.request_id === this.modalrequest.request_id
      );
      try {
        await axios.delete(
          "http://localhost:8080/api/requests/" + this.modalrequest.request_id
        );
      } catch (error) {
        console.log(error);
      }
      this.inconsidiration.splice(index, 1);
      this.delete = false;
    },
  },
  async mounted() {
    try {
      axios.get("http://localhost:8080/api/requests").then(
        (res) => {
          res.data.forEach((el) => {
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

<style scoped>
.main-panel {
  overflow-y: scroll;
  max-height: calc(100vh - 30px);
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
}
.considiration > .request-box {
  background-color: #e6e2e3;
}
.rejected > .request-box {
  background-color: #ffafa6;
}
.inwork > .request-box {
  background-color: #dcf2b0;
}
.completed > .request-box {
  background-color: #bde5ea;
}
.modal-wrap {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
}
.outer {
  margin: auto auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  padding: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 1rem;
  padding-right: 3rem;
  max-width: 50vw;
  min-width: 40vw;
  /* height: 50vh; */
  max-height: 70vh;
  background-color: #fff;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
}
.relative {
  /* position: relative; */
}
.inner {
  width: 100%;
  height: 50vh;
  padding-right: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
}
.inner p {
  margin: 0.5rem;
}
.inner h2 {
  margin-top: 0.8rem;
}
.inner h4 {
  margin-top: 0.8rem;
  margin-bottom: 0;
}
.outer .deleteBtn {
  top: 12px;
  right: 12px;
  position: absolute;
  display: block;
}
/* .outer > *:not(.deleteBtn) {
  width: 100%;
  margin: 0;
  margin-bottom: 0.5rem;
}
.outer > h1,
.outer > p {
  display: block;
} */
.modal-btn-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}
.modal-btn-wrap button {
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  width: 100%;
  cursor: pointer;
  font-family: "Montserrat Medium";
  color: #fff;
  background-color: #c44536;
  border-radius: 4px;
  text-transform: uppercase;
  outline: none;
}
.modal-btn-wrap button:hover {
  box-shadow: 0px 2px 8px #a73b2f;
}
::-webkit-scrollbar {
  width: 12px;
}
::-webkit-scrollbar-thumb {
  border-width: 1px 1px 1px 2px;
  border-color: #777;
  background-color: #aaa;
  border-radius: 8px;
  cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
  border-width: 1px 1px 1px 2px;
  border-color: #555;
  background-color: #777;
}
::-webkit-scrollbar-track {
  border-width: 0;
}
::-webkit-scrollbar-track:hover {
  border-left: solid 1px #aaa;
  background-color: #eee;
}
</style>
