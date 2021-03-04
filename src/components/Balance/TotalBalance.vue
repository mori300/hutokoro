<template lang="pug">
  #total-balance
    h1 ¥{{ this.totalBalance.totalBalance }}
    balanceResetBtn
</template>

<script>
import firebase from '/firebase/firestore.js'
import balanceResetBtn from './BalanceResetBtn.vue'

const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")
export default {
  components: {
    balanceResetBtn
  },
  data() {
    return {
      totalBalance: {}
    }
  },
  created() {
    balanceRef.onSnapshot(doc => {
      this.totalBalance = doc.data()
    })
  }
}
</script>

<style lang="scss" scoped>
  #total-balance {
    margin-bottom: 30px;
  }
</style>