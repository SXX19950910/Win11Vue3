<template>
  <transition name="fade">
    <div v-if="panel.contextVisible" class="context-modal__content absolute" ref="inner" :style="{ left: position.left, top: position.top }" @mousedown.stop @click.stop>
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
        <div class="item flex items-center justify-between rounded" @mouseenter.stop="onmousemove($event, 'sort')">
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
  <view-menu :left="subMenu.left" :right="subMenu.right" :top="subMenu.top" />
  <sort-menu :left="subMenu.left" :right="subMenu.right" :top="subMenu.top" />
</template>

<script setup>
import { onMounted, ref, reactive, computed, nextTick } from 'vue'
import { ViewMenuWidth, SortMenuWidth } from '@/enums/menu'
import SmallIcon from '@/components/icon/small.vue'
import CreateIcon from '@/components/icon/create.vue'
import SortIcon from '@/components/icon/sort.vue'
import { usePanelStore } from '@/store/panel'
import ViewMenu from './view.vue'
import SortMenu from './sort.vue'

const inner = ref(null)
const menuHeight = 144
const menuWidth = 240

const state = reactive({
  left: 0,
  top: 0,
  isOverX: false,
  isOverY: false,
  contentHeight: 0,
  contentWidth: 0
})

const dom = reactive({
  content: null,
  inner
})

const subMenu = reactive({
  left: 0,
  top: 0,
  right: 0
})

const panel = usePanelStore()

const position = computed(() => {
  return {
    left: state.left + 'px',
    top: state.top + 'px'
  }
})

const init = () => {
  dom.content = document.querySelector('.windows__content')
  state.contentHeight = dom.content.offsetHeight
  state.contentWidth = dom.content.offsetWidth
}

onMounted(() => {
  init()
  oncontextmenu()
})

const oncontextmenu = () => {
  dom.content.oncontextmenu = function (e) {
    e.preventDefault()
    const isOverY = (e.clientY + menuHeight) > state.contentHeight
    const isOverX = (e.clientX + menuWidth) > state.contentWidth
    state.isOverX = isOverX
    state.isOverY = isOverY
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

const closeAllSubmenu = () => {
  panel.viewMenuVisible = false
  panel.sortMenuVisible = false
}


const onmousemove = (e, type) => {
  const innerOffsetLeft = dom.inner.offsetLeft
  const innerOffsetTop = dom.inner.offsetTop
  const innerOffsetRight = state.contentWidth - innerOffsetLeft
  closeAllSubmenu()
  if (type === 'view') {
    const isOverX = (innerOffsetLeft + menuWidth + ViewMenuWidth) > state.contentWidth
    if (isOverX) {
      subMenu.right = innerOffsetRight - 15
      subMenu.left = 0
    } else {
      subMenu.left = innerOffsetLeft + menuWidth - 20
      subMenu.right = 0
    }
    subMenu.top = innerOffsetTop - 10
    panel.viewMenuVisible = true
  } else if (type === 'sort') {
    const isOverX = (innerOffsetLeft + menuWidth + SortMenuWidth) > state.contentWidth
    if (isOverX) {
      subMenu.right = innerOffsetRight - 15
      subMenu.left = 0
    } else {
      subMenu.left = innerOffsetLeft + menuWidth - 20
      subMenu.right = 0
    }
    subMenu.top = innerOffsetTop + 25
    panel.sortMenuVisible = true
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