import { defineStore } from "pinia";

interface AppState {
  count: number;
  list: Array<number>;
  name: string;
  age: number;
}

export const useAppStore = defineStore("app", {
  state: (): AppState => {
    return {
      count: 0,
      list: [],
      name: "",
      age: 0,
    };
  },
  actions: {
    plusCount(step: number) {
      this.count += step;
    },
    minusCount(step: number) {
      this.count -= step;
    },
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
});
