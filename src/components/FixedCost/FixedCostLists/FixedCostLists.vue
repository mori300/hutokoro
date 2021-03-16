<template lang="pug">
  #fixedcost-lists
    ul(v-for="(fixedCostList, key) in fixedCostLists" :key="key")
      li(class="list-name") {{ fixedCostList.fixedCostName }}
      li(class="list-amount") ¥{{ fixedCostList.fixedCostAmount }}
      .btn-wrapper
        .edit-btn
          button(@click="editToggleBtn(fixedCostList)" v-model="fixedCostList.editBtnToggle") 編集
      #popup-menu(v-show="fixedCostList.editBtnToggle")
        #content
          li(class="list-name") {{ fixedCostList.fixedCostName }}
          li(class="list-amount") ¥{{ fixedCostList.fixedCostAmount }}
          .delete-btn(class="delete-btn")
            button(@click="deleteFixedCost(key)") 削除
          .edit-form
            input(type="text" placeholder="固定費名を入力" v-model="editFixedCostName")
            input(type="number" placeholder="金額を入力" v-model.number="editFixedCost")
            .update-btn
              button(class="update-btn" @click="updateFixedCost(key)") 更新
            .close-btn
              button(@click="editToggleBtn(fixedCostList)" v-model="fixedCostList.editBtnToggle") 閉じる
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
const usersRef = db.collection("users")
export default {
  data() {
    return {
      fixedCostLists: [],
      editFixedCostName: '',
      editFixedCost: null,
      currentUser: []
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        usersRef
        .doc(user.uid)
        .onSnapshot(doc => {
          this.fixedCostLists = doc.data().fixedCost
          this.currentUser = doc.data()
          console.log(this.currentUser.userId)
        })
      }
    })
  },
  methods: {
    deleteFixedCost(key) {
      usersRef
      .doc(this.currentUser.userId)
      .get()
      .then(doc => {
        usersRef
        .doc(this.currentUser.userId)
        .update({
          fixedCost: firebase.firestore.FieldValue.arrayRemove(doc.data().fixedCost[key])
        })
        console.log(doc.data().fixedCost[key])
      })
      .catch(error => {
        console.log("Don't delete fixedCost")
      })
    },
    editToggleBtn(fixedCostList) {
      fixedCostList.editBtnToggle = !fixedCostList.editBtnToggle
    },
    updateFixedCost(key) {
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
      
      usersRef
      .doc(this.currentUser.userId)
      .get()
      .then(doc => {
        usersRef
        .doc(this.currentUser.userId)
        .update({
          fixedCost: firebase.firestore.FieldValue.arrayRemove(doc.data().fixedCost[key])
        })

        usersRef
        .doc(this.currentUser.userId)
        .update({
          fixedCost: firebase.firestore.FieldValue.arrayUnion({
            fixedCostName: this.editFixedCostName,
            fixedCostAmount: this.editFixedCost,
            editBtnToggle: false
          })
        })
        this.editFixedCostName = ''
        this.editFixedCost = null
      })
      .catch(error => {
        console.log("Don't delete fixedCost")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  #fixedcost-lists {
    width: 70%;
    margin: auto;
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
          width: 70%;
          height: 30px;
          font-size: 16px;
          margin-bottom: 10px;
          border: 1px solid black;
          border-radius: 3px;
          background-color: white;
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
}

@media (min-width: 769px) {
    #fixedcost-lists {
    width: 70%;
    margin: auto;
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
          width: 300px;
          height: 30px;
          font-size: 16px;
          margin-bottom: 10px;
          border: 1px solid black;
          border-radius: 3px;
          background-color: white;
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

}
</style>