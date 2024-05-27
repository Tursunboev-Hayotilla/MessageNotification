import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SignalRDemo';
  message: string = '';

  constructor(private signalRService: SignalRService) { }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener(this.onReceiveMessage.bind(this));
  }

  onReceiveMessage(message: string) {
    alert('Message received: ' + message);
  }

  sendMessage() {
    if (this.message) {
      this.signalRService.sendMessage(this.message);
      this.message = '';
    }
  }
}
