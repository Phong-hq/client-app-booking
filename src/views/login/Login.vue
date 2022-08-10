<template>
    <div class="login-id relative flex items-end">
        <img class="bg-image w-full absolute top-0 left-0 " src="@/assets/images/login-bg-purple.png" alt="">
        <img class="logo absolute right-2/4 translate-x-2/4" src="@/assets/images/logo-white.png" alt="">
        <!-- <img src="@/assets/images/login-bg-purple.png" alt=""> -->
        <el-form class="w-full flex"  :model="formLogin" ref="ruleFormRef" :rules="rules" @submit.prevent="login(ruleFormRef)">
            <div class="w-full container">
                <p class="mb-3 text-36px font-bold-ct text-darkest3">Welcome</p>
                <p class="text-16px font-bold-ct text-darkest3">GCI ID</p>
                <p class="text-16px text-darkest3 font-normal">Please enter your ID number to login</p>
                <el-form-item class="w-full mt-4 mb-2" prop="id">
                    <div class="w-full relative">
                        <el-input class="" v-model="formLogin.id" placeholder="ID" />  
                        <img class="icon ml-4 absolute bottom-1/2 left-0 translate-y-1/2" src="../../assets/images/login-input-icon-1.png" alt="">
                    </div>
                </el-form-item>
            <!-- 
                <el-form-item class="w-full mt-6" prop="username">
                    <div class="w-full relative">
                        <el-input class="" v-model="formLogin.username" placeholder="Username" />
                        <img class="icon ml-4 absolute bottom-1/2 left-0 translate-y-1/2" src="../../assets/images/login-input-icon-2.png" alt="">
                    </div>
                </el-form-item>

                <el-form-item class="w-full mt-6" prop="password">
                    <div class="w-full relative">
                        <el-input class="" type="password" show-password v-model="formLogin.password" placeholder="Password" />
                        <img class="icon ml-4 absolute bottom-1/2 left-0 translate-y-1/2" src="../../assets/images/login-input-icon-3.png" alt="">
                    </div>
                </el-form-item> -->
                <div class="relative line-error">
                    <div class="text-error  absolute bottom-2/4 left-0 translate-y-2/4 text-14px text-red-day" v-if="isError != ''">
                        {{isError}}
                    </div>
                </div>
                <div class="mb-8 mt-2 w-full flex justify-end items-end">
                    <el-button class="w-full submit-btn text-22px text-white" 
                    color="#13BC8E" native-type="submit" @click="login(ruleFormRef)">Login</el-button>
                </div>

            </div>
         </el-form>
    </div>
</template>

<script setup>
import {reactive, ref } from 'vue';
import { useStore } from '@/stores/loadingModal.js'
import { useRouter } from "vue-router";


    const storeLoading = useStore()
    const router = useRouter();
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Vue POST Request Example" })
    };

    // CREATE DATA

    const isError = ref('')
    const formLogin = reactive({
        id:'',
        // username: '',
        // password: '',
    })
    const ruleFormRef = ref(null)
    const rules = reactive({
        // username: [
        //     { required: true, message: 'Username is required!', trigger: 'blur' },
        //     { max: 20, message: 'Username must be less than 20 characters!', trigger: 'blur' },
        // ],
         id: [
            { required: true, message: 'ID is required!', trigger: 'blur' },
            { max: 20, message: 'ID must be less than 20 characters!', trigger: 'blur' },
        ],
        //  password: [
        //     { required: true, message: 'Password is required!', trigger: 'blur' },
        //     { max: 20, message: 'Password must be less than 20 characters!', trigger: 'blur' },
        // ],
    })

     // CREATE FUNCTION

    const login = async (formEl) => {
        if (!formEl) return
        await formEl.validate(async(valid, fields) => {
            if (valid) {
                isError.value = ''
                let businessId = formLogin.id.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '').toLowerCase();
                storeLoading.openLoading()
                await fetch(`https://booking-apiv2.gocheckin.net/v1/admin/appointment/check-tenant?tenant=${businessId}`)
                .then((respone) => respone.json())
                        .then(async (data) => {
                            console.log('data',data);
                            if (data.error) {
                                storeLoading.closeLoading()
                                isError.value = 'Invalid business id.'
                            }
                            // if (data.result.data.category !== "gci2020") {
                            //     storeLoading.closeLoading()
                            //     isError.value = 'Invalid business id.'
                            // }
                            if (data && data.result) {
                                localStorage.setItem("id", businessId)
                                // loginConfirm()
                                 router.push('/login/confirm')

                                storeLoading.closeLoading()
                            }
                        });

            } else {
                // SHOW TEXT ERROR
                let obj = Object.values(fields)[0]
                isError.value = obj[0].message
            }
        })
    }
    

</script>

<style lang="scss">
    .login-id{
        height: 100vh;
        width: 100vw;
        .logo{
            top: 120px;
        }
        .bg-image{
            max-height: 400px;
        }
        input{
            height: 50px;
            background: #EFEFEF;
            border-radius: 8px;
            padding-left: 3rem;
            line-height: 50px;
            font-size: 16px;
        }
        .el-input__wrapper, .el-input__wrapper.is-focus{
            padding: 0;
            box-shadow: none !important;
        }
        button{
           // background: #13BC8E;
            height: 48px;
            // border: 1px solid #13BC8E;
            border-radius: 8px;
            color: #fff !important;
        }
        .line-error{
            height: 20px;
        }
        .el-form-item__error{
            display: none;
        }
    }
</style>