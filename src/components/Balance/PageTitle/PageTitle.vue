<template lang="pug">
  #page-title
    h2 {{ this.currentUser.email }}の残高
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
export default {
  data() {
    return {
      currentUser: {}
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        db.collection("users").doc(user.uid).onSnapshot(doc => {
          this.currentUser = doc.data()
        })
      }
    })
  }
}
</script>