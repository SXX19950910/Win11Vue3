<template>
  <div class="weather select-none" @click.stop>
    <weather-panel />
    <div
      class="weather__title flex items-center text-[12px] px-2 py-1 cursor-default"
      @click="handleToggleWeatherPanel"
    >
      <div>
        <img class="w-[26px]" src="../../assets/images/weather.png" alt="weather" />
      </div>
      <div class="ml-2 text-left">
        <span>26°C</span>
        <div class="text-info text-12">阵雨来袭</div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherPanel from '@/widgets/Weather/panel.vue'
export default {
  name: 'WeatherWidget',
  components: {
    WeatherPanel
  },
  data() {
    return {}
  },
  methods: {
    handleToggleWeatherPanel() {
      this.$store.commit('panel/setWeatherVisible', !this.$store.state.panel.weatherVisible)
    }
  }
}
</script>

<style lang="less">
.weather {
  width: 144px;
  height: 100%;
  border-radius: @base-radius;
  background-color: transparent;
  border: 1px solid transparent;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.01);
  }
  &__title {
    height: 100%;
  }
}
</style>
