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
            <Transfer :clerk="scope.row.clerkId" />
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
import Pagination from '@/components/Pagination'
import Transfer from '@/components/Transfer'

export default {
  components: {
    Pagination,
    Transfer
  },
  data() {
    return {
      userName: '',
      phoneNumber: '',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined
      },
      parkinglotValue: [],
      tableData: [],
      parkinglotData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      findClerkByManagedBy().then(res => {
        this.tableData = res
        this.total = res.length
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
      })
    },
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
