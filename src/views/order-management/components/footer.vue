<template>
  <el-row>
    <el-col :span="8" :offset="10">
      <el-pagination :page-size="10" :total="totalOfOrder" layout="prev, pager, next" @current-change="updateCurrentPage" />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderManagementFooter',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['totalOfOrder'])
  },
  methods: {
    updateCurrentPage(curr) {
      this.$store.dispatch('order/setCurrentPage', curr)
    }
  }
}
</script>
