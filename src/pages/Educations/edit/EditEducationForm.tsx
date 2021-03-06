import React, {useEffect} from 'react';
import {reduxForm, InjectedFormProps, Field} from 'redux-form';
import {Translation} from 'react-i18next';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '../../../redux';
import required from '../../../utils/validators/required';
import {selectEditEducation} from '../../../redux/educations/edit/selectors';
import positiveNumber from '../../../utils/validators/positiveNumber';
import year from '../../../utils/validators/year';

import InputElement from '../../../common/formElements/InputElement';
import DataListElement from '../../../common/formElements/DataListElement';
import SelectElement from '../../../common/formElements/SelectElement';


const mapStateToProps = (state: RootState) => ({
	education: selectEditEducation(state)
});

const connected = connect(mapStateToProps);

export type IEducationsEditData = {
	user: number,
	qualification: string,
	institution: string,
	graduateYear: number,
	specialty: string
};

type IOwnProps = ConnectedProps<typeof connected>;

type IEducationsEditFormProps = InjectedFormProps<IEducationsEditData, IOwnProps> & IOwnProps;
const EducationsEditForm: React.FC<IEducationsEditFormProps> = (props) => {
	const {handleSubmit, error, initialize, education} = props;
	
	useEffect(() => {
		initialize({...education, graduateYear: education.graduate_year, user: education.user.id} as any);
	}, []);
	
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
								placeholder={t('educations.edit.user')}
								url={`${process.env.REACT_APP_SERVER_URL}/search/users`}
								defVal={{id: education.user.id, title: education.user.fullName}}
								validate={[required]}
							/>

							<Field
								component={InputElement}
								type="text"
								name="institution"
								label={t('educations.edit.institution')}
								validate={[required]}
							/>

							<Field
								component={SelectElement}
								name="qualification"
								label={t("educations.all.qualification")}
								onlyInvalid
								validate={[required]}
							>
								<option value={0}>{t('common.qualList.0')}</option>
								<option value={1}>{t('common.qualList.1')}</option>
								<option value={2}>{t('common.qualList.2')}</option>
							</Field>
						</div>
					)}
				</Translation>

				<Translation>
					{t => (
						<div className="w-100 pl-md-3">
							<Field
								component={InputElement}
								name="graduateYear"
								label={t('educations.edit.graduateYear')}
								validate={[required, positiveNumber, year]}
							/>

							<Field
								component={InputElement}
								name="specialty"
								label={t('educations.edit.specialty')}
							/>
						</div>
					)}
				</Translation>
			</div>
		</form>
	);
};

export default connected(
		reduxForm<IEducationsEditData, IOwnProps>({
			form: 'educationsEditForm'
		})(EducationsEditForm)
);
