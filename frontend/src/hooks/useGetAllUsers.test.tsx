import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGetAllUsers } from './useGetAllUsers';
import * as usersService from '../services/users';

vi.mock('../services/users');

function createWrapper(): React.FC<{ children: React.ReactNode }> {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useGetAllUsers', () => {
  it('fetches all users', async () => {
    const mockUsers = [{ _id: '1', email: 'a@b.com', name: 'A' }];
    vi.mocked(usersService.getAllUsers).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useGetAllUsers(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUsers);
  });
});
