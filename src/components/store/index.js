import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        fastfood = [{
            name: '',
            adress: '',
            photo: '',
            description: ''
        }]
    },
    mutations: {
        setTableFastfood (state, payload) {
            state.fastfood = payload
        },
        setFastfoodPoint (state, payload) {
            state.loadedMeetups.push(payload)
        }
    },
    actions: {
      loadFastfoodPoint ({commit}) {
        firebase.database().ref('fastfood').once('value')
          .then((snap) => {
            const fastfood = []
            const obj = snap.val()
            for (let key in obj) {
            fastfood.push({
                name: obj[key].name,
                adress: obj[key].adress,
                photo: obj[key].photo,
                description: obj[key].description
              })
            }
            commit('setTableFastfood', fastfood)
          })
      },
      setFastfoodPoint ({commit}, payload) {
        const point = {
          name: payload.name,
          adress: payload.adress,
          photo: payload.photo,
          description: payload.description
        }
        firebase.database().ref('fastfood').push(point)
          .then((data) => {
            const key = data.key
            commit('setFastfoodPoint', {
              ...point,
              id: key
            })
          })
      }
    }
  })