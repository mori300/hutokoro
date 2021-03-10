<template lang="pug">
  #total-balance
    .total-balance
      p ¥{{ this.currentUser.totalBalance }}
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
    // auth().currentUser.uid ではリロード時にエラーがでてしまう為、onAuthStateChangedを使う
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

<style lang="scss" scoped>
  #total-balance {
    p {
      font-size: 50px;
      font-weight: bold;
      margin: 0px;
      padding-bottom: 10px;
    }
  }
</style>