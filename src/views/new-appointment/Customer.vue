<template>
    <div class="customer">
        <div class="header my-4 flex justify-around ">
            <div class="flex items-center cursor-pointer" @click="switchTab(1)">
                <img v-if="activeTab == 1" class="mr-3" src="@/assets/images/customer-create-check-1.png" alt="">
                <img v-else class="mr-3" src="@/assets/images/customer-create-check-0.png" alt="">
                <p class="text-16px font-medium-ct" :class="activeTab == 1 ? 'text-purple' : ''">Exist Customer</p>
            </div>
            <div class="active flex items-center cursor-pointer" @click="switchTab(2)">
                <img v-if="activeTab == 2" class="mr-3" src="@/assets/images/customer-create-check-1.png" alt="">
                <img v-else class="mr-3" src="@/assets/images/customer-create-check-0.png" alt="">
                <p class="text-16px font-medium-ct " :class="activeTab == 2 ? 'text-purple' : ''">New Customer</p>
            </div>
        </div>
        <swiper
            class=""
            :slides-per-view="1"
            :space-between="50"
            @swiper="onSwiper"
            :allowTouchMove="false"
        >
            <swiper-slide >
                <ExistCustomerComponent @openCustomerList="openCustomerList"></ExistCustomerComponent>
            </swiper-slide>
            <swiper-slide >
                <NewCustomerComponent></NewCustomerComponent>
            </swiper-slide>
        </swiper>

        <CustomerComponentList ref="customerListComponent"></CustomerComponentList>
        
    </div>
</template>

<script setup>
    import ExistCustomerComponent from '@/components/new-appointment/ExistCustomer.vue'
    import NewCustomerComponent from '@/components/new-appointment/NewCustomer.vue'
    import CustomerComponentList from '@/components/new-appointment/CustomerList.vue'
    import { Swiper, SwiperSlide } from 'swiper/vue'
    
    import {reactive, ref, computed } from 'vue';
    import { mask } from 'maska'
    import 'swiper/css'
    import { useCustomerStore } from '@/stores/customerStore.js'
    import { useStore } from '@/stores/loadingModal.js'

    const store = useCustomerStore()
    const storeLoading = useStore()

        // CREATE DATA

   
    const customerListComponent = ref(null)
    const activeTab = ref(1)
    const mySwiper = ref(null)

    // CREATE FUNCTION

     const onSwiper = (swiper) => {
        mySwiper.value = swiper
    };

    const switchTab = async (i) => {
        activeTab.value = i 
        if(i == 2){
            mySwiper.value.slideNext()
        }
        else{
            mySwiper.value.slidePrev()
        }
    }

    const openCustomerList = () => {
        customerListComponent.value.open()
    }




</script>

<style lang="scss">
</style>