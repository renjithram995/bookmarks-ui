<template>
    <div>
      <!-- Results List -->
      <div class="mt-4">
        <ul class="list-group" v-if="results.length">
          <li class="list-group-item aaa" v-for="result in results" :key="result.id">
            <span>{{ result.username || result.repo }}</span>
            <button v-if="result.repo" class="btn btn-secondary btn-sm float-end" @click="bookmark(result)">Bookmark</button>
          </li>
        </ul>
      </div>

      <!-- Pagination Controls -->
      <nav aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
        </li>

        <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>

        <li class="page-item">
          <span class="page-link">...</span>
        </li>

        <li class="page-item" :class="{ active: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(totalPages)">
            {{ totalPages }}
          </a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
    </div>
  </template>

<script>
export default {
  name: 'PaginateComponent',
  data () {
    return {
      maxVisiblePages: 5
    }
  },
  props: {
    results: {
      default: []
    },
    totalCount: {
      default: 0
    },
    currentPage: {
      default: 1
    },
    itemsPerPage: {
      default: 5
    }
  },
  computed: {
    totalPages () {
      return Math.ceil(this.totalCount / this.itemsPerPage)
    },
    visiblePages () {
      const pages = []
      const halfVisible = Math.floor(this.maxVisiblePages / 2)
      let startPage = Math.max(1, this.currentPage - halfVisible)
      let endPage = Math.min(this.totalPages, this.currentPage + halfVisible)

      if (this.currentPage <= halfVisible) {
        endPage = this.maxVisiblePages
      }

      if (this.currentPage + halfVisible >= this.totalPages) {
        startPage = this.totalPages - this.maxVisiblePages + 1
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      return pages
    },
    paginatedResults () {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.results.slice(start, end)
    }
  },
  methods: {
    changePage (page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('input', page)
      }
    },
    bookmark (result) {
      console.log('Bookmarking:', result)
      this.$emit('bookmark', result)
      // Implement your bookmark logic here
    }
  }
}
</script>

<style scoped>
.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
</style>
