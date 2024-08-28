<template>
    <div class="container">
      <h2>Bookmarked Repositories</h2>
      <ul class="list-group">
        <li class="list-group-item" v-for="bookmark in bookmarks" :key="bookmark.id">
          <span>{{ bookmark.name }}</span>
          <button class="btn btn-danger btn-sm float-end" @click="removeBookmark(bookmark.id)">Remove</button>
        </li>
      </ul>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      bookmarks: [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }]
    }
  },
  methods: {
    async removeBookmark (id) {
      // Mock remove function
      this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id)
    }
  }
}
</script>
