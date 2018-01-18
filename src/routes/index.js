import BallAndButton from '../pages/BallAndButton.vue'
import Football from '../pages/Football.vue'

export default [
  { path: '/BallAndButton', name: 'Ball And Button', component: BallAndButton },
  { path: '/Football', name: 'Football', component: Football },
  { path: '*', redirect: 'BallAndButton' }
]
