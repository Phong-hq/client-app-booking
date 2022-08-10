<template>
   <div class="booking-list container">
          <div class="mb-2" v-for="item in bookingList" :key="item.id">
            <div class="item" v-if="(statusFillter == item.status || statusFillter == '' || statusFillter == 'all') && item.search">
                <div class="flex flex-col justify-center">
                    <div class="text-16px font-bold-ct text-darkest1">{{item.end ? moment(item.end).format('h:mm: A') : '00:00 AM'}}</div>
                    <div class="text-16px text-darkest2">{{item.end ? moment(item.end).format('MM/DD') : ''}}</div>
                </div>
                <div class="flex flex-col justify-center">
                    <div class="text-16px font-bold-ct text-darkest1">{{item.booker_name ? item.booker_name : ''}}</div>
                    <div>{{item.booker_contact ? mask(item.booker_contact, '(###) ###-####') : ''}}</div>
                </div>
                <div class="flex flex-center">
                    <div class="status flex flex-center text-16px font-bold-ct capitalize" :class="statusStyle(item.status)">{{item.status}}</div>
                </div>
            </div>
          </div>
      </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import moment from "moment";
    import { mask } from 'maska'
    import { useCalendarStore } from '@/stores/calendarStore.js'


    const bookingList = computed(() => store.getlistBooking)
    const store = useCalendarStore()
    const statusFillter = computed(() => store.getStatusFillter)






    // CREATE DATA

    // const bookingList = ref([
    //     {id:388, booker_contact: '9792172012',booker_name: "Test Reminder 11h35 PM",end: "2022-04-11 23:35:00",status: "confirmed"},
    //     {id:389, booker_contact: '9792172012',booker_name: "Test Reminder 11h35 PM",end: "2022-04-11 23:35:00",status: "waiting"},
    //     {id:389, booker_contact: '9792172012',booker_name: "Test Reminder 11h35 PM",end: "2022-04-11 23:35:00",status: "done"},
    // ])


     // CREATE FUNCTION

    const statusStyle = (status) => {
        switch (status) {
        case "confirmed":
          return "confirmed"
        case "waiting":
          return "waiting"
        case "scheduled":
          return "scheduled"
        case "canceled":
          return "canceled"
        case "done":
          return "done"
      }
    }
</script>

<style lang="scss">
.booking-list{
    .item{
        width: 100%;
        padding: 12px 16px;
        display: grid;
        grid-template-columns:   77px   auto 110px;
        border: 1px solid #DDDDE8;
        border-radius: 10px;
        .status{
            width: 110px;
            height: 40px;
            border-radius: 10px;
            &.confirmed{
                border: 1px solid #13BC8E;
                color: #13BC8E;
            }
            &.waiting{
                border: 1px solid #5F2EEA;
                color: #5F2EEA;
            }
            &.done{
                background: #A9A6BE;
                color: #fff;
            }
            &.scheduled{
                border: 1px solid #F29F00;
                color: #F29F00;
            }
            &.canceled{
                border: 1px solid #F64E60;
                color: #F64E60;
            }
        }
    }
}
</style>