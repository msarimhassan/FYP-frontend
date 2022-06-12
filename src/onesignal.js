import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
	await OneSignal.init({
		appId: 'c676f7f0-8417--a054-cec4dfe898c4',
		allowLocalhostAsSecureOrigin: true
	});
	OneSignal.showSlidedownPrompt();
}
