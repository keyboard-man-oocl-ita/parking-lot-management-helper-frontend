<template>
  <div>
    <el-transfer
      v-model="value"
      filterable
      :titles="['可选停车场', '管理的停车场']"
      filter-placeholder="请输入搜索内容"
      :data="transferData"
      @change="handleChange(...arguments, clerk)"
    />
  </div>
</template>

<script>
import { updateParkingLotManagedBy, loadParkingLots, loadParkingLotsWithoutManager } from '@/api/parkingLot'

export default {
  props: ['clerk'],
  data() {
    return {
      value: [],
      transferData: [],
      newArr: []
    }
  },
  created() {
    this.loadParkingLotsWithout()
  },
  methods: {
    generateData(parkingLot) {
      const data = []
      const parkinglots = parkingLot
      parkinglots.forEach((parkinglot, index) => {
        const str = parkinglot.name
        data.push({
          label: str,
          key: parkinglot.parkingLotId
        })
      })
      return data
    },
    handleChange(value, direction, movedKeys, id) {
      if (direction === 'right') {
        const data = { 'managedBy': id }
        movedKeys.forEach((item) => {
          updateParkingLotManagedBy(item, data)
        })
      } else {
        const data = { 'managedBy': null }
        movedKeys.forEach((item) => {
          updateParkingLotManagedBy(item, data)
        })
      }
    },
    async getAllParkingLot() {
      const res = await loadParkingLots()
      res.forEach((item) => {
        if (item.managedBy === this.clerk) {
          this.newArr.push(item)
          this.value.push(item.parkingLotId)
        }
      })
    },
    async loadParkingLotsWithout() {
      this.getAllParkingLot()
      const res = await loadParkingLotsWithoutManager()
      const newarr = res.concat(this.newArr)
      this.transferData = this.generateData(newarr)
    }
  }
}
</script>

<style scoped>
</style>
