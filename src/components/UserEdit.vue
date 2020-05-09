<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="users-wrap">
        <h3>Пользователи</h3>
        <div class="input-form">
          <button>Добавить пользователя</button>
        </div>
        <h3>Редактирование существующих пользователей</h3>
        <small>Нажмите, чтобы отредактировать</small>
        <div class="users-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>ФИО</th>
                <th>Уровень доступа</th>
                <th>Номер отдела</th>
                <th>Логин</th>
                <th>Пароль</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, index) in users"
                :key="index"
                @click="toEditUser(index)"
              >
                <td>{{ user.user_id }}</td>
                <td>{{ user.fio }}</td>
                <td>{{ user.role }}</td>
                <td>{{ user.department_id }}</td>
                <td>{{ user.login }}</td>
                <td>***</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      class="modal-wrap"
      v-if="user_modal"
      @click.self="closeModal()"
      tabindex="0"
    >
      <div class="outer">
        <div class="relative">
          <button class="deleteBtn" @click="closeModal()">
            &times;
          </button>
          <div class="inner">
            <div class="loading-box" v-if="userLoading">
              <Loading></Loading>
            </div>
            <div>
              <h2>Редактирование пользователя</h2>
              <div class="input-form">
                <label for="editUser.user_id">ID</label>
                <input
                  type="text"
                  id="editUser.user_id"
                  placeholder="ID"
                  disabled
                  v-model="editUser.user_id"
                />
              </div>
              <div class="input-form">
                <label for="editUser.fio">ФИО</label>
                <input
                  type="text"
                  id="editUser.fio"
                  placeholder="Фамилия Имя Отчество"
                  v-model="editUser.fio"
                />
              </div>
              <div class="input-form">
                <label for="editUser.role">Уровень доступа</label>
                <input
                  type="text"
                  id="editUser.role"
                  placeholder="Роль"
                  v-model="editUser.role"
                />
              </div>
              <div class="input-form">
                <label for="editUser.department_id">Номер отдела</label>
                <input
                  type="text"
                  id="editUser.department_id"
                  placeholder="Номер отдела"
                  v-model="editUser.department_id"
                />
              </div>
              <div class="input-form">
                <label for="editUser.login">Логин</label>
                <input
                  type="text"
                  id="editUser.login"
                  placeholder="Логин"
                  v-model="editUser.login"
                />
              </div>
              <div class="input-form">
                <label for="editUser.password">Пароль</label>
                <input
                  type="text"
                  id="editUser.password"
                  placeholder="Пароль"
                  v-model="editUser.password"
                />
              </div>
              <div class="modal-btn-wrap ">
                <button class="btn-primary">Изменить</button>
              </div>
              <div class="modal-btn-wrap">
                <button>Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidepanel from "@/components/Sidepanel.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";
export default {
  name: "UserEdit",
  components: {
    Sidepanel,
    Loading,
  },
  data() {
    return {
      users: [],
      user_modal: false,
      userLoading: false,
      editUser: {
        user_id: -1,
        fio: "",
        role: "",
        login: "",
        password: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.user_modal = false;
    },
    toEditUser(index) {
      this.user_modal = true;
      this.editUser.user_id = this.users[index].user_id;
      this.editUser.fio = this.users[index].fio;
      this.editUser.role = this.users[index].role;
      this.editUser.department_id = this.users[index].department_id;
      this.editUser.login = this.users[index].login;
      this.editUser.password = this.users[index].password;
      console.log(index);
    },
  },
  async mounted() {
    let block = document.querySelector(".nav-wrapper");
    block.scrollTop = block.scrollHeight;
    axios.get("http://localhost:8080/api/users").then(
      (res) => {
        res.data.forEach((el) => {
          this.users.push(el);
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
.users-wrap {
  width: 94%;
  margin: 0 auto;
}
.row-wrap {
  display: table-row-group;
}
tr:hover td {
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
}
h3 + .input-form button {
  width: 100%;
}
.input-form input[type="text"],
.input-form textarea {
  width: 90%;
}
</style>
