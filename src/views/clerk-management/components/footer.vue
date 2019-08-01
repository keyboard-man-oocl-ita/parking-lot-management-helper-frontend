<template>
  <el-row>
    <el-col :span="8" :offset="10">
      <el-pagination :page-size="10" :total="totalOfClerkForAdmin" layout="prev, pager, next" @current-change="updateCurrentPage" />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapGetters(['totalOfClerkForAdmin'])
  },
  methods: {
    updateCurrentPage(curr) {
      this.$store.dispatch('adminClerks/setCurrentPage', curr)
    }
  }
}
</script>

<style scoped>

</style>
