<template lang="pug">
  #total-fixedcost
    h2 固定費総額
    p ¥{{ this.totalFixedCost }}
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const fixedCostRef = db.collection("FixedCost")
export default {
  data() {
    return {
      totalFixedCost: null,
    }
  },
  created() {
    fixedCostRef.get().then(querySnapshot => {
      const val = []
      querySnapshot.forEach(doc => {
        val[doc.data().amount] = doc.data()
      })
      const totalVal = val.reduce((sum, val) => {
        return sum + val.amount
      }, 0)
      this.totalFixedCost += totalVal
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