const getters = {
  //从modules里面的test.js读取count,页面上面获取getters的数据：store.getters.count
  count: status => status.test.count,
};
export default getters;
