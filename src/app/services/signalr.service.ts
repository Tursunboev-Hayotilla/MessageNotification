import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  constructor() { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                          .withUrl('https://localhost:7183/hub')
                          .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addTransferChartDataListener = (callback: (message: string) => void) => {
    this.hubConnection.on('ReceiveMessage', (message) => {
      callback(message);
    });
  }

  public sendMessage = (message: string) => {
    this.hubConnection.invoke('SendMessage', message)
      .catch(err => console.error(err));
  }
}
