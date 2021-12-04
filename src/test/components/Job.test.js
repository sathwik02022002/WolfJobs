import React from 'react';
import { shallow } from 'enzyme';
import createJob from '../../actions/job';
import jobSuccess from '../../actions/job';
import fetchJobs from '../../actions/job';

test('createJob', () => {
 const wrapper = shallow(<createJob/>);
 expect(wrapper).toMatchSnapshot();
});

test('jobSuccess', () => {
    const wrapper = shallow(<jobSuccess/>);
    expect(wrapper).toMatchSnapshot();
});

test('fetchJobs', () => {
    const wrapper = shallow(<fetchJobs/>);
    expect(wrapper).toMatchSnapshot();
});

test('createApplication', () => {
    const wrapper = shallow(<createApplication/>);
    expect(wrapper).toMatchSnapshot();
});

