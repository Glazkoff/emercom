<template>
  <div class="alert-box rounded-corners">
    <!-- <div class="alert-date">{{alert.date}}</div>
      <div class="alert-title">{{alert.title}}</div>
      <div class="alert-text">{{alert.text}}</div> -->
  </div>
</template>

<script>
export default {
  name: "AlertBox",
  props: ["alert"],
};
</script>

<style>
.alert-box {
  border: 1px solid #818181;
  width: 90%;
  margin: 0 auto;
  padding: 10px 15px;
  background-color: #c4c4c4;
}
.alert-title {
  font-family: "Montserrat Medium";
  font-size: 1.2rem;
  margin-bottom: 5px;
}
</style>
