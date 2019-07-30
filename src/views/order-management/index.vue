<template>
  <div>
    <OrderManagementHeader />
    <OrderManagementTable />
    <OrderManagementFooter />
  </div>
</template>

<script>
import OrderManagementHeader from './components/header'
import OrderManagementFooter from './components/footer'
import OrderManagementTable from './components/table'

export default {
  name: 'OrderManagementLayout',
  components: {
    OrderManagementHeader, OrderManagementFooter, OrderManagementTable
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
