<template>
  <div id="app">
    <AdminPanel></AdminPanel>
    <router-view />
  </div>
</template>
<script>
import AdminPanel from '@/components/AdminPanel.vue'
export default {
  components: {
    AdminPanel
  }
}
</script>
<style>
@font-face {
  font-family: "Montserrat Regular";
  src: url("assets/Montserrat-Regular.ttf");
}

@font-face {
  font-family: "Montserrat Medium";
  src: url("assets/Montserrat-Medium.ttf");
}

@font-face {
  font-family: "Montserrat Medium";
  src: url("assets/Montserrat-Medium.ttf");
}
@font-face {
  font-family: "Montserrat SemiBoldItalic";
  src: url("assets/Montserrat-SemiBoldItalic.ttf");
}
@font-face {
  font-family: "Montserrat SemiBoldItalic";
  src: url("assets/Montserrat-SemiBoldItalic.ttf");
}
@font-face {
  font-family: "Montserrat Bold";
  src: url("assets/Montserrat-Bold.ttf");
}

body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat Regular";
  overflow: hidden;
}
#admin-panel {
  height: 30px;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  font-family: "Montserrat Regular";
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
}
/* #admin-panel h5 {
    margin-right: 10px;
  } */
#admin-panel * {
  display: block;
  max-height: 30px;
  margin: 5px 10px;
  margin-right: 15px;
}
.split-screen-wrapper {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  max-height: 100vh;
  min-height: calc(100vh - 30px);
}
.split-screen-half {
  background-color: #e5e5e5;
  width: 50vw;
  display: flex;
}
.split-screen-half:nth-child(2) {
  background-color: #a8a8a8;
}
.centered-wrapper {
  margin: auto auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
}
</style>
