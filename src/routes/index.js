import Ball from '../pages/Ball.vue'

export default [
  { path: '/Ball', name: 'Ball', component: Ball },
  { path: '*', redirect: 'Ball' }
]
