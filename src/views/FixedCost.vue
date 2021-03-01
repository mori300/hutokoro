<template lang="pug">
  #fixedcost
    .fixedcost-wrapper
      .container
        totalFixedCost
        addFixedCostForm
</template>

<script>
import addFixedCostForm from '../components/FixedCost/AddFixedCostForm.vue'
import totalFixedCost from '../components/FixedCost/TotalFixedCost.vue'

export default {
  components: {
    addFixedCostForm,
    totalFixedCost
  }
}
</script>