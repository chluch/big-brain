const putAnswer = async (data, playerId) => {
  // console.log(data);
  const path = `http://localhost:5005/play/${playerId}/answer`;
  const option = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(path, option);
    // console.log('200 response:', response);
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

export default putAnswer;
