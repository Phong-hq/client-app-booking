<template>
    <div class="new-customer">
        <el-form class="container"  :model="formCustomer" ref="ruleFormRef" :rules="rules" @submit.prevent="book(ruleFormRef)">
            <div class="form relative flex flex-col lg:justify-start justify-center ">
                <el-form-item class="w-full mt-12" prop="name">
                    <div class="mb-6 w-full relative">
                        <el-input class="" v-model="formCustomer.name" placeholder="Full Name (*)" />  
                    </div>
                </el-form-item>
                <div class="mb-6 flex justify-between items-center">
                    <div class="first-number">
                        +1
                    </div>

                    <el-form-item class="phone-input" prop="phone">
                            <div class="w-full relative">
                            <input class="w-full" v-maska="'(###) ###-####'" v-model="formCustomer.phone" placeholder="Phone Number (_) _ _ (*)">
                        </div>
                    </el-form-item>
                </div>
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
                <el-button class="text-22px" color="#13BC8E" disabled >Deposit now</el-button>
                <el-button class="text-22px" color="#13BC8E" plain disabled>Send link deposit</el-button>
                <el-button class="submit-btn text-22px text-gray/3 bg-gray" color="#5F2EEA" native-type="submit" @click="book(ruleFormRef)">Book Appointment</el-button>
            </div>
        </el-form>
    </div>
</template>

<script setup>
    import {reactive, ref } from 'vue';
    import { useStore } from '@/stores/loadingModal.js'
    import { maska } from 'maska'




    const storeLoading = useStore()
    const phoneValidation = (rule, value, callback) => {
        let text = value.replace(/[^a-zA-Z0-9]/g, '')
        if(text.charAt(0) == 0){
            callback(new Error('The first number must be [2-9]!'))
            }
        else if(text.length != 10){
            callback(new Error('phone must be 10 characters!'))
            }
        else {
            callback()
        }
    }

    // CREATE DATA

    const rules = reactive({
        name: [
            { required: true, message: '(*) is required. Please check your input information before submit.', trigger: 'blur' },
            { max: 20, message: 'Name must be less than 20 characters!', trigger: 'blur' },
        ],
         phone: [
            { required: true, message: '(*) is required. Please check your input information before submit.', trigger: 'blur' },
            {
                validator: phoneValidation, trigger: 'blur'  
            }
        ],
    })
    const isError = ref('')
    const formCustomer = reactive({
        name: '',
        phone: '',
    })
    const ruleFormRef = ref()
    const textarea2 = ref('')

    // CREATE FUNCTION



    const book = async (formEl) => {
        if (!formEl) return
        await formEl.validate( async (valid, fields) => {
            if (valid) {
                isError.value = ''
            }
            else {
                // SHOW TEXT ERROR
                let obj = Object.values(fields)[0]
                isError.value = obj[0].message
            }
        })
    }

</script>

<style lang="scss">
    .new-customer{
        .el-form{
            .first-number{
                height: 48px;
                width: 20%;
                background: #FFFFFF;
                border: 1px solid #DDDDE8;
                border-radius: 10px;
                display: flex;
                align-items: center;
                padding-left: 1rem;
            }
            .phone-input{
                width: 75%;
            }
            .el-textarea__inner{
                padding: 5px 1rem;
                font-size: 16px;
                font-family: myFirstFont;
                &::placeholder{
                    color: #605D73;
                    font-size: 16px;
                }
                &:focus{
                    box-shadow: 0 0 0 1px #5F2EEA inset;
                }

            }
            .el-form-item{
                margin: 0;
                .el-input__wrapper{
                    padding: 0;
                    box-shadow: none;
                }
                input{
                    background: #FFFFFF;
                    border: 1px solid #DDDDE8;
                    border-radius: 10px;
                    height: 48px;
                    padding-left: 1rem;
                    color: #606266;
                    font-size: 16px;
                    &::placeholder{
                        color: #605D73;
                        font-size: 16px;
                    }
                    &:focus, &:focus-visible{
                            border: 1.5px solid #5F2EEA !important;
                            outline: none;
                    }
                }
                .el-form-item__error{
                    display: none;
                }
            }
            button{
                width: 88.33%;
                max-width: 400px;
                margin: 0;
                border-radius: 10px;
                margin-bottom: 0.5rem;
                height: 48px;
                &.is-disabled{
                    background: #DDDDE8;
                    color: #A9A6BE;
                    border: none;
                }
            }
        }
    }
</style>