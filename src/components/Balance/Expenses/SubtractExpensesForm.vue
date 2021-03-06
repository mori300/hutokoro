<template lang="pug">
  #subtract-expenses-form
    .show-toggle-btn
      salaryFormShowBtn(:show="showForm" @toggle="showForm = $event" :title="btnName")
    
    #popup-menu(v-show="showForm")
      expensesFormPopupMenu(:showForm="showForm" :close="showForm" @toggle="showForm = $event")
</template>

<script>
import salaryFormShowBtn from '../../ShowFormBtn/ShowFormBtn.vue'
import expensesFormPopupMenu from './ExpensesFormPopupMenu.vue'

export default {
  components: {
    salaryFormShowBtn,
    expensesFormPopupMenu
  },
  data() {
    return {
      showForm: false,
      btnName: "支出を登録"
    }
  }
}
</script>

<style lang="scss" scoped>
#subtract-expenses-form {
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
  } 
}

@media (min-width: 769px) {
  #subtract-expenses-form {
    display: inline-block;
    .show-toggle-btn {
      margin: 10px;
    }
  }
}
</style>
