import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
	swiperOpt = {
		allowSlidePrev: false,
		allowSlideNext: false,
	};
	constructor(private barcodeScanner: BarcodeScanner, private dataLocal: DataLocalService) {}

	ionViewDidEnter() {
		// Inmediatamente despues de que la vista es cargada por el usuario
		console.log('ionViewDidEnter');
	}

	ionViewDidLeave() {
		// Cuando el usuario sale de la vista
		console.log('ionViewDidLeave');
	}

	// ionViewDidLoad() {
	// 	// Parece que esta obsoleto, ya no funciona
	// 	console.log('ionViewDidLoad');
	// }

	ionViewWillEnter() {
		// antes de cargar la vista
		console.log('ionViewWillEnter');
		this.scan();
	}

	ionViewWillLeave() {
		// Cuando la vista es cargada
		console.log('ionViewWillLeave');
	}

	// ionViewWillLoad() {
	// 	// Parece que esta obsoleto, ya no funciona
	// 	console.log('ionViewDidLoad');
	// }

	scan() {
		this.barcodeScanner
			.scan()
			.then(barcodeData => {
				console.log('Barcode data', barcodeData);

				if (!barcodeData.cancelled) {
					this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
				}
			})
			.catch(err => {
				console.log('Error', err);
			});
	}
}
