import { describe, it, expect, vi, beforeEach } from 'vitest';

import { createUser, loginUser, getUser, getAllUsers, updateUser, deleteUser } from './users';
import api from './api';

vi.mock('./api');

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('users service', () => {
  const mockUser = { _id: '1', email: 'test@test.com', name: 'Test' };
  const mockAuthResponse = { user: mockUser, accessToken: 'token123' };

  it('createUser posts to /users/register', async () => {
    mockedApi.post.mockResolvedValue({ data: mockAuthResponse });
    const result = await createUser({ email: 'test@test.com', password: 'pass123', name: 'Test' });

    expect(mockedApi.post).toHaveBeenCalledWith('/users/register', {
      email: 'test@test.com',
      password: 'pass123',
      name: 'Test',
    });
    expect(result).toEqual(mockAuthResponse);
  });

  it('loginUser posts to /users/login', async () => {
    mockedApi.post.mockResolvedValue({ data: mockAuthResponse });
    const result = await loginUser({ email: 'test@test.com', password: 'pass123' });

    expect(mockedApi.post).toHaveBeenCalledWith('/users/login', {
      email: 'test@test.com',
      password: 'pass123',
    });
    expect(result).toEqual(mockAuthResponse);
  });

  it('getUser fetches a single user by id', async () => {
    mockedApi.get.mockResolvedValue({ data: mockUser });
    const result = await getUser('1');

    expect(mockedApi.get).toHaveBeenCalledWith('/users/1');
    expect(result).toEqual(mockUser);
  });

  it('getAllUsers fetches all users', async () => {
    mockedApi.get.mockResolvedValue({ data: [mockUser] });
    const result = await getAllUsers();

    expect(mockedApi.get).toHaveBeenCalledWith('/users');
    expect(result).toEqual([mockUser]);
  });

  it('updateUser puts a user by id', async () => {
    mockedApi.put.mockResolvedValue({ data: mockUser });
    const result = await updateUser('1', { name: 'Updated' });

    expect(mockedApi.put).toHaveBeenCalledWith('/users/1', { name: 'Updated' });
    expect(result).toEqual(mockUser);
  });

  it('deleteUser deletes a user by id', async () => {
    mockedApi.delete.mockResolvedValue({ data: undefined });
    await deleteUser('1');

    expect(mockedApi.delete).toHaveBeenCalledWith('/users/1');
  });
});
