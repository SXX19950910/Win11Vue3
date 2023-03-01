<template>
  <div>
    <transition name="slide-in-left">
      <div v-if="weatherVisible" class="weather-panel px-24">
        <div class="text-center py-5">
          <clock-text />
        </div>
        <search-input />
        <div class="mt-2 weather-panel__news flex flex-wrap">
          <div v-for="(item, index) in news" :key="index" class="item cursor-pointer">
            <div class="inner"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { usePanelStore } from '@/store/panel'
import SearchInput from '@/components/Input/index.vue'
import ClockText from '@/components/clock/index.vue'
export default {
  name: 'WeatherPanel',
  components: {
    ClockText,
    SearchInput
  },
  data() {
    return {
      news: [
        {
          name: '大新闻'
        },
        {
          name: '大新闻'
        },
        {
          name: '大新闻'
        },
        {
          name: '大新闻'
        },
        {
          name: '大新闻'
        }
      ]
    }
  },
  computed: {
    ...mapState(usePanelStore, ['weatherVisible'])
  },
  methods: {
    onmousemove() {
      //
    }
  }
}
</script>

<style lang="less">
.slide-in-left-enter-active,
.slide-in-left-leave-active {
  transition: all 0.3s ease;
  left: 15px;
}
.slide-in-left-enter-from,
.slide-in-left-leave-to {
  left: -800px;
}
.weather-panel {
  position: fixed;
  top: 15px;
  height: calc(100vh - 78px);
  width: 760px;
  border-radius: @base-radius;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  &__news {
    height: calc(100% - 120px);
    overflow: auto;
    .item {
      width: 50%;
      min-height: 200px;
      padding: 5px;
      .inner {
        width: 100%;
        height: 100%;
        transition: 0.2s ease all;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: @base-radius;
        background-color: white;
        &:hover {
          box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
</style>
