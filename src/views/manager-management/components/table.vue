<template>
  <el-row>
    <el-col>
      <el-table :data="orderShow">
        <el-table-column label="ID" prop="clerkId" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="电话" prop="phoneNumber" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDialogOpen(scope.row.clerkId)">指派员工</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-dialog title="员工指派" :visible.sync="dialogVisible">
      <el-row>
        <el-col>
          <el-transfer v-if="dialogVisible" v-model="clerksOfManagerDTO" :data="freeClerksDTO" />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button @click="tranferClerk">确认</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ManagerManagementTable',
  data() {
    return {
      dialogVisible: false,
      clerksOfManager: [],
      freeClerks: [],
      managerSelect: '',
      managerId: '',
      clerksOfManagerDTO: [],
      freeClerksDTO: []
    }
  },
  computed: {
    ...mapGetters(['currentPageOfManager']),
    ...mapGetters(['managers']),
    orderShow() {
      return this.managers.slice(Math.max(0, this.currentPageOfManager - 1) * 10, this.currentPageOfManager * 10)
    }
  },
  methods: {
    async handleDialogOpen(id) {
      this.managerId = id
      this.freeClerks = await this.$store.dispatch('manager/loadFreeClerks')
      this.clerksOfManager = await this.$store.dispatch('manager/loadClerksOf', id)
      this.freeClerksDTO = this.transformIdToKey(this.freeClerks)
      this.freeClerksDTO = this.freeClerksDTO.concat(this.transformIdToKey(this.clerksOfManager))
      this.clerksOfManagerDTO = this.clerksOfManager.map(item => item.clerkId)
      this.dialogVisible = true
    },
    transformIdToKey(items) {
      return items.map(item => {
        return {
          key: item.clerkId,
          label: item.name
        }
      })
    },
    async tranferClerk() {
      const self = this
      const clerkPatched = []
      this.freeClerks.forEach(item => {
        const isIn = self.clerksOfManagerDTO.findIndex(clerk => clerk === item.clerkId)
        if (isIn !== -1) {
          item.managedBy = self.managerId
          clerkPatched.push(item)
        }
      })
      clerkPatched.forEach(clerk => {
        clerk.role = this.getRole(clerk.role)
        clerk.status = this.getStatus(clerk.status)
      })
      const clerkFree = []
      this.clerksOfManager.forEach(item => {
        const isIn = self.clerksOfManagerDTO.findIndex(clerk => clerk === item.clerkId)
        if (isIn !== -1) {
          item.managedBy = null
          clerkFree.push(item)
        }
      })
      clerkFree.forEach(clerk => {
        clerk.role = this.getRole(clerk.role)
        clerk.status = this.getStatus(clerk.status)
      })
      await this.$store.dispatch('manager/batchUpdateClerk', clerkPatched)
      await this.$store.dispatch('manager/batchUpdateClerk', clerkFree)
      this.dialogVisible = false
    },
    getRole(role) {
      switch (role) {
        case 'clerk':
          return 1
        case 'manager':
          return 2
        case 'admin':
          return 3
      }
    },
    getStatus(status) {
      switch (status) {
        case '已冻结':
          return 0
        case '已激活':
          return 1
      }
    }
  }
}
</script>

