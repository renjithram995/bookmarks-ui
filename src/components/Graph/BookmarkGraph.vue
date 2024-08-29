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
    dummyDataGenerator () {
      const response = [{ count: 100, date: '2011-04-16' }, { count: 12, date: '2022-02-01' }, { count: 96, date: '2012-02-04' }, { count: 70, date: '2006-02-09' }, { count: 39, date: '2016-03-11' }, { count: 56, date: '2014-04-16' }, { count: 47, date: '2017-07-30' }, { count: 26, date: '2009-02-25' }, { count: 42, date: '2023-07-20' }, { count: 4, date: '2015-01-03' }, { count: 20, date: '2009-10-11' }, { count: 33, date: '2019-06-03' }, { count: 51, date: '2018-12-26' }, { count: 23, date: '2018-11-24' }, { count: 37, date: '2014-05-29' }, { count: 32, date: '2009-11-27' }, { count: 6, date: '2018-10-08' }, { count: 79, date: '2011-01-08' }, { count: 69, date: '2012-04-12' }, { count: 97, date: '2017-09-09' }, { count: 53, date: '2005-05-16' }, { count: 89, date: '2018-12-05' }]
      const groupData = this.groupBookMark(response)

      this.chartData = (groupData || []).reduce((accm, { date, count }) => {
        accm.labels.push(date)
        accm.datasets[0].data.push(count)
        return accm
      }, this.chartData)
      this.toggleChart = true
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
    // this.dummyDataGenerator()
  }
}
</script>
