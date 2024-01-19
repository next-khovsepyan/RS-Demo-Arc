interface BaseResponse<T> {
  data: T;
  status: boolean;
  message: string;
  page?: number,
  total?: number,
}

export default BaseResponse;