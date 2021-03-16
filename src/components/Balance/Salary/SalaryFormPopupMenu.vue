<template lang="pug">
  #content
    h3 給料を追加
    p 固定費の
      span(class="fixed-cost")  ¥{{ totalFixedCost }}
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
const usersRef = db.collection("users")
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
      fixedCostData: []
    }
  },
  created() {
    firebase.auth()
    .onAuthStateChanged(user => {
      if(user) {
        db.collection("users")
        .doc(user.uid)
        .onSnapshot(doc => {
          this.fixedCostData = doc.data().fixedCost
          const fixedCostData = this.fixedCostData
          const totalFixedCostAmount = fixedCostData.reduce((sum, amount) => {
            return sum + amount.fixedCostAmount
          },0)
          this.totalFixedCost = totalFixedCostAmount
        })
      }
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
      firebase.auth()
      .onAuthStateChanged(user => {
        if(user) {
          usersRef.
          doc(user.uid)
          .update({
            totalBalance: firebase.firestore.FieldValue.increment(sum)
          })
        }
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