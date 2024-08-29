<template>
    <div>
      <!-- Results List -->
      <div class="mt-4">
        <ul class="list-group" v-if="paginatedResults.length">
          <li class="list-group-item aaa" v-for="(result, i) in paginatedResults" :key="result.id">
            <span>{{ result.repoName || result.username }}</span>
            <!-- <button  class="btn btn-secondary btn-sm float-end">Bookmark</button> -->
            <button v-if="result.repoName" @click="bookmark(result, i)"
                :class="['btn btn-secondary btn-sm float-end',
                    {'btn-success': result.bookMarked },
                    {'disabled': result.saveBookMark }]">
                <i :class="['bi', {'bi-star': !result.bookMarked, 'bi-star-fill': result.bookMarked}]"></i>
                    {{ result.bookMarked ? 'Bookmarked' : 'Bookmark' }}
            </button>
          </li>
        </ul>
      </div>

      <!-- Pagination Controls -->
      <nav aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li v-if="visiblePages.length > 1" :class="['page-item', { disabled: currentPage === 1 }]">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
        </li>

        <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>

        <li v-if="visiblePages.length > 1 && totalPages > maxVisiblePages" class="page-item">
          <span class="page-link">...</span>
        </li>

        <li v-if="visiblePages.length > 1 && totalPages > maxVisiblePages" :class="['page-item', { active: currentPage === totalPages }]">
          <a class="page-link" href="#" @click.prevent="changePage(totalPages)">
            {{ totalPages }}
          </a>
        </li>

        <li v-if="visiblePages.length > 1" class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
    </div>
  </template>

<script>
import service from '@/services/bookmarkService'
export default {
  name: 'ListComponent',
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
    },
    type: {
      type: String,
      required: true
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

      if (startPage === endPage) {
        return pages
      }
      if (endPage >= this.maxVisiblePages && this.currentPage <= halfVisible) {
        endPage = this.maxVisiblePages
      }

      if (this.totalPages > this.maxVisiblePages && this.currentPage + halfVisible >= this.totalPages) {
        startPage = this.totalPages - this.maxVisiblePages + 1
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      return pages
    },
    paginatedResults () {
      if (this.type === 'SearchList') return this.results
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
    bookmark (repository, idx) {
      const { repoName, repoUrl, bookMarkId, bookMarked } = repository
      repository.saveBookMark = true
      const promise = bookMarked ? service.delete(`/bookmarks/bookmark/${bookMarkId}`) : service.post('/bookmarks/bookmark', { repoName, repoUrl })
      promise.then((response) => {
        delete repository.saveBookMark
        if (repository.bookMarked) {
          if (this.type === 'BookmarkList') {
            this.$emit('splice', idx)
          } else {
            delete repository.bookMarked
            delete repository.bookMarkId
          }
        } else {
          repository.bookMarked = true
          repository.bookMarkId = response.id
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
</script>

<style scoped>
.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
</style>
