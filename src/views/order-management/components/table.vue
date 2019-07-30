<template>
  <el-row>
    <el-col>
      <el-table :data="orderShow">
        <el-table-column label="ID" prop="orderId" />
        <el-table-column label="车牌" prop="carLicense" />
        <el-table-column label="状态" prop="status" />
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button v-if="anyoneFetch(scope.row.createdTime, scope.row.status)" type="text" @click="patchOrder(scope.row)">指派</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog title="订单指派" :visible.sync="dialogTableVisible">
      <el-row>
        <el-select v-model="clerkSelectd">
          <el-option v-for="item in clerks" :key="item.clerkId" :label="item.name" :value="item.clerkId" />
        </el-select>
      </el-row>
      <el-row>
        <el-button @click="updateOrder">确定</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderManagementTable',
  data() {
    return {
      dialogTableVisible: false,
      clerkSelectd: '',
      orderSelected: {}
    }
  },
  computed: {
    ...mapGetters(['currentPage']),
    ...mapGetters(['orders']),
    ...mapGetters(['clerks']),
    orderShow() {
      return this.orders.slice(Math.max(0, this.currentPage - 1) * 10, this.currentPage * 10)
    }
  },
  methods: {
    anyoneFetch(createdTime, status) {
      const timeBlock = new Date().valueOf() - createdTime
      if (timeBlock - 18000) {
        if (status === '抢单中') {
          return true
        }
      }
      return false
    },
    async patchOrder(order) {
      this.orderSelected = order
      await this.$store.dispatch('clerk/loadClerks')
      this.dialogTableVisible = true
    },
    async updateOrder() {
      this.orderSelected.clerkId = this.clerkSelectd
      this.orderSelected.status = 1
      this.$store.dispatch('order/updateOrder', this.orderSelected)
      this.dialogTableVisible = false
    }
  }
}
</script>
