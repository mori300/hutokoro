<template lang="pug">
  #total-balance
    .total-balance(v-if="this.totalBalance.totalBalance >= 0")
      h1 ¥{{ this.totalBalance.totalBalance }}
    .total-balance(v-else v-bind:style="{color: totalBalanceColor}")
      h1 ¥{{ this.totalBalance.totalBalance }}
    
    .balance-reset-btn
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
      totalBalance: {},
      totalBalanceColor: "red"
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