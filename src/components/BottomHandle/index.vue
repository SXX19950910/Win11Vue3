<template>
  <div class="bottom-handle border-t flex justify-between items-center px-2 py-1">
    <div class="bottom-handle__bg"></div>
    <weather class="z-10 relative" />
    <mission-board class="z-10" />
    <setting-board class="z-10" />
  </div>
</template>

<script>
import Weather from '@/widgets/Weather/index.vue'
import MissionBoard from '@/widgets/MissionBoard/index.vue'
import SettingBoard from '@/widgets/SettingBoard/index.vue'
export default {
  name: 'BottomHandle',
  components: {
    Weather,
    MissionBoard,
    SettingBoard
  },
  data() {
    return {}
  }
}
</script>

<style lang="less">
.bottom-handle {
  width: 100%;
  height: 48px;
  position: relative;
  box-sizing: border-box;
  &__bg {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    height: 48px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
  }
}
</style>
