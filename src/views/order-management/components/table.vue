<template>
  <el-row>
    <el-col>
      <el-table :data="orderShow">
        <el-table-column label="ID" prop="orderId" />
        <el-table-column label="车牌" prop="carLicense" />
        <el-table-column label="状态" prop="status" />
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button v-if="anyoneFetch(scope.row.createdTime, scope.row.status)" type="text" @click="patchOrder(scope.row)">指派/联系员工</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog title="订单指派" :visible.sync="dialogTableVisible">
      <el-row v-show="contentShow === '员工列表'">
        <el-select v-model="clerkSelectd">
          <el-option v-for="item in clerks" :key="item.clerkId" :label="item.name" :value="item.clerkId" />
        </el-select>
      </el-row>
      <el-row v-show="contentShow === '员工列表'">
        <el-button @click="updateOrder">确定</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </el-row>
      <el-row v-show="contentShow === '员工电话'">
        <span>员工电话 {{ clerkPhoneNumber }}</span>
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
      contentShow: '',
      clerkPhoneNumber: ''
    }
  },
  computed: {
    ...mapGetters(['currentPageOfOrder']),
    ...mapGetters(['orders']),
    ...mapGetters(['clerks']),
    ...mapGetters(['orderSelected']),
    orderShow() {
      return this.orders.slice(Math.max(0, this.currentPageOfOrder - 1) * 10, this.currentPageOfOrder * 10)
    }
  },
  methods: {
    anyoneFetch(createdTime, status) {
      if (status === '抢单中') {
        this.contentShow = '员工列表'
        return true
      } else if (status === '取车中' || status === '请求取车') {
        this.contentShow = '员工电话'
        return true
      }
      return false
    },
    async patchOrder(order) {
      if (this.contentShow === '员工列表') {
        this.$store.dispatch('order/setOrderSelected', order)
        await this.$store.dispatch('clerk/loadClerks')
      } else if (this.contentShow === '员工电话') {
        const clerkId = order.clerkId
        const response = await this.$store.dispatch('clerk/loadClerkById', clerkId)
        this.clerkPhoneNumber = response.phoneNumber
      }
      this.dialogTableVisible = true
    },
    async updateOrder() {
      const order = Object.assign({}, this.orderSelected)
      order.clerkId = this.clerkSelectd
      order.status = 1
      this.$store.dispatch('order/updateOrder', order)
      await this.$store.dispatch('order/loadOrders', {
        carLicense: '',
        status: -1
      })
      this.dialogTableVisible = false
    }
  }
}
</script>
