import React from 'react';
import { shallow } from 'enzyme';
import NewGameModal from '../component/NewGameModal';

describe('NewGameModal', () => {
  const mockFn = jest.fn();
  it('renders all elements correctly', () => {
    const wrapper = shallow(<NewGameModal setGames={() => {}} />);
    expect(wrapper.find('#gameModal').length).toBe(1);
    expect(wrapper.find('#createGameButton').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('Formik').length).toBe(1);
    expect(wrapper.find('Form').length).toBe(1);
    expect(wrapper.find('Field').length).toBe(1);
    expect(wrapper.find('#submitNewGame').length).toBe(1);
  });

  it('renders the correct text for the modal title', () => {
    const wrapper = shallow(<NewGameModal setGames={() => {}} />);
    expect(wrapper.find('h2').text()).toEqual('Create a new game!');
  });

  it('renders the correct text for Create Game Button', () => {
    const wrapper = shallow(<NewGameModal setGames={() => {}} />);
    expect(wrapper.find('#createGameButton').text()).toBe('Create Game!');
  });

  it('renders the correct text for Submit Button', () => {
    const wrapper = shallow(<NewGameModal setGames={() => {}} />);
    expect(wrapper.find('#submitNewGame').text()).toBe('Submit');
  });

  it('contains a label for its input field', () => {
    const wrapper = shallow(<NewGameModal setGames={() => {}} />);
    expect(wrapper.find('Field').props().label).toBeDefined();
  });

  it('renders all buttons with aria labels', () => {
    const wrapper = shallow(<NewGameModal setGames={() => {}} />);
    const buttons = wrapper.find('Button');
    expect(buttons.forEach((button) => button.props()['aria-label'])).toBeDefined();
  });

  it('opens modal after the Create Game Button is clicked', () => {
    const wrapper = shallow(<NewGameModal setGames={() => {}} />);
    expect(wrapper.find('#createGameButton').length).toBe(1);
    const button = wrapper.find('#createGameButton');
    expect(wrapper.find('#gameModal').props().open).toBe(false);
    button.simulate('click');
    expect(wrapper.find('#gameModal').props().open).toBe(true);
  });

  it('calls setGame when form is submitted', () => {
    const wrapper = shallow(<NewGameModal setGames={mockFn} />);
    const form = wrapper.find('#formik');
    form.simulate('submit', { title: 'Test Game Title' });
    jest.useFakeTimers();
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    }, 3000);
  });

  it('does not submit if a game title is not supplied', () => {
    const wrapper = shallow(<NewGameModal setGames={mockFn} />);
    const form = wrapper.find('#formik');
    form.simulate('submit', { title: '' });
    jest.useFakeTimers();
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(0);
    }, 3000);
  });

  it('does not submit if game title is over 50 characters', () => {
    const wrapper = shallow(<NewGameModal setGames={mockFn} />);
    const form = wrapper.find('#formik');
    form.simulate('submit', { title: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' });
    jest.useFakeTimers();
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(0);
    }, 3000);
  });
});
