<template lang="pug">
  #sign-up
    h2 新規登録
    input(type="text" placeholder="メールアドレス" v-model="email")
    input(type="text" placeholder="パスワード" v-model="password")
    button(@click="signup()") 登録
    router-link(to="/signin") アカウントをお持ちの方はこちら
</template>

<script>
import firebase from '/firebase/firestore.js'

const db = firebase.firestore()
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(user => {
        const userData = {
          email: firebase.auth().currentUser.email,
          userId: firebase.auth().currentUser.uid,
          totalBalnce: 0
        }
        db.collection("users").add(userData)
        alert("ユーザー登録が完了しました、サインインして下さい")
        this.$router.push('/')
      })
      .catch(error => {
        alert("ユーザー登録に失敗しました")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-up {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  h2 {
    font-weight: bold;
  }
  input {
    width: 200px;
    padding: 10px;
    margin: 10px;
    border: 1px solid black;
    border-radius: 8px;
  }
  button {
    margin-top: 40px;
    width: 80px;
    height: 25px;
    font-size: 13px;
    margin-bottom: 30px;
    border: 1px solid black;
    border-radius: 8px;
    background-color: white;
  }
}
</style>