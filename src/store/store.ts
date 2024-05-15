import PostModule from './modules/Posts/store'
import { mainState, State } from './state'

export default class MainStore {
  constructor() {
    this.strict = false
    this.state = mainState

    this.modules = {
      PostModule: PostModule
    }
  }

  strict!: boolean
  modules: any
  state!: State
  mutations: any
  actions: any
  getters: any
}
