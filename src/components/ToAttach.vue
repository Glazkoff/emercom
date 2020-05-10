<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="loading-box" v-if="loading">
        <Loading></Loading>
      </div>
      <div class="attached-wrap" v-else>
        <h3>Список необработанных заявок:</h3>
        <div class="requests-list">
          <table>
            <tr class="sticky-header">
              <th>ID #</th>
              <th>Дата и время</th>
              <th>Статус</th>
              <th>ID автора</th>
              <th>ID отдела</th>
              <th>ID исполнителя</th>
              <th>Контент</th>
              <th>Общий комментарий</th>
            </tr>
            <tr
              v-for="(request, index) in requests_considiration"
              :key="index"
              :class="{
                'considiration-box': request.status === 'На рассмотрении',
                'inwork-box': request.status === 'В работе',
                'rejected-box': request.status === 'Отклонено',
                'completed-box': request.status === 'Завершено',
              }"
            >
              <td>{{ request.request_id }}</td>
              <td>{{ dateformat(request.timestamp) }}</td>
              <td>{{ request.status }}</td>
              <td>{{ request.user_id }}</td>
              <td>{{ request.department_id }}</td>
              <td>
                <div class="input-form">
                  <button @click="chooseExecutor(request.request_id)">
                    Выбрать исполнителя
                  </button>
                </div>
              </td>
              <td>
                <div v-for="(device, index) in request.content" :key="index">
                  {{ device.name }} (#{{ device.device_id }})
                </div>
              </td>
              <td>{{ request.comment }}</td>
            </tr>
          </table>
        </div>
        <h3>Список просмотренных заявок:</h3>
        <div class="requests-list">
          <table>
            <tr>
              <th>ID #</th>
              <th>Дата и время</th>
              <th>Статус</th>
              <th>ID автора</th>
              <th>ID отдела</th>
              <th>ID исполнителя</th>
              <th>Контент</th>
              <th>Общий комментарий</th>
            </tr>
            <tr
              v-for="(request, index) in requests_reviewed"
              :key="index"
              :class="{
                'considiration-box': request.status === 'На рассмотрении',
                'inwork-box': request.status === 'В работе',
                'rejected-box': request.status === 'Отклонено',
                'completed-box': request.status === 'Завершено',
              }"
            >
              <td>{{ request.request_id }}</td>
              <td>{{ dateformat(request.timestamp) }}</td>
              <td>
                <div class="input-form">
                  <select
                    @change="changeStatus(request.request_id, index)"
                    v-model="request.status"
                    :class="{
                      'considiration-box': request.status === 'На рассмотрении',
                      'inwork-box': request.status === 'В работе',
                      'rejected-box': request.status === 'Отклонено',
                      'completed-box': request.status === 'Завершено',
                    }"
                  >
                    <option value="На рассмотрении" class="considiration-box"
                      >На рассмотрении</option
                    >
                    <option class="inwork-box" value="В работе"
                      >В работе</option
                    >
                    <option class="rejected-box" value="Отклонено"
                      >Отклонено</option
                    >
                    <option class="completed-box" value="Завершено"
                      >Завершено</option
                    >
                  </select>
                </div>
              </td>
              <td>{{ request.user_id }}</td>
              <td>{{ request.department_id }}</td>
              <td>
                {{ request.executor_id }}
              </td>
              <td>
                <div v-for="(device, index) in request.content" :key="index">
                  {{ device.name }} (#{{ device.device_id }})
                </div>
              </td>
              <td>{{ request.comment }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div
      class="modal-wrap"
      v-if="choose_user"
      @click.self="closeModal()"
      tabindex="0"
    >
      <div class="outer">
        <div class="relative">
          <h2>Выберите исполнителя</h2>
          <button class="deleteBtn" @click="closeModal()">
            &times;
          </button>
          <div class="inner">
            <div class="loading-box" v-if="executorsLoading">
              <Loading></Loading>
            </div>
            <div v-if="!executorsLoading">
              <div
                class="executor-radio-point"
                v-for="(executor, index) in executors"
                :key="index"
              >
                <input
                  type="radio"
                  :value="executor.user_id"
                  :id="'executor' + executor.user_id"
                  name="executor"
                  v-model="executorid"
                /><label :for="'executor' + executor.user_id">
                  {{ executor.fio }} (#{{ executor.user_id }})</label
                >
              </div>
              <div class="modal-btn-wrap">
                <button
                  class="btn-primary"
                  @click="sendExecutor()"
                  :disabled="executorid === -1"
                >
                  Прикрепить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Sidepanel from "@/components/Sidepanel.vue";
import moment from "moment";
import Loading from "@/components/Loading.vue";

export default {
  name: "ToAttach",
  components: {
    Sidepanel,
    Loading,
  },
  data() {
    return {
      requests_considiration: [],
      requests_reviewed: [],
      executors: [],
      choose_user: false,
      executorsLoading: false,
      executorid: -1,
      requestid: -1,
      loading: false,
    };
  },
  methods: {
    closeModal() {
      this.choose_user = false;
    },
    chooseExecutor(requestid) {
      this.requestid = requestid;
      this.choose_user = true;
      this.executorid = -1;
      this.executorsLoading = true;
      this.executors = [];
      axios.get("http://localhost:8080/api/executors").then(
        (res) => {
          res.data.forEach((el) => {
            this.executors.push(el);
          });
          this.executorsLoading = false;
        },
        (err) => {
          console.log("Main. Error: ", err);
        }
      );
    },
    sendExecutor() {
      console.log(this.requestid);
      console.log(this.executorid);
      this.executorsLoading = true;
      axios
        .put(
          "http://localhost:8080/api/requests/" +
            this.requestid +
            "?executor=true",
          {
            executor_id: this.executorid,
          }
        )
        .then(
          (res) => {
            console.log(res);
            let reqIndex = this.requests_considiration.findIndex((el) => {
              return el.request_id === this.requestid;
            });
            this.requests_considiration[reqIndex].status = "В работе";
            this.requests_considiration[reqIndex].executor_id = this.executorid;
            this.requests_reviewed.push(this.requests_considiration[reqIndex]);
            this.requests_considiration.splice(reqIndex, 1);
            this.executorsLoading = false;
            this.choose_user = false;
            this.sortReviewed();
          },
          (err) => {
            console.log("Main. Error: ", err);
          }
        );
    },
    changeStatus(requestId, index) {
      console.log(requestId, index);
      let request = this.requests_reviewed.find((el) => {
        return el.request_id === requestId;
      });
      console.log(request);
      axios
        .put(
          "http://localhost:8080/api/requests/" + requestId + "?status=true",
          {
            status: request.status,
          }
        )
        .then(
          (res) => {
            console.log(res);
            this.executorsLoading = false;
          },
          (err) => {
            console.log("Main. Error: ", err);
          }
        );
      this.sortReviewed();
    },
    dateformat(date) {
      moment.locale("ru");
      return moment(date).format("lll");
    },
    sortReviewed() {
      this.requests_reviewed.sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        return 0;
      });
      this.requests_reviewed.sort((a, b) => {
        if (a.status > b.status) {
          return 1;
        }
        if (a.status < b.status) {
          return -1;
        }
        return 0;
      });
    },
  },
  async mounted() {
    this.loading = true;
    axios.get("http://localhost:8080/api/requests").then(
      (res) => {
        res.data.forEach((el) => {
          if (el.status === "На рассмотрении") {
            this.requests_considiration.push(el);
          } else {
            this.requests_reviewed.push(el);
          }
        });
        this.sortReviewed();
        this.loading = false;
      },
      (err) => {
        console.log("Main. Error: ", err);
        this.loading = false;
      }
    );
  },
};
</script>

<style scoped>
.attached-wrap {
  width: 94%;
  margin: 0 auto;
}
.executor-radio-point input[type="radio"] {
  display: none;
}
.executor-radio-point input[type="radio"] + label {
  padding: 1rem;
  display: block;
  cursor: pointer;
  transition: 0.1s ease-in-out;
}
.executor-radio-point input[type="radio"] + label:hover {
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
}
.executor-radio-point input[type="radio"]:checked + label {
  background-color: rgba(0, 0, 255, 0.2);
  font-weight: bold;
}
.executor-radio-point input[type="radio"]:checked:hover + label {
  background-color: rgba(0, 50, 255, 0.5);
}
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 1;
  height: 100px;
}
table th {
  position: sticky;
  top: 0;
}
</style>
