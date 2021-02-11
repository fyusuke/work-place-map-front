import Vue from 'vue'
import Router from 'vue-router'

// import '@/<path inside src folder>';
import MapPage from '@/components/MapComponent'
import User from '@/components/UserComponent'
import LogInPage from '@/components/LogInPageComponent'
import ReviewWrite from '@/components/ReviewWriteComponent'
import ReviewList from '@/components/ReviewListComponent'
import ContactUs from '@/components/ContactUsComponent'
import PrivacyPolicy from '@/components/PrivacyPolicyComponent'
import Terms from '@/components/TermsComponent'
import Error from '@/components/TermsComponent'
// import Test from '@/components/TestComponent'

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
    {
      path: '/test',
      name: 'Test',
      component: ReviewList
      // component: ReviewWrite
    },
  ]
})