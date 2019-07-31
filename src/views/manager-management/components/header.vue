<template>
  <el-row type="flex" justify="end">
    <el-col :span="4">
      <span>停车经理管理</span>
    </el-col>
    <el-col :span="4" :offset="8">
      <el-input v-model="name" placeholder="请输入姓名" />
    </el-col>
    <el-col :span="6">
      <el-input v-model="phoneNumber" placeholder="请输入电话号码" />
    </el-col>
    <el-col :span="2">
      <el-button type="primary" icon="el-icon-search" @click="loadAllManager">搜索</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ManagerManagermentHeader',
  data() {
    return {
      name: '',
      phoneNumber: ''
    }
  },
  mounted() {
    this.loadAllManager()
  },
  methods: {
    loadAllManager() {
      this.$store.dispatch('manager/loadManager')
    }
  }
}
</script>
