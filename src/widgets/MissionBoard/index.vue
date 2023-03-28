<template>
  <div class="mission-board flex items-center justify-center w-full h-[40px]">
    <start-menu />
    <task-list />
  </div>
</template>

<script>
import StartMenu from '@/components/StartMenu/index.vue'
import TaskList from '@/components/TaskList/index.vue'
export default {
  name: 'MissionBoard',
  components: {
    StartMenu,
    TaskList
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
.mission-board {
  //
}
</style>
