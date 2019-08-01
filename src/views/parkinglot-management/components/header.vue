<template>
  <div>
    <el-row type="flex" justify="end" style="margin: 10px">
      <el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true">新建</el-button>
        </el-col>
      </el-col>
      <el-col>
        <el-button type="primary" @click="refresh">刷新</el-button>
      </el-col>
      <el-col :span="5" :offset="0">
        <el-input v-model="lowerLimit" placeholder="下限" />
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input v-model="upperLimit" placeholder="上限" />
      </el-col>
      <el-col :span="10" :offset="1">
        <el-input v-model="parkingLotName" placeholder="停车场名字" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="loadConditionalParkingLotsImpl">搜索</el-button>
      </el-col>

      <el-dialog title="新建停车场" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="停车场名字">
            <el-input v-model="newParkingLot.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="容量">
            <el-input v-model="newParkingLot.capacity" autocomplete="off" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="newParkingLot.description" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createParkingLotImpl">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import { createParkingLot } from '../../../api/parkingLot'
import { loadConditionalParkingLots } from '../../../api/parkingLot'

export default {
  name: 'ParkingLotManagementHeader',
  data() {
    return {
      lowerLimit: '',
      upperLimit: '',
      parkingLotName: '',
      dialogFormVisible: false,
      newParkingLot: {
        name: '',
        capacity: '',
        description: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    loadConditionalParkingLotsImpl() {
      loadConditionalParkingLots(this.parkingLotName, this.lowerLimit, this.upperLimit).then((res) => {
        this.$store.commit('parkingLot/LOAD_PARKING_LOT', res)
        this.$message({
          message: '搜索成功',
          type: 'success'
        })
      }).catch((error) => {
        console.log(error)
        this.$message.error('搜索失败')
      })
    },
    createParkingLotImpl() {
      createParkingLot(this.newParkingLot).then(() => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      }).catch(error => console.log(error))
      this.dialogFormVisible = false
    },
    refresh() {
      this.$store.dispatch('parkingLot/loadParkingLotAct').then(() => {
        this.$message({
          message: '刷新成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
