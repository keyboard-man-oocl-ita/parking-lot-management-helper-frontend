<template>
  <el-row>
    <el-col :span="8" :offset="10">
      <el-pagination :page-size="10" :total="totalOfManager" layout="prev, pager, next" @current-change="updateCurrentPage" />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ManagerManagementFooter',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['totalOfManager'])
  },
  methods: {
    updateCurrentPage(curr) {
      this.$store.dispatch('manager/setCurrentPage', curr)
    }
  }
}
</script>
