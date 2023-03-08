<template>
  <div id="windows" class="h-full flex flex-col justify-between" @click="handleClick">
    <div class="windows__content h-full" >
      <context-modal />
    </div>
    <bottom-handle />
  </div>
</template>

<script setup>
import { usePanelStore } from '@/store/panel'
import ContextModal from '@/widgets/ContextModal/index.vue'
import BottomHandle from '@/components/BottomHandle/index.vue'

const panel = usePanelStore()


const closeAllPanel = () => {
  panel.weatherVisible = false
  panel.calendarVisible = false
  panel.startMenuVisible = false
  panel.contextVisible = false
}

const handleClick = () => {
  closeAllPanel()
}
</script>

<style lang="less">
@import '@/styles/init.less';
#app {
  background-color: @primary-color;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/images/win11.jpg');
  overflow: hidden;
  background-position: center;
  background-size: cover;
  user-select: none;
  #windows {
    &__content {
    }
  }
}
</style>
