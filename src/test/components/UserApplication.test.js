import React from 'react';
import { shallow } from 'enzyme';
import UserApplication from '../../components/UserApplication';
import  {Provider}  from 'react-redux'
import {configureStore} from '../../store'

const store = configureStore()



test('UserApplication', () => {
 const wrapper = shallow(
    <Provider store={store}>
      <UserApplication />
    </Provider> 
 );
 expect(wrapper).toMatchSnapshot();
});