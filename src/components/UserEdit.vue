<template>
  <div class="main-screen" @keydown.esc="closeModal()">
    <Sidepanel></Sidepanel>
    <div class="main-panel">
      <div class="loading-box" v-if="loading">
        <Loading></Loading>
      </div>
      <div class="users-wrap" v-else>
        <h3>Пользователи</h3>
        <div class="input-form">
          <button @click="addUser()">Добавить пользователя</button>
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
                <td>
                  <div v-if="user.role === 'admin'">Администратор</div>
                  <div v-if="user.role === 'employee'">Сотрудник IT-отдела</div>
                  <div v-if="user.role === 'responsible'">
                    Ответственный за ТО в отделе
                  </div>
                </td>
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
          <h2 v-if="modalMode === 'addition'">Добавление пользователя</h2>
          <h2 v-else>Редактирование пользователя</h2>
          <div class="inner">
            <div class="loading-box" v-if="userLoading">
              <Loading></Loading>
            </div>
            <div
              class="loading-box"
              v-else-if="userSuccess && modalMode === 'edition'"
            >
              <h4>Успешно изменён пользователь (#{{ editUser.user_id }})</h4>
            </div>
            <div
              class="loading-box"
              v-else-if="userError && modalMode === 'edition'"
            >
              <h4>
                Ошибка при изменении пользователя (#{{ editUser.user_id }})
              </h4>
            </div>
            <div
              class="loading-box"
              v-else-if="userSuccess && modalMode === 'addition'"
            >
              <h4>Успешно добавлен пользователь</h4>
            </div>
            <div
              class="loading-box"
              v-else-if="userError && modalMode === 'addition'"
            >
              <h4>
                Ошибка при добавлении пользователя
              </h4>
            </div>
            <div v-else>
              <div class="input-form" v-if="modalMode !== 'addition'">
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
                <select
                  name="editUser.role"
                  id="editUser.role"
                  placeholder="Роль"
                  v-model="editUser.role"
                >
                  <option value="admin">
                    Администратор
                  </option>
                  <option value="employee">
                    Сотрудник IT-отдела
                  </option>
                  <option value="responsible">
                    Ответственный за ТО в отделе
                  </option>
                </select>
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
                  type="password"
                  id="editUser.password"
                  placeholder="Напишите новый пароль"
                  v-model="editUser.password"
                />
              </div>
              <div class="modal-btn-wrap " v-if="modalMode !== 'addition'">
                <button class="btn-primary" @click="sendEditUser()">
                  Изменить
                </button>
              </div>
              <div class="modal-btn-wrap" v-if="modalMode !== 'addition'">
                <button @click="deleteUser()">Удалить</button>
              </div>
              <div class="modal-btn-wrap " v-if="modalMode === 'addition'">
                <button class="btn-primary" @click="sendNewUser()">
                  Сохранить
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
      loading: false,
      user_modal: false,
      userLoading: false,
      userSuccess: false,
      userError: false,
      editUser: {
        user_id: -1,
        department_id: -1,
        fio: "",
        role: "responsible",
        login: "",
        password: "",
      },
    };
  },
  methods: {
    // Закрыть модальное окно
    closeModal() {
      this.user_modal = false;
    },
    // Открыть модальное окно и вывести данные о пользователе в форму
    toEditUser(index) {
      this.userError = false;
      this.userSuccess = false;
      this.user_modal = true;
      this.modalMode = "edition";
      this.editUser.user_id = this.users[index].user_id;
      this.editUser.fio = this.users[index].fio;
      this.editUser.role = this.users[index].role;
      this.editUser.department_id = this.users[index].department_id;
      this.editUser.login = this.users[index].login;
      this.editUser.password = "";
      console.log(index);
    },
    // Изменить запись в базе данных о пользователе
    sendEditUser() {
      this.userLoading = true;
      let urlPath = "http://localhost:8080/api/users/" + this.editUser.user_id;
      let sendUser = {
        fio: this.editUser.fio,
        role: this.editUser.role,
        login: this.editUser.login,
        department_id: this.editUser.department_id,
      };
      if (this.editUser.password) {
        urlPath += "?changepassword=true";
        sendUser.password = this.editUser.password;
      }
      axios.put(urlPath, sendUser).then(
        (res) => {
          console.log(res);
          this.userLoading = false;
          this.userSuccess = true;
        },
        (err) => {
          this.userLoading = false;
          console.log("Main. Error: ", err);
          this.userError = true;
        }
      );
      this.getUsers();
    },
    // Открыть модальное окно "Добавить пользователя"
    addUser() {
      this.userLoading = false;
      this.userSuccess = false;
      this.userError = false;
      this.user_modal = true;
      this.modalMode = "addition";
      this.editUser = {
        user_id: -1,
        department_id: 0,
        fio: "",
        role: "responsible",
        login: "",
        password: "",
      };
    },
    // Удалить пользователя
    deleteUser() {
      this.userLoading = true;
      let urlPath = "http://localhost:8080/api/users/" + this.editUser.user_id;
      axios.delete(urlPath).then(
        (res) => {
          console.log(res);
          this.userLoading = false;
          this.userSuccess = true;
          this.getUsers();
        },
        (err) => {
          this.userLoading = false;
          console.log("Main. Error: ", err);
          this.userError = true;
        }
      );
    },
    // Добавить запись о новом пользователе в базе данных
    sendNewUser() {
      let sendUser = {
        fio: this.editUser.fio,
        role: this.editUser.role,
        login: this.editUser.login,
        password: this.editUser.password,
        department_id: this.editUser.department_id,
      };
      axios.post("http://localhost:8080/api/register", sendUser).then(
        (res) => {
          console.log(res);
          this.userLoading = false;
          this.userSuccess = true;
          this.getUsers();
        },
        (err) => {
          this.userLoading = false;
          console.log("Main. Error: ", err);
          this.userError = true;
        }
      );
    },
    // Загрузить список пользователей
    getUsers() {
      this.loading = true;
      this.users = [];
      axios.get("http://localhost:8080/api/users").then(
        (res) => {
          res.data.forEach((el) => {
            this.users.push(el);
          });
          this.loading = false;
        },
        (err) => {
          console.log("Main. Error: ", err);
          this.loading = false;
        }
      );
    },
  },
  // При рендере компонента в браузере загрузить список пользователей
  async mounted() {
    let block = document.querySelector(".nav-wrapper");
    block.scrollTop = block.scrollHeight;
    this.getUsers();
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
.input-form input[type="password"],
.input-form textarea {
  width: 90%;
}
.inner h4 {
  display: block;
  height: 100px;
  margin: auto auto;
  font-weight: normal;
  font-size: 1.2rem;
  width: 50%;
}
.inner .loading-box {
  height: 100%;
}
table {
  width: 100%;
  text-align: center;
}
</style>
