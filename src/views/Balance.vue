<template lang="pug">
  #balance
    .container 
      pageTitle
      totalBalance
      addSalaryForm
      addExtraIncomeForm
      subtractExpensesForm
</template>

<script>
import pageTitle from '../components/Balance/PageTitle.vue'
import totalBalance from '../components/Balance/TotalBalance.vue'
import addSalaryForm from '../components/Balance/Salary/AddSalaryForm.vue'
import addExtraIncomeForm from '../components/Balance/ExtraIncome/AddExtraIncomeForm.vue'
import subtractExpensesForm from '../components/Balance/SubtractExpensesForm.vue'

export default {
  components: {
    pageTitle,
    totalBalance,
    addSalaryForm,
    addExtraIncomeForm,
    subtractExpensesForm
  }
}
</script>

<style lang="scss">
  #balance {
    margin-top: 50px;
  }
</style>