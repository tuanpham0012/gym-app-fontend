const auth = [
    {
        path: '/',
        component: () => import("../views/auth/Index.vue"),
        children:[
            {
                path:'login',
                name: 'login-user',
                component: () => import("../views/auth/Login.vue"),
            },
            {
                path:'register',
                name: 'register-user',
                component: () => import("../views/auth/Register.vue"),
            },
            {
                path:'admin/login',
                name: 'login-admin',
                component: () => import("../views/auth/LoginAdmin.vue"),
            },
        ]

    },
];

export default auth;