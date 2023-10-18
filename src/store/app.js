import { defineStore } from 'pinia'
import { sleep } from '@/utils'
// import edgeImg from '@/assets/images/app/edge.png'

export const useAppStore = defineStore('app', {
    state() {
        return {
            edge: {
                visible: false,
                mini: false,
                icon: ''
            },
            currentTask: {
                id: ''
            },
            loading: false,
            taskList: []
        }
    },
    actions: {
        async open(appName) {
            this.loading = true
            await sleep(600)
            this[appName].visible = true
            this.loading = false

            const task = {
                id: appName,
                icon: this[appName].icon,
                isReady: false
            }
            const isRunning = this.taskList.find(item => item.id === task.id)
            if (!isRunning) {
                this.taskList.push(task)
            }
        },
        close(appName) {
            const index = this.taskList.findIndex(item => item.id === appName)
            this[appName].visible = false
            this.taskList.splice(index, 1)
            this.focusTask(false)
        },
        toggleMini(appName) {
            this[appName].mini = !this[appName].mini
        },
        opened({ id }) {
            this.taskList.forEach(item => {
                if (item.id === id) {
                    item.isReady = true
                }
            })
        },
        focusTask(appName) {
            if (!appName || appName === this.currentTask.id) {
                this.currentTask = { id: '' }
            } else {
                this.currentTask = {
                    id: appName,
                    ...JSON.parse(JSON.stringify(this[appName]))
                }
            }
        }
    }
})