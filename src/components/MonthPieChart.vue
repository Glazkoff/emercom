<script>
import { Pie } from "vue-chartjs";
import axios from "axios";

export default {
  name: "MonthPieChart",
  extends: Pie,
  mounted() {
    axios.get("http://localhost:8080/api/charts/month").then(
      (res) => {
        res.data.forEach((element) => {
          switch (element.status) {
            case "В работе":
              this.data.datasets[0].data[2] = element.count;
              break;
            case "Завершено":
              this.data.datasets[0].data[3] = element.count;
              break;
            case "На рассмотрении":
              this.data.datasets[0].data[0] = element.count;
              break;
            case "Отклонено":
              this.data.datasets[0].data[1] = element.count;
              break;
            default:
              break;
          }
        });
        this.renderChart(this.data, this.options);
      },
      (err) => {
        console.log("Main. Error: ", err);
      }
    );
  },
  data() {
    return {
      data: {
        datasets: [
          {
            backgroundColor: ["#e6e2e3", "#ffbebe", "#c2c2ff", "#c2ffc2"],
            data: [],
          },
        ],
        labels: ["На рассмотрении", "Отклонено", "В работе", "Завершено"],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
          display: true,
          text: "Текущий месяц",
        },
      },
    };
  },
};
</script>

<style scoped></style>
