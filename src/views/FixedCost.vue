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
import addFixedCostForm from '../components/FixedCost/AddFixedCost/AddFixedCostForm.vue'
import totalFixedCost from '../components/FixedCost/TotalFixedCost/TotalFixedCost.vue'
import fixedCostLists from '../components/FixedCost/FixedCostLists/FixedCostLists.vue'

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