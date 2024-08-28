<template>
    <div class="container">
      <h2>Login</h2>
      <form class="needs-validation" @submit.prevent="loginUser">
        <div class="mb-3">
          <label for="usernameInput" class="form-label">Email address</label>
          <input id="usernameInput" type="email" class="form-control" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="passwordInput" class="form-label">Password</label>
          <input id="passwordInput" type="password" class="form-control" v-model="password" required />
        </div>
        <div class="alert alert-danger" v-if="validation" id="validationMessage">{{ validation }}</div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>

<script>
import { mapActions } from 'vuex'
import service from '@/services/bookmarkService'

export default {
  name: 'UserLogin',
  data () {
    return {
      email: '',
      password: '',
      validation: ''
    }
  },
  methods: {
    ...mapActions(['login']),

    loginUser () {
      this.validation = ''
      service.post('/auth/login', {
        email: this.email,
        password: this.password
      }).then(({ token, user }) => {
        this.login({ token, user })
        this.$router.push('/')
      }).catch((error) => {
        console.error(error)
        this.validation = error.msg || 'Unhandled Rejection'
      })
    }
  }
}
</script>
