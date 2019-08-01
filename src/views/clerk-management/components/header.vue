<template>
  <div>
    <el-row style="margin: 10px">
      <el-button @click="dialogFormVisible=true">新建</el-button>
      <el-form :inline="true" :model="searchClerkForm" style="float: right;">
        <el-form-item>
          <el-select v-model="searchClerkForm.condition" placeholder="请选择">
            <el-option label="全部" value="0" />
            <el-option label="普通停车员" value="1" />
            <el-option label="经理" value="2" />
            <el-option label="管理员" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchClerkForm.text" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchClerk">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-dialog title="添加员工" :visible.sync="dialogFormVisible" center :before-close="closeDialog">
      <el-form ref="clerkForm" :model="clerkForm" :rules="clerkFormRules">
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="clerkForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="clerkForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" prop="role" :label-width="formLabelWidth">
          <el-select v-model="clerkForm.role">
            <el-option label="clerk" value="1" />
            <el-option label="manager" value="2" />
            <el-option label="admin" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话号码" prop="phoneNumber" :label-width="formLabelWidth">
          <el-input v-model="clerkForm.phoneNumber" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetClerkForm">重 置</el-button>
        <el-button type="primary" @click="addClerk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validEmail, validPhoneNumber } from '../../../utils/validate'

export default {
  name: 'Header',
  data() {
    const validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号码不能为空'))
      } else if (!validPhoneNumber(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('请输入正确的邮箱地址'))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      searchClerkForm: {
        condition: '',
        text: ''
      },
      clerkForm: {
        name: '',
        email: '',
        role: '',
        phoneNumber: ''
      },
      clerkFormRules: {
        phoneNumber: [
          { trigger: 'blur', validator: validateUserName }
        ],
        email: [
          { trigger: 'blur', validator: validateEmail }
        ]
      }

    }
  },
  methods: {
    addClerk() {
      this.$refs.clerkForm.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          const clerk = Object.assign({}, this.clerkForm)
          this.$store.dispatch('adminClerks/addNewClerk', clerk)
          this.resetClerkForm()
        } else {
          return false
        }
      })
    },
    resetClerkForm() {
      this.$refs['clerkForm'].resetFields()
    },
    closeDialog() {
      this.resetClerkForm()
      this.dialogFormVisible = false
    },
    async searchClerk() {
      let conditionRole = 0
      if (this.searchClerkForm.condition === '') {
        conditionRole = 0
      } else {
        conditionRole = parseInt(this.searchClerkForm.condition)
      }
      const conditionName = this.searchClerkForm.text
      await this.$store.dispatch('adminClerks/loadClerksFromAdmin', { name: conditionName, role: conditionRole })
    }
  }
}
</script>

<style scoped>
  .el-input {
    width: 200px;
  }
</style>
