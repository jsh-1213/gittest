const testObj = {
  namespaced: true,
  state: { 
    count: 0,
  },
  mutations: {//自定义改变status初始值的方法
    abc(state,data) {
      state.count +=data;
    },
    def(state,data) {
      state.count -=data;
    },
    
  },
  actions: {//自定义触发mutations里面的方法
    //页面用dispatch的方式就会触发actions的方法,用commit就不触发，直接触发上面的mutations方法
    setCount({ commit },data) {
      commit("abc",data);
    },
    setCount1({ commit },data) {
      commit("def",data);
    },
    
  },
};

export default testObj ;
