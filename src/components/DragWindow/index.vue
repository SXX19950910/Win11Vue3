<template>
  <div class="drag-window rounded-[10px] overflow-hidden absolute" :style="style" @mousedown.stop="onmousedown" @contextmenu.prevent.stop>
    <slot />
  </div>
</template>

<script setup>
import { on, off } from '@/utils/dom'
import { computed, reactive } from 'vue'

const style = computed(() => {
  return {
    width: `1000px`,
    left: `${state.left}px`
  }
})

const state = reactive({
  left: 0,
  downX: 0
})

const onmousemove = (e) => {
  const left = e.clientX - state.downX
  state.left = left
}

const onmouseup = () => {
  console.log('松开了')
  off(document, 'mousemove', onmousemove)
  off(document, 'mouseup', onmouseup)
}

const onmousedown = (e) => {
  state.downX = e.clientX
  on(document, 'mousemove', onmousemove)
  on(document,'mouseup', onmouseup)
}

</script>

<style lang="less">

</style>