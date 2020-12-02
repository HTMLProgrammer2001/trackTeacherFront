import i18next from 'i18next';


export enum Qualifications{
	JUNIOR = 0,
	BAKALAVR = 1,
	MAGISTR = 2
}

let qualifications: any = {
	[Qualifications.JUNIOR]: 'common.qualList.0',
	[Qualifications.BAKALAVR]: 'common.qualList.1',
	[Qualifications.MAGISTR]: 'common.qualList.2'
};

const qualificationToName = (id: number): string => {
	let strCode = id.toString();
	return qualifications[strCode] ? i18next.t(qualifications[strCode]) : i18next.t('common.notExists');
};

export default qualificationToName;
