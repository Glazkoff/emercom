<template>
  <div class="centered-wrapper" id="entrance">
    <div class="logo">
      <div class="logo-img"></div>
      <h1 class="logo-title">Система заявок<br />в IT-отдел</h1>
    </div>
    <div class="form-wrapper rounded-corners">
      <h2 class="form-title">Войти в электронную<br />систему заявок</h2>
      <form action="POST" @submit.prevent>
        <label for="login"
          >Логин<br />
          <input
            type="text"
            name="login"
            id="login"
            @input="errorMessage = ''"
            v-model.trim="$v.login.$model"
            class="rounded-corners "
            :class="{ 'is-invalid': $v.login.$error || this.errorMessage }"
            placeholder="login"
            required
          />
        </label>
        <label for="password"
          >Пароль<br />
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="$v.password.$model"
            @input="errorMessage = ''"
            class="rounded-corners"
            :class="{ 'is-invalid': $v.password.$error || this.errorMessage }"
            placeholder="********"
            required
          />
        </label>
        <label class="invalid-messages" v-if="errorMessage"
          >Неправильный логин или пароль!</label
        >
        <label class="invalid-messages" v-if="$v.login.$error"
          >Логин обязателен!</label
        >
        <label class="invalid-messages" v-if="$v.password.$error"
          >Пароль обязателен!</label
        >
        <button
          id="auth-btn"
          class="rounded-corners"
          @click="tryAuth()"
          :disabled="$v.login.$invalid || $v.password.$invalid"
        >
          Войти
        </button>
      </form>
      <a>Не помню пароль</a>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "InForm",
  data() {
    return {
      login: "",
      password: "",
      errorMessage: "",
    };
  },
  validations: {
    login: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    // Попытка авторизации
    tryAuth() {
      const authData = {
        login: this.login,
        password: this.password,
      };
      try {
        // Возращает promise
        // Если успешно, перенаправляет на путь "/"
        this.$store.dispatch("AUTH_REQUEST", authData).then(
          () => {
            this.$router.push("/");
          },
          (err) => {
            this.errorMessage = err;
          }
        );
      } catch (error) {
        this.errorMessage = error;
      }
    },
  },
};
</script>
<style>
.form-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #adbdd4;
  padding: 1rem;
  padding-top: 2rem;
  margin-bottom: 4rem;
}

.form-wrapper form label {
  margin-bottom: 1rem;
}
.form-wrapper form {
  width: 96%;
}
.form-wrapper form label,
.form-wrapper form button {
  width: 96%;
  border: 0px;
}
.form-wrapper form button {
  padding: 15px;
  background-color: #1e3799;
  color: #fff;
  font-family: "Montserrat Regular";
  font-size: 1rem;
  cursor: pointer;
  transition: 0.1s ease-in-out;
}
.form-wrapper form button:hover {
  background-color: #4a69bd;
}
.form-wrapper form button:active {
  background-color: #3c6382;
}
.form-wrapper form label input {
  width: 100%;
  border: 0px;
  padding: 15px 15px;
  box-sizing: border-box;
  text-align: center;
  font-family: "Montserrat Regular";
  font-size: 1rem;
}
.form-wrapper a {
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
}
.form-wrapper * {
  margin: 0 auto;
}
.form-title {
  margin-bottom: 2rem;
  font-size: 1.2rem;
}
form {
  display: flex;
  flex-direction: column;
}
.rounded-corners {
  border-radius: 8px;
}
.logo {
  font-weight: normal;
  font-size: 0.8rem;
  display: flex;
  margin: 10px 5px;
}
.logo-img {
  height: 60px;
  width: 60px;
  background: url("../assets/logo.svg") no-repeat;
  background-size: contain;
}
.logo-title,
.form-title {
  color: #0c2461;
}
.logo-title {
  margin: 0;
  margin-left: 10px;
}
.is-invalid {
  background-color: #f19d9d;
}
.invalid-messages {
  color: #9c3b63;
}
#auth-btn[disabled] {
  background-color: #7e9cdb;
}
</style>
