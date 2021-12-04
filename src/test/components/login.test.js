import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux'
import Login from '../../components/Login';
import {configureStore} from '../../store';

const store = configureStore()


test('login', () => {
 const wrapper = shallow(
    <Provider store={store}>
    <Login />
    </Provider>
);
 expect(wrapper).toMatchSnapshot();
 expect(wrapper.componentWillUnmount);
 expect(wrapper.handleFormSubmit);
 expect(wrapper.render);
});