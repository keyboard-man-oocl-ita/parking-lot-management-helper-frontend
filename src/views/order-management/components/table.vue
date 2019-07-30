<template>
  <el-row>
    <el-col>
      <el-table :data="orderShow">
        <el-table-column label="ID" prop="orderId" />
        <el-table-column label="车牌" prop="carLicense" />
        <el-table-column label="状态" prop="status" />
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="() => scope">指派</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderManagementTable',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['currentPage']),
    ...mapGetters(['orders']),
    orderShow() {
      return this.orders.slice(Math.max(0, this.currentPage - 1) * 10, this.currentPage * 10)
    }
  }
}
</script>
