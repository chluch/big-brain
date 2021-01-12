const newGame = async (gameName) => {
  const path = 'http://localhost:5005/admin/quiz/new';
  const option = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ name: gameName }),
  };
  try {
    const response = await fetch(path, option);
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

const deleteGame = async (gameId) => {
  const path = `http://localhost:5005/admin/quiz/${gameId}`;
  const token = localStorage.getItem('token');
  const option = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(path, option);
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

const getQuizzes = async () => {
  const path = 'http://localhost:5005/admin/quiz';
  const option = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await fetch(path, option);
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

const getQuiz = async (quizId) => {
  const path = `http://localhost:5005/admin/quiz/${quizId}`;
  const option = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await fetch(path, option);
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

const updateQuiz = async (quizId, questions, name, thumbnail) => {
  const path = `http://localhost:5005/admin/quiz/${quizId}`;
  const option = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name,
      questions,
      thumbnail,
    }),
  };
  try {
    const response = await fetch(path, option);
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

const startQuiz = async (quizId) => {
  const path = `http://localhost:5005/admin/quiz/${quizId}/start`;
  const option = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await fetch(path, option);
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

const advanceQuiz = async (quizId) => {
  const path = `http://localhost:5005/admin/quiz/${quizId}/advance`;
  const option = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await fetch(path, option);
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

const endQuiz = async (quizId) => {
  const path = `http://localhost:5005/admin/quiz/${quizId}/end`;
  const option = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await fetch(path, option);
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

const getSessionStatus = async (sessionId) => {
  const path = `http://localhost:5005/admin/session/${sessionId}/status`;
  const option = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await fetch(path, option);
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

const getSessionResults = async (sessionId) => {
  const path = `http://localhost:5005/admin/session/${sessionId}/results`;
  const option = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await fetch(path, option);
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

export default {
  getQuizzes,
  getQuiz,
  deleteGame,
  newGame,
  updateQuiz,
  startQuiz,
  advanceQuiz,
  endQuiz,
  getSessionStatus,
  getSessionResults,
};
