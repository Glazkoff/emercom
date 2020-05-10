<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="loading-box" v-if="loading">
        <Loading></Loading>
      </div>
      <div class="attached-wrap" v-else>
        <h3>К вам прикреплены следующие заявки:</h3>
        <!-- <div class="requests-list">
          <table>
            <tr>
              <th>ID #</th>
              <th>Дата и время</th>
              <th>Статус</th>
              <th>ID автора</th>
              <th>ID отдела</th>
              <th>Контент</th>
              <th>Общий комментарий</th>
            </tr>
            <tr v-for="(request, index) in requests" :key="index">
              <td>{{ request.request_id }}</td>
              <td>{{ request.timestamp }}</td>
              <td>{{ request.status }}</td>
              <td>{{ request.user_id }}</td>
              <td>{{ request.department_id }}</td>
              <td>{{ request.content }}</td>
              <td>{{ request.comment }}</td>
            </tr>
          </table>
        </div> -->
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
              v-for="(request, index) in requests"
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
                    <option value="На рассмотрении">На рассмотрении</option>
                    <option value="В работе">В работе</option>
                    <option value="Отклонено">Отклонено</option>
                    <option value="Завершено">Завершено</option>
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
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";
import moment from "moment";
export default {
  name: "Attached",
  components: {
    Sidepanel,
    Loading,
  },
  data() {
    return {
      requests: [],
      loading: false,
    };
  },
  methods: {
    dateformat(date) {
      moment.locale("ru");
      return moment(date).format("lll");
    },
    changeStatus(requestId, index) {
      console.log(requestId, index);
      let request = this.requests.find((el) => {
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
    },
  },
  async mounted() {
    this.loading = true;
    axios.get("http://localhost:8080/api/requests?attached=true").then(
      (res) => {
        res.data.forEach((el) => {
          this.requests.push(el);
        });
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
.main-panel {
  display: flex;
}
.attached-wrap {
  width: 94%;
  margin: 0 auto;
}
.requests-list {
  width: 100%;
  overflow-x: auto;
}
</style>
