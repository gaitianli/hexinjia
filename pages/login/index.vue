<template>
  <section class="container">
    <div class="login">
      <h2 class="login_join">Hi 欢迎加入</h2>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="请输入手机号码/用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="请输入密码">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <p class="login_tip">密码由6-20位英文字母和数字组成</p>
        <FormItem>
          <Button class="login_next" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </section>
</template>
<script>
import { Form, FormItem, Input, Icon } from 'iview'
import axios from '~/plugins/axios'
export default {
  components: {
    Form,
    FormItem,
    Input,
    Icon
  },
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 3, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      const { formInline } = this
      const password = formInline.password.trim()
      const mobile = localStorage.getItem('mobile')
      this.$refs[name].validate((valid) => {
        if (valid) {
          axios.post('/api/login', {
            mobile,
            password
          })
            .then((res) => {
              console.info('res', res)
              this.$Message.success('Success!')
            })
            .catch((error) => {
              // error({ statusCode: 404, message: 'User not found' })
              console.info('error', error)
            })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  .login{
    background-color: white;
    padding: 0 0.2rem;
    overflow: hidden;
    text-align: center;
    .login_join{
      color: aqua;
      font-size: 0.16rem;
      line-height: 0.16rem;
      margin: 0.2rem 0;
    }
    .login_tip{
      color: #cececc;
      font-size: 0.12rem;
      text-align: left;
    }
    .login_next{
      width: 100%;
      font-size: 0.14rem;
      background-color: blue;
    }
  }
}
</style>