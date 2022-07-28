const guest = [
    {
        path: '/',
        redirect: '/home',
        component: () => import ("../views/guests/Index.vue"),
        children:[
            {
                path: 'home',
                name: 'guest-home',
                component: () => import("../views/guests/Home.vue")
            }
        ]
    },
];

export default guest;