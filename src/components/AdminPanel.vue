<template>
  <div id="admin-panel-wrap">
    <div id="admin-panel" v-if="isAdmin">
      <h5>Админпанель</h5>
      <router-link to="/">Home</router-link>
      <router-link to="/main">Main</router-link>
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
      isAdmin: true,
    };
  },
  methods: {
    hideAdminPanel() {
      this.isAdmin = !this.isAdmin;
    },
  },
};
</script>
<style scoped>
.admin-panel-btn {
  background-color: transparent;
  border: 1px solid #000;
  width: 100px;
  position: absolute;
  top: 0;
  right: 0;
  height: 24px;
  margin-top: 3px;
  margin-right: 10px;
  box-sizing: border-box;
}
.btn-bg-show {
  background-color: #c4c4c4;
}
</style>
