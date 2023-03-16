<template>
  <div class="drag-app w-fit p-2" :title="title">
    <div class="drag-app__icon">
      <img :style="iconStyle" :src="props.icon" alt="">
    </div>
    <div class="drag-app__name mt-2">{{ props.name }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  icon: [String, Object],
  iconWidth: [String, Number],
  iconHeight: [String, Number],
  name: String,
  title: String
})

const iconStyle = computed(() => {
  return {
    width: props.iconWidth + 'px',
    height: props.iconHeight + 'px'
  }
})

</script>

<style lang="less">
.drag-app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 4px;
  &__name {
    max-width: 60px;
    text-align: center;
    word-break: break-word;
    color: white;
    font-size: 13px;
    text-shadow: 1px 1px 4px black;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
}
</style>