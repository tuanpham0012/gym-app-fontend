import { createRouter, createWebHistory} from 'vue-router'

import * as url from '../config';

import axios from 'axios';

import guest from './guest'
import auth from './auth'
import user from './user'
import admin from './admin'

const routes = [...guest, ...auth, ...user, ...admin];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach( (to, from, next) =>{
    if(to.matched[0].name == 'admin-router'){
        if(to.matched.some((record) => record.meta.requiresAuth)){
            if(!sessionStorage.getItem('token')){
                next({
                    name: 'login-admin'
                });
            }else{
                axios.get(url.auth.ADMIN_INFO,
                    { headers: {'Authorization': sessionStorage.getItem('token'),}
                }).then(res =>{
                    next();
                }).catch(err =>{
                    sessionStorage.removeItem('token');
                    next({ name: 'login-admin'});
                })
            }
        }else if(to.name == 'login-user' || to.name == 'register-user' || to.name == 'login-admin'){
            if(sessionStorage.getItem('token')){
                next({
                    name: from.name,
                });
            }else{
                next();
            }
        }else{
            next();
        }
    }else{
        if( (to.name !== 'login-user' || to.name !== 'register-user' || to.name !== 'login-admin') && to.matched.some((record) => record.meta.requiresAuth)){
            if(!sessionStorage.getItem('token')){
                next({
                    name: 'login-user'
                });
            }else{
                axios.get(url.auth.USER_INFO,
                    { headers: {'Authorization': sessionStorage.getItem('token'),}
                }).then(res =>{
                    next();
                }).catch(err =>{
                    sessionStorage.removeItem('token');
                    next({ name: 'login-user'});
                })
            }
        }else if(to.name == 'login-user' || to.name == 'register-user' || to.name == 'login-admin'){
            if(sessionStorage.getItem('token')){
                next({
                    name: from.name,
                });
            }else{
                next();
            }
        }else{
            next();
        }
    }
})


export default router;