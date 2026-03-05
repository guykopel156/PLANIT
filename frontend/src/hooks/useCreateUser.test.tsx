import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useCreateUser } from './useCreateUser';
import * as usersService from '../services/users';

vi.mock('../services/users');

function createWrapper(): React.FC<{ children: React.ReactNode }> {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useCreateUser', () => {
  it('calls createUser service on mutate', async () => {
    const mockResponse = { user: { _id: '1', email: 'a@b.com', name: 'A' }, accessToken: 'tok' };
    vi.mocked(usersService.createUser).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCreateUser(), { wrapper: createWrapper() });

    result.current.mutate({ email: 'a@b.com', password: '123', name: 'A' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResponse);
  });
});
