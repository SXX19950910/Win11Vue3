<template>
  <div class="relative">
    <calendar />
    <el-tooltip :content="currentDate" :show-arrow="false" placement="bottom" effect="light">
      <div class="time-control">
        <div class="time-control__time text-12 text-right mb-1.5">{{ time }}</div>
        <div class="time-control__calendar text-12">{{ date }}</div>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import Calendar from './Calendar.vue'
import { ElTooltip } from 'element-plus'
import moment from 'moment'
export default {
  name: 'TimeControl',
  components: {
    Calendar,
    ElTooltip
  },
  data() {
    return {
      time: moment().format('HH:mm'),
      date: '',
      currentDate: ''
    }
  },
  created() {
    this.initTimer()
  },
  methods: {
    initTimer() {
      this.date = moment().format('YYYY/MM/DD')
      this.currentDate = moment().format('YYYY年MM月DD日')
      setInterval(() => {
        this.time = moment().format('HH:mm')
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.time-control {
  padding: 4px 5px;
  border-radius: 4px;
  background-color: transparent;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
}
</style>