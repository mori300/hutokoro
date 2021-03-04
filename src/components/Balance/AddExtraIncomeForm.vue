<template lang="pug">
  #add-extra-income-form
    .show-toggle-btn
      button(@click="showToggle()") 臨時収入を登録
    
    #popup-menu(v-show="showForm")
      #content
        h3 臨時収入を追加
        .salary-form
          input(type="number" placeholder="臨時収入を入力" v-model.number="newExtraIncome")
          .add-btn
            button(@click="addExtraIncome()") 追加
          .close-btn
            button(@click="showToggle()") 閉じる
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
    display: inline-block;
    .show-toggle-btn button{
      margin-left: 20px;
      width: 130px;
      height: 50px;
      font-size: 16px;
      border: 1px solid black;
      border-radius: 8px;
      background-color: white;
    }
    #popup-menu {
      z-index: 1;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      #content {
        z-index: 2;
        width: 70%;
        padding: 30px;
        background: #FFF;
        border-radius: 10px;
        .salary-form {
          input {
            width: 200px;
            height: 25px;
            padding: 5px;
            margin-right: 10px;
            border-radius: 5px;
            border: 1px solid black;
            background-color: #FFF;
          }
        }
        .add-btn button{
          margin-top: 10px;
            width: 100px;
            height: 40px;
            border: 1px solid black;
            border-radius: 3px;
            background-color: white;
            box-shadow: 2px 2px 2px gray;
        }
        .close-btn button{
          margin-top: 50px;
          width: 200px;
          height: 30px;
          border: 1px solid black;
          border-radius: 3px;
          background-color: white;
          box-shadow: 2px 2px 2px gray;
        }
      }
    } 
  }
</style>
