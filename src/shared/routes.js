import Chart from './components/Chart'
import Test from './components/Test';
import Home from './components/Home';
import Edit from './components/Edit';
import getInitData from './getInitData';

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
    getInitialData: () => getInitData()
  },
  {
    path: '/edit',
    component: Edit,
    getInitialData: () => getInitData()
  },
  {
    path: '/test',
    component: Test,
    children: 'Hello Test Page'
  }
]

export default routes