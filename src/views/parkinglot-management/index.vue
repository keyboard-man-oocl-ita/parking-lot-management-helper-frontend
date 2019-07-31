<template>
  <div>
    <parking-lot-management-header />
    <parking-lot-management-table />
    <parking-lot-management-footer />
  </div>
</template>

<script>
import ParkingLotManagementHeader from './components/header'
import ParkingLotManagementFooter from './components/footer'
import ParkingLotManagementTable from './components/table'

export default {
  name: 'ParkingLotManagementLayout',
  components: {
    ParkingLotManagementHeader,
    ParkingLotManagementFooter,
    ParkingLotManagementTable
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>
