import Vue from 'vue'
import Router from 'vue-router'

// import '@/<path inside src folder>';
import MapPage from '@/components/pages/MapComponent'
import User from '@/components/pages/UserComponent'
import LogInPage from '@/components/pages/LogInPageComponent'
import ReviewWrite from '@/components/pages/ReviewWriteComponent'
import ReviewList from '@/components/pages/ReviewListComponent'
import ContactUs from '@/components/pages/ContactUsComponent'
import PrivacyPolicy from '@/components/pages/PrivacyPolicyComponent'
import Terms from '@/components/pages/TermsComponent'
import Error from '@/components/pages/ErrorComponent'

Vue.use(Router)

export default new Router({
  mode: 'history', // デフォルトの挙動ではURLに#が含まれるが、mode:historyを指定することでURLから#を取り除くことができる。
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MapPage
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/login',
      name: 'Login',
      component: LogInPage
    },
    {
      path: '/review_write',
      name: 'ReviewWrite',
      component: ReviewWrite
    },
    {
      path: '/review_list',
      name: 'ReviewList',
      component: ReviewList
    },
    {
      path: '/contact_us',
      name: 'ContactUs',
      component: ContactUs
    },
    {
      path: '/privacy_policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
  ]
})