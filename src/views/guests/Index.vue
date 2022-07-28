<template>
    <div>
        <header-vue></header-vue>
        <router-view></router-view>
    </div>
</template>
<script>
import HeaderVue from '../../layouts/guest_layout/Header.vue'
export default {
    components:{
        HeaderVue,
    }
}
</script>
<style scoped>

</style>