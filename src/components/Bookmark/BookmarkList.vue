<template>
    <div class="container">
      <h2>Bookmarked Repositories</h2>
      <div class="mt-4">
        <ListComponent v-if="results.length"
        :current-page="selectedPage"
        :results="results"
        :total-count="resultsCount"
        :itemsPerPage="itemsPerPage"
        type='BookmarkList'
        @input="paginate"
        @splice="spliceBookMark"
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
  name: 'BookmarkList',
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
    this.getAllBookMarks()
  },
  methods: {
    paginate (value) {
      this.selectedPage = value
    },
    getAllBookMarks () {
      service.fetch('/bookmarks/').then((response) => {
        this.results = response || []
        this.resultsCount = (response || []).length
      }).catch((error) => {
        console.error(error)
      })
    },
    spliceBookMark (index) {
      this.results.splice(index, 1)
    }
  }
}
</script>
