import { history } from "../setup";


export default class NavigationListener {

    constructor(store) {
        this.store = store
        this.prevLocation = window.location.href

        this.onStateChange = () => {
            if (this.store.getState().navigation) {
                const currentLocation = this.store.getState().navigation.location
                if (currentLocation && currentLocation !== this.prevLocation) {
                    this.prevLocation = currentLocation
                    // window.location.href = currentLocation
                    history.push(currentLocation)
                }
            }
        }

    }
}