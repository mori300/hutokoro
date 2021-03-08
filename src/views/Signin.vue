<template lang="pug">
  #sign-in
    h2 サインイン
    input(type="text" placeholder="メールアドレス" v-model="email")
    input(type="text" placeholder="パスワード" v-model="password")
    button(@click="signin()") サインイン
    router-link(to="/signup") アカウント登録がまだの方はこちら
</template>

<script>
import firebase from '/firebase/firestore.js'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signin() {
      firebase.auth().signInWithEmailAndPassword(this.email,this.password)
      .then(user => {
        alert("サインインしました")
        this.$router.push('/')
      })
      .catch(error => {
        alert("サインインに失敗しました")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#sign-in {
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
    margin-top: 30px;
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