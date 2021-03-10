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
      currentUser: {}
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        db.collection("users")
        .doc(user.uid)
        .collection("fixedCost")
        .get()
        .then(querySnapshot => {
          const val = []
          querySnapshot.forEach(doc => {
            val[doc.data().fixedCostAmount] = doc.data()
          })
          const totalVal = val.reduce((sum, val) => {
            return sum + val.fixedCostAmount
          }, 0)
          this.totalFixedCost += totalVal
          console.log(this.totalFixedCost)
        })
        .catch(error => {
          console.log("Don't search fixedCost")
          this.totalFixedCost = 0
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