import React, {useEffect} from 'react';
import {reduxForm, InjectedFormProps, Field} from 'redux-form';
import {Translation} from 'react-i18next';
import {Button, Row} from 'react-bootstrap';
import {useLocation} from 'react-router';
import qs from 'querystring';

import InputElement from '../../../common/formElements/InputElement';
import DataListElement from '../../../common/formElements/DataListElement';
import SelectElement from '../../../common/formElements/SelectElement';


export type IUsersFilterData = {
	filterName: string,
	filterEmail: string,
	filterCommission: number,
	filterDepartment: number,
	filterRank: number,
	filterTitle: number,
	filterCategory: number
};

type IUsersFilterFormProps = InjectedFormProps<IUsersFilterData>;
const UsersFilterForm: React.FC<IUsersFilterFormProps> = ({handleSubmit, initialize}) => {
	const location = useLocation();

	useEffect(() => {
		//parse QP and set in form
		const q = qs.parse(location.search.slice(1));
		initialize(q);
	}, []);

	return (
		<form onSubmit={handleSubmit} className="center flex-column">
			<Translation>
				{t => (
					<Row className="justify-content-center">
						<Field
							component={InputElement}
							type="text"
							name="filterName"
							className="w-100"
							label={t('users.all.filterName')}
						/>

						<Field
							component={InputElement}
							type="text"
							name="filterEmail"
							className="w-100"
							label={t('users.all.filterEmail')}
						/>
					</Row>
				)}
			</Translation>

			<Translation>
				{t => (
					<Row className="justify-content-center">
						<Field
							component={DataListElement}
							name="filterDepartment"
							id="filterDepartment"
							className="w-100"
							placeholder={t('users.all.filterDepartment')}
							url={`${process.env.REACT_APP_SERVER_URL}/search/departments`}
						/>

						<Field
							component={DataListElement}
							name="filterCommission"
							id="filterCommission"
							className="w-100"
							placeholder={t('users.all.filterCommission')}
							url={`${process.env.REACT_APP_SERVER_URL}/search/commissions`}
						/>
					</Row>
				)}
			</Translation>

			<Translation>
				{t => (
					<Row className="justify-content-center">
						<Field
							component={DataListElement}
							name="filterRank"
							id="filterRank"
							className="w-100"
							placeholder={t('users.all.filterRank')}
							url={`${process.env.REACT_APP_SERVER_URL}/search/ranks`}
						/>

						<Field
							component={SelectElement}
							name="filterTitle"
							className="w-100"
							label={t('users.all.filterTitle')}
						>
							<option value={-1} selected>{t('common.all')}</option>
						</Field>
					</Row>
				)}
			</Translation>

			<Translation>
				{t => (
					<Row className="justify-content-center">
						<Field
							component={SelectElement}
							name="filterCategory"
							className="w-100"
							label={t('users.all.filterCategory')}
						>
							<option value={-1} selected>{t('common.all')}</option>
						</Field>
					</Row>
				)}
			</Translation>

			<Translation>
				{t => (
					<div>
						<Button variant="info" type="submit">
							{t('common.search')}
						</Button>
					</div>
				)}
			</Translation>
		</form>
	);
};

export default reduxForm<IUsersFilterData>({
	form: 'usersFilterForm'
})(UsersFilterForm);
