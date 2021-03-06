<template lang="pug">
  #content
    h3 支出を追加
    .subtract-expenses-form
      input(type="number" placeholder="支出を入力" v-model.number="newExpenses")
      .subtract-btn
        button(@click="subtractExpenses()") 登録
      .close-btn
        button(@click="showToggle()") 閉じる
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const balanceRef = db.collection("Balance").doc("balance")
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
      newExpenses: null,
      totalBalance: null,
    }
  },
  created() {
    balanceRef.onSnapshot(doc => {
      this.totalBalance = doc.data()
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
      this.newExpenses = null
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
</style>