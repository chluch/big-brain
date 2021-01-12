/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { useParams } from 'react-router-dom';
import QuestionCard from '../component/QuestionCard';
import DeleteQuestionButton from '../component/DeleteGameButton';
import EditQuestionButton from '../component/EditQuestionButton';

const openCard = {
  questionId: 0,
  name: 'what is this?',
  index: 1,
  type: 'single-choice-question',
  timeLimit: 5,
  points: 100,
  image: '',
  youtube: '',
  open: true,
  updateStatus: false,
  setUpdate: () => { },
};

const closedCard = {
  questionId: 0,
  name: 'What is this?',
  index: 1,
  type: 'single-choice-question',
  timeLimit: 5,
  points: 100,
  image: '',
  youtube: '',
  open: false,
  updateStatus: false,
  setUpdate: () => { },
};

const youtubeCard = {
  questionId: 0,
  name: 'Are you hungry?',
  index: 1,
  type: 'single-choice-question',
  timeLimit: 5,
  points: 100,
  image: '',
  youtube: 'https://www.youtube.com/watch?v=aOa2Z4n23no',
  open: true,
  updateStatus: false,
  setUpdate: () => { },
};

const youtubeImageCard = {
  questionId: 0,
  name: 'Image or Video?',
  index: 1,
  type: 'single-choice-question',
  timeLimit: 5,
  points: 100,
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEBgIApD5fRAAAAABJRU5ErkJggg==',
  youtube: 'https://www.youtube.com/watch?v=aOa2Z4n23no',
  open: true,
  updateStatus: false,
  setUpdate: () => { },
};

const imageCard = {
  questionId: 0,
  name: 'What colour is this?',
  index: 1,
  type: 'single-choice-question',
  timeLimit: 5,
  points: 100,
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEBgIApD5fRAAAAABJRU5ErkJggg==',
  youtube: '',
  open: true,
  updateStatus: false,
  setUpdate: () => { },
};

describe('QuestionCard', () => {
  it('renders a default image if no image or YouTube link is supplied', () => {
    const wrapper = shallow(<QuestionCard {...openCard} />);
    const image = wrapper.find('img');
    expect(image.length).toBe(1);
    expect(image.props().src).toEqual('questionImagePlaceholder.png');
  });

  it('displays a YouTube preview if YouTube link is supplied', () => {
    const wrapper = shallow(<QuestionCard {...youtubeCard} />);
    const youtubePreview = wrapper.find('.youtube-preview');
    expect(youtubePreview.length).toBe(1);
    expect(youtubePreview.props().youtubeUrl).toEqual(youtubeCard.youtube);
  });

  it('displays a YouTube preview if both YouTube and image are supplied', () => {
    const wrapper = shallow(<QuestionCard {...youtubeImageCard} />);
    const youtubePreview = wrapper.find('.youtube-preview');
    expect(youtubePreview.length).toBe(1);
    expect(youtubePreview.props().youtubeUrl).toEqual(youtubeCard.youtube);
    const image = wrapper.find('img');
    expect(image.length).toBe(0);
  });

  it('displays an image if an image is supplied', () => {
    const wrapper = shallow(<QuestionCard {...imageCard} />);
    const image = wrapper.find('img');
    expect(image.length).toBe(1);
    expect(image.props().src).toEqual(imageCard.image);
  });

  it('has an alt tag for the rendered image', () => {
    const wrapper = shallow(<QuestionCard {...openCard} />);
    const image = wrapper.find('img');
    expect(image.length).toBe(1);
    expect(image.props().alt).toEqual(`question ${openCard.index}`);
  });

  it('displays a question', () => {
    const wrapper = shallow(<QuestionCard {...openCard} />);
    const question = wrapper.find('.question-description');
    expect(question.length).toBe(1);
    expect(question.text()).toEqual(openCard.name);
  });

  it('displays the question type', () => {
    const wrapper = shallow(<QuestionCard {...openCard} />);
    const questionType = wrapper.find('.question-type');
    expect(questionType.length).toBe(1);
    expect(questionType.text()).toEqual(openCard.type.replace(/-/g, ' '));
  });

  it('displays how much points the question is worth', () => {
    const wrapper = shallow(<QuestionCard {...openCard} />);
    const point = wrapper.find('.points');
    expect(point.length).toBe(1);
    expect(point.text()).toEqual(openCard.points.toString());
  });

  it('displays the time limit of the question in the format of [number]sec', () => {
    const wrapper = shallow(<QuestionCard {...openCard} />);
    const timeLimit = wrapper.find('.time-limit');
    expect(timeLimit.length).toBe(1);
    expect(timeLimit.text()).toEqual(`${openCard.timeLimit}sec`);
  });

  it('displays a delete button and an edit button when "open" is true', () => {
    const wrapper = shallow(<QuestionCard {...openCard} />);
    const deleteBtn = wrapper.find('.delete-question-btn');
    expect(deleteBtn.length).toBe(1);
    const editBtn = wrapper.find('.edit-question-btn');
    expect(editBtn.length).toBe(1);
  });

  it('does not show a delete button nor an edit button when "open" is false', () => {
    const wrapper = shallow(<QuestionCard {...closedCard} />);
    const deleteBtn = wrapper.find('.delete-question-btn');
    expect(deleteBtn.length).toBe(0);
    const editBtn = wrapper.find('.edit-question-btn');
    expect(editBtn.length).toBe(0);
  });
});

describe('DeleteQuestionButton', () => {
  const noop = () => { };
  it('renders an icon and text "Delete" in the button', () => {
    const deleteButton = shallow(<DeleteQuestionButton gameId={123456} onClick={noop} />);
    expect(deleteButton.text()).toEqual('Delete');
    expect(deleteButton.find('.delete-icon').length).toBe(1);
  });

  it('has an aria-label', () => {
    const deleteButton = shallow(<DeleteQuestionButton gameId={123456} onClick={noop} />);
    expect(deleteButton.props()['aria-label']).toBeDefined();
  });

  it('triggers onClick event handler when clicked', () => {
    const mockOnclick = jest.fn();
    const deleteButton = shallow(<DeleteQuestionButton gameId={123456} onClick={mockOnclick} />);
    deleteButton.simulate('click');
    expect(mockOnclick).toHaveBeenCalledTimes(1);
  });
});

describe('EditQuestionButton', () => {
  // it('checks that useParams is a mock function in this test', () => {
  //   expect(jest.isMockFunction(useParams)).toBe(true);
  // });

  it('renders an icon and text "Edit" in the button', () => {
    useParams.mockReturnValue({ gId: 135791 });
    const editButton = shallow(<EditQuestionButton qId={654321} />);
    expect(editButton).toBeTruthy();
    expect(editButton.text()).toEqual('Edit');
    expect(editButton.find('.edit-icon').length).toBe(1);
  });

  it('has an aria-label', () => {
    useParams.mockReturnValue({ gId: 135791 });
    const editButton = shallow(<EditQuestionButton qId={654321} />);
    expect(editButton.props()['aria-label']).toBeDefined();
  });

  it('contains a link that is parameterised on gId and qId (/edit/gId/qId)', () => {
    useParams.mockReturnValue({ gId: 135791 });
    const editButton = shallow(<EditQuestionButton qId={654321} />);
    expect(editButton.find('.link-address').length).toBe(1);
    expect(editButton.find('.link-address').props().to).toBe('/edit/135791/654321');
  });
});
