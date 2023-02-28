<template>
  <div class="setting-board">
    <time-control />
  </div>
</template>

<script>
import TimeControl from '@/components/TimeControl/index.vue'
export default {
  name: 'SettingBoard',
  components: {
    TimeControl
  },
  data() {
    return {}
  }
}
</script>

<style lang="less">
.setting-board {
}
</style>
