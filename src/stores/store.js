import { createStore } from 'vuex'
import axios from 'axios';
import * as url from '../config';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      token: null,
      userInfo: null,
      adminInfo: null,

      products: null,
      productTypes: null,
      product: null,

      stores: null,

      carts: null,

      paymentMethods: null,

      orders: null,
      myOrders: null,
      orderStatuses: null,
      orderDetail: null,
      shippings: null,

      ticket: null,
      tickets: null,
      ticketStatuses: null,
      myTickets: null,
      ticketTypes: null,
      ticketTypeDetail: null,

      users: null,
      user:null,
      userPositions: null,

      admins: null,
      admin: null,
      adminPosition: null,

      coaches: null,
      coach: null,
      coachLevels: null,

      posts: null,
      article: null,

      postsAdmin: null,
      articleAdmin: null,
      postStatus: null,

      notifications: null,
      countNotificationUnread: null,

    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token;
    },
    setUserInfo(state, payload){
      state.userInfo = payload;
    },
    setAdminInfo(state, payload){
      state.adminInfo = payload;
    },
    setStores(state, payload){
      state.stores = payload;
    },
    setProducts(state, payload){
      state.products = payload;
    },
    setProduct(state, payload){
      state.product = payload;
    },
    setProductTypes(state, payload){
      state.productTypes = payload;
    },
    setCarts(state, payload){
      state.carts = payload;
    },
    setPaymentMethods(state, payload){
      state.paymentMethods = payload;
    },
    setOrders(state, payload){
      state.orders = payload;
    },
    setMyOrders(state, payload){
      state.myOrders = payload;
    },
    setOrderStatuses(state, payload){
      state.orderStatuses = payload;
    },
    setOrderDetail(state, payload){
      state.orderDetail = payload;
    },
    setShippings(state, payload){
      state.shippings = payload;
    },
    setTicketTypes(state, payload){
      state.ticketTypes = payload;
    },
    setTicketTypeDetail(state, payload){
      state.ticketTypeDetail = payload;
    },
    setMyTickets(state, payload){
      state.myTickets = payload;
    },
    setTicket(state, payload){
      state.ticket = payload;
    },
    setTickets(state, payload){
      state.tickets = payload;
    },
    setTicketStatuses(state, payload){
      state.ticketStatuses = payload;
    },
    setUsers(state, payload){
      state.users = payload;
    },
    setUser(state, payload){
      state.user = payload;
    },
    setUserPositions(state, payload){
      state.userPositions = payload;
    },

    setCoaches(state, payload){
      state.coaches = payload;
    },
    setCoach(state, payload){
      state.coach = payload;
    },
    setCoachLevels(state, payload){
      state.coachLevels = payload;
    },
    setPosts(state, payload){
      state.posts = payload;
    },

    setNotifications(state, payload){
      state.notifications = payload;
    },
    setCountNotificationUnread(state, payload){
      state.countNotificationUnread = payload;
    },

    setPostsAdmin(state, payload){
      state.postsAdmin = payload;
    },
    setPostStatus(state, payload){
      state.postStatus = payload;
    },
    setArticleAdmin(state, payload){
      state.articleAdmin = payload;
    },
  },
  actions:{
    // USER
    async getuserInfo({commit}, token){
        await axios({
            url: url.auth.USER_INFO,
            method: 'get',
            headers: {'Authorization': token,
                      'Accept': 'application/json'}
          }).then( res => {
            console.log(res.data);
            commit('setUserInfo', res.data.user);
          }).catch( err => {
            console.log(err);
          })
    },
    async getAdminInfo({commit}, token){
      await axios({
          url: url.auth.ADMIN_INFO,
          method: 'get',
          headers: {'Authorization': token,
                    'Accept': 'application/json'}
        }).then( res => {
          console.log(res.data);
          commit('setAdminInfo', res.data.info);
        }).catch( err => {
          console.log(err);
        })
  },

  async getStores({commit}, {token, page, search, type_id, filterName, filterPrice}){
    await axios({
      method: 'GET',
      url: url.store.GET_LIST,
      headers: {'Authorization': token,
                    'Accept': 'application/json'},
      params :{
        page: page,
        search: search,
        type_id: type_id,
        filterName: filterName,
        filterPrice: filterPrice,
      }
    }).then( res => {
      commit('setStores', res.data.products);
      commit('setProductTypes', res.data.product_types);
      console.log(res.data);
    }).catch( err => {
      console.log(err);
    })
  },
    // Product store
    async getProducts({commit}, {token, page, search, type_id}){
      await axios({
        method: 'GET',
        url: url.productUrl.GET_LIST,
        headers: {'Authorization': token,
                  'Accept': 'application/json'},
        params:{
          page: page,
          search: search,
          product_type_id: type_id,
        }
      }).then( res => {
        commit('setProducts', res.data.products);
        commit('setProductTypes', res.data.product_types);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },
    async getProduct({commit}, {token, product_id}){
      commit('setProduct', null);
      await axios({
        method: 'GET',
        url: url.store.SHOW + product_id,
        headers: {'Authorization': token,
                'Accept': 'application/json'}
      }).then( res => {
        commit('setProduct', res.data);
        console.log(res.data);
      }).catch( err => {
        console.log(err.data.message);
      })
    },

    // Cart
    async getCarts({commit}, token){
      await axios({
        method: 'GET',
        url: url.cart.GET_LIST,
        headers: {'Authorization': token,
                      'Accept': 'application/json'}
      }).then( res => {
        commit('setCarts', res.data.carts);
      }).catch( err => {
        console.log(err.data.message);
      })
    },

    async getPaymentMethods({commit}, token){
      await axios({
        method: 'GET',
        url: url.payment.GET_METHODS,
        headers: {'Authorization': token,
                      'Accept': 'application/json'}
      }).then( res => {
        commit('setPaymentMethods', res.data.payment_methods);
      }).catch( err => {
        console.log(err.data.message);
      })
    },

    //orders
    async getOrders({commit}, {order_status_id, token}){
      await axios({
        method: 'GET',
        url: url.order.ADMIN_GET_LIST,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
        params:{
          order_status_id: order_status_id,
        }
      }).then( res => {
        commit('setOrders', res.data.orders);
        commit('setOrderStatuses', res.data.order_statuses);
        commit('setShippings', res.data.shippings);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getMyOrders({commit}, {order_status_id, token}){
      await axios({
        method: 'GET',
        url: url.order.GET_LIST,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
        params:{
          order_status_id: order_status_id,
        }
      }).then( res => {
        commit('setMyOrders', res.data.orders);
        commit('setOrderStatuses', res.data.order_statuses);
        commit('setShippings', res.data.shippings);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getOrderDetail ({commit}, {order_id, token}){
      commit('setOrderDetail', null);
      await axios({
        method: 'GET',
        url: url.order.CRUD + order_id,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setOrderDetail', res.data);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getTicketTypes ({commit},  token){
      commit('setTicketTypes', null);
      await axios({
        method: 'GET',
        url: url.ticket.GET_LIST_TYPE,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setTicketTypes', res.data.ticketTypes);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getTicketTypeDetail ({commit},  {token, id }){
      commit('setTicketTypeDetail', null);
      await axios({
        method: 'GET',
        url: url.ticket.GET_LIST_TYPE + id,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setTicketTypeDetail', res.data);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getMyTickets ({commit},  token){
      // commit('setMyTickets', null);
      await axios({
        method: 'GET',
        url: url.ticket.CRUD,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setMyTickets', res.data.tickets);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },
    async getTickets ({commit},  {token, status_id}){
      // commit('setMyTickets', null);
      await axios({
        method: 'GET',
        url: url.ticket.ADMIN_CRUD,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
        params:{
          status_id: status_id,
        }
      }).then( res => {
        commit('setTickets', res.data.tickets);
        commit('setTicketStatuses', res.data.statuses);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },
    async getTicket ({commit},  {token, ticket_id}){
      commit('setTicket', null);
      await axios({
        method: 'GET',
        url: url.ticket.CRUD + ticket_id,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setTicket', res.data.ticket);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    //Users
    async getUsers({commit}, {token, page, search, position}){
      await axios({
        method: 'GET',
        url: url.user.GET_LIST,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
        params:{
          page: page,
          search: search,
          position: position,
        }
      }).then( res => {
        commit('setUsers', res.data.users);
        commit('setUserPositions', res.data.positions);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getUser({commit}, {token, user_id}){
      await axios({
        method: 'GET',
        url: url.user.CRUD + user_id,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setUser', res.data.user);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getCoaches({commit}, {token, page, search, level}){
      await axios({
        method: 'GET',
        url: url.coach.ADMIN_GET_LIST,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
        params:{
          page: page,
          search: search,
          level: level,
        }
      }).then( res => {
        commit('setCoaches', res.data.coaches);
        commit('setCoachLevels', res.data.levels);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getCoach({commit}, {token, coach_id}){
      commit('setCoach', null);
      await axios({
        method: 'GET',
        url: url.coach.ADMIN_CRUD + coach_id,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setCoach', res.data.coach);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getUserCoaches({commit}, token){
      await axios({
        method: 'GET',
        url: url.coach.USER_CRUD,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setCoaches', res.data.coaches);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getUserCoach({commit}, {token, coach_id}){
      commit('setCoach', null);
      await axios({
        method: 'GET',
        url: url.coach.USER_CRUD + coach_id,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setCoach', res.data.coach);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getPosts({commit}, {token, page}){
      await axios({
        method: 'GET',
        url: url.posts.POST,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
        params:{
          page: page,
        }
      }).then( res => {
        commit('setPosts', res.data.posts);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getPostsAdmin({commit}, {token, page, post_status_id}){
      await axios({
        method: 'GET',
        url: url.posts.ADMIN_POST,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
        params:{
          page: page,
          post_status_id: post_status_id,
        }
      }).then( res => {
        commit('setPostsAdmin', res.data.posts);
        commit('setPostStatus', res.data.status);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getArticleAdmin({commit}, {token, id}){
      await axios({
        method: 'GET',
        url: url.posts.ADMIN_CRUD + id,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
      }).then( res => {
        commit('setArticleAdmin', res.data.post);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },

    async getNotifications({commit}, {token, read}){
      await axios({
        method: 'GET',
        url: url.notification.GET,
        headers: {'Authorization': token,
                'Accept': 'application/json'},
        params:{
          read: read,
        }
      }).then( res => {
        commit('setNotifications', res.data.notifications);
        commit('setCountNotificationUnread', res.data.count);
        console.log(res.data);
      }).catch( err => {
        console.log(err);
      })
    },
  }
});

export default store;