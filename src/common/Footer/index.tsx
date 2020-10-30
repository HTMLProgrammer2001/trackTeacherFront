import React from 'react';
import {Trans} from 'react-i18next';


const Footer: React.FC<{}> = () => (
	<footer className="p-3 border-top bg-white">
		<b>
			<Trans i18nKey="layout.footer.copyright">
				Copyright © {{date: new Date().getFullYear()}} by
				<a href="https://htmlprogrammer.ru">Yuri Prisyazhnyy.</a>
			</Trans>
		</b>
		&nbsp;
		<span>
			<Trans i18nKey="layout.footer.rights"/>
		</span>
	</footer>
);

export default Footer;
