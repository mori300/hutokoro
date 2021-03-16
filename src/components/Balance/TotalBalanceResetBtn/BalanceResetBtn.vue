<template lang="pug">
  #balance-reset-btn(v-if="this.totalBalance.totalBalance != 0")
    button(@click="balanceResetBtn()") 残高リセット
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const usersRef = db.collection("users")
export default {
  data() {
    return {
      totalBalance: {}
    }
  },
  created() {
    firebase.auth()
    .onAuthStateChanged(user => {
      if(user) {
        usersRef
        .doc(user.uid)
        .get(doc => {
          this.totalBalance = doc.data().totalBalance
        })
      }
    })
  },
  methods: {
    balanceResetBtn() {
      firebase.auth()
      .onAuthStateChanged(user => {
        if(user) {
          usersRef
          .doc(user.uid)
          .update({
            totalBalance: 0
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #balance-reset-btn {
    margin-bottom: 50px;
    button {
      height: 30px;
      width: 100px;
      border: 1px solid black;
      border-radius: 5px;
      background-color: #FFF;
    }
  }
</style>