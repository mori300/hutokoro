<template lang="pug">
  #fixedcost
    .fixedcost-wrapper
      .container
        .total-fixedcost-name
          totalFixedCost
          addFixedCostForm
    
    .fixedcost-lists
      fixedCostLists
</template>

<script>
import addFixedCostForm from '../components/FixedCost/AddFixedCostForm.vue'
import totalFixedCost from '../components/FixedCost/TotalFixedCost.vue'
import fixedCostLists from '../components/FixedCost//FixedCostLists.vue'

export default {
  components: {
    addFixedCostForm,
    totalFixedCost,
    fixedCostLists
  }
}
</script>

<style lang="scss" scoped>
  #fixedcost {
    margin-top: 50px;
  }
</style>