<template>
    <div class="new-appointment">
        <div class="header w-full container flex justify-between">
            <el-button class="mt-6 text-16px text-white" color="#5F2EEA" >Services</el-button>
            <el-button class="mt-6 text-16px text-darkest1"  color="#DDDDE8" @click="openStaffList()">Staff</el-button>
        </div>

        <div class="my-4 relative">
            <el-input class="search" v-model="search" placeholder="Search services"  @input="searchService()"/>
            <div class="absolute ml-8 bottom-2/4 translate-y-1/2 left-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3922 17.978C19.781 18.3668 19.7823 18.9958 19.3891 19.3891C18.9986 19.7796 18.3674 19.7816 17.978 19.3922L12.5491 13.9633C11.2873 14.9274 9.71054 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 9.71054 14.9274 11.2873 13.9633 12.5491L19.3922 17.978ZM8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" fill="#5F2EEA"/>
                </svg>
            </div>
        </div>

        <div class="service-list container">
            <el-collapse v-model="activeNames">
            <div class="mb-4"  v-for="item in caterogyList" :key="item.id">
                <el-collapse-item :title="item.name" :name="item.id" v-if="item.search">
                    <div v-for="item2 in item.serviceList" :key="item2.id" >
                        <ServiceItemComponent v-if="item2.search" :item="item2"></ServiceItemComponent>
                    </div>
                </el-collapse-item>
            </div>
            </el-collapse>
        </div>


        <StaffListComponent ref="staffListComponent"></StaffListComponent>
        
    </div>
</template>

<script setup>

    import ServiceItemComponent from '@/components/new-appointment/ServiceItem.vue'
    import StaffListComponent from '@/components/new-appointment/StaffList.vue'

    import { ref, computed, onMounted, defineProps, defineExpose } from 'vue'


    // CREATE DATA

    const search = ref('')
    const activeNames = ref('')
    const start = ref(0)
    const staffListComponent = ref(null)
    const categorySearch = ref(false)
    const caterogyList = ref([
        {id: 0, name: 'Manicures ', search: true, serviceList: [
            {id: 0, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 1, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 2, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 3, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 4, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
        ]},
        {id: 1, name: 'Manicures ', search: true,  serviceList: [
            {id: 0, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 1, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 2, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 3, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 4, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
        ]},
        {id: 2, name: 'Manicures ', search: true,  serviceList: [
            {id: 0, name: 'AA Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 1, name: 'BB Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 2, name: 'CC Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 3, name: 'EE Manicure ', duration: '30', price: 24, selected: false, search: true },
            {id: 4, name: 'Gel Manicure ', duration: '30', price: 24, selected: false, search: true },
        ]},
    ])

    // CREATE FUNCTION

    const openStaffList = () => {
        staffListComponent.value.open()

    }

    const searchService = () => {
        console.log('asdsds');
        for(let i = 0; i < caterogyList.value.length ; i++){
            categorySearch.value = false
            caterogyList.value[i].serviceList.map(item => item.search = searchItem(item.name))
            caterogyList.value[i].search = categorySearch.value
        }
    }

    const searchItem = (value) => {
        let nameValue =  nonAccentVietnamese(value)
        let searchValue = nonAccentVietnamese(search.value)
        if(nameValue.includes(searchValue)){
            categorySearch.value = true
        }
        return nameValue.includes(searchValue)
    }

    const nonAccentVietnamese = (str) => {
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
  }

</script>

<style lang="scss">
    @import '@/assets/scss/new-appointment.scss';
</style>