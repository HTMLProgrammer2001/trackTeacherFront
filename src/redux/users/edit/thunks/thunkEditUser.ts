import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {startSubmit, stopSubmit} from 'redux-form';
import {toast} from 'react-toastify';
import i18next from 'i18next';

import {RootState} from '../../../index';
import usersApi from '../../../../utils/api/models/usersApi';


export type IUserEditThunkAction = ThunkAction<void, RootState, unknown, Action<any>>;

const thunkEditUser = (id: number, vals: any): IUserEditThunkAction => {
	return async (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
		dispatch(startSubmit('usersEditForm'));

		try{
			await usersApi.editUser(id, vals);

			dispatch(stopSubmit('usersEditForm'));
			toast.success(i18next.t('messages.users.edit'));
		}
		catch (e) {
			dispatch(stopSubmit('usersEditForm', {
				_error: e.response?.data.message || e.message,
				...e.response?.data.errors
			}));

			toast.error(e.response?.data.message || e.message);
		}
	};
};

export default thunkEditUser;
