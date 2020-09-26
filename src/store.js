import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import 'regenerator-runtime';
Vue.use(Vuex)



export const store = new Vuex.Store({
  state: {
    loadedRequsts: [
       ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedRequsts (state, payload) {
      state.loadedRequsts = payload
    },
    createRequst (state, payload) {
      state.loadedRequsts.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadRequsts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('requsts').once('value')
        .then((data) => {
          const requsts = []
          const obj = data.val()
          console.log("obj"+obj);
          for (let key in obj) {
              console.log("key"+key);
            requsts.push({
             
id: key,
              manufacturer: obj[key].manufacturer,
              model: obj[key].model,
              imageUrl: obj[key].imageUrl,
              year: obj[key].year,   
                category: obj[key].category,   
                partName: obj[key].partName,
              creatorId: obj[key].creatorId,
          messages:obj[key].messages
            })
          }
         
          commit('setLoadedRequsts', requsts)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createRequst ({commit, getters}, payload) {
      const requst = {
        manufacturer: payload.manufacturer,
        model: payload.model,
        year: payload.year,
        category: payload.category,
        partName: payload.partName,
       imageUrl:payload.imageUrl,
          creatorId: getters.user.id,
          messages:{}
      }
      firebase.database().ref('requsts').push(requst)
        .then((data) => {
          const key = data.key
          commit('createRequst', {
//            ...requst,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
        
        
      // Reach out to firebase and store it
    },
     signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
       firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
         
       
       
     
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    },
      AddComment({commit},payload){
          firebase.database().ref('requsts/'+payload.id+"/messages").on('value',(snap)=>{
    var totalRecord =  snap.numChildren();
    console.log("snap : "+snap);
  });
           firebase.database().ref('requsts/'+payload.id+'/messages').push({
               message:payload.message
           })
        .then((data) => {
        
        })
        .catch((error) => {
          console.log(error)
        })
          
      }
  },
  getters: {
    loadedRequsts (state) {
      return state.loadedRequsts
    },
    featuredRequsts (state, getters) {
      return getters.loadedRequsts.slice(0, 5)
    },
    loadedRequst (state) {
      return (requstId) => {
        return state.loadedRequsts.find((requst) => {
          return requst.id === requstId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})











