const requestAPI = async (path, options) => {
  try {
    const response = await fetch(path, options);
    if (response.status !== 200) {
      const resMessage = await response.json();
      throw new Error(`${response.status} - ${resMessage.error}`);
    } else if (!response.ok) {
      throw new Error('Something went wrong');
    } else {
      return response.json();
    }
  } catch (err) {
    return err;
  }
};

const joinGame = async (dataToPost) => {
  const path = `http://localhost:5005/play/join/${dataToPost.sessionId}`;
  const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ name: dataToPost.name }),
  };
  return requestAPI(path, options);
};

const getQuestionData = async (playerId, p) => {
  const path = `http://localhost:5005/play/${playerId}/${p}`;
  const options = {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
  };
  return requestAPI(path, options);
};

export default class PlayerAPI {
  constructor(data, path) {
    this.data = data;
    this.path = path;
  }

  async joinGame() {
    const res = await joinGame(this.data);
    return res;
  }

  async getQuestion() {
    const res = await getQuestionData(this.data, 'question');
    return res;
  }

  async getAnswer() {
    const res = await getQuestionData(this.data, 'answer');
    return res;
  }

  async getResults() {
    const res = await getQuestionData(this.data, 'results');
    return res;
  }
}
