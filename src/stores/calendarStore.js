import { defineStore } from 'pinia'
// import { useHeaderStore } from '@/stores/HeaderStore.js'
import { useStore } from '@/stores/loadingModal.js'
import moment from "moment";
import axios from "axios";

// const storeHeader = useHeaderStore()
const storeLoading = useStore()


export const useCalendarStore = defineStore({
  id: 'calendar',
  state: () => ({
    header: { 
      'Content-Type': 'application/json',
      "G-ClientID":   localStorage.getItem('access-token'),
      },
    listBooking: [
        {id:388, booker_contact: '9792172012',booker_name: "Test Reminder 11h35 PM",end: "2022-04-11 23:35:00",status: "confirmed"},
        {id:389, booker_contact: '9792172012',booker_name: "Test Reminder 11h35 PM",end: "2022-04-11 23:35:00",status: "confirmed"},
        {id:389, booker_contact: '9792172012',booker_name: "Test Reminder 11h35 PM",end: "2022-04-11 23:35:00",status: "confirmed"},
    ],
    selectedDateId: '',
    selectedDateIdPast: '',
    selectedIndexOfWeeks: 0,
    month:'',
    year:'',
    weekList: [],
    swiperKey:0,
    calendarKey:0,
    weekMouted: false,
    monthList:[
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
  ],
    dayCountMonth: [],
    dayCountMonthPast: '',

    dayCountWeek: [],
    dayCountWeekPast: '',
    statusFillter:'',
    searchValue:'',

  }),
  getters: {
    getlistBooking: (state) => state.listBooking,
    getWeekList: (state) => state.weekList,
    getDayCountMonth: (state) => state.dayCountMonth,
    getDayCountWeek: (state) => state.dayCountWeek,
    getSelectedDateId: (state) => state.selectedDateId,
    getSelectedIndexOfWeeks: (state) => state.selectedIndexOfWeeks,
    getMonthTitle: (state) => state.month,
    getYearTitle: (state) => state.year,
    getSwiperKey: (state) => state.swiperKey,
    getCalendarKey: (state) => state.calendarKey,
    getWeekMouted: (state) => state.weekMouted,
    getStatusFillter: (state) => state.statusFillter,
    getSearchValue: (state) => state.searchValue,
    

  },
  actions: {
    setWeekList(day){
      let index = moment(day).day()
      let thisWeek = moment(day).subtract(index, 'days')
      this.resetWeekList()
      this.selectedIndexOfWeeks = index
      for(let i = 0; i <= 6; i++){
        let week = moment(thisWeek).add(i, 'days')
        this.weekList[10].children[i].day = moment(week).format('YYYY-MM-DD')
        for(let x = 1 ; x <= 10 ; x++){
            let lastWeek = moment(thisWeek).subtract(7*(x), 'days')
            let nextWeek = moment(thisWeek).add(7*(x), 'days')
            let week1 = moment(lastWeek).add(i, 'days')
            let week2 = moment(nextWeek).add(i, 'days')
            this.weekList[10-x].children[i].day = moment(week1).format('YYYY-MM-DD')
            this.weekList[10+x].children[i].day = moment(week2).format('YYYY-MM-DD')
          }
        }
        // console.log('wwwwweeek',this.weekList);
    },

    resetWeekList(){
      this.weekList = []
      for(let i = 1 ; i <= 21 ; i++){
        this.weekList.push(
          {
            children:[
            {name: 'Sun', day: '2022-05-01', count: 0},
            {name: 'Mon', day: '2022-05-01', count: 0},
            {name: 'Tue', day: '2022-05-01', count: 0},
            {name: 'Wed', day: '2022-05-01', count: 0},
            {name: 'Thu', day: '2022-05-01', count: 0},
            {name: 'Fri', day: '2022-05-01', count: 0},
            {name: 'Sat', day: '2022-05-01', count: 0},
            ],
          },
        )
      }
    },

    unshiftWeekList(){
      let child = [
          {name: 'Sun', day: '2022-05-01', count: 0},
          {name: 'Mon', day: '2022-05-01', count: 0},
          {name: 'Tue', day: '2022-05-01', count: 0},
          {name: 'Wed', day: '2022-05-01', count: 0},
          {name: 'Thu', day: '2022-05-01', count: 0},
          {name: 'Fri', day: '2022-05-01', count: 0},
          {name: 'Sat', day: '2022-05-01', count: 0},
        ]
        let date = new Date(this.weekList[0].children[0].day)
        let dateStart = moment(date).subtract(7, 'days')
        for(let i = 0; i <= 6; i++){
            let week = moment(dateStart).add(i, 'days')
            child[i].day = moment(week).format('YYYY-MM-DD')
        }
        this.weekList.unshift({children: child})
    },

    pushWeekList(){
      let child = [
          {name: 'Sun', day: '2022-05-01', count: 0},
          {name: 'Mon', day: '2022-05-01', count: 0},
          {name: 'Tue', day: '2022-05-01', count: 0},
          {name: 'Wed', day: '2022-05-01', count: 0},
          {name: 'Thu', day: '2022-05-01', count: 0},
          {name: 'Fri', day: '2022-05-01', count: 0},
          {name: 'Sat', day: '2022-05-01', count: 0},
        ]
        let index = this.weekList.length - 1
        let date = new Date(this.weekList[index].children[0].day)
        let dateStart = moment(date).add(7, 'days')
        for(let i = 0; i <= 6; i++){
            let week = moment(dateStart).add(i, 'days')
            child[i].day = moment(week).format('YYYY-MM-DD')
        }
        this.weekList.push({children: child})
    },

    setMonthTitle(index){
      let startCount =false
      let count = 0
      let myDate = new Date()
      if(this.weekList.length != 0){
        for(let y = 0 ; y <= 6 ; y++){
          myDate = new Date(this.weekList[index].children[y].day)
          if (myDate.getDate() == 1 || startCount){
            count++
            startCount = true
          }
        }
        this.year = myDate.getFullYear()
      }
      if(count > 3 || count == 0){
          this.month = this.monthList[myDate.getMonth()]
          if(myDate.getMonth() == 0 || myDate.getMonth() == 11){
              this.year = myDate.getFullYear()
          }
      }
      else{
          this.month = myDate.getMonth() == 0 ? this.monthList[11] : this.monthList[myDate.getMonth() - 1]
          if(myDate.getMonth() == 0 || myDate.getMonth() == 11){
              this.year = myDate.getFullYear() -1
          }
      }
    },

    addKey(){
      this.swiperKey++
    },

    async selectedDate(date){
      if(this.selectedDateId != date){
        this.selectedDateId = date
        let index = new Date(date).getDay()
        this.selectedIndexOfWeeks = index
        let requestOptions = {
          method: 'GET',
          headers: this.header
        };
        let get = await fetch(`https://booking-apiv2.gocheckin.net/v1/admin/appointment/list-all?date=${date}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data && data.status == 'OK' && data.result.status == 'OK'){
                this.listBooking = []
                this.listBooking = data.result.data
                this.listBooking.map(item => item.search = true)
            }
          })
      }
    },

    async setDayCountMonth(date){
      let month = moment(date).format('MM')
      if(this.dayCountMonthPast != month){
        this.dayCountMonthPast = month
        let end = moment(date).clone().endOf('month').format('YYYY-MM-DD')
        let start = moment(date).clone().set("date",1).format('YYYY-MM-DD')
        let requestOptions = {
          method: 'GET',
          headers: this.header
      };
  
      let dataInfo = await fetch(`https://booking-apiv2.gocheckin.net/v1/admin/appointment/list-count?from=${start}&to=${end}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data && data.status == 'OK' && data.result.status == 'OK')
          this.dayCountMonth = []
          this.dayCountMonth = data.result.data
        })
      }
    },

    async setDayCountWeek(date){
      let index = moment(date).day()
      let weekStart = moment(date).subtract(index, 'days').format('YYYY-MM-DD')
      // console.log('weekStart',weekStart);
      // console.log('weekStarssssssst',this.dayCountWeekPast);
      if(weekStart != this.dayCountWeekPast){
        this.dayCountWeekPast = weekStart
        
        let weekEnd = moment(weekStart).add(7, 'days').format('YYYY-MM-DD')
        let requestOptions = {
          method: 'GET',
          headers: this.header
        };
        let loginInfo = await fetch(`https://booking-apiv2.gocheckin.net/v1/admin/appointment/list-count?from=${weekStart}&to=${weekEnd}`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if(data && data.status == 'OK' && data.result.status == 'OK'){
      // console.log('data.result.status',data.result.data);

            // for(let i = 0; i < data.result.data.length; i++){
              this.dayCountWeek = []
              this.dayCountWeek = data.result.data
            // }
          }
        })
      }

    },

    selectedStatus(status){
      this.statusFillter = status
    },

    searchCustomer(value){
      this.listBooking.map(item => item.search = true)
      for(let i = 0 ; i < this.listBooking.length ; i++){
        let name =  this.nonAccentVietnamese(this.listBooking[i].booker_name)
        let search = this.nonAccentVietnamese(value)

        this.listBooking[i].search = name.includes(search)
      }
    },

    nonAccentVietnamese(str){
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      // Some system encode vietnamese combining accent as individual utf-8 characters
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
      str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
      return str;
  },


  }
})
