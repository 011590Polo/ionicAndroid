import { Component } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: Map;
  newMarker: any;
  address: string[];


  constructor(private router: AppRoutingModule) { }

  ionViewDidEnter() {
    this.IniciarMap();
  }

  IniciarMap() {
    this.map = new Map("mapId").setView([17.3850, 78.4867], 13);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '' }).addTo(this.map);
  }

  goBack() {
    //this.router.navigate(["home"]);
  }

  locatePosition() {
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
      this.newMarker = marker([e.latitude, e.longitude], {
        draggable:
          true
      }).addTo(this.map);
      this.newMarker.bindPopup("You are located here!").openPopup();

      this.newMarker.on("dragend", () => {
        const position = this.newMarker.getLatLng();
      });
    });
  }

}
