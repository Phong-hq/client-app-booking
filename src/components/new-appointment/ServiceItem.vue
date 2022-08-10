<template>
  <div class="item px-4 flex justify-between items-center" :class="selected ? 'check' : ''"  >
        <span class="w-full flex justify-between items-center" v-touch="selectedService">
            <div>
                <p class="text-16px font-bold-ct">{{props.item.name}} </p>
                <div class="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#2F2C35"/>
                        <path d="M7 5C7 4.44772 7.44772 4 8 4C8.55228 4 9 4.44772 9 5V8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8V5Z" fill="#2F2C35"/>
                        <path d="M7 8C7 7.44772 7.44772 7 8 7H10C10.5523 7 11 7.44772 11 8C11 8.55228 10.5523 9 10 9H8C7.44772 9 7 8.55228 7 8Z" fill="#2F2C35"/>
                    </svg>
                    <p class="ml-2 text-14px">{{props.item.duration}} minutes • ${{props.item.price}}</p>
                </div>
            </div>
            <div class="flex flex-center">
                <img v-if="selected" src="@/assets/images/new-appointment-check-1.png" alt="">
                <img v-else src="@/assets/images/new-appointment-check-0.png" alt="">
            </div>
        </span>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, defineProps, defineExpose } from 'vue'
    import { useStore } from '@/stores/loadingModal.js'
    import { useNewAppointmentStore } from '@/stores/newAppointmentStore.js'

    const storeLoading = useStore()
    const store = useNewAppointmentStore()

    onMounted(() => {
    })
    const props = defineProps({
        item: {
            type: Object,
            required: true
        },
    })
    const caterogyList = computed(() => store.getCaterogyList)

    // CREATE DATA

    const selected = ref(false)

    // CREATE FUNCTION

    const selectedService = () => {
        selected.value = !selected.value
    }

</script>

<style>

</style>