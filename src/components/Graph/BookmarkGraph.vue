<template>
    <div class="container d-flex flex-column h-100">
      <h2>Bookmarks Graph</h2>
      <div>
        <Line v-if="toggleChart" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import service from '@/services/bookmarkService'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'BookmarkGraph',
  components: {
    Line
  },
  data () {
    return {
      chartData: {
        labels: [], // x-axis
        datasets: [
          {
            label: 'Bookmarked repositories over time', // plot name
            backgroundColor: '#f87979', // plot color
            data: [] // y-axis plot
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      toggleChart: false
    }
  },
  methods: {
    getAllBookMarks () {
      this.toggleChart = false
      service.fetch('/bookmarks/count/').then((response) => {
        console.log(this.chartData)
        this.chartData = (response || []).reduce((accm, { date, count }) => {
          accm.labels.push(date)
          accm.datasets[0].data.push(count)
          return accm
        }, this.chartData)
        this.toggleChart = true
      }).catch((error) => {
        console.error(error)
      })
    },
    groupBookMark (bookMarks, type = 'month') {
      if (bookMarks.length < 10 || type === 'year') return bookMarks
      const groupedData = bookMarks.reduce((accum, bookmark) => {
        const groupKey = bookmark.date.slice(0, type === 'month' ? 7 : 4)
        if (!accum[groupKey]) {
          accum[groupKey] = 0
        }
        accum[groupKey] += bookmark.count
        return accum
      }, {})

      const bookMarkData = Object.entries(groupedData)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
      return bookMarkData
    }
  },
  mounted () {
    this.getAllBookMarks()
  }
}
</script>
