import Chart from './components/Chart'
import Test from './components/Test';
import getInitData from './getInitData';

const routes =  [
  {
    path: '/',
    exact: true,
    component: Chart,
    getInitialData: () => getInitData()
  },
  {
    path: '/test',
    component: Test
  }
]

export default routes