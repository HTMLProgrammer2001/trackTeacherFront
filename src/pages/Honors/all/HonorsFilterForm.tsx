import React, {useEffect} from 'react';
import {reduxForm, InjectedFormProps, Field} from 'redux-form';
import {Translation} from 'react-i18next';
import {Button, Row} from 'react-bootstrap';
import {useLocation} from 'react-router';
import qs from 'querystring';

import InputElement from '../../../common/formElements/InputElement';
import DataListElement from '../../../common/formElements/DataListElement';
import DateElement from '../../../common/formElements/DateElement';


export type IHonorsFilterData = {
	filterUser: number,
	filterTitle: string,
	filterFrom: string,
	filterTo: string,
	filterType: number
};

type IHonorsFilterFormProps = InjectedFormProps<IHonorsFilterData>;
const HonorsFilterForm: React.FC<IHonorsFilterFormProps> = ({handleSubmit, initialize}) => {
	const location = useLocation();

	useEffect(() => {
		//parse QP and initialize form
		const q = qs.parse(location.search.slice(1));
		initialize(q);
	}, []);

	return (
		<form onSubmit={handleSubmit} className="w-100 center flex-column my-3">
			<Translation>
				{t => (
					<Row className="justify-content-center">
						<Field
							component={DataListElement}
							name="filterUser"
							id="filterUser"
							className="w-100"
							placeholder={t('honors.all.filterUser')}
							url={`${process.env.REACT_APP_SERVER_URL}/search/users`}
						/>

						<Field
							component={InputElement}
							type="text"
							name="filterTitle"
							className="w-100 ml-1"
							label={t('honors.all.filterName')}
						/>
					</Row>
				)}
			</Translation>

			<Translation>
				{t => (
					<Row className="justify-content-center">
						<Field
							component={DateElement}
							name="filterFrom"
							className="w-100"
							label={t('honors.all.filterFrom')}
						/>

						<Field
							component={DateElement}
							name="filterTo"
							className="w-100"
							label={t('honors.all.filterTo')}
						/>
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

export default reduxForm<IHonorsFilterData>({
	form: 'honorsFilterForm'
})(HonorsFilterForm);
