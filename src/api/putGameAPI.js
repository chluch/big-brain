const putGame = async (gameId, data) => {
  const path = `http://localhost:5005/admin/quiz/${gameId}`;
  const option = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
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

export default putGame;
