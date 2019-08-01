<template>
  <el-row>
    <el-col>
      <el-table :data="parkingLots">
        <el-table-column label="ID" prop="parkingLotId" />
        <el-table-column label="名字" prop="name" />
        <el-table-column label="大小" prop="capacity" />
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain>修改</el-button>
            <el-button type="danger" plain @click="logoutParkingLot(scope.row)">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ParkingLotManagementTable',
  data() {
    return {
      idOfSetInterval: ''
    }
  },
  computed: {
    ...mapGetters(['parkingLots'])
  },
  mounted() {
    this.getParkingLots()
  },
  methods: {
    async getParkingLots() {
      await this.$store.dispatch('parkingLot/loadParkingLotAct')
    },
    logoutParkingLot(parkingLot) {
      this.$message({
        message: '还没有实现api'
      })
    }
  }
}
</script>
