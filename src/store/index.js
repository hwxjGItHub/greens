import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import userList from '../../src/assets/userList'
import getters from './getters'

Vue.use(Vuex);

let state = {
  isLogin: false,
  nonsupport: false,
  data: {
    MenuTypeTbl: {},
    recommendData: []
  },
  nowMenuTypeTbl: {
    big: 0,
    small: '0'
  },
  nowFoodList: {
    isAjax: true,
    page: 1,
    id: '',
    data: []
  },
  nowFoodDesc: {
    show: false,
    date: {}
  },
  nowUser: {
    showLogin: false,
    verification: true,
    verTime: '',
    userInfo: {},
    userCollection: []
  },
  isAjax: false,
  isHome: true,
  toggleAllFoods: false,
  userList,
  searchView: {
    show: false,
    value: '',
    recently: [],
    history: [],
    showResult: false
  },
  foodBasket: {
    show: false,
    data: []
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
