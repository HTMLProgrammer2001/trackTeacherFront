import React, {useEffect} from 'react';
import {Button, Card, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {compose} from 'redux';

import {RootState} from '../../../redux';

import BackButton from '../../../common/BackButton';
import Paginator from '../../../common/Paginator';
import UserCan from '../../../common/UserCan';
import {Roles} from '../../../utils/helpers/converters/RoleCodeToName';
import {selectAllHonorsPagination} from '../../../redux/honors/all/selectors';
import thunkAllHonors from '../../../redux/honors/all/thunks';
import HonorsFilterForm from './HonorsFilterForm';
import HonorsTable from './HonorsTable';
import IsUserRoleMore from '../../../utils/HOC/IsUserRoleMore';


const mapStateToProps = (state: RootState) => ({
	paginator: selectAllHonorsPagination(state)
});

const connected = connect(mapStateToProps, {changePage: thunkAllHonors});

type IAllHonorsPageProps = ConnectedProps<typeof connected>;
const AllHonorsPage: React.FC<IAllHonorsPageProps> = ({changePage, paginator}) => {
	const {t} = useTranslation();

	useEffect(() => {
		document.title = t('honors.all.pageTitle');
	}, []);

	return (
		<>
			<div className="title">
				{t('honors.name')}
			</div>

			<Card className="mr-5">
				<Card.Body>
					<div className="model__filter-form">
						<div>
							<UserCan role={Roles.MODERATOR}>
								<Link to="/honors/add">
									<Button variant="success">
										{t('common.add')}
									</Button>
								</Link>
							</UserCan>
						</div>

						<div>
							<UserCan role={Roles.MODERATOR}>
								<Link to="/honors/import">
									<Button variant="primary">
										{t('common.import')}
									</Button>
								</Link>
							</UserCan>
						</div>
					</div>

					<HonorsFilterForm onSubmit={() => changePage(1)}/>

					<div className="d-flex justify-content-center w-100">
						<HonorsTable/>
					</div>

					<div className="d-flex my-3 justify-content-end w-100">
						<Paginator {...paginator} setCur={changePage}/>
					</div>
				</Card.Body>

				<Card.Footer>
					<Row className="justify-content-between p-2">
						<BackButton/>
					</Row>
				</Card.Footer>
			</Card>
		</>
	);
};

export default compose<React.FC<IAllHonorsPageProps>>(
	IsUserRoleMore(Roles.VIEWER, true),
	connected
)(AllHonorsPage);
