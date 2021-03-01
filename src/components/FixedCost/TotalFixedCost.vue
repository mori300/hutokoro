<template lang="pug">
  #total-fixedcost
    h1 ¥ {{ this.totalFixedCost }}

    .lists-wrapper
      .fixedcost-lists
        ul(v-for="(fixedCostList, key) in fixedCostLists" :key="key")
          li {{ fixedCostList.name }} : ¥{{ fixedCostList.amount }}
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const fixedCostRef = db.collection("FixedCost")
export default {
  data() {
    return {
      totalFixedCost: null,
      fixedCostLists: []
    }
  },
  created() {
    fixedCostRef.get().then(querySnapshot => {
      const obj = {}
      const val = []
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
        val[doc.data().amount] = doc.data()
      })
      this.fixedCostLists = obj

      const totalVal = val.reduce((sum, val) => {
        return sum + val.amount
      }, 0)
      this.totalFixedCost += totalVal
    })
  }
}
</script>

<style lang="scss" scoped>
  .lists-wrapper {
    ul {
      padding: 0px;
      list-style: none;
    }
  }
</style>