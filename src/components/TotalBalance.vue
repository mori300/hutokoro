<template lang="pug">
  #total-balance
    h1 ¥{{ this.totalBalance.totalBalance }}
</template>

<script>
import firebase from '/firebase/firestore.js'
import addIncomeForm from '../components/AddIncomeForm.vue'

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
  }
}
</script>