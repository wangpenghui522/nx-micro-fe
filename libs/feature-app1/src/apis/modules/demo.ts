import { httpClient } from '@shared/utils';
import { type ApiResult } from '../apis.d';

// 接口注释
export const getMock = async <T, U>(params: T | any): Promise<ApiResult<U>> =>
  await httpClient.get(`/mock.do`, { params });
