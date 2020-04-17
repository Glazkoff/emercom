<template>
    <div class="alerts-wrapper" id="main-alert-panel">
        <h2 class="alerts-title">Общие оповещения</h2>
        <AlertBox v-for="alert in alerts" :key="alert.id" :alert="alert"></AlertBox>
    </div>
</template>

<script>
import AlertBox from '@/components/AlertBox.vue'
export default {
  name: 'MainAlert',
  components: {
    AlertBox
  },
  data () {
    return {
      alerts: [{
        id: 1,
        date: '2020-02-10',
        title: 'Название',
        text: 'Текст, текст. Текст, текст. Текст, текст. Текст, текст. Текст, текст. Текст, текст. Текст, текст. Текст, текст. Текст, текст.'
      }]
    }
  }
}
</script>

<style>
.alerts-wrapper {
  display: flex;
  flex-direction: column;
  /* margin: 0 auto; */
}
.alerts-title {
  margin-left: 20px;
}
</style>
