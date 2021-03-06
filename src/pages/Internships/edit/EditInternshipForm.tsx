import React, {useEffect} from 'react';
import {reduxForm, InjectedFormProps, Field} from 'redux-form';
import {Translation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {IInternship} from '../../../interfaces/models/IInternship';
import {RootState} from '../../../redux';
import required from '../../../utils/validators/required';
import positiveNumber from '../../../utils/validators/positiveNumber';
import {selectEditInternship} from '../../../redux/internships/edit/selectors';
import date from '../../../utils/validators/date';


import InputElement from '../../../common/formElements/InputElement';
import DateElement from '../../../common/formElements/DateElement';
import DataListElement from '../../../common/formElements/DataListElement';
import dateMoreThan from '../../../utils/validators/dateMoreThan';


const moreValidator = dateMoreThan('from', true);

export type IInternshipsEditData = {
	user: number,
	category: number,
	title: string,
	from: string,
	to: string,
	place: string,
	hours: number,
	credits?: number,
	code?: string
};

type IInternshipsEditFormProps = InjectedFormProps<IInternshipsEditData>;
const InternshipsEditForm: React.FC<IInternshipsEditFormProps> = ({handleSubmit, error, initialize}) => {
	const internship = useSelector<RootState, IInternship>(selectEditInternship);

	useEffect(() => {
		initialize({...internship, user: internship.user.id, category: internship.category.id} as any);
	}, [internship]);

	return (
		<form onSubmit={handleSubmit}>

			{
				error &&
				<div>{error}</div>
			}

			<div className="d-md-flex w-100">
				<Translation>
					{t => (
						<div className="w-100 pr-md-3">
							<Field
								component={DataListElement}
								name="user"
								placeholder={t('internships.edit.user')}
								url={`${process.env.REACT_APP_SERVER_URL}/search/users`}
								defVal={{id: internship.user.id, title: internship.user.fullName}}
								validate={[required]}
							/>

							<Field
								component={DataListElement}
								name="category"
								placeholder={t('internships.edit.category')}
								url={`${process.env.REACT_APP_SERVER_URL}/search/categories`}
								defVal={{id: internship.category.id, title: internship.category.name}}
								validate={[required]}
							/>

							<Field
								component={InputElement}
								name="title"
								label={t('internships.edit.title')}
								validate={[required]}
							/>

							<Field
								component={InputElement}
								name="place"
								label={t('internships.edit.place')}
								validate={[required]}
							/>

							<Field
								component={InputElement}
								name="code"
								label={t('internships.edit.code')}
							/>
						</div>
					)}
				</Translation>

				<Translation>
					{t => (
						<div className="w-100 pl-md-3">
							<Field
								component={DateElement}
								name="from"
								label={t('internships.edit.from')}
								validate={[required, date]}
							/>

							<Field
								component={DateElement}
								name="to"
								label={t('internships.edit.to')}
								validate={[required, date, moreValidator]}
							/>

							<Field
								component={InputElement}
								type="number"
								name="hours"
								label={t('internships.edit.hours')}
								validate={[required, positiveNumber]}
							/>

							<Field
								component={InputElement}
								type="number"
								name="credits"
								label={t('internships.edit.credits')}
								validate={[positiveNumber]}
							/>
						</div>
					)}
				</Translation>
			</div>
		</form>
	);
};

export default reduxForm<IInternshipsEditData>({
	form: 'internshipsEditForm'
})(InternshipsEditForm);
