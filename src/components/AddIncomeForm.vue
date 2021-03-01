<template lang="pug">
  #add-income-form
    input(type="number" placeholder="金額を入力" v-model.number="newIncome")
    button(@click="addIncome()") 追加
</template>

<script>
import firebase from '/firebase/firestore.js'
const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")

  export default {
    data() {
      return {
        newIncome: null
      }
    },
    methods: {
      addIncome() {
        if ( this.newIncome === null ) { 
          return alert("金額を入力してください")
        }
        balanceRef.update({
          totalBalance: firebase.firestore.FieldValue.increment(this.newIncome)
        })
        .then(docRef => {
          alert("追加しました")
        })
        return this.newIncome = null
      }
    }
  }
</script>

<style lang="scss">
input {
  width: 200px;
  height: 25px;
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid black;
}

button {
  width: 50px;
  height: 30px;
  border: 1px solid black;
  border-radius: 3px;
  background-color: white;
  box-shadow: 2px 2px 2px gray;
}
</style>