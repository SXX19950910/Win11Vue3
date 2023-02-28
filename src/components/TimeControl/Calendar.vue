<template>
  <div class="win-calendar">
    <div class="win-calendar__header text-14 flex justify-between items-center w-full">
      <div class="left-time">
        <div class="mb-[10px]">{{ dateText }}</div>
        <div>{{ nlDate }}</div>
      </div>
    </div>
    <div class="win-calendar__body">
      <div class="title-block flex items-center justify-between w-full">
        <div class="left-year w-full text-13">{{ currentYearMonth }}</div>
        <div class="right-btn flex items-center">
          <div class="btn mx-2" @click.stop="handlePrev">
            <el-icon>
              <CaretTop />
            </el-icon>
          </div>
          <div class="btn" @click.stop="handleNext">
            <el-icon>
              <CaretBottom />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="content-block">
        <div class="week-box pb-8 flex items-center flex-nowrap">
          <div v-for="item in weekList" :key="item" class="item w-1/6 text-center text-12 font-bold">
            {{ item }}
          </div>
        </div>
        <el-scrollbar ref="dayWrapper" class="day-box h-[240px] overflow-auto">
          <div v-for="(item, index) in calendar" :key="index" class="row">
            <div v-for="(calendarItem, cIndex) in item.list" :key="cIndex" class="flex items-center flex-nowrap justify-around">
              <div v-for="tag in calendarItem" class="item w-[40px] h-[40px] flex items-center justify-center flex-col text-center text-13" :key="tag" :class="{ 'disabled': tag.disabled }">
                <div>{{ tag.day || tag }}</div>
                <div class="tex-12 mt-1 scale-[0.86] sub-day">{{ tag.nDay }}</div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { calendar } from 'js-calendar-converter'
import { ElScrollbar } from 'element-plus'
import { initMonthCalendar } from '@/utils/date'
import moment from 'moment'
export default {
  name: 'WinCalendar',
  components: {
    ElScrollbar
  },
  data() {
    return {
      dateText: '',
      nlDate: '',
      currentYearMonth: '',
      weekList: ['一', '二', '三', '四', '五', '六', '日'],
      calendar: [],
      currentDate: ''
    }
  },
  created() {
    this.initTimer()
    this.initCalendar()
    console.log(this.calendar)
  },
  methods: {
    initTimer() {
      const solar2lunar = calendar.solar2lunar(moment().year(), (moment().month() + 1), moment().date())
      this.nlDate = solar2lunar.IMonthCn + solar2lunar.IDayCn
      this.currentYearMonth = moment().format('YYYY年MM月')
      const day = moment().day()
      const zhDayMap = {
        0: '星期天',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六'
      }
      this.dateText = `${moment().format('MM月DD日')},${zhDayMap[day]}`
    },
    initCalendar() {
      const date = moment().format('YYYY-MM-DD')
      this.calendar.push({
        list: initMonthCalendar(date)
      })
    },
    handlePrev() {
      const $container = this.$refs.dayWrapper.$el
      const $scroll = $container.querySelector('.el-scrollbar__wrap')
      this.currentDate = this.currentDate ? this.currentDate.subtract(1, 'M') : moment().subtract(1, 'M')
      this.currentYearMonth = this.currentDate.format('YYYY年MM月')
      if (this.calendar.length === 2) {
        this.calendar[0].list = JSON.parse(JSON.stringify(this.calendar[1].list))
        $scroll.scrollTop = $container.offsetHeight
        this.calendar[0].list = initMonthCalendar(this.currentDate.format('YYYY-MM-DD'))
        this.$nextTick(() => {
          $scroll.scrollTo({
            top: -$scroll.scrollTop,
            left: 0,
            behavior: 'smooth'
          })
        })
      }
    },
    handleNext() {
      const $container = this.$refs.dayWrapper.$el
      const $scroll = $container.querySelector('.el-scrollbar__wrap')
      this.currentDate = this.currentDate ? this.currentDate.add(1, 'M') : moment().add(1, 'M')
      this.currentYearMonth = this.currentDate.format('YYYY年MM月')
      if (this.calendar.length < 2) {
        this.calendar.push({
          list: initMonthCalendar(this.currentDate.format('YYYY-MM-DD'))
        })
        this.$nextTick(() => {
          $scroll.scrollTo({
            top: $container.offsetHeight,
            left: 0,
            behavior: 'smooth'
          })
        })
      } else {
        this.calendar.splice(0, 1)
        this.$nextTick(() => {
          this.calendar.push({
            list: initMonthCalendar(this.currentDate.format('YYYY-MM-DD'))
          })
          this.$nextTick(() => {
            $scroll.scrollTo({
              top: $container.offsetHeight,
              left: 0,
              behavior: 'smooth'
            })
          })
        })
      }
    }
  }
}
</script>

<style lang="less">
.win-calendar {
  right: 5px;
  box-sizing: border-box;
  position: absolute;
  bottom: 60px;
  width: 336px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  user-select: none;
  &__header {
    padding: 15px 15px;
    background-color: rgba(218,222,230, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #D1CFE2;
  }
  &__body {
    background-color: rgba(245,245,245, 1);
    backdrop-filter: blur(10px);
    padding-bottom: 10px;
    .title-block {
      padding: 10px;
      .left-year {
        padding: 10px;
        border-radius: 4px;
        &:hover {
          background-color: rgba(153,153,153, 0.15)
        }
      }
      .right-btn {
        .btn {
          padding: 7px;
          border-radius: 4px;
          color: #7B7F85;
          &:hover {
            background-color: rgba(153,153,153, 0.15)
          }
        }
      }
    }
    .content-block {
      .week-box {
      }
      .day-box {
        .item {
          border-radius: 100%;
          &:hover {
            background-color: #E9EBF1;
          }
          &.disabled {
            color: #C1C9CC;
            .sub-day {
              color: #C1C9CC;
            }
          }
          .sub-day {
            color: #808286;
          }
        }
      }
    }
  }
}
</style>