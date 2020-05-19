<template>
  <div id="admin-panel-wrap">
    <div id="admin-panel" v-if="isAdmin">
      <h5>Админпанель</h5>
      <router-link to="/">Main</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <button
      class="admin-panel-btn"
      @click="hideAdminPanel()"
      :class="{ 'btn-bg-show': !isAdmin }"
    >
      <span v-if="isAdmin">Свернуть</span>
      <span v-else>Развернуть</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AdminPanel",
  data() {
    return {
      isAdmin: false
    };
  },
  methods: {
    // Скрыть административную панель
    hideAdminPanel() {
      this.isAdmin = !this.isAdmin;
    }
  }
};
</script>
<style scoped>
#admin-panel {
  height: 30px;
  width: 100vw;
  background-color: #b8b8b8;
  font-family: "Montserrat Regular";
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  z-index: 9999;
}
#admin-panel * {
  display: block;
  max-height: 30px;
  margin: 5px 10px;
  margin-right: 15px;
}
.admin-panel-btn {
  background-color: transparent;
  border: 1px solid #000;
  width: 100px;
  position: absolute;
  top: 0;
  right: 0;
  height: 24px;
  margin-top: 3px;
  margin-right: 1rem;
  box-sizing: border-box;
  z-index: 10000;
  cursor: pointer;
  opacity: 0;
  transition: 0.1s ease-out;
}
.admin-panel-btn:hover {
  opacity: 1;
}
.btn-bg-show {
  background-color: #c4c4c4;
}
</style>
