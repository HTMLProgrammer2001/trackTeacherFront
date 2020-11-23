import i18next from 'i18next';

const email = (str: string) => {
	if(str == null || value == '')
		return null;

	return new RegExp('.+@.+\\.\\w{2,}', 'i').test(str) ? null : i18next.t('validators.email');
};

export default email;
