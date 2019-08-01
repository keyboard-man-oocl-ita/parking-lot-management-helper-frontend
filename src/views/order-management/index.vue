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
  },
  mounted() {
    this.loadOrder()
  },
  methods: {
    async loadOrder() {
      await this.$store.dispatch('order/loadOrders', {
        carLicense: '',
        status: -1
      })
    }
  }
}
</script>

<style scoped>

</style>
