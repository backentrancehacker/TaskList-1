if('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('/service.js')
	.then(() => { console.log("Service Worker Registered"); });
}