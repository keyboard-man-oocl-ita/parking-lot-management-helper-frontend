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
      transferData: []
    }
  },
  created() {
    this.loadParkingLotsWithout()
    this.getAllParkingLot()
  },
  methods: {
    generateData(parkingLot) {
      const data = []
      const parkinglots = parkingLot
      // const pinyin = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      parkinglots.forEach((parkinglot, index) => {
        const str = parkinglot.name
        // const lastIndex = str.substr(str.length - 1, 1)
        data.push({
          label: str,
          key: parkinglot.parkingLotId
          // pinyin: pinyin[lastIndex - 1]
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
    getAllParkingLot() {
      loadParkingLots().then((res) => {
        res.forEach((item) => {
          if (item.managedBy === this.clerk) {
            this.value.push(item.parkingLotId)
            // this.$set(this.value, this.value.length, item.parkingLotId)
          }
        })
        console.log(this.value)
        this.transferData = this.transferData.concat(this.value) // 这里塞进去
        console.log(this.transferData)
      })
    },
    loadParkingLotsWithout() {
      loadParkingLotsWithoutManager().then(res => {
        this.transferData = this.generateData(res)
      })
    }
  }
}
</script>

<style scoped>
</style>
