<template>
  <div>
    <ClerkManagementHeader />
    <ClerkManagementTable />
    <clerk-management-footer />
  </div>
</template>

<script>
import ClerkManagementTable from './components/clerkTable'
import ClerkManagementHeader from './components/header'
import ClerkManagementFooter from './components/footer'

export default {
  components: { ClerkManagementTable, ClerkManagementHeader, ClerkManagementFooter }
}
</script>

<style scoped>

</style>
