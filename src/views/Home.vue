<template>
  <div class="home">
        <div class="container">
            <div class="my-4 relative">
                <el-input class="search" v-model="search" placeholder="Search customer"  @input="searchCustomer()"/>
                <div class="absolute ml-8 bottom-2/4 translate-y-1/2 left-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3922 17.978C19.781 18.3668 19.7823 18.9958 19.3891 19.3891C18.9986 19.7796 18.3674 19.7816 17.978 19.3922L12.5491 13.9633C11.2873 14.9274 9.71054 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 9.71054 14.9274 11.2873 13.9633 12.5491L19.3922 17.978ZM8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" fill="#5F2EEA"/>
                    </svg>
                </div>
            </div>
        </div>
    <div class="header container flex justify-between items-center">
          <div class="tabs py-2 flex flex-center">
              <div class="item" :class="activeTab == 1 ? 'active' : ''" @click="switchTab(1)">
                  Mounth
              </div>
              <div class="item" :class="activeTab == 2 ? 'active' : ''" @click="switchTab(2)">
                  Weeks
              </div>
          </div>
          <el-select class="fillter-status"  popper-class="popper-fillter-status" v-model="statusFillter" placeholder="Filter Status" @change="selectedStatus">
            <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            />
        </el-select>
    </div>
    <div class="divide my-2 w-full "></div>
    <swiper
        class=""
        :slides-per-view="1"
        :space-between="50"
        @swiper="onSwiper"
        :allowTouchMove="false"
    >
        <!-- :autoHeight="true" -->
        <swiper-slide >
            <CalendarComponent ref="myCanlendar"></CalendarComponent>
        </swiper-slide>
        <swiper-slide >
            <WeeksComponent></WeeksComponent>
        </swiper-slide>
    </swiper>
    <div class="duration-200 delay-100 ease-in z-10" :style="activeTab == 2 ?  'margin-top:-200px; trasition: 1s' : ''">
        <BookinglistComponent></BookinglistComponent>
    </div>
  </div>
</template>

<script setup>
    import CalendarComponent from '@/components/home/Calendar.vue'
    import WeeksComponent from '@/components/home/Weeks.vue'
    import BookinglistComponent from '@/components/home/Bookinglist.vue'

    import { ref, computed, onMounted, defineProps, defineExpose } from 'vue'
    import moment from "moment";
    import { mask } from 'maska'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    import 'swiper/css'
    import { useCalendarStore } from '@/stores/calendarStore.js'
    import { useStore } from '@/stores/loadingModal.js'


    const store = useCalendarStore()
    const storeLoading = useStore()
    const selectedDateId = computed(() => store.getSelectedDateId)
    // const statusFillter = computed(() => store.getStatusFillter)






    onMounted(() => {
    })

    // CREATE DATA
    const activeTab = ref(1)
    const search = ref('')
    const statusFillter = ref('')
    const mySwiper = ref(null)
    const myCanlendar = ref(null)
    const statusList = [
        {value: 'all' ,label: 'All',},
        {value: 'scheduled' ,label: 'Scheduled',},
        {value: 'confirmed' ,label: 'Confirmed',},
        {value: 'canceled' ,label: 'Canceled',},
        {value: 'waiting' ,label: 'Waiting',},
        {value: 'done' ,label: 'Done',},
    ]

    // CREATE FUNCTION

    const onSwiper = (swiper) => {
        mySwiper.value = swiper
    };

    const switchTab = async (i) => {
        activeTab.value = i 
        if(i == 2){
            mySwiper.value.slideNext()
            store.setWeekList(selectedDateId.value)
            store.setMonthTitle(10)
            storeLoading.openLoading()
            await store.setDayCountWeek(selectedDateId.value)
            store.addKey()
            storeLoading.closeLoading()
        }
        else{
            mySwiper.value.slidePrev()
            storeLoading.openLoading()
            await myCanlendar.value.changeTabs(selectedDateId.value)
            storeLoading.closeLoading()

        }
    }

    const selectedStatus = () => {
        store.selectedStatus(statusFillter.value)
    }

    const searchCustomer = () => {
        store.searchCustomer(search.value)
    }

    


    
</script>

<style lang="scss">
    @import '@/assets/scss/home/home.scss';
</style>