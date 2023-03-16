<template>
  <div id="windows" class="h-full flex flex-col justify-between" @click="handleClick" @mousedown="onmousedown">
    <div class="windows__content h-full relative py-2" >
      <apps />
      <context-modal />
    </div>
    <bottom-handle />
  </div>
</template>

<script setup>
import { usePanelStore } from '@/store/panel'
import ContextModal from '@/widgets/ContextModal/index.vue'
import Apps from '@/widgets/Apps/index.vue'
import BottomHandle from '@/components/BottomHandle/index.vue'

const panel = usePanelStore()


const handleClick = () => {
  panel.closeAllPanel()
}

const onmousedown = () => {
  // const isRightBtn = e.button === 2
  panel.closeAllPanel()
}

</script>

<style lang="less">
@import '@/styles/init.less';
@import '@/styles/transition.css';
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
