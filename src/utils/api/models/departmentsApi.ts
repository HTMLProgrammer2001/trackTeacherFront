import {ISort} from '../../../interfaces/ISort';
import {IGeneralPaginationResponse} from '../../../interfaces/responses/IGeneralPaginationResponse';
import {IDepartment} from '../../../interfaces/models/IDepartment';
import {IDepartmentsEditData} from '../../../pages/Departments/edit/EditDepartmentForm';
import {IDepartmentsAddData} from '../../../pages/Departments/add/AddDepartmentForm';

import objToParams from '../../helpers/objToParams';
import createApi from '../../helpers/createApi';


const client = createApi({
	baseURL: '/departments'
});

const departmentsApi = {
	async getDepartments(filters: any = {}, sort: ISort[] = [], page = 1, pageSize = 5) {
		const sortRules = objToParams(sort, 'sort');

		return await client.get<IGeneralPaginationResponse<IDepartment>>('/', {
			params: {...filters, ...sortRules, page, pageSize}
		});
	},

	async getDepartment(id: number) {
		return await client.get<{data: IDepartment}>(`/${id}`);
	},

	async editDepartment(id: number, vals: IDepartmentsEditData) {
		return await client.put<IDepartment>(`/${id}`, vals);
	},

	async deleteDepartment(id: number) {
		return await client.delete<{ message: string }>(`/${id}`);
	},

	async addDepartment(vals: IDepartmentsAddData) {
		return await client.post('/add', vals);
	}
};

export default departmentsApi;
