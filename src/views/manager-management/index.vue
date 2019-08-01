<template>
  <div>
    <ManagerManagementHeader />
    <ManagerManagementTable />
    <ManagerManagementFooter />
  </div>
</template>

<script>
import ManagerManagementHeader from './components/header'
import ManagerManagementFooter from './components/footer'
import ManagerManagementTable from './components/table'

export default {
  name: 'ManagerManagement',
  components: {
    ManagerManagementHeader, ManagerManagementFooter, ManagerManagementTable
  },
  mounted() {
    this.loadAllManager()
  },
  methods: {
    loadAllManager() {
      this.$store.dispatch('manager/loadManager')
    }
  }
}
</script>
