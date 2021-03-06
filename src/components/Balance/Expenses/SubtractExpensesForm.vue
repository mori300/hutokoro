<template lang="pug">
  #subtract-expenses-form
    .show-toggle-btn
      salaryFormShowBtn(:show="showForm" @toggle="showForm = $event" :title="btnName")
    
    #popup-menu(v-show="showForm")
      #content
        h3 支出を追加
        .subtract-expenses-form
          input(type="number" placeholder="支出を入力" v-model.number="newExpenses")
          .subtract-btn
            button(@click="subtractExpenses()") 登録
          .close-btn
            closeFormBtn(:close="showForm" @toggle="showForm = $event")
</template>

<script>
import firebase from '/firebase/firestore.js'
import salaryFormShowBtn from '../../ShowFormBtn/ShowFormBtn.vue'
import closeFormBtn from '../../ShowFormBtn/CloseFormBtn.vue'

const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")
export default {
  components: {
      salaryFormShowBtn,
      closeFormBtn
  },
  data() {
    return {
      newExpenses: null,
      totalBalance: null,
      showForm: false,
      btnName: "支出を登録"
    }
  },
  created() {
    balanceRef.onSnapshot(doc => {
      this.totalBalance = doc.data()
    })
  },
  methods: {
    showToggle() {
      this.showForm = !this.showForm
    },
    subtractExpenses() {
      if ( this.newExpenses === null ) { 
        return alert("金額を入力してください")
      }
      
      balanceRef.update({
        totalBalance: firebase.firestore.FieldValue.increment(-this.newExpenses)
      })
      .then(docRef => {
        alert("登録しました")
      })
      this.showForm = false
      this.newExpenses = null
    }
  }
}
</script>

<style lang="scss" scoped>
  #subtract-expenses-form {
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
        .subtract-expenses-form {
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
        .subtract-btn button{
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

@media (min-width: 769px) {
  #subtract-expenses-form {
    display: inline-block;
    .show-toggle-btn {
      margin: 10px;
    }
  }
}
</style>
