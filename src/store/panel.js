import { defineStore } from 'pinia'

export const usePanelStore = defineStore('panel', {
    state() {
        return {
            weatherVisible: false,
            calendarVisible: false
        }
    },
    actions: {
        setWeatherVisible(visible) {
            this.weatherVisible = visible
        },
        setCalendarVisible(visible) {
            this.calendarVisible = visible
        }
    }
})