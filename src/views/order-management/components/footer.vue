<template>
  <el-row>
    <el-col :span="8" :offset="10">
      <el-pagination :page-size="10" :total="total" layout="prev, pager, next" @current-change="updateCurrentPage" />
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
    ...mapGetters(['total'])
  },
  methods: {
    updateCurrentPage(curr) {
      this.$store.dispatch('setCurrentPage', curr)
    }
  }
}
</script>
