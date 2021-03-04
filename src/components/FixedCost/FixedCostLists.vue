<template lang="pug">
  #fixedcost-lists
    ul(v-for="(fixedCostList, key) in fixedCostLists" :key="key")
      li(class="list-name") {{ fixedCostList.name }}
      li(class="list-amount") ¥{{ fixedCostList.amount }}
      .btn-wrapper
        .edit-btn
          button(@click="editToggleBtn(fixedCostList, key)" v-model="fixedCostList.editToggle") 編集
      #popup-menu(v-show="fixedCostList.editToggle")
        #content
          li(class="list-name") {{ fixedCostList.name }}
          li(class="list-amount") ¥{{ fixedCostList.amount }}
          .delete-btn(class="delete-btn")
            button(@click="deleteFixedCost(key)") 削除
          .edit-form
            input(type="text" placeholder="固定費名を入力" v-model="editFixedCostName")
            input(type="number" placeholder="金額を入力" v-model.number="editFixedCost")
            .update-btn
              button(class="update-btn" @click="updateFixedCost(fixedCostList, key)") 更新
            .close-btn
              button(@click="editToggleBtn(fixedCostList, key)" v-model="fixedCostList.editToggle") 閉じる
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const fixedCostRef = db.collection("FixedCost")

export default {
  data() {
    return {
      fixedCostLists: [],
      editFixedCostName: '',
      editFixedCost: null
    }
  },
  created() {
    fixedCostRef.get().then(querySnapshot => {
      const obj = {}
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data()
      })
      this.fixedCostLists = obj
    })
  },
  methods: {
    deleteFixedCost(key) {
      fixedCostRef.doc(key).delete()
      .then(docRef => {
        alert("削除しました")
      })
    },
    editToggleBtn(fixedCostList, key) {
      fixedCostList.editToggle = !fixedCostList.editToggle
      fixedCostRef.doc(key).update(fixedCostList)
    },
    updateFixedCost(fixedCostList, key) {
      if ( 
        this.editFixedCostName === '' &&
        this.editFixedCost === null
      ) { 
          return alert("固定費名と金額を入力してください") 
      } else if ( this.editFixedCost === null ) {
          return alert("金額を入力してください")
      } else if ( this.editFixedCostName === '') {
          return alert("固定費名を入力してください")
      }

      fixedCostRef.doc(key).update({
        name: this.editFixedCostName,
        amount: this.editFixedCost
      })
      .then(fixedCostRef => {
        alert("固定費を編集しました")
        this.editFixedCostName = ''
        this.editFixedCost = null
        this.editToggleBtn(fixedCostList, key)
      })
      .catch(error => {
        alert("編集に失敗しました")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #fixedcost-lists {
    ul {
      padding: 0px;
      list-style: none;
      .list-name {
        font-size: 20px;
        font-weight: bold;
      }
      .list-amount {
        font-size: 23px;
        font-weight: bold;
      }
      .btn-wrapper {
        margin-top: 10px;
        margin-bottom: 50px;
        .edit-btn button {
          width: 100px;
          height: 30px;
          font-size: 16px;
          margin-bottom: 10px;
          border: 1px solid black;
          border-radius: 3px;
          background-color: white;
          box-shadow: 2px 2px 2px gray;
        }
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
          padding: 1em;
          background: #fff;
          border-radius: 10px;
          .delete-btn button{
            width: 70px;
            height: 25px;
            margin-bottom: 30px;
            border: 1px solid black;
            border-radius: 3px;
            background-color: white;
          }
          .edit-form input {
            width: 200px;
            height: 25px;
            padding: 5px;
            margin-bottom: 10px;
            margin-right: 10px;
            border-radius: 5px;
            border: 1px solid black;
          }
          .update-btn button{
            width: 100px;
            height: 40px;
            font-size: 16px;
            margin-bottom: 10px;
            border: 1px solid black;
            border-radius: 3px;
            background-color: white;
          }
          .close-btn button{
            width: 200px;
            height: 30px;
            font-size: 16px;
            margin-top: 30px;
            margin-bottom: 10px;
            border: 1px solid black;
            border-radius: 3px;
            background-color: white;
          }
          input {
            width: 200px;
            height: 25px;
            padding: 5px;
            margin-bottom: 10px;
            margin-right: 10px;
            border-radius: 5px;
            border: 1px solid black;
          }
        }
      }
    }
  }
</style>