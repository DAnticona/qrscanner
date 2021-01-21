import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Registro } from '../../models/registro.model';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
	constructor(public dataLocal: DataLocalService) {}

	enviarCorreo() {
		console.log('enviando correo');
		this.dataLocal.enviarCorreo();
	}

	abrirRegistro(registro: Registro) {
		console.log('registro', registro);
		this.dataLocal.abrirRegistro(registro);
	}
}
