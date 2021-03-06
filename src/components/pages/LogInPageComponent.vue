<template>
    <div id="firebaseui-auth-container"></div>
</template>

<script>
import store from '@/store/index.js';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui-ja';
import 'firebaseui-ja/dist/firebaseui.css';

export default {
    name: "LogInPage",
    mounted() {
    // FirebaseUI config.
    var vm = this;
    var uiConfig = {
        callbacks: {
            uiShown: function() {
                // console.log("uiShown");
            },
            signInSuccessWithAuthResult: function(authResult) {
                const successResponse = async () => {
                    var isNewUser = authResult.additionalUserInfo.isNewUser;
                    var displayName = authResult.user.displayName;
                    var photoURL = authResult.user.photoURL;
                    var email = authResult.user.email;

                    // SNSログイン＆で登録済みであればスキップ
                    if (displayName != "ゲスト" && !isNewUser) {
                        // document.cookie = "testField=registeredUser";
                        return true;
                    }

                    switch (authResult.additionalUserInfo.providerId) {
                        case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
                            displayName = authResult.additionalUserInfo.profile.name;
                            photoURL = authResult.additionalUserInfo.profile.picture;
                            break;
                        case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
                            displayName = authResult.additionalUserInfo.profile.name;
                            photoURL = authResult.additionalUserInfo.profile.picture.data.url;
                            break;
                        // Twitter doesn't provide email
                        case firebase.auth.TwitterAuthProvider.PROVIDER_ID:
                            displayName = authResult.additionalUserInfo.profile.name;
                            photoURL = authResult.aditionalUserInfo.profile.profile_image_url;
                            break;
                        case firebase.auth.EmailAuthProvider.PROVIDER_ID:
                            break;
                        default:
                            displayName = "ゲスト";
                            photoURL = "";
                            break;
                    }

                    var user = {
                        uid: authResult.user.uid,
                        displayName: displayName,
                        photoURL: photoURL
                    };
                
                    await firebase
                        .auth()
                        .currentUser.updateProfile(user)
                    
                    await vm.axios.post(process.env.VUE_APP_API_BASE_URL + '/api/v1/users', {
                        name: displayName, email: email, firebase_uid: authResult.user.uid
                    })
                    .then(function() {
                        store.commit('setUser', user);
                        store.commit('setSignIn', true);
                    })
                    .catch(function() {
                        vm.$toasted.error('ユーザー登録に失敗しました');
                    });
                }
                successResponse();
                vm.$router.push('/');
                // return true;
            },
            signInFailure: function() {
                vm.$toasted.error('ユーザー登録に失敗しました');
                // vm.$router.push('/');
            }
        },
        autoUpgradeAnonymousUsers: true,
        signInFlow: 'popup',
        // signInSuccessUrl: '/', // rediredcted page after sign in
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback function
        // tosUrl: '/terms', // Terms of service url/callback.
        // Privacy policy url/callback.
        // privacyPolicyUrl: '/privacy_policy',
        tosUrl: function() {
            vm.$router.push('/terms');
        },
        privacyPolicyUrl: function() {
            vm.$router.push('/privacy_policy');
        }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
</script>