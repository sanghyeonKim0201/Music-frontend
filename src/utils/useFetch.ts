const BASE_URL = 'http://localhost:8080';

export default async function UseFetch(
  url: string,
  options?: RequestInit | undefined,
): Promise<Response> {
  //로컬스토리지에 저장해서 불러올지 고민중

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(BASE_URL + url, {
      ...options,
      credentials: 'include',
      headers: {
        ...(options?.headers ?? {}),
        ...defaultHeaders,
      },
    });

    if (response.status === 401) {
      console.log('401');
      //refreshToken을 어디에 담아 보내야 할지 고민중
      const refreshApi = await fetch(BASE_URL + '/api/auth/refresh', {
        credentials: 'include',
      });

      const retryApi = await fetch(BASE_URL + url);
      return retryApi;
    }
    return response;
  } catch (error) {
    throw new Error('error');
  }
}
