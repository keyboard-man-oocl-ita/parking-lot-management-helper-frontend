<template>
  <div>
    <el-table
      :data="clerkShow"
      style="width: 95%;margin: auto"
      border
    >
      <el-table-column label="id" width="335" prop="clerkId" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="email" label="email" width="180" />
      <el-table-column prop="phoneNumber" label="电话号码" width="180" />
      <el-table-column prop="role" label="角色" width="180" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button v-if="scope.row.status=='已激活'" size="mini" type="danger" :disabled="isCurrUser(scope.row)" @click="handleFreeze(scope.$index, scope.row)">冻结</el-button>
          <el-button v-else size="mini" type="success" @click="handleFreeze(scope.$index, scope.row)">解冻</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Table',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['clerksCurrentPage']),
    ...mapGetters(['clerks']),
    clerkShow() {
      return this.clerks.slice(Math.max(0, this.clerksCurrentPage - 1) * 10, this.clerksCurrentPage * 10)
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$store.dispatch('clerk/loadClerks', { name: '', role: 0 })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    async handleFreeze(index, row) {
      this.$store.dispatch('clerk/updateClerkStatus', row.clerkId)
    },
    isCurrUser(row) {
      if (row.role === 'admin') {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
