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
        <div class="mb-3">
      <div class="form-check form-check-inline" v-for="(type, i) in searchTypes" :key="type + i">
        <input
          class="form-check-input"
          type="radio"
          :id="type + 'search'"
          v-model="searchType"
          :value="type"
        />
        <label class="form-check-label" :for="type + 'search'">{{ type }}</label>
      </div>
    </div>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
      <div class="mt-4">
        <PaginateComponent v-if="results.length"
        :current-page="selectedPage"
        :results="results"
        :total-count="resultsCount"
        :itemsPerPage="itemsPerPage"
        @input="paginate"
        >
        </PaginateComponent>
      </div>
    </div>
  </template>

<script>
import PaginateComponent from '@/components/Paginate.vue'
import service from '@/services/bookmarkService'
export default {
  name: 'SearchComponent',
  components: {
    PaginateComponent
  },
  data () {
    return {
      searchQuery: '',
      searchTypes: ['repositories', 'users'],
      searchType: 'repositories',
      results: [],
      resultsCount: 0,
      selectedPage: 1,
      itemsPerPage: 5
    }
  },
  mounted () {
    this.searchGitHub()
    console.log(this.results)
  },
  watch: {
    searchType () {
      this.searchGitHub()
    }
  },
  methods: {
    paginate (value) {
      this.selectedPage = value
      this.searchGitHub()
    },
    searchGitHub () {
      console.log('searcgit')
      service.fetch(`/github/search/${this.searchType}?/query=${this.searchQuery}&skip=${this.selectedPage}&top=${this.itemsPerPage}`).then((response) => {
        this.results = response?.items || []
        this.resultsCount = response?.count || 0
      }).catch((error) => {
        console.error(error)
      })
    },
    async bookmark (item) {
      // Mock bookmark function
      console.log('Bookmarked', item)
    }
  }
}
</script>
