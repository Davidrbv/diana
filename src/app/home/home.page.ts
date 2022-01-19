import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  objetivo: number;
  puntuacion: number = 0;
  intentos: number = 5;
  tirada: number = 50;
  acumulado: number = 0;
  jugando: boolean = false;

  constructor(public alertController: AlertController) {}

  comenzar() {
    this.jugando = true;
    if (this.intentos < 1) {
      this.presentAlertConfirm();
    } else {
      this.objetivo = Math.round(Math.random() * (100 - 1) + 1);
    }
  }

  comparar() {
    if(this.jugando){
      if (this.intentos < 1) {
        this.presentAlertConfirm();
        this.jugando = false;
      } else {
        this.puntuacion = Math.abs(this.objetivo - this.tirada);
        this.acumulado += (100-this.puntuacion);
        this.intentos--;
        this.comenzar();
      }
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '¡Diana!',
      message: `Se te acabaron los intentos. Has conseguido ${this.acumulado} puntos`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.jugando = false;
            this.reiniciaPartida();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlertConfirmInfo() {
    const alert = await this.alertController.create({
      header: '¡Diana!',
      message: `Created by David Rodriguez - Barbero Verdera`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          },
        },
      ],
    });

    await alert.present();
  }

  reiniciaPartida() {
    this.objetivo = 0;
    this.puntuacion = 0;
    this.intentos = 5;
    this.acumulado = 0;
  }
}
