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
          <el-button
            v-if="scope.row.status=='已激活'"
            size="mini"
            type="danger"
            :disabled="isCurrUser(scope.row)"
            @click="handleFreeze(scope.$index, scope.row)"
          >冻结
          </el-button>
          <el-button v-else size="mini" type="success" @click="handleFreeze(scope.$index, scope.row)">解冻</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisible">
      <el-form :model="permissionForm">
        <el-form-item label="用户权限" :label-width="formLabelWidth">
          <el-select v-model="permissionForm.role">
            <el-option label="clerk" value="1" />
            <el-option label="manager" value="2" />
            <el-option label="admin" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyPermission">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Table',
  data() {
    return {
      permissionForm: {
        clerkId: '',
        role: 0
      },
      dialogFormVisible: false
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
      this.dialogFormVisible = true
      this.permissionForm.role = row.role
      this.permissionForm.clerkId = row.clerkId
    },
    async handleFreeze(index, row) {
      this.$store.dispatch('clerk/updateClerkStatus', row.clerkId)
    },
    isCurrUser(row) {
      if (row.role === 'admin') {
        return true
      }
      return false
    },
    async modifyPermission() {
      this.$store.dispatch('clerk/modifyPermission', {
        clerkId: this.permissionForm.clerkId,
        clerk: { role: this.permissionForm.role }
      })
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
