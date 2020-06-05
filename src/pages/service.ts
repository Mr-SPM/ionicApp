import request from '../utils/request';

export function fetchTest(params: any) {
  return request('/halfMaterial/list', {
    method: 'get',
    params,
  });
}
