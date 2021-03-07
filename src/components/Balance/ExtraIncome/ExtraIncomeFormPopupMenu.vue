<template lang="pug">
  #content
    h3 臨時収入を追加
    .add-extra-income-form
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
      newExtraIncome: null,
    }
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
    addExtraIncome() {
      if ( this.newExtraIncome === null ) { 
        return alert("金額を入力してください")
      }
      
      balanceRef.update({
        totalBalance: firebase.firestore.FieldValue.increment(this.newExtraIncome)
      })
      .then(docRef => {
        alert("追加しました")
      })
      this.newExtraIncome = null
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
  .add-extra-income-form {
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