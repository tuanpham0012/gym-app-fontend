const admin = [
    {
        path: '/admin',
        name: 'admin-router',
        component: () => import ("../views/admin/Index.vue"),
        meta: { requiresAuth: true },
        children:[
            {
                path: 'home',
                name: 'admin-home',
                component: () => import("../views/admin/Home.vue"),
            },
            {
                path: 'orders',
                name: 'admin-orders',
                component: () => import("../views/admin/Order/Order.vue"),
            },
            {
                path: 'products',
                name: 'admin-products',
                component: () => import("../views/admin/Product/Product.vue"),
            },
            {
                path: 'tickets',
                name: 'admin-tickets',
                component: () => import("../views/admin/Services/Ticket.vue"),
            },
            {
                path: 'users',
                name: 'admin-users',
                component: () => import("../views/admin/User/User.vue"),
            },
            {
                path: 'coachs',
                name: 'admin-coachs',
                component: () => import("../views/admin/Coach/Coach.vue"),
            },
            {
                path: 'posts',
                name: 'admin-posts',
                component: () => import("../views/admin/Posts/Posts.vue"),
            },
        ]
    }
];

export default admin;