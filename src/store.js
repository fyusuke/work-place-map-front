import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// https://tomokazu-kozuma.com/implement-login-function-with-firebase-authentication-using-vuejs-and-vuex/

export default new Vuex.Store({
    state: {
        user: {},
        isSignIn: false,
        testField: 0,
    },
    mutations: { // mutatinsはstateを変更するための関数
        setUser(state, user) {
            state.user = user; //firebaseが返したユーザー情報
        },
        setSignIn(state, isSignIn) {
            state.isSignIn = isSignIn; //ログインしてるかどうか true or false
        }
    },
    getters: { // gettersはstateの値を取得する関数
        user(state) {
            return state.user;
        },
        isSignIn(state) {
            return state.isSignIn;
        },
        testField(state){
            return state.testField;
        }
    }
});