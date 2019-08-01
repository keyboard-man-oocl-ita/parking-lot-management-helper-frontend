<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="userName" placeholder="请输入员工名称" style="width: 200px;" class="filter-item" />
      <el-input
        v-model="phoneNumber"
        placeholder="请输入电话号码"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >Search</el-button>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-transfer
              v-model="value"
              filterable
              :titles="['可选停车场', '管理的停车场']"
              filter-placeholder="请输入搜索内容"
              :data="scope.row.transferData"
              @change="handleChange(...arguments, scope.row.clerkId)"
            />
          </template>
        </el-table-column>
        <el-table-column label="id" prop="clerkId" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="电话号码" prop="phoneNumber" />
      </el-table>
    </div>
    <div>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { findClerkByManagedBy, findClerkByCondition } from '@/api/clerk'
import { loadParkingLotsWithoutManager, updateParkingLotManagedBy, loadParkingLotDashboard } from '@/api/parkingLot'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      userName: '',
      phoneNumber: '',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined
      },
      value: [],
      // filterMethod(query, item) {
      //   return item.pinyin.indexOf(query) > -1
      // },
      tableData: [],
      parkinglotData: []
    }
  },
  created() {
    this.getList()
    this.getParkinglots()
    this.getAllParkingLot()
  },
  methods: {
    getList() {
      findClerkByManagedBy().then(res => {
        this.tableData = res
        this.total = res.length
      })
    },
    getParkinglots() {
      loadParkingLotsWithoutManager().then(res => {
        this.tableData.forEach(item => {
          item.transferData = this.generateData(res)
        })
        this.parkinglotData = res
        // console.log(this.tableData)
      })
    },
    handleFilter() {
      findClerkByCondition({ userName: this.userName, phoneNumber: this.phoneNumber }).then((res) => {
        if (Array.isArray(res)) {
          this.tableData = res
        } else {
          const arr = []
          arr.push(res)
          this.tableData = arr
        }
        this.tableData.forEach(item => {
          item.transferData = this.generateData(res)
        })
      })
    },
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
      loadParkingLotDashboard().then((res) => {
        // console.log(res)
        res.forEach((item) => {
          if (item.managedBy != null) {
            this.value.push(item.parkingLotId)
            console.log(this.value)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.header_input {
  float: right;
  margin-left: 20px;
}
</style>
