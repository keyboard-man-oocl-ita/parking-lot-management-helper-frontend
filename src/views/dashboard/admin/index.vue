<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <el-col v-for="(item, index) in parkingLotsInDashboard" :key="index" :xs="24" :sm="12" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :statistic="item" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardAdmin',
  components: {
    PieChart
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['parkingLotsInDashboard'])
  },
  async mounted() {
    await this.$store.dispatch('dashboard/loadParkingLot')
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
