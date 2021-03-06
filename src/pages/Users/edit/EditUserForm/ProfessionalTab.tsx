import React from 'react';
import {Translation} from 'react-i18next';
import {Field} from 'redux-form';

import {IUser} from '../../../../interfaces/models/IUser';
import InputElement from '../../../../common/formElements/InputElement';
import DataListElement from '../../../../common/formElements/DataListElement';
import SelectElement from '../../../../common/formElements/SelectElement';

import required from '../../../../utils/validators/required';
import positiveNumber from '../../../../utils/validators/positiveNumber';
import year from '../../../../utils/validators/year';


type IProfessionalTabProps = {user: IUser}
const ProfessionalTab: React.FC<IProfessionalTabProps> = ({user}) => (
	<div>
		<div className="mt-3 d-flex flex-column flex-md-row">
			<Translation>
				{t => (
					<div className="w-100 mr-md-3">
						<Field
							component={DataListElement}
							name="department"
							placeholder={t('users.edit.department')}
							validate={[required]}
							url={`${process.env.REACT_APP_SERVER_URL}/search/departments`}
							defVal={{id: user.department.id, title: user.department.name}}
						/>

						<Field
							component={DataListElement}
							name="commission"
							placeholder={t('users.edit.commission')}
							validate={[required]}
							url={`${process.env.REACT_APP_SERVER_URL}/search/commissions`}
							defVal={{id: user.commission.id, title: user.commission.name}}
						/>

						<Field
							component={DataListElement}
							name="rank"
							placeholder={t('users.edit.rank')}
							url={`${process.env.REACT_APP_SERVER_URL}/search/ranks`}
							defVal={user.rank ? {id: user.rank.id, title: user.rank.name} : null}
						/>

						<Field
							component={SelectElement}
							name="role"
							label={t('users.edit.role')}
							validate={[required]}
						>
							<option value={1}>{t('common.roles.admin')}</option>
							<option value={10}>{t('common.roles.moderator')}</option>
							<option value={30}>{t('common.roles.viewer')}</option>
							<option value={50}>{t('common.roles.user')}</option>
						</Field>

						<Field
							component={InputElement}
							type="number"
							name="hiring_year"
							label={t('users.edit.year')}
							validate={[positiveNumber, year]}
						/>

						<Field
							component={SelectElement}
							name="pedagogical_title"
							label={t('users.edit.pedagogical')}
						>
							<option value={-1} selected>---{t('common.notSetted')}---</option>
							<option value={0}>{t('common.pedTitles.higher')}</option>
							<option value={1}>{t('common.pedTitles.methodist')}</option>
						</Field>
					</div>
				)}
			</Translation>

			<Translation>
				{t => (
					<div className="w-100 mr-ml-3">
						<Field
							component={InputElement}
							type="number"
							name="experience"
							label={t('users.edit.experience')}
							validate={[positiveNumber]}
						/>

						<Field
							component={SelectElement}
							name="academic_status"
							label={t('users.edit.academic')}
						>
							<option value={-1} selected>---{t('common.all')}---</option>
							<option value={0}>{t('common.academicStatus.candidate')}</option>
							<option value={1}>{t('common.academicStatus.doctor')}</option>
						</Field>

						<Field
							component={InputElement}
							type="number"
							name="academic_status_year"
							label={t('users.edit.academicYear')}
							validate={[positiveNumber, year]}
						/>

						<Field
							component={SelectElement}
							name="scientific_degree"
							label={t('users.edit.scientificDegree')}
						>
							<option value={-1} selected>---{t('common.all')}---</option>
							<option value={0}>{t('common.scientific.docent')}</option>
							<option value={1}>{t('common.scientific.searcher')}</option>
							<option value={2}>{t('common.scientific.professor')}</option>
						</Field>

						<Field
							component={InputElement}
							type="number"
							name="scientific_degree_year"
							label={t('users.edit.scientificDegreeYear')}
							validate={[positiveNumber, year]}
						/>
					</div>
				)}
			</Translation>
		</div>
	</div>
);

export default ProfessionalTab;
