import * as types from './mutations-types'

export default {
  [types.GET_MENU_TYPE_TBL] (state, payload) {
    state.data.MenuTypeTbl = payload;
    state.data.nowMenu = payload.result.childs[0].childs;
  },
  [types.CHANGE_RECOMMEND_DATA] (state, data) {
    state.data.recommendData = data;
  },
  [types.GET_NOW_FOOD_LIST] (state, nowList) {
    state.nowFoodList.data = nowList.data;
    state.nowFoodList.id = nowList.ctgId;
  },
  [types.MAIN_IS_AJAX] (state, toggle) {
    state.isAjax = toggle;
  },
  [types.NOW_LIST_IS_AJAX] (state, toggle) {
    state.nowFoodList.isAjax = toggle;
    state.nowFoodList.page = 1;
  },
  [types.GET_MORE_FOOD] (state, moreFood) {
    state.nowFoodList.data.push(...moreFood)
  },
  [types.ADD_PAGE] (state) {
    state.nowFoodList.page = state.nowFoodList.page + 1;
  },
  [types.TOGGLE_ALL_FOODS] (state, toggle) {
    state.toggleAllFoods = toggle;
  },
  [types.GO_HOME_PAGE] (state, index) {
    state.nowMenuTypeTbl.big = index;
    state.toggleAllFoods = false;
    state.nowMenuTypeTbl.small = '0';
    state.nowFoodList.data = [];
  },
  [types.CHANGE_NOW_MENUTYPETBL_SMALL] (state, id) {
    state.nowMenuTypeTbl.small = id;
  },
  [types.CHANGE_NOW_MENUTYPETBL_BIG] (state, id) {
    state.nowMenuTypeTbl.big = id;
  },
  [types.TOGGLE_IS_HOME] (state, toggle) {
    state.isHome = toggle;
  },
  [types.TOGGLE_COLLECTION] (state, {id, toggle}) {
    let nowFood = state.nowFoodList.data.find(n => n.menuId === id) || state.data.recommendData.find(n => n.menuId === id);
    Object.assign(nowFood, {collection: toggle});
    if (toggle) {
      state.nowUser.userCollection.push(nowFood)
    } else {
      let nowCollection = state.nowUser.userCollection.find(c => c.menuId === id);
      let index = state.nowUser.userCollection.indexOf(nowCollection);
      state.nowUser.userCollection.splice(index, 1);
    }
  },
  [types.TOGGLE_BASKET] (state, {id, toggle}) {
    let nowFood = state.nowFoodList.data.find(n => n.menuId === id) || state.data.recommendData.find(n => n.menuId === id);
    Object.assign(nowFood, {inBasket: toggle});
    if (toggle) {
      state.foodBasket.data.push(nowFood)
    } else {
      let nowFoodBasket = state.foodBasket.data.find(c => c.menuId === id);
      let index = state.foodBasket.data.indexOf(nowFoodBasket);
      state.foodBasket.data.splice(index, 1);
    }
  },
  [types.IS_SHOW_BASKET] (state, toggle) {
    state.foodBasket.show = toggle;
  },
  [types.LOGIN] (state, userInfo) {
    let verification = false;
    state.userList.forEach(u => {
      if (u._id === userInfo.userId && u._password === userInfo.password) {
        state.nowUser.userInfo = u;
        state.isLogin = true;
        verification = true;
        // eslint-disable-next-line
        return;
      }
    });
    if (!verification) {
      state.nowUser.verification = verification;
      if (state.nowUser.verTime) {
        clearTimeout(state.nowUser.verTime)
      }
      state.nowUser.verTime = setTimeout(() => {
        state.nowUser.verification = true;
      }, 2000)
    }
  },
  [types.CLEAR_COLLECTION] (state) {
    state.nowUser.userCollection = [];
    state.nowFoodList.data.forEach(n => {
      n.collection = false;
    })
  },
  [types.TOGGLE_FOOD_DESC] (state, {foodDesc, toggle}) {
    state.nowFoodDesc.show = toggle;
    if (toggle) {
      state.nowFoodDesc.data = foodDesc;
    }
  },
  [types.TOGGLE_LOGIN] (state, toggle) {
    state.nowUser.showLogin = toggle;
  },
  [types.LOGOUT] (state) {
    state.isLogin = false;
  },
  [types.TOGGLE_SEARCH_VIEW] (state, toggle) {
    state.searchView.show = toggle
  },
  [types.CHANGE_SEARCH_VIEW_VALUE] (state, value) {
    state.searchView.value = value;
  },
  [types.CHANGE_SEARCH_HISTORY] (state) {
    if (state.searchView.value.trim()) {
      state.searchView.history.push(state.searchView.value);
      let set = new Set([...state.searchView.history]);
      state.searchView.history = [...set];
    }
  },
  [types.CLEAR_SEARCH_VALUE] (state) {
    state.searchView.value = '';
  },
  [types.TOGGLE_SEARCH_RESULT] (state, toggle) {
    state.searchView.showResult = toggle
  },
  [types.TOGGLE_TEMPORARY_NONSUPPORT] (state, toggle) {
    state.nonsupport = toggle;
  }
}
