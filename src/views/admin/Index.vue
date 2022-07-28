<template>
    <div class="container-scroller">
        <NarBar />
        <div class="container-fluid page-body-wrapper">
            <SideBar />
            <router-view></router-view>
            
        </div>
        <Footer />
    </div>
    
</template>
<script>
import NarBar from '../../layouts/admin_layout/NavBar.vue';
import SideBar from '../../layouts/admin_layout/SideBar.vue';
import Footer from '../../layouts/admin_layout/Footer.vue';
export default {
    components:{
        NarBar,
        SideBar,
        Footer
    }
}
</script>
<style scoped>
.container-fluid{
    padding-left: 0;
    padding-right: 0;
}
    
</style>