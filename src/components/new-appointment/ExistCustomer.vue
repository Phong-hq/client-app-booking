<template>
    <div class="exist-customer">
        <div class="container">
            <div class="form relative flex flex-col lg:justify-start justify-center ">
                <div class="relative">
                    <div class="form-item pl-4 w-full flex items-center relative" @click="openCustomerList">
                        {{customerSelected.name != '' ? customerSelected.name : 'Select Customer'}}
                    </div>
                    <div class="absolute mr-8 bottom-2/4 translate-y-1/2 right-0">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.2929 0.292894C12.6834 -0.0976305 13.3166 -0.0976305 13.7071 0.292894C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292894Z" fill="#5F2EEA"/>
                        </svg>
                    </div>
                </div>
                <div class="form-item mt-4 mb-6 pl-4 w-full flex items-center relative" :class="customerSelected.phone != 0 ? '' : 'disabled'">
                    {{customerSelected.phone != 0 ? mask(customerSelected.phone.toString(), '(###) ###-####') : 'Phone Number (*)'}}
                </div>
                <!-- <div class="form-item mt-4 pl-4 w-full flex items-center relative">
                    {{formCustomer.phone}}
                </div> -->

                <div class="relative line-error">
                    <div class="text-error mb-6 text-12px text-purple text-center" v-if="isError != ''">
                        {{isError}}
                    </div>
                </div>

                <el-input
                    v-model="textarea2"
                    :autosize="{ minRows: 4, maxRows: 4 }"
                    type="textarea"
                    placeholder="Appointment Notes"
                />


            </div>
            <div class=" mt-20 w-full flex flex-col items-center">
                <el-button class="text-22px text-white" color="#13BC8E"  >Deposit now</el-button>
                <el-button class="text-22px" color="#13BC8E" plain >Send link deposit</el-button>
                <el-button class="submit-btn text-22px text-white bg-gray" color="#5F2EEA" native-type="submit" @click="book()">Book Appointment</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {reactive, ref, computed } from 'vue';
    import { mask } from 'maska'
    import 'swiper/css'
    import { useCustomerStore } from '@/stores/customerStore.js'
    import { useStore } from '@/stores/loadingModal.js'

    const store = useCustomerStore()
    const storeLoading = useStore()
    const customerSelected = computed(() => store.customerSelected)

    const emit = defineEmits(['openCustomerList' ])

    


    // CREATE DATA

    const isError = ref('')
    const textarea2 = ref('')

    // CREATE FUNCTION



    const book = async () => {
        if(customerSelected.value.name != ''){
            isError.value = ''
        }
        else{
            isError.value = '(*) is required. Please check your input information before submit.'
        }
    }

    const openCustomerList = () => {
        emit('openCustomerList')
    }
</script>

<style lang="scss">
    .exist-customer{
            .form-item{
                background: #FFFFFF;
                border: 1px solid #DDDDE8;
                border-radius: 10px;
                height: 48px;
                padding-left: 1rem;
                color: #605D73;
                font-size: 16px;
                font-family: myFirstFont;
                &:active{
                    border: 1px solid #5F2EEA !important;
                }
                &.disabled{
                    background: #DDDDE8;
                    color: #A9A6BE;
                }
            }
            button{
                width: 88.33%;
                max-width: 400px;
                margin: 0 !important;
                border-radius: 10px;
                margin-bottom: 0.5rem !important;
                height: 48px;
                &.is-disabled{
                    background: #DDDDE8;
                    color: #A9A6BE;
                    border: none;
                }
                &.text-white:focus, &.text-white:active, &.text-white:hover{
                    color: #fff ;
                }
            }
    }
</style>