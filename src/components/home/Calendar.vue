<template>
  <div>
    <v-calendar
      :key="calendarKey"
      class="calendar"
      ref="calendar"
      v-model="selectedDate"
      :timezone="timezone"
      color="purple"
      :masks="masks"
      :attributes="attributes"
      :first-day-of-week="1"
      :mode="'weeks'"
      @update:from-page="pageUpdate($event)"
      @dayclick="selected($event)"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, defineExpose, onBeforeMount } from "vue";
import { useStore } from '@/stores/loadingModal.js'
import { useCalendarStore } from '@/stores/calendarStore.js'
import moment from "moment";


onBeforeMount ( async () => {
  let dateNow = moment(date).format('YYYY-MM-DD')
  store.setWeekList(dateNow)
  await store.selectedDate(dateNow)
  await store.setDayCountMonth(dateNow)
  showNotify();
  storeLoading.closeLoading()
})

onMounted( async() => {

});
    const storeLoading = useStore()
    const store = useCalendarStore()
    const dayCount = computed(() => store.getDayCountMonth)
    const selectedDateId = computed(() => store.getSelectedDateId)
    const calendarKey = computed(() => store.getCalendarKey)
    const weekMouted = computed(() => store.getWeekMouted)





// CREATE DATA
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const selectedDate = ref(null);
const timezone = ref('Asia/Bangkok');
const calendar = ref(null)
const masks = ref({
  weekdays: "WWW",
});
const attributes = ref([
  {
    highlight: {
      contentClass: "text-red-day",
    },
    dates: {
      start: new Date(2021, 0, 1), 
      end: new Date(2023, 0, 1),
      weekdays: [1, 7],
    },
  },
]);


// CREATE FUNTIONS
const showNotify = () => {
  attributes.value = [
    {
      highlight: {
        contentClass: "text-red-day",
      },
      dates: {
        start: new Date(2021, 0, 1), // Jan 1st, 2018
        end: new Date(2023, 0, 1), // Jan 1st, 2019
        weekdays: [1, 7], // ...on Sundays and Saturdays
      },
    },
  ]
  for(let i = 0 ; i < dayCount.value.length ; i++){
    if(dayCount.value[i].count > 0){
      let item = {
        highlight: {
          contentClass: "notify",
          fillMode: "solid",
        },
        dates: new Date(dayCount.value[i].day),
      }
      attributes.value.push(item)
      let el = document.getElementsByClassName('id-'+dayCount.value[i].day);
      el[0].setAttribute("data-value", dayCount.value[i].count);
      el[0].setAttribute("id", 'notify');
    }
  }
};

const pageUpdate = async (e) => {
  
  let month = new Date(selectedDateId.value).getMonth()
  if(e.month - 1  != month ){
    let dateEndOfMonth = new Date(e.year, e.month , 0).getDate()
    let dateNum = new Date(selectedDateId.value).getDate()
    let newDate = new Date(e.year, e.month - 1, dateNum > dateEndOfMonth ? dateEndOfMonth : dateNum)
    let date = moment(newDate).format('YYYY-MM-DD')
    calendar.value.focusDate(date)
    storeLoading.openLoading()
    await store.selectedDate(date)
    await store.setDayCountMonth(date)
    showNotify();
    storeLoading.closeLoading()
  }
}

const selected = async (e) => {
  let date = moment(e.id).format('YYYY-MM-DD')
      storeLoading.openLoading()
      await store.selectedDate(date)
      console.log('asdsd');
      storeLoading.closeLoading()
  }

const changeTabs = async (date) => {
  calendar.value.focusDate(date)
  await store.setDayCountMonth(date)
  showNotify();

}
    defineExpose({changeTabs})

</script>

<style lang="scss">
    @import '@/assets/scss/home/calendar.scss';
</style>