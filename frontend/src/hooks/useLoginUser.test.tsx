import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useLoginUser } from './useLoginUser';
import * as usersService from '../services/users';

vi.mock('../services/users');

function createWrapper(): React.FC<{ children: React.ReactNode }> {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useLoginUser', () => {
  it('calls loginUser service on mutate', async () => {
    const mockResponse = { user: { _id: '1', email: 'a@b.com', name: 'A' }, accessToken: 'tok' };
    vi.mocked(usersService.loginUser).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLoginUser(), { wrapper: createWrapper() });

    result.current.mutate({ email: 'a@b.com', password: '123' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResponse);
  });
});
