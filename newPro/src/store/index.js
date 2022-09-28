// https://next.vuex.vuejs.org/zh/

import { createStore } from "vuex";
import getters from "./getters";
import test from "./modules/test";

export default createStore({
  getters,
  modules:{test},
  
});
