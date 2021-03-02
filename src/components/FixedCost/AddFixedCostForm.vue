<template lang="pug">
  #add-fixedcost-form
    .add-form
      input(type="text" placeholder="固定費名を入力" v-model="newFixedCostName")
      input(type="number" placeholder="金額を入力" v-model.number="newFixedCost")
      |
      br
      button(@click="addFixedCost()") 追加
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()

export default {
  data() {
    return {
      newFixedCostName: '',
      newFixedCost: null
    }
  },
  methods: {
    addFixedCost() {
      if ( 
        this.newFixedCostName === '' &&
        this.newFixedCost === null
      ) { 
          return alert("固定費名と金額を入力してください") 
      } else if ( this.newFixedCost === null ) {
          return alert("金額を入力してください")
      } else if ( this.newFixedCostName === '') {
          return alert("固定費名を入力してください")
      }

      db.collection("FixedCost").add({
        name: this.newFixedCostName,
        amount: this.newFixedCost,
        editToggle: false
      })
      .then(docRef => {
        alert("固定費を追加しました")
      })
      .catch(error => {
        alert("追加に失敗しました")
      })
      this.newFixedCostName = ''
      this.newFixedCost = null
    }
  }
}
</script>