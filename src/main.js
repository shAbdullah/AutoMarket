import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'

import router from './router/router'
import {store} from './store'
import Vuelidate from 'vuelidate'
 // path to vuetify export

import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuelidate)



new Vue({
  el: '#app',
  router,
  store,
   
  render: h => h(App),
 

  created () {
  firebase.initializeApp({
   apiKey: "AIzaSyBSTktI8XdZar00j2PyEky1RqsjwwNqkJo",
authDomain: "auto-market-59cd6.firebaseapp.com",
databaseURL: "https://auto-market-59cd6.firebaseio.com",
projectId: "auto-market-59cd6",
storageBucket: "auto-market-59cd6.appspot.com",
messagingSenderId: "747035831582",
appId: "1:747035831582:web:53e6d78f540b819b18ad0f",
measurementId: "G-H6TKBDDLMS"
  })
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.$store.dispatch('autoSignIn', user)
    }
  })
      
  this.$store.dispatch('loadRequsts')
}
})
