import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux'
import Job from '../../components/Job';
import {configureStore} from '../../store'

const store = configureStore()

test('Job', () => {
 const wrapper = shallow(

    <Provider store={store}>
        <Job />
    </Provider>
    );
 expect(wrapper).toMatchSnapshot();
});