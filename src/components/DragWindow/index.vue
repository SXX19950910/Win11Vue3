<template>
  <div class="drag-window overflow-hidden absolute" :class="{ 'is-full': state.isFull, 'transition-none': state.disabledTransition, 'is-mini': props.isMini }" :style="style" @mousedown.stop="onmousedown" @contextmenu.prevent.stop>
    <slot />
  </div>
</template>

<script setup>
import { on, off } from '@/utils/dom'
import { computed, reactive } from 'vue'

const props = defineProps({
  handleClass: {
    type: String,
    default: ''
  },
  isMini: {
    type: Boolean,
    default: false
  }
})

const $emit = defineEmits(['full'])

const style = computed(() => {
  return {
    left: `${state.left}px`,
    top: `${state.top}px`,
    '--drag-win-left': `${-state.left}px`,
    '--drag-win-top': `${-state.top}px`

  }
})

const state = reactive({
  left: 200,
  top: 200,
  downX: 0,
  downY: 0,
  isFull: false,
  isMini: false,
  disabledTransition: false
})

const toggleFullScreen = () => {
  state.isFull = !state.isFull
  $emit('full', state.isFull)
}

const toMini = () => {
  state.isMini = true
}

const onmousemove = (e) => {
  if (state.isFull) {
    toggleFullScreen()
  }
  state.left = e.clientX - state.downX
  state.top = e.clientY - state.downY
}

const onmouseup = () => {
  state.disabledTransition = false
  off(document, 'mousemove', onmousemove)
  off(document, 'mouseup', onmouseup)
}

const onmousedown = (e) => {
  const isHandle = e.target.classList.contains(props.handleClass)
  if (isHandle) {
    if (state.isFull) {
      state.downX = state.left
      state.downY = 0
      state.disabledTransition = true
    } else {
      state.downX = e.clientX - state.left
      state.downY = e.clientY - state.top
    }
    on(document, 'mousemove', onmousemove)
    on(document,'mouseup', onmouseup)
  }
}

defineExpose({
  toggleFullScreen,
  toMini
})

</script>

<style lang="less">
.drag-window {
  width: 70%;
  height: 60%;
  transition-property: width,height,transform,opacity;
  transition-duration: 0.25s;
  transition-timing-function: cubic-bezier(.85,.14,.14,.85);
  --drag-win-left: 0;
  --drag-win-top: 0;
  &.is-full {
    width: 100%;
    height: 100%;
    transform: translate(var(--drag-win-left), var(--drag-win-top));
  }
  &.is-mini {
    transform-origin: bottom;
    opacity: 0;
    transform: scale(0.6);
    pointer-events: none;
  }
}
</style>