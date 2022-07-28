const guest = [
    {
        path: '/user',
        name: 'user-route',
        component: () => import ("../views/user/Index.vue"),
        children:[
            {
                path: 'home',
                name: 'user-home',
                component: () => import("../views/user/Home.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'home/article/:id',
                name: 'user-post-detail',
                component: () => import("../views/user/Posts/PostDetail.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'stores',
                name: 'user-store',
                component: () => import("../views/user/Store/Store.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'stores/:id',
                name: 'product-detail',
                component: () => import("../views/user/Store/ProductDetail.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'carts',
                name: 'user-carts',
                component: () => import("../views/user/Cart/Cart.vue"),
                meta: { requiresAuth: true },
            },

            {
                path: 'carts/payment',
                name: 'user-carts-payment',
                component: () => import("../views/user/Cart/Payment.vue"),
                meta: { requiresAuth: true },
            },

            {
                path: 'orders',
                name: 'user-orders',
                component: () => import("../views/user/Order/Order.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'services',
                name: 'user-services',
                component: () => import("../views/user/Service/RegisterService.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'services/coachs',
                name: 'user-coachs',
                component: () => import("../views/user/Service/Coach.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'services/ticket/:slug/:id',
                name: 'user-ticket-detail',
                component: () => import("../views/user/Service/TicketDetail.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'personal/ticket',
                name: 'user-my-ticket',
                component: () => import("../views/user/Service/MyTicket.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'personal/information',
                name: 'user-infomation',
                component: () => import("../views/user/User/Information.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: 'error',
                name: 'user-error',
                component: () => import("../views/user/Errors/404.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: ':pathMatch(.*)*',
                name: 'user-some',
                component: () => import("../views/user/Home.vue"),
                meta: { requiresAuth: true },
            }
        ]
    }
];

export default guest;