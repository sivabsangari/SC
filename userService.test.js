// userService.test.js
const axios = require('axios');
const userService = require('./userService');
const mockAxios = jest.spyOn(axios, 'get');

describe('User Service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetches user data', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    mockAxios.mockResolvedValue({ data: mockUser });

    const user = await userService.getUser(1);
    expect(user).toEqual(mockUser);
    expect(mockAxios).toHaveBeenCalledWith('https://api.example.com/users/1');
  });

  test('handles errors', async () => {
    mockAxios.mockRejectedValue(new Error('Network Error'));

    await expect(userService.getUser(1)).rejects.toThrow('Network Error');
  });
});
