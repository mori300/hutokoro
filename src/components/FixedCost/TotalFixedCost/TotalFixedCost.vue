<template lang="pug">
  #total-fixedcost
    h2 固定費総額
    p ¥{{ this.totalFixedCost }}
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
export default {
  data() {
    return {
      totalFixedCost: null,
      fixedCostData: []
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        db.collection("users")
        .doc(user.uid)
        .onSnapshot(doc => {
          this.fixedCostData = doc.data().fixedCost
          const fixedCostData = this.fixedCostData
          const totalFixedCostAmount = fixedCostData.reduce((sum, amount) => {
            return sum + amount.fixedCostAmount
          },0)
          this.totalFixedCost = totalFixedCostAmount
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  #total-fixedcost {
    margin-bottom: 50px;
    p {
      font-size: 50px;
      font-weight: bold;
      margin: 0px;
      padding-bottom: 10px;
    }
  }
</style>