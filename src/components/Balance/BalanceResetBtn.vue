<template lang="pug">
  #balance-reset-btn(v-if="this.totalBalance.totalBalance != 0")
    button(@click="balanceResetBtn()") 残高リセット
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")
export default {
  data() {
    return {
      totalBalance: {}
    }
  },
  created() {
    balanceRef.onSnapshot(doc => {
      this.totalBalance = doc.data()
    })
  },
  methods: {
    balanceResetBtn() {
      balanceRef.update({
        totalBalance: 0
      })
      .then(balanceRef => {
        alert("残高をリセットしました")
      })
      .catch(error => {
        alert("リセットができませんでした")
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