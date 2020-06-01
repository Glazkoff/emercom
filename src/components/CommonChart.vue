<template>
  <div>
    <div class="loading-box" v-if="isLoading">
      <Loading></Loading>
    </div>
    <div v-else>
      <h4>Всего заявок: {{ sumData }}</h4>
      <h5 v-for="(data, index) in commonChartData" :key="index">
        <span style="font-weight: normal">{{ data.status }}</span
        >: {{ data.count }}
      </h5>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import axios from "axios";
export default {
  name: "CommonChart",
  data() {
    return {
      sumData: 0,
      commonChartData: [],
      isLoading: false,
    };
  },
  components: {
    Loading,
  },
  mounted() {
    this.isLoading = true;
    axios.get(process.env.VUE_APP_API_URL + "/charts/common").then(
      (res) => {
        this.commonChartData = res.data;
        this.sumData = 0;
        res.data.forEach((element) => {
          this.sumData += element.count;
        });
        this.isLoading = false;
      },
      (err) => {
        console.log("Main. Error: ", err);
        this.isLoading = false;
      }
    );
  },
};
</script>

<style scoped></style>
