export default {
    namespaced: true,
    state: {
        weatherVisible: false
    },
    mutations: {
        setWeatherVisible(state, data) {
            state.weatherVisible = data
        }
    }
}