import { defineStore } from 'pinia'

export const usePanelStore = defineStore('panel', {
    state() {
        return {
            weatherVisible: false,
            calendarVisible: false,
            startMenuVisible: false,
            contextVisible: false,
            sortMenuVisible: false,
            viewMenuVisible: false
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
        },
        closeAllPanel() {
            this.weatherVisible = false
            this.calendarVisible = false
            this.startMenuVisible = false
            this.contextVisible = false
            this.viewMenuVisible = false
            this.sortMenuVisible = false
        }
    }
})