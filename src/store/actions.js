import * as types from './mutations-types'

export default {
  async getMenuTypeTbl({commit, state, dispatch}, axios) {
    commit(types.MAIN_IS_AJAX, true);
    let result = await axios.get('/api/MenuTypeTbl');
    result = JSON.parse(result.data.text);
    dispatch('changeRecommendData', {axios, data: result.result.childs[0].childs})
    commit(types.GET_MENU_TYPE_TBL, result);
    commit(types.MAIN_IS_AJAX, false);
  },
  // 请求对应分类的菜谱列表
  getCorrespondingFood({commit, state}, {axios, ctgId}) {
    commit(types.TOGGLE_IS_HOME, false);
    commit(types.NOW_LIST_IS_AJAX, true);
    let url = `/api/cookbookList?cid=${ctgId}&page=${state.nowFoodList.page}&size=20`;
    axios.get(url)
      .then(res => {
        if (res.status === 200) {
          commit(types.NOW_LIST_IS_AJAX, false);
          let result = JSON.parse(res.data.text).result.list;
          result.forEach(l => {
            l.collection = false;
            state.nowUser.userCollection.forEach(c => {
              if (c.menuId === l.menuId) {
                l.collection = true;
              }
            });
            l.inBasket = false;
            state.foodBasket.data.forEach(c => {
              if (c.menuId === l.menuId) {
                l.inBasket = true;
              }
            });
          });
          commit(types.GET_NOW_FOOD_LIST, {data: result, ctgId});
        }
      })
  },
  // 去往主页，并去往对应分类食谱
  async goHomePage({ commit, dispatch }, {ctgId, axios, bigId}) {
    commit(types.CHANGE_NOW_MENUTYPETBL_BIG, bigId);
    commit(types.TOGGLE_ALL_FOODS, false);
    commit(types.CHANGE_NOW_MENUTYPETBL_SMALL, ctgId);
    commit(types.TOGGLE_IS_HOME, false);
    dispatch('getCorrespondingFood', {ctgId, axios});
  },
  // 请求推荐数据
  changeRecommendData({state, commit}, {axios, data}) {
    commit(types.NOW_LIST_IS_AJAX, true);
    let result = [];
    data.forEach(r => {
      let url = `/api/cookbookList?cid=${r.categoryInfo.ctgId}&page=1&size=10`;
      axios.get(url)
        .then(res => {
          let list = JSON.parse(res.data.text).result.list;
          let index = 0;
          for (let i = 0; i < list.length; i++) {
            if (list[i].thumbnail && index < 2) {
              list[i].collection = false;
              state.nowUser.userCollection.forEach(c => {
                if (c.menuId === list[i].menuId) {
                  list[i].collection = true;
                }
              });
              list[i].inBasket = false;
              state.foodBasket.data.forEach(c => {
                if (c.menuId === list[i].menuId) {
                  list[i].inBasket = true;
                }
              });
              result.push(list[i]);
              index++
            } else if (index >= 2) {
              break;
            }
          }
          commit(types.NOW_LIST_IS_AJAX, false);
          console.log(list)
        })
    });
    commit(types.CHANGE_RECOMMEND_DATA, result)
  },
  // 下拉刷新
  refreshNowFoodList({ state, commit }, {axios}) {
    commit(types.ADD_PAGE);
    let url = `/api/cookbookList?cid=${state.nowFoodList.id}&page=${state.nowFoodList.page}&size=20`;
    return new Promise(resolve => {
      axios.get(url)
        .then(res => {
          if (res.status === 200) {
            let result = JSON.parse(res.data.text).result.list;
            result.forEach(l => {
              l.collection = false;
              state.nowUser.userCollection.forEach(c => {
                if (c.menuId === l.menuId) {
                  l.collection = true;
                }
              });
              l.inBasket = false;
              state.foodBasket.data.forEach(c => {
                if (c.menuId === l.menuId) {
                  l.inBasket = true;
                }
              });
            });
            setTimeout(() => {
              commit(types.GET_NOW_FOOD_LIST, {data: result, ctgId: state.nowFoodList.id});
              resolve();
            }, 1000);
          }
        })
    })
  },
  // 加载更多
  getMoreFood({commit, state}, axios) {
    commit(types.ADD_PAGE);
    let url = `/api/cookbookList?cid=${state.nowFoodList.id}&page=${state.nowFoodList.page}&size=20`;
    return new Promise(resolve => {
      axios.get(url)
        .then(res => {
          let result = JSON.parse(res.data.text).result.list;
          result.forEach(l => {
            l.collection = false;
            state.nowUser.userCollection.forEach(c => {
              if (c.menuId === l.menuId) {
                l.collection = true;
              }
            });
            l.inBasket = false;
            state.foodBasket.data.forEach(c => {
              if (c.menuId === l.menuId) {
                l.inBasket = true;
              }
            });
          });
          setTimeout(() => {
            commit(types.GET_MORE_FOOD, result);
            resolve();
          }, 1000);
        });
    })
  }
}
