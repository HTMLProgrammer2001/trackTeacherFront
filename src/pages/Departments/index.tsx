import React from 'react';
import {Route, Switch} from 'react-router-dom';

import NotFoundPage from '../ErrorPages/NotFoundPage';
import AllDepartmentsPage from './all';
import EditDepartmentPage from './edit';
import AddDepartmentPage from './add';

import IsUserRoleMore from '../../utils/HOC/IsUserRoleMore';
import {Roles} from '../../utils/helpers/converters/RoleCodeToName';


const Departments: React.FC<{}> = () => (
	<Switch>
		<Route path="/departments" exact component={AllDepartmentsPage}/>
		<Route path="/departments/add" exact component={AddDepartmentPage}/>
		<Route path="/departments/:id/edit" exact component={EditDepartmentPage}/>
		<Route path="/" component={NotFoundPage}/>
	</Switch>
);

export default IsUserRoleMore(Roles.VIEWER, true)(Departments);
