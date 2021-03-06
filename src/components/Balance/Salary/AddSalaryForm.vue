<template lang="pug">
  #add-salary-form
    .show-toggle-btn
      salaryFormShowBtn(:show="showForm" @toggle="showForm = $event" :title="btnName")

    #popup-menu(v-show="showForm")
      #content
        h3 給料を追加
        p 固定費の
          span(class="fixed-cost")  ¥{{ this.totalFixedCost }}
          | 
          br
          | 差し引かれます
        .salary-form
          input(type="number" placeholder="給料を入力" v-model.number="newIncome")
          .add-btn
            button(@click="addIncome()") 追加
          .close-btn
            closeFormBtn(:close="showForm" @toggle="showForm = $event")
</template>

<script>
import firebase from '/firebase/firestore.js'
import salaryFormShowBtn from '../../ShowFormBtn/ShowFormBtn.vue'
import closeFormBtn from '../../ShowFormBtn/CloseFormBtn.vue'

const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")
const fixedCostRef = db.collection("FixedCost")
  export default {
    components: {
      salaryFormShowBtn,
      closeFormBtn
    },
    data() {
      return {
        newIncome: null,
        totalFixedCost: null,
        showForm: false,
        btnName: "給料を登録"
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
        })
        this.newIncome = null
        this.showForm = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  #add-salary-form {
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
        border-radius: 10px;
        background-color: #FFF;
        .fixed-cost {
          font-weight: bold;
          font-size: 20px;
        }
        .salary-form {
          input {
            width: 200px;
            height: 25px;
            padding: 5px;
            margin-right: 10px;
            border-radius: 5px;
            border: 1px solid black;
          }
        }
        .add-btn button{
          margin-top: 10px;
          width: 100px;
          height: 40px;
          font-size: 16px;
          border: 1px solid black;
          border-radius: 3px;
          background-color: white;
        }
      }
    } 
  }

@media (min-width: 769px) {
  #add-salary-form {
    display: inline-block;
    .show-toggle-btn {
      margin: 10px;
    }
  }
}
</style>