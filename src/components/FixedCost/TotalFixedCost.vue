<template lang="pug">
  #total-fixedcost
    h1 ¥ {{ this.totalFixedCost }}

    .lists-wrapper
      .fixedcost-lists
        fixedCostLists
</template>

<script>
import firebase from '/firebase/firestore.js'
import fixedCostLists from './FixedCostLists.vue'

const db = firebase.firestore()
const fixedCostRef = db.collection("FixedCost")
export default {
  components: {
    fixedCostLists
  },
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