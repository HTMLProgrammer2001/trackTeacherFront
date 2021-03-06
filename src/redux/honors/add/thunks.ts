import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {reset, startSubmit, stopSubmit} from 'redux-form';
import {toast} from 'react-toastify';
import i18next from 'i18next';

import {RootState} from '../../index';
import honorsApi from '../../../utils/api/models/honorsApi';


export type IAddHonorThunkAction = ThunkAction<void, RootState, unknown, Action<any>>;

const thunkAddHonor = (vals: any): IAddHonorThunkAction => {
	return async (dispatch: ThunkDispatch<{}, {}, Action<any>>) => {
		dispatch(startSubmit('honorsAddForm'));

		try{
			await honorsApi.addHonor(vals);
			dispatch(stopSubmit('honorsAddForm'));
			dispatch(reset('honorsAddForm'));

			toast.success(i18next.t('messages.honors.add'));
		}
		catch (e) {
			dispatch(stopSubmit('honorsAddForm', {
				_error: e.response?.data.message || e.message,
				...e.response?.data.errors
			}));

			toast.error(e.response?.data.message || e.message);
		}
	};
};

export default thunkAddHonor;
