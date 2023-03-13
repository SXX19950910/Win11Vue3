<template>
  <div class="sort-menu absolute w-full" :style="style">
    <transition name="slide-down">
      <div v-if="panel.sortMenuVisible" class="sort-menu__content" :style="contentStyle">
        <div class="item">名称</div>
        <div class="item">大小</div>
        <div class="item">项目类型</div>
        <div class="item">修改日期</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePanelStore } from '@/store/panel'

const panel = usePanelStore()
const props = defineProps({
  left: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  },
  right: {
    type: Number,
    default: 0
  }
})

const style = computed(() => {
  return {
    top: props.top + 'px',
    left: props.left ? (props.left + 'px') : 'unset',
    right: props.right ? (props.right + 'px') : 'unset',
    display: panel.sortMenuVisible ? 'block' : 'none'
  }
})

const contentStyle = computed(() => {
  if (props.left) {
    return {
      left: '15px'
    }
  } else {
    return {
      right: '10px'
    }
  }
})
</script>

<style lang="less">
.sort-menu {
  height: 250px;
  overflow: hidden;
  z-index: 100;
  &__content {
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
    border: 1px solid #CDD4D9;
    padding: 6px;
    position: absolute;
    top: 15px;
    .item {
      display: flex;
      align-items: center;
      height: 28px;
      margin-bottom: 4px;
      font-size: 14px;
      border-radius: 4px;
      padding: 0 10px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
}
</style>