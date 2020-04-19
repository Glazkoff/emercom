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
            v-model="login"
            class="rounded-corners"
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
            v-model="password"
            class="rounded-corners"
            placeholder="********"
            required
          />
        </label>
        <button class="rounded-corners" @click="tryAuth()">Войти</button>
      </form>
      <a>Не помню пароль</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "InForm",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    tryAuth() {
      const authData = {
        login: this.login,
        password: this.password,
      };
      try {
        this.$store.dispatch("AUTH_REQUEST", authData).then(() => {
          this.$router.push("/");
        });
      } catch (error) {
        console.log(error);
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
  background-color: #8b8b8b;
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
  background-color: #464646;
  color: #fff;
  font-family: "Montserrat Regular";
  font-size: 1rem;
  cursor: pointer;
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
  background: url("../assets/logo.svg");
  background-size: contain;
}
.logo-title {
  margin: 0;
  margin-left: 10px;
}
</style>
