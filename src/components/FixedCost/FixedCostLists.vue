<template lang="pug">
  #fixedcost-lists
    ul(v-for="(fixedCostList, key) in fixedCostLists" :key="key")
      li {{ fixedCostList.name }} : ¥{{ fixedCostList.amount }}
        .delete-btn
          button(@click="deleteFixedCost(key)") 削除
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const fixedCostRef = db.collection("FixedCost")
export default {
  data() {
    return {
      fixedCostLists: []
    }
  },
  created() {
    fixedCostRef.get().then(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.fixedCostLists = obj
    })
  },
  methods: {
    deleteFixedCost(key) {
      fixedCostRef.doc(key).delete()
      .then(docRef => {
        alert("削除しました")
      })
    }
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