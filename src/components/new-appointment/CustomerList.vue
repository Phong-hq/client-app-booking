<template>
  <div class="customer-list"  >
      <el-drawer v-model="drawer" :show-close="false" :direction="'btt'">
        <template #header="{ close, titleId, titleClass }" v-touch:swipe.bottom="closeDrawer">
        <div class="close ml-8 absolute bottom-2/4 left-0 translate-y-1/2" @click="close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7071 1.70712C16.0976 1.3166 16.0976 0.683436 15.7071 0.292905C15.3166 -0.0976258 14.6834 -0.0976365 14.2929 0.292881L8 6.58557L1.70709 0.292881C1.31656 -0.0976364 0.683398 -0.0976257 0.292881 0.292905C-0.0976364 0.683436 -0.0976257 1.3166 0.292905 1.70712L6.58576 7.99976L0.292905 14.2924C-0.0976256 14.6829 -0.0976363 15.3161 0.292881 15.7066C0.683399 16.0971 1.31656 16.0971 1.70709 15.7066L8 9.41395L14.2929 15.7066C14.6834 16.0971 15.3166 16.0971 15.7071 15.7066C16.0976 15.3161 16.0976 14.6829 15.7071 14.2924L9.41424 7.99976L15.7071 1.70712Z" fill="#5F2EEA"/>
            </svg>
        </div>
        <h4 class="text-center font-bold-ct text-18px text-darkest1" :id="titleId" :class="titleClass">Select Customer</h4>
        </template>
        <div  class="w-full px-4">
            <div class="my-4 relative">
                <el-input class="search" v-model="search" placeholder="Search services"  @input="searchCustomer()"/>
                <div class="absolute ml-4 bottom-2/4 translate-y-1/2 left-0">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3922 17.978C19.781 18.3668 19.7823 18.9958 19.3891 19.3891C18.9986 19.7796 18.3674 19.7816 17.978 19.3922L12.5491 13.9633C11.2873 14.9274 9.71054 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 9.71054 14.9274 11.2873 13.9633 12.5491L19.3922 17.978ZM8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z" fill="#5F2EEA"/>
                    </svg>
                </div>
            </div>
            <div class="list">
                <div class="" v-for="item in customerList" :key="item.id">
                    <div class="item mb-4 px-2  bg-white w-full flex justify-between items-center" v-if="item.search">
                        <div class="flex items-center">
                            <img class="mr-2" src="@/assets/images/staff-avatar-empty.png" alt="">
                            <div class="flex flex-col justify-center">
                                <div class="text-16px font-bold-ct text-darkest1">{{item.name ? item.name : ''}}</div>
                                <div>{{item.phone ? mask(item.phone.toString(), '(###) ###-####') : ''}}</div>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <el-button class="book-btn text-16px text-white" color="#5F2EEA" @click="selected(item.id)" >selected</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </el-drawer>
  </div>
</template>

<script setup>
    import {  ref, computed, onMounted, defineExpose, defineEmits  } from 'vue'
    import { mask } from 'maska'
    import { useCustomerStore } from '@/stores/customerStore.js'
    import { useStore } from '@/stores/loadingModal.js'

    const store = useCustomerStore()
    const storeLoading = useStore()
    const customerList = computed(() => store.getCustomerList)



    // CREATE DATA
    const drawer = ref(false)
    const search = ref('')

    
    
    // CREATE FUNCTION

    const open = () => {
        drawer.value = true;
    }
    defineExpose({open});

    const closeDrawer = () => {
        drawer.value = false;
    }

    const searchCustomer = () => {
        customerList.value.map(item => item.search = true)
        for(let i = 0 ; i < customerList.value.length ; i++){
            let nameValue =  nonAccentVietnamese(customerList.value[i].name)
            let searchValue = nonAccentVietnamese(search.value)
            customerList.value[i].search = nameValue.includes(searchValue)
        }
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

    const selected = (id) => {
        store.selectedCustomer(id)
        closeDrawer()
    }





</script>

<style lang="scss">
    .customer-list{
        .search{
            .el-input__wrapper{
                box-shadow: none;
                input{
                    height: 48px;
                    width: 100%;
                    border-radius: 48px;
                    background: #F1F0F5;
                    padding-left: 3rem;
                }
            }
        }
        .el-drawer{
            height: 80% !important;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            .el-drawer__header{
                position: relative;
                border-bottom: 0.5px solid #2f2c351f;
                padding: 24px;
                margin: 0;
                &::before{
                    content: "";
                    width: 64px;
                    height: 4px;
                    background: rgba(38, 39, 47, 0.12);
                    border-radius: 100px;
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .divide{
                    height: 0.5px;
                    background: #2F2C35;
                }
            }
            .el-drawer__body{
                padding:20px 0;
                .el-input__wrapper{
                    padding: 0;
                }
                .list{
                    width: 100%;
                    z-index: 100000000;
                    .item{
                        border: 0.5px solid #DDDDE8;
                        box-shadow: 10px 54px 24px rgba(0, 0, 0, 0.06);
                        border-radius: 10px;
                        min-height: 65px;
                        .book-btn{
                            width: 120px;
                            border-radius: 10px;
                            height: 40px;
                            margin: 0 !important;
                        }
                    }
                }
            }
        }
    }

</style>