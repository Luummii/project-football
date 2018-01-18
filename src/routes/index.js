import BallAndButton from '../pages/BallAndButton.vue'

export default [
  { path: '/BallAndButton', name: 'Ball And Button', component: BallAndButton },
  { path: '*', redirect: 'BallAndButton' }
]
