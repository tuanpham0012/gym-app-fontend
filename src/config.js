import admin from "./routers/admin";

const base_url = 'http://127.0.0.1:8000/api/'

export const server_url = 'http://127.0.0.1:8000/storage/images/'

// const base_url = 'http://192.168.1.24:8081/api/'

// export const server_url = 'http://192.168.1.24:8081/storage/images/'

export const auth = {
    USER_LOGIN: base_url+ 'auth/login',
    USER_REGISTER: base_url + 'auth/register',
    USER_LOGOUT: base_url + 'auth/logout',
    USER_INFO: base_url + 'auth/user',
    ADMIN_INFO: base_url + 'auth/admin/info',
    ADMIN_LOGIN: base_url+ 'auth/admin/login',
};

export const store = {
    GET_LIST: base_url+ 'user/stores',
    SHOW: base_url + 'user/stores/',
};

export const productUrl = {
    GET_LIST: base_url+ 'admin/products',
    CRUD: base_url + 'admin/products/',
    UPDATE_IMAGE: base_url + 'admin/products/update_image/',
    CREATE_IMAGE: base_url + 'admin/products/create_image/',
};

export const cart = {
    GET_LIST: base_url+ 'user/carts',
    CRUD: base_url + 'user/carts/',
    DELETE_ALL: base_url + 'user/carts/delete_all_cart',
};

export const payment = {
    GET_METHODS: base_url+ 'payments',
    CRUD: base_url + 'payments/',
};

export const order = {
    GET_LIST: base_url+ 'user/orders',
    CRUD: base_url + 'user/orders/',
    ADMIN_GET_LIST: base_url + 'admin/orders',
    ADMIN_CRUD: base_url + 'admin/orders/',
};

export const ticket = {
    ADMIN_GET_LIST: base_url + 'admin/tickets',
    ADMIN_CRUD: base_url + 'admin/tickets/',
    CRUD: base_url+ 'user/tickets/',
    GET_LIST_TYPE: base_url + 'user/ticket_types/',
    CHECK_EXISTS_TICKET: base_url + 'user/tickets/check_exists',
};

export const user = {
    GET_LIST: base_url + 'admin/users',
    CRUD: base_url + 'admin/users/',
    UPDATE_AVATAR: base_url + 'admin/users/updata_avatar/',
    USER_CRUD: base_url + 'user/update',
    USER_CHANGE_PASSWORD: base_url + 'user/update/change_password',
    USER_UPDATE_AVATAR: base_url + 'user/update/update_avatar',
};

export const coach = {
    USER_CRUD: base_url + 'user/coachs/',
    ADMIN_GET_LIST: base_url + 'admin/coachs',
    ADMIN_CRUD: base_url + 'admin/coachs/',
    ADMIN_UPDATE_AVATAR: base_url + 'admin/coachs/update_avatar/',
    ADMIN_CREATE_AVATAR: base_url + 'admin/coachs/create_avatar/',
};

export const posts = {
    POST: base_url + 'user/posts',
    CRUD: base_url + 'user/posts/',
    POST_COMMENTS: base_url + 'user/posts/comments/',
    POST_REACTS: base_url + 'user/posts/reacts/',
    ADMIN_POST: base_url + 'admin/posts',
    ADMIN_CRUD: base_url + 'admin/posts/',
    DELETE_POST_IMAGE: base_url + 'admin/posts/delete_image/',
    ACCEPT_ALL_POST: base_url + 'admin/posts/accept_all/'
};

export const notification = {
    GET: base_url + 'user/notifications',
    CRUD: base_url + 'user/notifications/',
};