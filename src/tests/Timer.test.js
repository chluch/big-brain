import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer, { act } from 'react-test-renderer';
import Timer from '../component/Timer';

const data1 = {
  timeLimit: 10,
};
const data2 = {
  timeLimit: 30,
};

it('renders a time limit', () => {
  const wrapper = shallow(<Timer question={data1} setTimesUp={() => { }} />);
  const time = wrapper.find('text');
  expect(parseInt(time.text(), 10)).toEqual(data1.timeLimit);
});

it('renders an unfilled circle with stroke and stroke width defined', () => {
  const wrapper = shallow(<Timer question={data1} setTimesUp={() => { }} />);
  const circle = wrapper.find('circle');
  expect(circle.length).toBe(1);
  expect(circle.props().fill).toEqual('none');
  expect(circle.props().stroke).not.toEqual('none');
  expect(circle.props().strokeWidth).toBeDefined();
});

it('renders a path that is coloured #21ada8', () => {
  const wrapper = shallow(<Timer question={data1} setTimesUp={() => { }} />);
  const path = wrapper.find('path');
  expect(path.length).toBe(1);
  expect(path.props().stroke).toEqual('#21ada8');
});

it('decrements the time by 1 after 1 second passed', () => {
  jest.useFakeTimers();
  const wrapper = mount(<Timer question={data1} setTimesUp={() => { }} />);
  let time = wrapper.find('text');
  expect(parseInt(time.text(), 10)).toEqual(data1.timeLimit);
  act(() => {
    jest.advanceTimersByTime(1000);
    wrapper.update();
    time = wrapper.find('text');
    expect(parseInt(time.text(), 10)).toEqual(data1.timeLimit - 1);
  });
});

it('Stops decrementing when countdown reaches 0', () => {
  jest.useFakeTimers();
  const wrapper = mount(<Timer question={data1} setTimesUp={() => { }} />);
  let time = wrapper.find('text');
  expect(parseInt(time.text(), 10)).toEqual(data1.timeLimit);
  act(() => {
    jest.advanceTimersByTime(20000);
    wrapper.update();
    time = wrapper.find('text');
    expect(parseInt(time.text(), 10)).toEqual(0);
  });
});

it('changes colour to orange when countdown reaches the 50% mark', () => {
  jest.useFakeTimers();
  const wrapper = mount(<Timer question={data1} setTimesUp={() => { }} />);
  let svg = wrapper.find('path');
  expect(svg.props().stroke).toEqual('#21ada8');
  act(() => {
    jest.advanceTimersByTime(5000);
    wrapper.update();
    svg = wrapper.find('path');
    expect(svg.props().stroke).toEqual('orange');
  });
});

it('changes colour to red when countdown passes the 33% mark (1/3 time left)', () => {
  jest.useFakeTimers();
  const wrapper = mount(<Timer question={data2} setTimesUp={() => { }} />);
  let svg = wrapper.find('path');
  expect(svg.props().stroke).toEqual('#21ada8');
  act(() => {
    jest.advanceTimersByTime(20000);
    wrapper.update();
    svg = wrapper.find('path');
    expect(svg.props().stroke).toEqual('red');
  });
});

it('calls setTimesUp when countdown finishes', () => {
  jest.useFakeTimers();
  const mockFn = jest.fn();
  const wrapper = mount(<Timer question={data1} setTimesUp={mockFn} />);
  const time = wrapper.find('text');
  expect(mockFn).not.toBeCalled();
  act(() => {
    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(parseInt(time.text(), 10)).toEqual(0);
  });
});

// Snapshot
it('renders correctly when counting down each second', () => {
  jest.useFakeTimers();
  const timer = renderer.create(<Timer question={data1} setTimesUp={() => { }} />);
  act(() => {
    jest.advanceTimersByTime(1000);
    expect(timer).toMatchSnapshot();
    jest.advanceTimersByTime(1000);
    expect(timer).toMatchSnapshot();
  });
});
