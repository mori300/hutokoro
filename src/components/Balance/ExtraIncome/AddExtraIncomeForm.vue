<template lang="pug">
  #add-extra-income-form
    .show-toggle-btn
      salaryFormShowBtn(:show="showForm" @toggle="showForm = $event" :title="btnName")
    
    #popup-menu(v-show="showForm")
      extraIncomeFormPopupMenu(:showForm="showForm" :close="showForm" @toggle="showForm = $event")
</template>

<script>
import salaryFormShowBtn from '../../ShowFormBtn/ShowFormBtn.vue'
import extraIncomeFormPopupMenu from './ExtraIncomeFormPopupMenu.vue'

export default {
  components: {
      salaryFormShowBtn,
      extraIncomeFormPopupMenu
  },
  data() {
    return {
      showForm: false,
      btnName: "臨時収入を登録"
    }
  }
}
</script>

<style lang="scss" scoped>
  #add-extra-income-form {
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
    #add-extra-income-form {
      display: inline-block;
      .show-toggle-btn {
        margin: 10px;
      }
    }
  }
</style>
