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

const authRequest = async (dataToPost, p) => {
  const path = `http://localhost:5005/admin/auth/${p}`;
  const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(dataToPost),
  };
  return requestAPI(path, options);
};

const cancelAuthRequest = async (dataToPost, p) => {
  const path = `http://localhost:5005/admin/auth/${p}`;
  const token = localStorage.getItem('token');
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return requestAPI(path, options);
};

export default class AuthAPI {
  constructor(data, path) {
    this.data = data;
    this.path = path;
  }

  async login() {
    const res = await authRequest(this.data, 'login');
    return res;
  }

  async signup() {
    const res = await authRequest(this.data, 'register');
    return res;
  }

  async logout() {
    const res = await cancelAuthRequest(this.data, 'logout');
    return res;
  }
}
