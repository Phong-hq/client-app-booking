<template>
    <div class="week-block">
        <div class="header relative flex flex-center">
            <div class="title">{{monthTitle}} {{yearTitle}}</div>
            <div class="absolute top-0 w-full flex justify-between items-center">
                <div class="arrow flex flex-center" @click="mySwiper.slidePrev()">
                    <svg class="vc-svg-icon" width="26px" height="26px" viewBox="0 -1 16 34"><path d="M11.196 10c0 0.143-0.071 0.304-0.179 0.411l-7.018 7.018 7.018 7.018c0.107 0.107 0.179 0.268 0.179 0.411s-0.071 0.304-0.179 0.411l-0.893 0.893c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-8.321-8.321c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l8.321-8.321c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l0.893 0.893c0.107 0.107 0.179 0.25 0.179 0.411z"></path></svg>
                </div>
                <div class="arrow flex flex-center" @click="mySwiper.slideNext()">
                    <svg class="vc-svg-icon" width="26px" height="26px" viewBox="-5 -1 16 34"><path d="M10.625 17.429c0 0.143-0.071 0.304-0.179 0.411l-8.321 8.321c-0.107 0.107-0.268 0.179-0.411 0.179s-0.304-0.071-0.411-0.179l-0.893-0.893c-0.107-0.107-0.179-0.25-0.179-0.411 0-0.143 0.071-0.304 0.179-0.411l7.018-7.018-7.018-7.018c-0.107-0.107-0.179-0.268-0.179-0.411s0.071-0.304 0.179-0.411l0.893-0.893c0.107-0.107 0.268-0.179 0.411-0.179s0.304 0.071 0.411 0.179l8.321 8.321c0.107 0.107 0.179 0.268 0.179 0.411z"></path></svg>
                </div>
            </div>
        </div>
         <swiper
            class="mb-12"
            :slides-per-view="1"
            :space-between="50"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            :options="swiperOptionTop"
            :key="swiperKey"
        >
            <swiper-slide v-for="(slide, i) in weekList" :key="i">
                <div class="weeks" :key="weekItemKey">
                    <div class=" w-full h-full flex items-center justify-center"  v-for="(item, x) in slide.children" :key="x">
                        <div>
                            <div class="items w-full h-full flex flex-col flex-center cursor-pointer" :class="selectedIndexOfWeeks == x ? 'active' :''" @click="selected(item, x)">
                                <div class="notify w-full h-full flex flex-col justify-center" :data-value="item.count" :class="item.count > 0 ? 'show' : ''">
                                    <div class="week-title">{{item.name}}</div>
                                    <div class="text-16px text-center" :class="x == 0 || x == 6 ? 'text-red-day' : ''">{{ moment(item.day).format('DD')}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, defineEmits } from 'vue'
import moment from "moment";
import { useStore } from '@/stores/loadingModal.js'
import { useCalendarStore } from '@/stores/calendarStore.js'


  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'




onMounted(async () => {
})
    const storeLoading = useStore()
    const store = useCalendarStore()
    const weekList = computed(() => store.getWeekList)
    const dayCount = computed(() => store.getDayCountWeek)
    const selectedDateId = computed(() => store.getSelectedDateId)
    const selectedIndexOfWeeks = computed(() => store.getSelectedIndexOfWeeks)
    const monthTitle = computed(() => store.getMonthTitle)
    const yearTitle = computed(() => store.getYearTitle)
    const swiperKey = computed(() => store.getSwiperKey)







    // CREATE DATA
    const date = new Date();
    const weekStart = new Date();
    const weekEnd = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const swiperMouted = ref(false)
    const weekItemKey = ref(0)
    const selectedDate = ref(null)
    const timezone = ref('US/Hawaii')
    const selectedIndex = ref(1)
    const myCarousel = ref(null)
    const type = ref('')
    const mySwiper = ref(null)
    const swiperOptionTop = ref(null)
    const  masks =ref({
        weekdays: 	"WWW",
    })
    const monthList = ref([
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
    ])

    const dayOfWeek = ref([
        {
            children:[
            {name: 'Sun', day: '2022-05-01'},
            {name: 'Mon', day: '2022-05-01'},
            {name: 'Tue', day: '2022-05-01'},
            {name: 'Wed', day: '2022-05-01'},
            {name: 'Thu', day: '2022-05-01'},
            {name: 'Fri', day: '2022-05-01'},
            {name: 'Sat', day: '2022-05-01'},
            ],
        },
        {
            children:[
            {name: 'Sun', day: '2022-05-01'},
            {name: 'Mon', day: '2022-05-01'},
            {name: 'Tue', day: '2022-05-01'},
            {name: 'Wed', day: '2022-05-01'},
            {name: 'Thu', day: '2022-05-01'},
            {name: 'Fri', day: '2022-05-01'},
            {name: 'Sat', day: '2022-05-01'},
            ],
        },
        {
            children:[
            {name: 'Sun', day: '2022-05-01'},
            {name: 'Mon', day: '2022-05-01'},
            {name: 'Tue', day: '2022-05-01'},
            {name: 'Wed', day: '2022-05-01'},
            {name: 'Thu', day: '2022-05-01'},
            {name: 'Fri', day: '2022-05-01'},
            {name: 'Sat', day: '2022-05-01'},
            ],
        },
        {
            children:[
            {name: 'Sun', day: '2022-05-01'},
            {name: 'Mon', day: '2022-05-01'},
            {name: 'Tue', day: '2022-05-01'},
            {name: 'Wed', day: '2022-05-01'},
            {name: 'Thu', day: '2022-05-01'},
            {name: 'Fri', day: '2022-05-01'},
            {name: 'Sat', day: '2022-05-01'},
            ],
        },
        {
            children:[
            {name: 'Sun', day: '2022-05-01'},
            {name: 'Mon', day: '2022-05-01'},
            {name: 'Tue', day: '2022-05-01'},
            {name: 'Wed', day: '2022-05-01'},
            {name: 'Thu', day: '2022-05-01'},
            {name: 'Fri', day: '2022-05-01'},
            {name: 'Sat', day: '2022-05-01'},
            ],
        },
    ])

    // CREATE FUNTIONS
    const selected = async (item,i) => {
        storeLoading.openLoading()
        await store.selectedDate(item.day)
        storeLoading.closeLoading()

    }

    const onSwiper = (swiper) => {
        swiper.slideTo(10, -10 , true)
        if(type.value == 'push'){
            swiper.slideTo(weekList.value.length -11, -10 , true)
        }else if(type.value == ''){
            swiper.slideTo(10, -10 , true)
        }
        mySwiper.value = swiper
      };

      const onSlideChange = async (swiper) => {
        swiperMouted.value =true
            type.value = ''
        if(swiper.activeIndex == 1){
            for(let i = 1; i<= 10 ; i++){
                store.unshiftWeekList()
                store.addKey()
            }
            type.value = 'unshift'
        }
        if(swiper.activeIndex == weekList.value.length -2){
            for(let x = 1; x<= 10 ; x++){
                store.pushWeekList()
            }
            type.value = 'push'
            store.addKey()

        }
        storeLoading.openLoading()
        await store.selectedDate(weekList.value[swiper.activeIndex].children[selectedIndexOfWeeks.value].day)
        await store.setDayCountWeek(selectedDateId.value)
        await store.setMonthTitle(swiper.activeIndex)
        showNotify(swiper.activeIndex)
        storeLoading.closeLoading()
      };


      const showNotify = (index) => {
          if(weekList.value.length != 0){
              for(let i = 0 ; i < dayCount.value.length ; i ++){
                  
                  let x = weekList.value[index].children.findIndex(item => item.day == dayCount.value[i].day)
                if(x >= 0){
                    weekList.value[index].children[x].count = dayCount.value[i].count
                }
          }
        }
        weekItemKey.value++
      }


</script>

<style lang="scss">
    @import '@/assets/scss/home/weeks.scss';
</style>