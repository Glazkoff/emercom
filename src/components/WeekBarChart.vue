<script>
import { Bar } from "vue-chartjs";
import axios from "axios";

export default {
  name: "WeekBarChart",
  extends: Bar,
  // mixins: [reactiveProp],
  mounted() {
    axios.get("http://localhost:8080/api/charts/week").then(
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
        labels: ["На рассмотрении", "Отклонено", "В работе", "Завершено"],
        datasets: [
          {
            label: "Текущая неделя",
            backgroundColor: ["#e6e2e3", "#ffbebe", "#c2c2ff", "#c2ffc2"],
            data: [],
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true, // my new default options
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                maxRotation: 90,
                minRotation: 90,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style scoped></style>
