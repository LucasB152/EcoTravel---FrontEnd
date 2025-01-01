import {Component, OnInit} from '@angular/core';
import {FlowbiteService} from './core/services/flowbite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'front-ecotravel';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // console.log(flowbite);
    })
  }
}
