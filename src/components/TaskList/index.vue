<template>
  <div class="task-list flex items-center">
    <div v-for="item in app.taskList" :key="item.id" class="item rounded flex items-center justify-center ml-2 relative" :class="{ 'active': app.currentTask.id === item.id }" @click.stop="handleToggleTask(item)">
      <img class="w-[25px] h-[25px] icon" :src="item.icon" alt="" />
      <div class="flag" />
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store'

const app = useAppStore()

const handleToggleTask = (item) => {
  app.currentTask.id === item.id ? app.focusTask(false) : app.focusTask(item.id)
  app.toggleMini(item.id)
}
</script>

<style lang="less">
.task-list {
  .item {
    width: 39px;
    height: 39px;
    display: none;
    top: 100px;
    animation: bounceIn 0.2s ease forwards;
    animation-delay: 0.1s;
    overflow: hidden;
    @keyframes bounceIn {
      from {
        display: none;
        top: 100px;
      }
      to {
        display: block;
        top: 0;
      }
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
    .icon {
      position: relative;
      top: 25px;
      animation: tada 0.4s linear forwards;
      animation-delay: 0.2s;
      @keyframes tada {
        0% {
          top: 25px;
        }
        50% {
          top: -2px;
        }
        100% {
          top: 0;
        }
      }
    }
    .flag {
      height: 3px;
      width: 7px;
      background-color: #777B85;
      position: absolute;
      bottom: 0;
      border-radius: 6px;
      transition: width ease 0.2s;
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.6);
      .flag {
        width: 0;
        background-color: #0078D4;
        animation: grow linear 0.2s forwards;
        animation-delay: 0.4s;
        @keyframes grow {
          from {
            width: 0;
          }
          to {
            width: 16px;
          }
        }
      }
    }
  }
}
</style>