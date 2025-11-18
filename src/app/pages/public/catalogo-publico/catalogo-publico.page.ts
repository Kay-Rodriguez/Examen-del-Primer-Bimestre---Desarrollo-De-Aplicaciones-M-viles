import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogo-publico',
  templateUrl: './catalogo-publico.page.html',
  styleUrls: ['./catalogo-publico.page.scss'],
})
export class CatalogoPublicoPage implements OnInit {

  filtro = '';

  planes = [
    {
      nombre: 'Plan Smart 5GB',
      precio: '15.99',
      datos: '5 GB mensuales',
      minutos: '100 min nacionales',
      descripcion: 'Perfecto para navegar y estar conectado.',
      segmento: 'Básico / Entrada',
      publico: 'Usuarios casuales, estudiantes, adultos mayores',
      img: 'assets/planes/plan5gb.jpg',
      show: false,
      caracteristicas: {
        datos: '5GB mensuales (4G LTE)',
        minutos: '100 minutos nacionales',
        sms: 'Ilimitados a nivel nacional',
        velocidad: '4G hasta 50 Mbps',
        redes: 'Consumo normal',
        whatsapp: 'Incluido en los 5GB',
        internacional: '$0.15/min',
        roaming: 'No incluido'
      }
    },
    {
      nombre: 'Plan Premium 15GB',
      precio: '29.99',
      datos: '15 GB mensuales',
      minutos: '300 min nacionales',
      descripcion: 'Ideal para redes sociales y usuarios activos.',
      segmento: 'Medio / Estándar',
      publico: 'Profesionales, usuarios activos de redes sociales',
      img: 'assets/planes/plan15gb.jpg',
      show: false,
      caracteristicas: {
        datos: '15GB mensuales (4G LTE)',
        minutos: '300 minutos nacionales',
        sms: 'Ilimitados a nivel nacional',
        velocidad: '4G hasta 100 Mbps',
        redes: 'Facebook, Instagram y TikTok ILIMITADO',
        whatsapp: 'WhatsApp ilimitado',
        internacional: '$0.10/min',
        roaming: '500MB incluido (Sudamérica)'
      }
    },
    {
      nombre: 'Plan Ilimitado Total',
      precio: '45.99',
      datos: 'Datos ilimitados',
      minutos: 'Minutos ilimitados',
      descripcion: 'Perfecto para gamers, streamers y power users.',
      segmento: 'Premium / Alto',
      publico: 'Gamers, streamers, empresarios',
      img: 'assets/planes/ilimitado.jpg',
      show: false,
      caracteristicas: {
        datos: 'Datos ILIMITADOS 4G y 5G',
        minutos: 'Ilimitados nacionales',
        sms: 'Ilimitados',
        velocidad: '5G hasta 300 Mbps',
        redes: 'Todas ilimitadas',
        whatsapp: 'WhatsApp ilimitado',
        internacional: '100 minutos incluidos',
        roaming: '5GB América'
      }
    }
  ];

  constructor() {}

  ngOnInit() {}

  get planesFiltrados() {
    const f = this.filtro.toLowerCase();
    return this.planes.filter(p => p.nombre.toLowerCase().includes(f));
  }
}
