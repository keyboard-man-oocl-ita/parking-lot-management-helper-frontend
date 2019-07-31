<template>
  <div>
    <el-row type="flex" justify="end" style="margin: 10px">
      <el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="dialogFormVisible = true">新建</el-button>
        </el-col>
      </el-col>
      <el-col :span="4" :offset="0">
        <el-input v-model="lowerLimit" placeholder="下限" />
      </el-col>
      <el-col :span="4" :offset="1">
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
import { createParkingLot, loadConditionalParkingLots } from '@/api/parkingLot'

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
  async mounted() {
    await this.$store.dispatch('loadParkingLots')
  },
  methods: {
    async createParkingLotImpl() {
      this.dialogFormVisible = false
      await createParkingLot(this.newParkingLot)
      this.$message({
        message: '新建停车场成功',
        type: 'success'
      })
      await this.$store.dispatch('loadParkingLots')
    },
    async loadConditionalParkingLotsImpl() {
      await loadConditionalParkingLots(this.parkingLotName, this.lowerLimit, this.upperLimit)
      this.$message({
        message: '搜索停车场成功',
        type: 'success'
      })
    }
  }
}
</script>
