<template>
    <div class="container">
      <h2>Search GitHub</h2>
      <form @submit.prevent="searchGitHub">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search for users or repositories"
            v-model="searchQuery"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
      <div class="mt-4">
        <ul class="list-group" v-if="results.length">
          <li class="list-group-item" v-for="result in results" :key="result.id">
            <span>{{ result.name || result.login }}</span>
            <button class="btn btn-secondary btn-sm float-end" @click="bookmark(result)">Bookmark</button>
          </li>
        </ul>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'SearchComponent',
  data () {
    return {
      searchQuery: '',
      results: []
    }
  },
  methods: {
    async searchGitHub () {
      // Mock search function
      this.results = [{ id: 1, name: 'repo1' }, { id: 2, login: 'user1' }]
    },
    async bookmark (item) {
      // Mock bookmark function
      console.log('Bookmarked', item)
    }
  }
}
</script>
