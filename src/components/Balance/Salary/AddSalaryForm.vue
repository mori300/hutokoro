<template lang="pug">
  #add-salary-form
    .show-toggle-btn
      salaryFormShowBtn(:show="showForm" @toggle="showForm = $event" :title="btnName")

    #popup-menu(v-show="showForm")
      salaryFormPopupMenu(:showForm="showForm" :close="showForm" @toggle="showForm = $event")
</template>

<script>
import salaryFormShowBtn from '../../ShowFormBtn/ShowFormBtn.vue'
import salaryFormPopupMenu from './SalaryFormPopupMenu.vue'

export default {
  components: {
    salaryFormShowBtn,
    salaryFormPopupMenu
  },
  data() {
    return {
      showForm: false,
      btnName: "給料を登録"
    }
  }
}
</script>

<style lang="scss" scoped>
#add-salary-form {
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
  #add-salary-form {
    display: inline-block;
    .show-toggle-btn {
      margin: 10px;
    }
  }
}
</style>