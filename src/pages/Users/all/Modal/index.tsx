import React, {useEffect, useState} from 'react';
import {Modal} from 'react-bootstrap';
import {useLocation} from 'react-router';
import {connect, ConnectedProps} from 'react-redux';

import Loader from '../../../../common/Loader/Loader';
import ErrorElement from '../../../../common/ErrorElement';
import UserBody from './UserBody';

import {RootState} from '../../../../redux';
import {selectUserModalState} from '../../../../redux/users/modal/selectors';
import thunkModalUser from '../../../../redux/users/modal/thunks';
import roleCodeToName from '../../../../utils/helpers/RoleCodeToName';


const mapStateToProps = (state: RootState) => ({
	...selectUserModalState(state)
});

const connected = connect(mapStateToProps, {getUser: thunkModalUser});

type IUserModalProps = ConnectedProps<typeof connected>;
const UserModal: React.FC<IUserModalProps> = ({isLoading, error, user, getUser, userName}) => {
	const [isShow, setShow] = useState(false),
		router = useLocation();

	useEffect(() => {
		if(router.hash) {
			getUser(+router.hash.slice(1));
			setShow(true);
		}
	}, [router.hash]);

	if(!isShow)
		return null;

	const name = userName || user?.fullName || 'Loading';

	return (
		<Modal show={isShow} size="lg">
			<Modal.Header closeButton onHide={() => setShow(false)}>
				<h4>{name} | {user?.role && roleCodeToName(user?.role)}</h4>
			</Modal.Header>

			<Modal.Body>
				{isLoading && <Loader/>}
				{!isLoading && error && <ErrorElement error={error}/>}
				{!isLoading && !error && user && <UserBody user={user}/>}
			</Modal.Body>
		</Modal>
	);
};

export default connected(UserModal);
