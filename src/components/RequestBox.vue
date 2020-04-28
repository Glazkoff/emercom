<template>
  <div class="request-box">
    <h4 class="request-id">Заявка #{{ request.request_id }}</h4>
    <p>
      <small>Дата отправки:</small><br />{{ dateformat(request.timestamp) }}
    </p>
    <!-- <p v-if="this.request.content.length > 0"> -->
    <div class="devices" v-if="this.request.content.length !== 0">
      <div class="device-row">
        <div class="device-name">Название устройства</div>
        <div class="service-type">Тип обслуживания</div>
      </div>
      <div
        class="device-row"
        v-for="(device, index) in this.request.content"
        :key="index"
      >
        <div class="device-name">{{ device.name }}</div>
        <div class="service-type">
          <span
            v-for="(type, index) in filterTypes(device.types)"
            :key="index"
            >{{ type.description }}</span
          >
        </div>
      </div>
    </div>
    <!-- </p> -->
    <div class="btn-wrap" v-if="!inmodal">
      <button class="more-btn" @click="morereq">Подробнее →</button>
    </div>
    <button
      class="deleteBtn"
      @click="delreq()"
      v-if="this.request.status == 'На рассмотрении' && !inmodal"
    >
      &times;
    </button>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "RequestBox",
  data() {
    return {};
  },
  computed: {
    checkedType: () => {},
  },
  methods: {
    dateformat(date) {
      moment.locale("ru");
      return moment(date).format("lll");
    },
    filterTypes(arr) {
      return arr.filter((el) => {
        return el.checked;
      });
    },
    delreq() {
      this.$emit("delete");
    },
    morereq() {
      this.$emit("more", this.request.status, this.request.request_id);
    },
  },
  props: ["request", "inmodal"],
  mounted() {
    // console.log(this.request.content[0].name);
  },
};
</script>

<style scoped>
.request-box {
  border: 1px dashed rgba(114, 114, 114, 0.5);
  box-shadow: 1px 1px 4px rgba(94, 94, 94, 0.2);
  border-radius: 4px;
  padding: 0.8rem;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  position: relative;
}
.request-box h4 {
  margin: 0;
  font-family: "Montserrat Light", sans-serif;
  font-weight: normal;
  font-size: 0.9rem;
}
.request-box p {
  margin: 0;
  font-size: 0.9rem;
}
.device-row {
  display: flex;
}
.device-row:first-child {
  margin-top: 0.5rem;
}
.device-row:not(:last-child) {
  border-bottom: 1px solid rgb(112, 112, 112);
}
.device-row > * {
  padding: 0.5rem;
  font-size: 0.8rem;
  width: 50%;
  max-width: 50%;
  box-sizing: border-box;
}
.device-row > *:not(:last-child) {
  border-right: 1px solid rgb(112, 112, 112);
}
button.deleteBtn {
  width: 1.8rem;
  height: 1.8rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
}
</style>
