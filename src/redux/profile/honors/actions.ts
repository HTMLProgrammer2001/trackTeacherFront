import {
	PROFILE_HONORS_CHANGE_SORT,
	PROFILE_HONORS_ERROR,
	PROFILE_HONORS_START,
	PROFILE_HONORS_SUCCESS
} from './types';
import {IHonor} from '../../../interfaces/models/IHonor';


export const profileHonorsStart = () => <const>({
	type: PROFILE_HONORS_START
});

export const profileHonorsError = (error: string) => <const>({
	type: PROFILE_HONORS_ERROR,
	error
});

export const profileHonorsSuccess = (honors: IHonor[]) => <const>({
	type: PROFILE_HONORS_SUCCESS,
	payload: honors
});

export const profileHonorsChangeSort = (field: string) => <const>({
	type: PROFILE_HONORS_CHANGE_SORT,
	payload: field
});
