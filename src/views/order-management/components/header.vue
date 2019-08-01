<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="condition" placeholder="类型" style="width: 200px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="carLicense" style="width: 200px;" placeholder="车牌号" />
      <el-button type="primary" icon="el-icon-search" @click="loadOrder">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderManagementHeader',
  data() {
    return {
      options: [
        {
          value: 0,
          label: '抢单中'
        },
        {
          value: 1,
          label: '已接单'
        },
        {
          value: 2,
          label: '已停车'
        },
        {
          value: 3,
          label: '请求取车'
        },
        {
          value: 4,
          label: '取车中'
        },
        {
          value: 5,
          label: '已完成'
        },
        {
          value: -1,
          label: '默认'
        }
      ],
      carLicense: '',
      condition: -1
    }
  },
  methods: {
    async loadOrder() {
      await this.$store.dispatch('order/loadOrders', {
        carLicense: this.carLicense,
        status: this.condition
      })
    }
  }
}
</script>
