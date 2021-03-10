<template lang="pug">
  #sign-out-btn(v-show="show")
    button(@click="signOut()") サインアウト
</template>

<script>
import firebase from '/firebase/firestore.js'

export default {
  data() {
    return {
      show: false
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.show = true
      } else {
        this.show = false
      }
    })
  },
  methods: {
    signOut() {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          firebase.auth().signOut()
          .then(() => {
            console.log("Success")
            this.$router.push("/signin")
          })
          .catch(error => {
            console.log("Not SignOut")
          })
        }
      })
    }
  }
}
</script>