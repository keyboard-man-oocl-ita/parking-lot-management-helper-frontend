<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="32">
      <el-col v-for="(item, index) in parkingLotList" :key="index" :xs="24" :sm="12" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :statistic="item.data" :name="item.name" :clerk="item.clerk" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PieChart from './components/PieChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PieChart
  },
  data() {
    return {
      parkingLotList: [
        {
          name: '停车场A',
          clerk: 'jimmy',
          data: [
            { value: 10, name: '剩余' },
            { value: 11, name: '已占用' }
          ]
        },
        {
          name: '停车场B',
          clerk: 'gukson',
          data: [
            { value: 10, name: '剩余' },
            { value: 12, name: '已占用' }
          ]
        },
        {
          name: '停车场C',
          clerk: 'vincent',
          data: [
            { value: 10, name: '剩余' },
            { value: 13, name: '已占用' }
          ]
        }
      ]
    }
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
