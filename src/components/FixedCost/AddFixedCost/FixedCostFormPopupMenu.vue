<template lang="pug">
  #content
    .add-form
      h4 固定費を追加
      input(type="text" placeholder="固定費名を入力" v-model="newFixedCostName")
      input(type="number" placeholder="金額を入力" v-model.number="newFixedCost")
      .add-btn
        button(@click="addFixedCost()") 追加
      .close-btn
        button(@click="showToggle()") 閉じる
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
export default {
  props: {
    close: {
      type: Boolean
    }
  },
  data() {
    return {
      newFixedCostName: '',
      newFixedCost: null,
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
    addFixedCost() {
      if ( 
        this.newFixedCostName === '' &&
        this.newFixedCost === null
      ) { 
          return alert("固定費名と金額を入力してください") 
      } else if ( this.newFixedCost === null ) {
          return alert("金額を入力してください")
      } else if ( this.newFixedCostName === '') {
          return alert("固定費名を入力してください")
      }

      db.collection("FixedCost").add({
        name: this.newFixedCostName,
        amount: this.newFixedCost,
        editToggle: false
      })
      .then(docRef => {
        alert("固定費を追加しました")
      })
      .catch(error => {
        alert("追加に失敗しました")
      })
      this.newFixedCostName = ''
      this.newFixedCost = null
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
  padding: 1em;
  background: #fff;
  border-radius: 10px;
  .add-form input {
    width: 200px;
    height: 25px;
    padding: 5px;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid black;
  }
  .add-btn button{
      width: 100px;
      height: 40px;
      font-size: 16px;
      margin-bottom: 10px;
      border: 1px solid black;
      border-radius: 3px;
      background-color: white;
      box-shadow: 2px 2px 2px gray;
  }
  .close-btn button{
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
