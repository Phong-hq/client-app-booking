<template>
    <div class="login-confirm container relative flex flex-col">
        <div class="back-btn absolute cursor-pointer" @click="back()">
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <!-- <img class="bg-image w-full absolute top-0 left-0 " src="@/assets/images/login-bg-purple.png" alt=""> -->
        <div class="w-full flex flex-center">
            <img class="logo" src="@/assets/images/logo.png" alt="">
        </div>
        <!-- <img src="@/assets/images/login-bg-purple.png" alt=""> -->
        <el-form class="w-full flex"  :model="formLogin" ref="ruleFormRef" :rules="rules" @submit.prevent="loginConfirm(ruleFormRef)">
            <div class="w-full">
                <p class="mb-3 text-36px font-bold-ct text-darkest3">Login</p>
                <p class="text-16px font-bold-ct text-darkest3">Email or phone</p>
                <!-- <p class="text-16px text-darkest3 font-normal">Please enter your ID number to login</p> -->
                
                <el-form-item class="w-full mt-2" prop="username">
                    <div class="w-full relative">
                        <el-input class="" v-model="formLogin.username"/>
                        <img class="icon ml-4 absolute bottom-1/2 left-0 translate-y-1/2" src="../../assets/images/login-input-icon-2.png" alt="">
                    </div>
                </el-form-item>
                <p class="text-16px font-bold-ct text-darkest3">Password</p>

                <el-form-item class="w-full mt-2 mb-2" prop="password">
                    <div class="w-full relative">
                        <el-input class="" :type=" showPassword ? 'text' : 'password'" v-model="formLogin.password"/>
                        <img class="icon ml-4 absolute bottom-1/2 left-0 translate-y-1/2 cursor-pointer" @click="showPassword = !showPassword" src="../../assets/images/login-input-icon-3.png" alt="">
                    </div>
                </el-form-item>
                <div class="relative line-error">
                    <div class="text-error  absolute bottom-2/4 left-0 translate-y-2/4 text-14px text-red-day" v-if="isError != ''">
                        {{isError}}
                    </div>
                </div>
                <div class="mb-8 mt-2 w-full flex justify-end items-end">
                    <el-button class="w-full submit-btn text-22px text-white" 
                    color="#13BC8E" native-type="submit" @click="loginConfirm(ruleFormRef)">Login</el-button>
                </div>

            </div>
         </el-form>
         <div class="w-full flex justify-end">
             <p class="text-16px text-red-day cursor-pointer">Fogot Password?</p>
         </div>
    </div>
</template>

<script setup>
import {reactive, ref } from 'vue';
import { useStore } from '@/stores/loadingModal.js'
import { useRouter } from "vue-router";
import axios from "axios";
import { $ } from 'dom7';


    const storeLoading = useStore()
    const router = useRouter();
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Vue POST Request Example" })
    };

    // CREATE DATA

    const isError = ref('')
    const showPassword = ref(false)
    const formLogin = reactive({
        username: '',
        password: '',
    })
    const ruleFormRef = ref(null)
    const rules = reactive({
        username: [
            { required: true, message: 'Username is required!', trigger: 'blur' },
            { max: 20, message: 'Username must be less than 20 characters!', trigger: 'blur' },
        ],
         password: [
            { required: true, message: 'Password is required!', trigger: 'blur' },
            { max: 20, message: 'Password must be less than 20 characters!', trigger: 'blur' },
        ],
    })

     // CREATE FUNCTION

    const loginConfirm = async (formEl) =>{
        if (!formEl) return
         await formEl.validate(async (valid, fields) => {
            if (valid) {
                storeLoading.openLoading()
                isError.value = ''
                let usernameValue = formLogin.username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "").toLowerCase();
                let token = ''
                let passwordValue = formLogin.password.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "");
                // let requestOptions = {
                //     method: 'POST',
                //     headers: { 
                //     'Content-Type': 'application/json',
                //     'Authorization': `Bearer ${token}`,
                //     "G-ClientID":   localStorage.getItem('id'),
                //     },
                //     body: JSON.stringify({ username: usernameValue,  password:  passwordValue})
                // };
                try {
                    let loginInfo = await fetch(`https://booking-apiv2.gocheckin.net/v1/admin/appointment/login`, {
                        method: 'POST',
                        headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        "G-ClientID":   localStorage.getItem('id'),
                        },
                        body: JSON.stringify({ username: usernameValue,  password:  passwordValue, tenant: localStorage.getItem('id')})
                        })
                    let data = await loginInfo.json();
                    token = data.result.token
                    // console.log('loginInfo',data);
                    axios.defaults.headers = {
                    // Authorization: "Bearer " + data.result.token,
                    "G-ClientID": data.result.data.token,
                    };
            

                    if (data.result.status !== "OK") {
                        storeLoading.closeLoading()
                        isError.value = 'Invalid login or password'
                    }

                    if (data.status == "OK" && data.result.status == "OK") {
                        storeLoading.closeLoading()
                        localStorage.setItem("access-token", data.result.data.token);
                        localStorage.setItem("business-name", data.result.data.business_info.name);
                        router.push('/home')
                        
                    }
                } catch (e) {
                    isError.value = e
                    storeLoading.closeLoading()
                }
            }else {
                // SHOW TEXT ERROR
                let obj = Object.values(fields)[0]
                isError.value = obj[0].message
            }
        })
    }

    const back = async () => {
       await localStorage.clear();
    //   document.cookie = "auth._token.local=;";
    //   document.cookie = "auth.strategy=;";
        router.push({ name: "login" });
    }
    
    

</script>

<style lang="scss">
    .login-confirm{
        height: 100vh;
        width: 100vw;
        .logo{
            margin-top: 40px;
        }
        .back-btn{
            top: 48px;
            left: 24px;
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