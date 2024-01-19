import { Response } from 'express';
import BaseResponse from '../interfaces/response/baseResponse';

export function sendApiResponse<T>(
  res: Response,
  data: T,
  status: boolean = true,
  message: string = '',
  page?: number,
  total?: number,
) {
  const response: BaseResponse<T> = {
    data,
    page,
    total,
    status,
    message,
  };
  return res.status(200).json(response);
}

export function sendApiError(res: Response, message: string = 'An error occurred.', status = 400) {
  const response: BaseResponse<null> = {
    data: null,
    status: false,
    message,
  };
  return res.status(status).json(response);
}