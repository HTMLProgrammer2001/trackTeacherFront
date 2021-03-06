import React, {useEffect} from 'react';
import {Button, Card, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect, ConnectedProps} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {RootState} from '../../../redux';

import BackButton from '../../../common/BackButton';
import DepartmentsFilterForm from './DepartmentsFilterForm';
import DepartmentsTable from './DepartmentsTable';
import Paginator from '../../../common/Paginator';
import thunkAllDepartments from '../../../redux/departments/all/thunks';
import {selectAllDepartmentsPagination} from '../../../redux/departments/all/selectors';
import UserCan from '../../../common/UserCan';
import {Roles} from '../../../utils/helpers/converters/RoleCodeToName';


const mapStateToProps = (state: RootState) => ({
	paginator: selectAllDepartmentsPagination(state)
});

const connected = connect(mapStateToProps, {changePage: thunkAllDepartments});

type IAllDepartmentsPageProps = ConnectedProps<typeof connected>;
const AllDepartmentsPage: React.FC<IAllDepartmentsPageProps> = ({changePage, paginator}) => {
	const {t} = useTranslation();

	useEffect(() => {
		document.title = t('departments.all.pageTitle');
	}, []);

	return (
		<>
			<div className="title">
				{t('departments.all.pageTitle')}
			</div>

			<Card className="mr-5">
				<Card.Body>
					<div className="model__filter-form">
						<div>
							<UserCan role={Roles.MODERATOR}>
								<Link to="/departments/add">
									<Button variant="success">
										{t('common.add')}
									</Button>
								</Link>
							</UserCan>
						</div>

						<DepartmentsFilterForm onSubmit={() => changePage(1)}/>
					</div>

					<DepartmentsTable/>

					<div className="d-flex my-3 justify-content-end">
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

export default connected(AllDepartmentsPage);
