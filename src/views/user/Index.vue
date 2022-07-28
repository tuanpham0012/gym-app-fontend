<template>
    <div class="container-scroller">
        <NarBar />
        <div class="container-fluid page-body-wrapper">
            <!-- <SideBar /> -->
            <router-view></router-view>
            
        </div>
        <!-- <Footer /> -->
    </div>
    
</template>
<script>
import NarBar from '../../layouts/user_layout/NavBar.vue';
import SideBar from '../../layouts/user_layout/SideBar.vue';
import Footer from '../../layouts/user_layout/Footer.vue';
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
.main-panel{
    width: 100%;
    min-height: calc(100vh - 60px);
}
</style>