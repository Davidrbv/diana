import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  objetivo: number = 0;
  puntuacion: number = 0;
  intentos: number = 5;
  tirada: number;
  acumulado: number = 0;

  constructor(public alertController: AlertController) {}

  randomNumber() {
    if (this.intentos < 1) {
      this.presentAlertConfirm(this.acumulado);
    } else {
      this.objetivo = Math.round(Math.random() * (100 - 1) + 1);
      this.intentos--;
    }
  }

  comparar() {
    if (this.intentos < 1) {
      this.presentAlertConfirm(this.acumulado);
    } else {
      this.puntuacion = Math.abs(this.objetivo - this.tirada);
      this.acumulado += this.puntuacion;
      this.intentos--;
    }
  }

  async presentAlertConfirm(n: number) {
    const alert = await this.alertController.create({
      header: '¡Diana!',
      message: `Se te acabaron los intentos. Has conseguido ${this.acumulado} puntos`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.reiniciaPartida();
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
