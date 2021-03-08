<template lang="pug">
  #page-title
    h2 {{ name }}の残高
</template>

<script>
import firebase from '/firebase/firestore.js'

export default {
  data() {
    return {
      name: firebase.auth().currentUser.email
    }
  }
}
</script>