import React from 'react';

import IsUserRoleMore from '../../../utils/HOC/IsUserRoleMore';
import {Roles} from '../../../utils/helpers/converters/RoleCodeToName';


const AdminUserLinks: React.FC<{}> = () => (
	<>

	</>
);

export default IsUserRoleMore(Roles.ADMIN)(AdminUserLinks);
