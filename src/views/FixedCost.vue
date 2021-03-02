<template lang="pug">
  #fixedcost
    .fixedcost-wrapper
      .container
        h2 固定費総額
        totalFixedCost
        h2 固定費の追加
        addFixedCostForm

    div
      router-link(to="/") 残高
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