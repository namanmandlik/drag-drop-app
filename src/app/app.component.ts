import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import 'dm-file-uploader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Padhle App!';
  showSuccess= false;
  fileName;
  percentage;
  showProgressBar=false;

  constructor(private http: HttpClient){
  }

  public ngOnInit()
  {
    var self = this;
    $("#drop-area").dmUploader({
      url: 'http://localhost:8000/api/file',
      //... More settings here...
      
      onInit: function(){
        console.log('Callback: Plugin initialized');
      },
      
      onUploadSuccess: function(id,data){
        console.log(data);
        self.setShowSuccess(data);
      },
      onBeforeUpload: function(){
        self.startProgressBar();
      },
      onUploadProgress: function(id,percent){
        console.log(percent);
        self.setPercentage(percent);
      }
      // ... More callbacks
    });
  }

  setShowSuccess(data: any){
    
    this.showSuccess=true;
    this.fileName= data;
  }

  setPercentage(data: any){
    debugger;
    this.percentage=data;

  }

  startProgressBar(){
    debugger;
    this.showProgressBar=true;
  }
}
