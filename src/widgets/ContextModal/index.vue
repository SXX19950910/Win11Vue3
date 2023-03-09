<template>
  <div class="context-modal h-full relative" ref="content">
    <transition name="fade">
      <div v-if="panel.contextVisible" class="context-modal__content absolute" :style="{ left: position.left, top: position.top }">
        <div class="border-b border-[#C8D0E7] base-block">
          <div class="item flex items-center justify-between rounded" @mouseenter.stop="onmousemove($event, 'view')">
            <div class="left-info flex items-center pl-2">
              <small-icon class="mr-2.5" />
              <span>查看</span>
            </div>
            <div class="right-arrow pr-2">
              <el-icon>
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="item flex items-center justify-between rounded">
            <div class="left-info flex items-center pl-2">
              <sort-icon class="absolute left-[-5px]" />
              <span class="ml-[10px]">排序方式</span>
            </div>
            <div class="right-arrow pr-2">
              <el-icon>
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="item flex items-center justify-between rounded">
            <div class="left-info flex items-center pl-2">
              <el-icon class="mr-1.5 text-18">
                <RefreshRight />
              </el-icon>
              <span>刷新</span>
            </div>
          </div>
        </div>
        <div class="create-block py-1.5">
          <div class="item mb-0 flex items-center justify-between rounded">
            <div class="left-info flex items-center pl-2">
              <create-icon class="mr-2" />
              <span>新建</span>
            </div>
            <div class="right-arrow pr-2">
              <el-icon>
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <view-menu :left="subMenu.left" :top="subMenu.top" />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed, nextTick } from 'vue'
import SmallIcon from '@/components/icon/small.vue'
import CreateIcon from '@/components/icon/create.vue'
import SortIcon from '@/components/icon/sort.vue'
import { usePanelStore } from '@/store/panel'
import ViewMenu from './view.vue'

const content = ref(null)
const menuHeight = 144
const menuWidth = 240

const state = reactive({
  left: 0,
  top: 0,
  contentHeight: 0,
  contentWidth: 0
})

const subMenu = reactive({
  left: 0,
  top: 0
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

const onmousemove = (e, type) => {
  if (type === 'view') {
    subMenu.left = e.clientX + menuWidth
    subMenu.top = e.clientY
    panel.viewMenuVisible = true
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
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    padding: 6px 6px 0 6px;
    .item {
      font-size: 15px;
      height: 30px;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      .icon.view {
        width: 15px;
      }
      .el-icon {
        color: #6D747E;
      }
    }
  }
}
</style>