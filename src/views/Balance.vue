<template lang="pug">
  #home
    .form-wrapper
      .container 
        totalBalance
        addIncomeForm
</template>

<script>
import addIncomeForm from '../components/Balance/AddIncomeForm.vue'
import totalBalance from '../components/Balance/TotalBalance.vue'

export default {
  components: {
    totalBalance,
    addIncomeForm
  }
}
</script>

<style lang="scss">
.form-wrapper {
  margin-top: 100px;
}
</style>