<template>
  <el-row>
    <el-col>
      <el-table :data="parkingLots">
        <el-table-column label="ID" prop="parkingLotId" />
        <el-table-column label="名字" prop="name" />
        <el-table-column label="大小" prop="capacity" />
        <el-table-column align="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="openDialogAndSetParkingLotId(scope.row)">修改</el-button>
            <el-button v-if="scope.row.status === 1" type="danger" @click="logoutOrActivateParkingLotImpl(scope.row)">注销</el-button>
            <el-button v-if="scope.row.status === 0" type="success" @click="logoutOrActivateParkingLotImpl(scope.row)">激活</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog title="修改停车场" :visible.sync="dialogFormVisible" :before-close="clearAlterParkingLotContent">
      <el-form>
        <el-form-item label="停车场名字">
          <el-input v-model="alterParkingLot.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="容量">
          <el-input v-model="alterParkingLot.capacity" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearAlterParkingLotContent">取 消</el-button>
        <el-button type="primary" @click="alterParkingLotImpl">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { logoutOrActivateParkingLot } from '../../../api/parkingLot'
import { alterParkingLot } from '../../../api/parkingLot'

export default {
  name: 'ParkingLotManagementTable',
  data() {
    return {
      LOGOUT_STATUS: 0,
      ACTIVE_STATUS: 1,
      dialogFormVisible: false,
      alterParkingLotId: '',
      alterParkingLot: {
        name: '',
        capacity: ''
      }
    }
  },
  computed: {
    ...mapGetters(['parkingLots']),
    ...mapGetters(['searching'])
  },
  mounted() {
    this.getParkingLots()
  },
  methods: {
    openDialogAndSetParkingLotId(parkingLot) {
      this.alterParkingLotId = parkingLot.parkingLotId
      this.alterParkingLot.name = parkingLot.name
      this.alterParkingLot.capacity = parkingLot.capacity
      this.dialogFormVisible = true
    },
    async getParkingLots() {
      await this.$store.dispatch('parkingLot/loadParkingLotAct')
    },
    logoutOrActivateParkingLotImpl(parkingLot) {
      logoutOrActivateParkingLot(parkingLot).then(() => {
        this.$store.dispatch('parkingLot/loadParkingLotAct')
        if (parkingLot.status === this.LOGOUT_STATUS) {
          this.$message({
            message: `已激活${parkingLot.name}`,
            type: 'success'
          })
        } else {
          this.$message({
            message: `已注销${parkingLot.name}`,
            type: 'warning'
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error(`操作${parkingLot.newParkingLot}失败`)
      })
    },
    alterParkingLotImpl() {
      if (this.alterParkingLot.name === '' || this.alterParkingLot.capacity === '') {
        this.$message.error('请输入完整信息')
      } else {
        alterParkingLot(this.alterParkingLotId, this.alterParkingLot).then(() => {
          this.$store.dispatch('parkingLot/loadParkingLotAct')
          this.clearAlterParkingLotContent()
          this.$message({
            message: '修改停车场成功',
            type: 'success'
          })
        }).catch((error) => {
          console.log(error)
          this.$message.error('修改失败')
        })
      }
    },
    clearAlterParkingLotContent() {
      this.alterParkingLotId = ''
      this.alterParkingLot.name = ''
      this.alterParkingLot.capacity = ''
      this.dialogFormVisible = false
    }
  }
}
</script>
