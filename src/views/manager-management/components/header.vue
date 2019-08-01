<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="name" placeholder="请输入姓名" style="width: 200px;" />
      <el-input v-model="phoneNumber" placeholder="请输入电话号码" style="width: 200px;" />
      <el-button type="primary" icon="el-icon-search" @click="loadAllManager">搜索</el-button>
    </div>
  </div>

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
  methods: {
    loadAllManager() {
      this.$store.dispatch('manager/loadManager')
    }
  }
}
</script>
