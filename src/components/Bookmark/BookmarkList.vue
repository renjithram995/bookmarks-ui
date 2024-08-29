<template>
    <div class="container">
      <h2>Bookmarked Repositories</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="csvFile" class="form-label">Upload CSV File</label>
          <input type="file" ref="fileInput" class="form-control" id="csvFile" accept=".csv" @change="handleFileUpload">
        </div>
        <div :class="['alert',
            { 'alert-danger': validationType === 'Error', 'alert-warning': validationType === 'Warning', 'alert-success': validationType === 'Success'}]"
            v-if="formMessage" id="validationMessage">{{ formMessage }}</div>
        <button type="submit" :class="['btn btn-primary', {'disabled': !this.file}]">Upload</button>
      </form>
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
      itemsPerPage: 10, // Need to find as the expected viewport
      formMessage: '',
      validationType: '',
      file: null
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
    },
    handleFileUpload (event) {
      this.formMessage = ''
      this.validationType = ''
      this.file = event.target.files[0]
      if (!this.file || this.file.type !== 'text/csv') {
        this.file = null
        this.$refs.fileInput.value = ''
        this.formMessage = 'CSV files are only accepted'
        this.validationType = 'Error'
      }
    },
    handleSubmit () {
      if (!this.file) {
        this.formMessage = 'Please select a valid CSV file'
        this.validationType = 'Warning'
        return
      }
      const formData = new FormData()
      formData.append('file', this.file)
      service.post('/bookmarks/import', formData).then((response) => {
        this.file = null
        this.$refs.fileInput.value = ''
        this.formMessage = response.msg || 'Import Completed'
        this.validationType = 'Success'
        this.getAllBookMarks()
      }).catch((error) => {
        this.file = null
        this.$refs.fileInput.value = ''
        this.formMessage = error.msg || 'File Upload Failed'
        this.validationType = 'Error'
        console.error(error)
      })
    }
  }
}
</script>
