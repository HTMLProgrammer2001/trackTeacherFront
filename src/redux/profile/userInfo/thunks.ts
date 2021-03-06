import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {toast} from 'react-toastify';
import i18next from 'i18next';

import {RootState} from '../../';
import {IProfileUserActions} from './reducer';

import {
	profileUserError,
	profileUserStart,
	profileUserSuccess
} from './actions';
import usersApi from '../../../utils/api/models/usersApi';


export type IProfileUserThunkAction =
	ThunkAction<void, RootState, unknown, IProfileUserActions>;

const thunkProfileUser = (id: number): IProfileUserThunkAction => {
	return async (dispatch: ThunkDispatch<{}, {}, IProfileUserActions>) => {
		dispatch(profileUserStart());

		try{
			const resp = await usersApi.getUser(id);
			dispatch(profileUserSuccess(resp.data.data));
		}
		catch (e) {
			dispatch(profileUserError(e.message));
			toast.error(i18next.t('messages.userInfoError'));
		}
	};
};

export default thunkProfileUser;
