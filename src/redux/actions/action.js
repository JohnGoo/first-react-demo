import { createAction } from 'redux-actions';
import { fetchJSONByPost } from '../../utils/ajax';
import { createAjaxAction } from '../../utils/utils';

// 利用组件state做的测试
export const checkoutUserTable = createAction('checkoutUserTable');
export const userTableState = createAction('userTableState');

const fetchListStartAction = createAction('request list');
const fetchListEndAction = createAction('receive list');

export const fetchList = createAjaxAction(fetchJSONByPost('/list'), fetchListStartAction, fetchListEndAction);