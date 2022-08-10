<template>
<div class="appointment-calendar">
    <div class="mt-8">
      <v-calendar
        class="calendar"
        ref="calendar"
        color="purple"
        :masks="masks"
        :first-day-of-week="1"
        :mode="'weeks'"
        @update:from-page="pageUpdate($event)"
        @dayclick="selected($event)"
      />
    </div>
    <div class="time-list pt-8">
        <div class="container">

            <p class="mb-2 text-16 font-bold-ct">Morning</p>
            <div class="mb-8 w-full grid grid-cols-4">
                <div class="mt-4 w-full flex flex-center"  v-for="item in morning" :key="item.id" :class="isDisabled(item.time) ? 'disabled' : ''">
                    <div class="item flex flex-center text-14px font-medium-ct cursor-pointer" @click="selectedTime(item.time)" 
                    :class="selectedTimeValue == item.time ? 'selected' : ''">
                        {{item.time}}
                    </div>
                </div>
            </div>

            <p class="mb-2 text-16 font-bold-ct">Afternoon</p>
            <div class="mb-8 w-full grid grid-cols-4">
                <div class="mt-4 w-full flex flex-center"  v-for="item in afternoon" :key="item.id" :class="isDisabled(item.time) ? 'disabled' : ''">
                    <div class="item flex flex-center text-14px font-medium-ct cursor-pointer" @click="selectedTime(item.time)" 
                    :class="selectedTimeValue == item.time ? 'selected' : ''">
                        {{item.time}}
                    </div>
                </div>
            </div>

            <p class="mb-2 text-16 font-bold-ct">Evening</p>
            <div class="mb-8 w-full grid grid-cols-4">
                <div class="mt-4 w-full flex flex-center"  v-for="item in evening" :key="item.id" :class="isDisabled(item.time) ? 'disabled' : ''">
                    <div class="item flex flex-center text-14px font-medium-ct cursor-pointer" @click="selectedTime(item.time)" 
                    :class="selectedTimeValue == item.time ? 'selected' : ''">
                        {{item.time}}
                    </div>
                </div>
            </div>

        </div>
        <div class="mb-4 w-full flex flex-center">
            <el-button class="mt-6 text-16px text-white font-bold-ct" color="#5F2EEA" >Services</el-button>
        </div>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref, computed, defineExpose, onBeforeMount } from "vue";
import moment from "moment";
import { useStore } from '@/stores/loadingModal.js'

const storeLoading = useStore()

onMounted(() => {
    let morningTime = 600
    let afternoontime = 720
    let eveningtime = 1020
    while (morningTime <= 705) {
        let n = 0
        let time = new Date(2016, 1, 1, (Math.floor(morningTime /60)), (morningTime % 60))
        morning.value.push({id: n, time: moment(time).format('HH:mm A')})
        n++
        morningTime= morningTime + 15;
    }
    while (afternoontime <= 1005) {
        let n = 0
        let time = new Date(2016, 1, 1, (Math.floor(afternoontime /60)), (afternoontime % 60))
        afternoon.value.push({id: n, time: moment(time).format('HH:mm A')})
        n++
        afternoontime= afternoontime + 15;
    }
    while (eveningtime <= 1125) {
        let n = 0
        let time = new Date(2016, 1, 1, (Math.floor(eveningtime /60)), (eveningtime % 60))
        evening.value.push({id: n, time: moment(time).format('HH:mm A')})
        n++
        eveningtime= eveningtime + 15;
    }
})

// CREATE DATA

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const selectedDate = ref(null);
// const timezone = ref('Asia/Bangkok');
const calendar = ref(null)
const masks = ref({
  weekdays: "WWW",
});
const morning = ref([])
const afternoon = ref([])
const evening = ref([])
const selectedTimeValue = ref('')
const disabled = ref(['10:00 AM', '10:15 AM'])

// CREATE FUNTIONS

const pageUpdate = async (e) => {
  
console.log('pageUpdate', e);
}

const selected = async (e) => {
    let date = moment(e.id).format('YYYY-MM-DD')
    console.log('selected',selected);
}

const selectedTime = (time) => {
    console.log(selectedTimeValue.value);
    let index = disabled.value.findIndex(item => item == time)
    if(index < 0){
        selectedTimeValue.value = time
    }
}

const isDisabled = (time) => {
    console.log('sssssss',disabled.value.includes(time));
    return disabled.value.includes(time)
}

</script>

<style lang="scss">
.appointment-calendar{
    .calendar {
    width: 100%;
    border: none;
    background-color: #fff;
    .vc-title {
      font-family: fontBold;
      margin-bottom: 25px;
      color: #5F2EEA;
    }
    .vc-arrow {
      path {
        fill: #2f2c35;
      }
    }
    .vc-weeks {
      .vc-weekday {
        color: #2f2c35;
        font-family: fontBold;
        padding-bottom: 25px;
        font-size: 16px;
      }
    }
    .vc-day {
      min-height: 40px;
      position: relative;
      margin-bottom: 1rem;
      &[id=notify]{
        &::before {
          content: attr(data-value);
          position: absolute;
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          top: -3px;
          right: 50%;
          transform: translateX(50%);
          margin-right: -1rem;
          width: 18px;
          height: 18px;
          background: #ef476f;
          border-radius: 50%;
          z-index: 10;
          color: #fff;
          font-family: myFirstFont;
        }
      }
      span[tabindex='0']{
          border-radius: 8px !important;
          background-color: #5F2EEA;
          width: 28px;
          height: 28px;
          color: #fff !important;
      }
      .vc-day-content {
        font-family: myFirstFont;
      //   background-color: transparent;
        font-size: 16px;
      }
      &.is-not-in-month{
          opacity: 0.5;
      }
    }
        .notify, .my-class {
        position: absolute;
        background-color: #f1f0f5 ;
        border-radius: 8px !important;
        color: #2f2c35 !important;
        transform: scale(1.1);
        }
    }
    .time-list{
        width: 100%;
        background-color: #f8f8f8;
        .disabled{
            .item{
                background: #C4C4C4;
                cursor: not-allowed;
            }
        }
        .item{
            height: 30px;
            width: 22%;
            max-width: 250px;
            min-width: 80px;
            background: #FFFFFF;
            border: 1.07692px solid #DDDDE8;
            border-radius: 8.61538px;
            &.selected{
                color: #5F2EEA;
                border: 1.61538px solid #5F2EEA;
            }
        }
        .grid{
            @media (max-width: 370px) {
                grid-template-columns: repeat(3, minmax(0, 1fr))
            }
        }
        button{
            border-radius: 12px;
            width: 70%;
            height: 48px;
            span{
                font-family: fontBold !important;
            }
        }
    }
}
</style>