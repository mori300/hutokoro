<template lang="pug">
  #add-fixedcost-form
    .add-fixedcost-form-btn
      fixedCostFormShowBtn(:show="showForm" @toggle="showForm = $event" :title="btnName") 固定費を追加

    #popup-menu(v-show="showForm")
      fixedCostFormPopupMenu(:showForm="showForm" :close="showForm" @toggle="showForm = $event")
</template>

<script>
import fixedCostFormPopupMenu from './FixedCostFormPopupMenu.vue'
import fixedCostFormShowBtn from '../../ShowFormBtn/ShowFormBtn.vue'

export default {
  components: {
    fixedCostFormShowBtn,
    fixedCostFormPopupMenu
  },
  data() {
    return {
      showForm: false,
      btnName: "固定費を追加"
    }
  },
  methods: {
    showFormBtn() {
      this.showForm = !this.showForm
    }
  }
}
</script>

<style lang="scss" scoped>
  .add-fixedcost-form-btn {
    button {
      width: 150px;
      height: 40px;
      font-size: 16px;
      margin-bottom: 10px;
      border: 1px solid black;
      border-radius: 3px;
      background-color: white;
      box-shadow: 2px 2px 2px gray;
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
  }
</style>