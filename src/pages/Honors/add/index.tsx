import React, {useEffect} from 'react';
import {Button, Card, Row, Spinner} from 'react-bootstrap';
import {ConnectedProps, connect} from 'react-redux';
import {submit, isSubmitting} from 'redux-form';
import {useTranslation} from 'react-i18next';
import {compose} from 'redux';

import {RootState} from '../../../redux';
import BackButton from '../../../common/BackButton';
import IsUserRoleMore from '../../../utils/HOC/IsUserRoleMore';
import {Roles} from '../../../utils/helpers/converters/RoleCodeToName';
import thunkAddHonor from '../../../redux/honors/add/thunks';
import AddHonorForm, {IHonorsAddData} from './AddHonorForm';


const mapStateToProps = (state: RootState) => ({
	submitting: isSubmitting('honorsAddForm')(state)
});

const mapDispatchToProps = (dispatch: any) => ({
	add(vals: IHonorsAddData){
		dispatch(thunkAddHonor(vals));
		return;
	},
	send: () => dispatch(submit('honorsAddForm'))
});

const connected = connect(mapStateToProps, mapDispatchToProps);

type IAddHonorPageProps = ConnectedProps<typeof connected>;
const AddHonorPage: React.FC<IAddHonorPageProps> = ({add, send, submitting}) => {
	const {t} = useTranslation();

	useEffect(() => {
		document.title = t('honors.add.pageTitle');
	}, []);

	return (
		<>
			<div className="title">
				{t('honors.add.pageTitle')}
			</div>

			<Card className="mr-5">
				<Card.Body>
					<AddHonorForm onSubmit={add}/>
				</Card.Body>

				<Card.Footer>
					<Row className="justify-content-between p-2">
						<BackButton/>

						<Button
							variant="success"
							onClick={send}
							disabled={submitting}
						>
							{submitting && <Spinner size="sm" animation="border"/>}
							{t('common.add')}
						</Button>
					</Row>
				</Card.Footer>
			</Card>
		</>
	);
};

export default compose<React.FC<IAddHonorPageProps>>(
	IsUserRoleMore(Roles.MODERATOR, true),
	connected
)(AddHonorPage);
