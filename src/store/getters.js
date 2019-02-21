export default {
  searchViewData(state) {
    if (state.searchView.value.trim().length > 0) {
      let reg = new RegExp(state.searchView.value.trim());
      let reg1 = new RegExp(state.searchView.value.trim().substring(0, 1));
      let foodArr = state.nowFoodList.data.length > state.data.recommendData.length ? state.nowFoodList.data : state.data.recommendData;
      let result1 = foodArr.filter(d => reg.test(d.name));
      let result2 = foodArr.filter(d => reg.test(d.ctgTitles));
      let result3 = foodArr.filter(d => reg.test(d.recipe.ingredients));
      let result4 = foodArr.filter(d => reg.test(d.recipe.methods));
      let result5 = foodArr.filter(d => reg1.test(d.name));
      let result6 = foodArr.filter(d => reg1.test(d.ctgTitles));
      let result7 = foodArr.filter(d => reg1.test(d.recipe.ingredients));
      let result8 = foodArr.filter(d => reg1.test(d.recipe.methods));
      let resultSet = new Set([...result1, ...result2, ...result3, ...result4, ...result5, ...result6, ...result7, ...result8]);
      return [...resultSet];
    }
  }
}
