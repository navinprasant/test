import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-profilecard',
  templateUrl: './profilecard.component.html',
  styleUrls: ['./profilecard.component.css']
})
export class ProfilecardComponent implements OnInit {

  constructor(
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.commonService.stopLoader();
  }

}
