<template lang="pug">
  #add-income-form
    .show-toggle-btn
      button(@click="showToggle()") 給料を登録する

    .salary-form(v-show="showForm")
      input(type="number" placeholder="給料を入力" v-model.number="newIncome")
      .add-btn
        button(@click="addIncome()") 追加
</template>

<script>
import firebase from '/firebase/firestore.js'
const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")
const fixedCostRef = db.collection("FixedCost")
  export default {
    data() {
      return {
        newIncome: null,
        totalFixedCost: null,
        showForm: false
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
    },
    methods: {
      showToggle() {
        this.showForm = !this.showForm
      },
      addIncome() {
        if ( this.newIncome === null ) { 
          return alert("金額を入力してください")
        }
        
        const sum = this.newIncome -= this.totalFixedCost
        balanceRef.update({
          totalBalance: firebase.firestore.FieldValue.increment(sum)
        })
        .then(docRef => {
          const fixedcost = this.totalFixedCost
          alert("追加しました")
          this.showForm = false
          return this.newIncome = null
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #add-income-form {
    vertical-align: top;
    display: inline-block;
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