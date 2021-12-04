import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux'
import Navbar from '../../components/Navbar';
import {configureStore} from '../../store';

const store = configureStore()

test('navbar', () => {
 const wrapper = shallow(<Provider store={store}>
    <Navbar />
    </Provider>);
 expect(wrapper).toMatchSnapshot();
});