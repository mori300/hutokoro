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
    showToggleChange: {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.show = true
        } else {
          this.show = false
        }
      })
    }
  },
  methods: {
    signOut() {
      firebase.auth().onAuthStateChanged(user => {
        firebase.auth().signOut()
        .then(() => {
          alert("サインアウトしました")
          this.$router.push("/signin")
        })
        .catch(error=> {
          alert("サインアウトできませんでした")
        })
      })
    }
  }
}
</script>