<template lang="pug">
  #add-extra-income-form
    .show-toggle-btn
      button(@click="showToggle()") 臨時収入を登録する

    .salary-form(v-show="showForm")
      input(type="number" placeholder="臨時収入を入力" v-model.number="newExtraIncome")
      .add-btn
        button(@click="addExtraIncome()") 追加
</template>

<script>
import firebase from '/firebase/firestore.js'
const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")
export default {
  data() {
    return {
      newExtraIncome: null,
      showForm: false
    }
  },
  methods: {
    showToggle() {
      this.showForm = !this.showForm
    },
    addExtraIncome() {
      if ( this.newExtraIncome === null ) { 
        return alert("金額を入力してください")
      }
      
      balanceRef.update({
        totalBalance: firebase.firestore.FieldValue.increment(this.newExtraIncome)
      })
      .then(docRef => {
        alert("追加しました")
        this.showForm = false
        return this.newExtraIncome = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #add-extra-income-form {
    vertical-align: top;
    display: inline-block;
    clear: both;
    .show-toggle-btn {
      margin: 20px;
      button {
        width: 150px;
        height: 30px;
        border: 1px solid black;
        border-radius: 3px;
        background-color: white;
        box-shadow: 2px 2px 2px gray;
      }
    }
    input {
      width: 200px;
      height: 25px;
      padding: 5px;
      margin-right: 10px;
      border-radius: 5px;
      border: 1px solid black;
    }
    .add-btn {
      margin-top: 10px;
      button {
        width: 50px;
        height: 30px;
        border: 1px solid black;
        border-radius: 3px;
        background-color: white;
        box-shadow: 2px 2px 2px gray;
      }
    } 
  }
</style>
