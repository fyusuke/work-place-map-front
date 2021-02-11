import firebase from 'firebase';
import store from "./store";

{/* <script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.2.3/firebase-analytics.js"></script> */}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var config = {
    apiKey: "AIzaSyCTRtMyL6yJqr9fzgcjcXPfMheibrkJcC4",
    authDomain: "work-place-map.firebaseapp.com",
    projectId: "work-place-map",
    storageBucket: "work-place-map.appspot.com",
    messagingSenderId: "321542038852",
    appId: "1:321542038852:web:d8fec5411fa64a7f28a311",
    measurementId: "G-LY0SX95F97"
};

export default {
    init() {
        firebase.initializeApp(config);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION); // Persistence.SESSIONを設定することで認証情報をローカルストレージに保存することができます。
    },
    logout() {
        firebase.auth().signOut()
    },
    onAuth() {
        // 認証状態が変更されたタイミングで呼ばれる関数で、ログインしているユーザのstateを変更
        firebase.auth().onAuthStateChanged(user => {
            user = user ? user : {};
            store.commit('setUser', user);
            store.commit('setSignIn', user.uid ? true : false);
        });
    },
    unregister() {
        store.commit('setUser', {});
        store.commit('setSignIn', false);
        return firebase.auth().currentUser.delete();
    }
}