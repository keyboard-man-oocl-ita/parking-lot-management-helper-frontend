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
          <el-transfer v-if="dialogVisible" v-model="freeClerks" :data="clerksOfManager" />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button @click="dialogVisible=false">确认</el-button>
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
      managerSelect: ''
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
      this.freeClerks = await this.$store.dispatch('manager/loadFreeClerks')
      this.clerksOfManager = await this.$store.dispatch('manager/loadClerksOf', id)
      this.freeClerks = this.transformIdToKey(this.freeClerks)
      this.clerksOfManager = this.transformIdToKey(this.clerksOfManager)
      this.dialogVisible = true
    },
    transformIdToKey(items) {
      return items.map(item => {
        return {
          key: item.clerkId,
          label: item.name
        }
      })
    }
  }
}
</script>

