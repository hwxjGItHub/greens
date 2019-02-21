import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/homePage/HomePage'
import CollectionView from '../components/collectionView/CollectionView'
import MessageView from '../components/messageView/MessageView'
import PersonView from '../components/personView/PersonView'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/homePage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/collect',
      name: 'CollectionView',
      component: CollectionView
    },
    {
      path: '/message',
      name: 'MessageView',
      component: MessageView
    },
    {
      path: '/person',
      name: 'PersonView',
      component: PersonView
    }
  ]
})
