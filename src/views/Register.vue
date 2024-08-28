<template>
    <div class="container">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-3">
          <label for="usernameInput" class="form-label">UserName</label>
          <input id="usernameInput" type="text" class="form-control" v-model="username" required />
        </div>
        <div class="mb-3">
          <label for="emailInput" class="form-label">Email address</label>
          <input id="emailInput" type="email" class="form-control" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="passwordInput" class="form-label">Password</label>
          <input id="passwordInput" type="password" class="form-control" v-model="password" required autocomplete="new-password"/>
        </div>
        <div class="alert alert-danger" v-if="validation" id="validationMessage">{{ validation }}</div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </template>

<script>
import { mapActions } from 'vuex'
import service from '@/services/bookmarkService'
export default {
  name: 'UserRegister',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      validation: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    registerUser () {
      this.validation = ''
      service.post('/auth/register', {
        username: this.username,
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
