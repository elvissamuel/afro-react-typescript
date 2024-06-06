import { IApiError, IApiResponse, IValidationError } from "../models/models";

async function handleServerError (response: Response) {
  const data = await response.json() as IApiError;

  return data;
}

export async function handleApiCalls<T> (response: Response): Promise<IApiResponse<T>> {
  try {

    if (response.status >= 400) {
      return { error: await handleServerError(response) };
    }

    return { data: response as T };
  } catch (error) {
    console.error("api call error", error);

    return { ...(error ? { error } : {}) } as IApiResponse<T>;
  }
}