<template>
  <el-row>
    <el-col>
      <el-table :data="parkingLotShow">
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

import { loadParkingLots } from '@/api/parkingLot'

export default {
  name: 'ParkingLotManagementTable',
  data() {
    return {
      parkingLots: [
        {
          parkingLotId: '0d6a2724-3187-424a-b0b9-9173a5753e1d',
          name: 'parkingLot1',
          description: 'first parking lot',
          capacity: 10,
          latitude: 0,
          longtitude: 0,
          createdBy: '8a5e682d6c45a877016c45a8d4960000',
          managedBy: '6f16388d-98eb-41ef-ba14-b5358678a5ca'
        },
        {
          parkingLotId: '0d6a2724-3187-424a-b0b9-9173a5753e1d',
          name: 'parkingLot1',
          description: 'first parking lot',
          capacity: 10,
          latitude: 0,
          longtitude: 0,
          createdBy: '8a5e682d6c45a877016c45a8d4960000',
          managedBy: '6f16388d-98eb-41ef-ba14-b5358678a5ca'
        },
        {
          parkingLotId: '0d6a2724-3187-424a-b0b9-9173a5753e1d',
          name: 'parkingLot1',
          description: 'first parking lot',
          capacity: 10,
          latitude: 0,
          longtitude: 0,
          createdBy: '8a5e682d6c45a877016c45a8d4960000',
          managedBy: '6f16388d-98eb-41ef-ba14-b5358678a5ca'
        }
      ]
      // idOfIntervalForGetParkingLots: ''
    }
  },
  computed: {
    parkingLotShow() {
      // return this.parkingLots.slice(Math.max(0, this.currentPageOfOrder - 1) * 10, this.currentPageOfOrder * 10)
      return this.parkingLots
    }
  },
  mounted() {
    this.getParkingLots()
  },
  methods: {
    getParkingLots() {
      loadParkingLots().then(res => {
        this.parkingLots = res.data
      }).catch(error => console.log(error))
    },
    logoutParkingLot(parkingLot) {
      this.$message({
        message: '还没有实现api'
      })
    }
  }
}
</script>
