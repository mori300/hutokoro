<template lang="pug">
  #home
    .form-wrapper
      .container 
        h2 あなたの残高
        totalBalance
        addSalaryForm
        addExtraIncomeForm
        subtractExpensesForm
</template>

<script>
import totalBalance from '../components/Balance/TotalBalance.vue'
import addSalaryForm from '../components/Balance/AddSalaryForm.vue'
import addExtraIncomeForm from '../components/Balance/AddExtraIncomeForm.vue'
import subtractExpensesForm from '../components/Balance/SubtractExpensesForm.vue'

export default {
  components: {
    totalBalance,
    addSalaryForm,
    addExtraIncomeForm,
    subtractExpensesForm
  }
}
</script>

<style lang="scss">
  .form-wrapper {
    margin-top: 50px;
  }
</style>