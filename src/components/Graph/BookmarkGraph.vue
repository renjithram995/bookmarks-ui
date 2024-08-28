<template>
    <div class="container">
      <h2>Bookmarks Graph</h2>
      <canvas id="bookmarkGraph"></canvas>
    </div>
  </template>

<script>
// import Chart from 'chart.js/auto'

export default {
  data () {
    return {
      chart: null
    }
  },
  methods: {
    renderChart () {
      // const ctx = document.getElementById('bookmarkGraph').getContext('2d')
    //   this.chart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //       labels: ['January', 'February', 'March', 'April'],
    //       datasets: [
    //         {
    //           label: 'Bookmarks',
    //           data: [10, 20, 30, 40],
    //           borderColor: 'rgba(75, 192, 192, 1)',
    //           fill: false
    //         }
    //       ]
    //     }
    //   })
    }
  },
  onMounted () {
    this.renderChart()
  }
}
</script>
