import React, {useEffect} from 'react';
import {Button, Card, Row, Spinner} from 'react-bootstrap';
import {ConnectedProps, connect} from 'react-redux';
import {submit, isSubmitting} from 'redux-form';
import {useTranslation} from 'react-i18next';

import {RootState} from '../../../redux';
import BackButton from '../../../common/BackButton';
import AddCommissionForm from './AddCommissionForm';
import thunkAddCommission from '../../../redux/commissions/add/thunks';
import IsUserRoleMore from '../../../utils/HOC/IsUserRoleMore';
import {Roles} from '../../../utils/helpers/RoleCodeToName';


const mapStateToProps = (state: RootState) => ({
	submitting: isSubmitting('commissionsAddForm')(state)
});

const connected = connect(mapStateToProps, {
	add: thunkAddCommission,
	send: submit
});

type IAddCommissionPageProps = ConnectedProps<typeof connected>;
const AddCommissionPage: React.FC<IAddCommissionPageProps> = ({add, send, submitting}) => {
	const {t} = useTranslation();

	useEffect(() => {
		document.title = t('commissions.add.pageTitle');
	}, []);

	return (
		<>
			<div className="title">
				{t('commissions.add.pageTitle')}
			</div>

			<Card className="mr-5">
				<Card.Body>
					<AddCommissionForm onSubmit={add}/>
				</Card.Body>

				<Card.Footer>
					<Row className="justify-content-between p-2">
						<BackButton/>

						<Button
							variant="success"
							onClick={() => send('commissionsAddForm')}
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

export default IsUserRoleMore(Roles.MODERATOR, true)(connected(AddCommissionPage));
