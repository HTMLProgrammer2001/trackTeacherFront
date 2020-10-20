import React from 'react';
import {Container} from 'react-bootstrap';
import {connect, ConnectedProps} from 'react-redux';

import InternshipsFilterForm from './InternshipsFilterForm';
import InternshipsTable from './InternshipsTable';
import Paginator from '../../../../common/Paginator';
import {RootState} from '../../../../redux';
import {selectInternshipsPagination} from '../../../../redux/internships/show/selectors';


const mapStateToProps = (state: RootState) => ({
	paginator: selectInternshipsPagination(state)
});

const connected = connect(mapStateToProps);

type IInternshipsTabProps = ConnectedProps<typeof connected> & {hours: number};

const InternshipsTab: React.FC<IInternshipsTabProps> = ({paginator, hours}) => (
	<div className="mt-3">
		<h3>Стажировки</h3>

		<Container>
			<InternshipsFilterForm onSubmit={console.log}/>
			<InternshipsTable/>

			<div className="d-flex my-3 justify-content-end">
				<Paginator {...paginator} setCur={console.log}/>
			</div>

			<b>Часов с последнего повышения квалификации: {hours}</b>
		</Container>
	</div>
);

export default connected(InternshipsTab);
