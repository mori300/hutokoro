<template lang="pug">
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
        button(@click="showToggle()") 閉じる
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")
const fixedCostRef = db.collection("FixedCost")
export default {
  props: {
    showForm: {
      type: Boolean
    },
    close: {
      type: Boolean
    }
  },
  data() {
    return {
      newIncome: null,
      totalFixedCost: null,
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
  computed: {
    toggleWatch: {
      get() {
        return this.close
      },
      set(ChangedToggle) {
        this.$emit('toggle', ChangedToggle)
      }
    }
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
      this.$emit('toggle', this.toggleWatch = !this.toggleWatch)
    },
    showToggle() {
      this.$emit('toggle', this.toggleWatch = !this.toggleWatch)
    }
  }
}
</script>

<style lang="scss" scoped>
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
      .add-btn button {
        margin-top: 10px;
        width: 100px;
        height: 40px;
        font-size: 16px;
        border: 1px solid black;
        border-radius: 3px;
        background-color: white;
      }
      .close-btn button {
        margin-top: 50px;
        width: 200px;
        height: 30px;
        font-size: 16px;
        border: 1px solid black;
        border-radius: 3px;
        background-color: white;
      }
    }
</style>