<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="attached-wrap">
        <h3>К вам прикреплены следующие заявки:</h3>
        <div class="requests-list">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
import axios from "axios";
export default {
  name: "Attached",
  components: {
    Sidepanel,
  },
  data() {
    return {
      requests: [],
    };
  },
  async mounted() {
    axios.get("http://localhost:8080/api/requests?attached=true").then(
      (res) => {
        res.data.forEach((el) => {
          this.requests.push(el);
        });
      },
      (err) => {
        console.log("Main. Error: ", err);
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
.requests-list table {
  border-collapse: collapse;
}
.requests-list td,
th {
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
