<template>
  <div class="context-modal h-full relative" ref="content">
    <transition name="fade">
      <div v-if="panel.contextVisible" class="context-modal__content absolute" :style="{ left: position.left, top: position.top }"></div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, nextTick } from 'vue'
import { usePanelStore } from '@/store/panel'

const content = ref(null)
const menuHeight = 144
const menuWidth = 240

const state = reactive({
  left: 0,
  top: 0,
  contentHeight: 0,
  contentWidth: 0
})

const panel = usePanelStore()

const position = computed(() => {
  return {
    left: state.left + 'px',
    top: state.top + 'px'
  }
})

const init = () => {
  state.contentHeight = content.value.offsetHeight
  state.contentWidth = content.value.offsetWidth
}

onMounted(() => {
  init()
  oncontextmenu()
})

const oncontextmenu = () => {
  content.value.oncontextmenu = function (e) {
    e.preventDefault()
    const isOverY = (e.clientY + menuHeight) > state.contentHeight
    const isOverX = (e.clientX + menuWidth) > state.contentWidth
    if (isOverY && isOverX) {
      state.top = e.clientY - menuHeight
      state.left = e.clientX - menuWidth
    } else if (!isOverY && isOverX) {
      state.left = e.clientX - menuWidth
      state.top = e.clientY
    } else if (isOverY && !isOverX) {
      state.top = e.clientY - menuHeight
      state.left = e.clientX
    } else {
      state.top = e.clientY
      state.left = e.clientX
    }
    panel.contextVisible = false
    nextTick(() => {
      panel.contextVisible = true
    })
  }
}



</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.14s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.context-modal {
  &__content {
    width: 240px;
    height: 144px;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
}
</style>