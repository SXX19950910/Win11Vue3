import { defineStore } from 'pinia'

export const usePanelStore = defineStore('panel', {
    state() {
        return {
            weatherVisible: false,
            calendarVisible: false,
            startMenuVisible: false,
            contextVisible: false
        }
    },
    actions: {
        setWeatherVisible(visible) {
            this.weatherVisible = visible
        },
        setCalendarVisible(visible) {
            this.calendarVisible = visible
        },
        setStartMenuVisible(visible) {
            this.startMenuVisible = visible
        }
    }
})