import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGetUser } from './useGetUser';
import * as usersService from '../services/users';

vi.mock('../services/users');

function createWrapper(): React.FC<{ children: React.ReactNode }> {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useGetUser', () => {
  it('fetches a user by id', async () => {
    const mockUser = { _id: '1', email: 'a@b.com', name: 'A' };
    vi.mocked(usersService.getUser).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useGetUser('1'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUser);
  });

  it('does not fetch when id is empty', () => {
    const { result } = renderHook(() => useGetUser(''), { wrapper: createWrapper() });
    expect(result.current.isFetching).toBe(false);
  });
});
