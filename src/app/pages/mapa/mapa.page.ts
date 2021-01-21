import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
	selector: 'app-mapa',
	templateUrl: './mapa.page.html',
	styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {
	lat: number;
	lng: number;
	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		let geo: any = this.route.snapshot.paramMap.get('geo');
		geo = geo.substr(4);
		geo = geo.split(',');
		this.lat = Number(geo[0]);
		this.lng = Number(geo[1]);
		console.log(this.lat, this.lng);
	}

	ngAfterViewInit() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiZGFudGljb25hIiwiYSI6ImNrazcwemIwbTA4MmgydW1vMmpkYmhwbDUifQ.xH7aki3L6mfJJ9fmdSUjng';

		const map = new mapboxgl.Map({
			style: 'mapbox://styles/mapbox/light-v10',

			// Primero long y luego lat asi es en mapbox
			center: [this.lng, this.lat],
			zoom: 15.5,
			pitch: 45,
			bearing: -17.6,
			container: 'map',
			antialias: true,
		});

		map.on('load', () => {
			// LLamamos rezise para que el mapa no quede cortado
			map.resize();

			// Agregar marcador estatico
			new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(map);

			// Insert the layer beneath any symbol layer.
			const layers = map.getStyle().layers;

			let labelLayerId;
			// for (let i = 0; i < layers.length; i++) {
			// 	if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
			// 		labelLayerId = layers[i].id;
			// 		break;
			// 	}
			// }

			for (const layer of layers) {
				if (layer.type === 'symbol' && layer.layout['text-field']) {
					labelLayerId = layer.id;
					break;
				}
			}

			map.addLayer(
				{
					id: '3d-buildings',
					source: 'composite',
					'source-layer': 'building',
					filter: ['==', 'extrude', 'true'],
					type: 'fill-extrusion',
					minzoom: 15,
					paint: {
						'fill-extrusion-color': '#aaa',

						// use an 'interpolate' expression to add a smooth transition effect to the
						// buildings as the user zooms in
						'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
						'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
						'fill-extrusion-opacity': 0.6,
					},
				},
				labelLayerId
			);
		});
	}
}
