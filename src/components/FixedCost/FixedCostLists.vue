<template lang="pug">
  #fixedcost-lists
    ul(v-for="(fixedCostList, key) in fixedCostLists" :key="key")
      li {{ fixedCostList.name }} : ¥{{ fixedCostList.amount }}
        .btn-wrapper
          span(class="delete-btn")
            button(@click="deleteFixedCost(key)") 削除
            span(class="edit-btn")
              button(@click="editToggleBtn(fixedCostList, key)" v-model="fixedCostList.editToggle") 編集
              .edit-form(v-show="fixedCostList.editToggle")
                input(type="text" placeholder="固定費名を入力" v-model="editFixedCostName")
                input(type="number" placeholder="金額を入力" v-model.number="editFixedCost")
                |
                br
                button(class="update-btn" @click="updateFixedCost(fixedCostList, key)") 更新
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
  .lists-wrapper {
    ul {
      padding: 0px;
      list-style: none;
      .btn-wrapper {
        margin-top: 10px;
        .delete-btn {
          padding-right: 10px;
          .edit-btn {
            padding-left: 10px;
            .update-btn {
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>