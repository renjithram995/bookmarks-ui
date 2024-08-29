<template>
    <div class="container">
      <h2>User Repositories</h2>
      <div class="mt-4">
        <ListComponent v-if="results.length"
        :current-page="selectedPage"
        :results="results"
        :total-count="resultsCount"
        :itemsPerPage="itemsPerPage"
        type='UserRepoList'
        @input="paginate"
        >
        </ListComponent>
      </div>
    </div>
  </template>

<script>
import ListComponent from '@/components/ListComponent'
import service from '@/services/bookmarkService'
import { mapState } from 'vuex'
export default {
  name: 'UserRepoList',
  components: {
    ListComponent
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      results: [],
      resultsCount: 0,
      selectedPage: 1,
      itemsPerPage: 10 // Need to find as the expected viewport
    }
  },
  mounted () {
    this.getUserRepo()
  },
  methods: {
    paginate (value) {
      this.selectedPage = value
    },
    getUserRepo () {
      service.fetch(`/github/user/${this.user?.username}?/skip=${this.selectedPage}&top=${this.itemsPerPage}`).then((response) => {
        this.results = response?.items || []
        this.resultsCount = (response?.items || []).length
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
