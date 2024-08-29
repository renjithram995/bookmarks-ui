<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">GitHub Bookmark</router-link>
        <div className="user-info">
          <span>Logged in as: <strong>{{ user?.username }}</strong></span>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/search">Search</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/userrepo">User Repositories</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/bookmarks">Bookmarks</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/graph">Graph</router-link>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <router-link class="nav-link" to="/login" @click="logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'NavigationBar',
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>
