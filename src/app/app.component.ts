import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DPFrontend';
  fileName = 'Picture name';
  currentFile: File;
  selectedFile: ImageSnippet;

  constructor(private http: HttpClient) {
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  ngOnInit() {
    console.log(this.selectedFile);
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = new ImageSnippet(event.target.result, event.target.files[0]);
      this.fileName = event.target.files[0].name;
    }
  }

  saveFile() {
    console.log(this.selectedFile.file);
    this.selectedFile.pending = true;
    this.uploadImage(this.selectedFile.file).subscribe(
      (res) => {
        this.onSuccess();
      },
      (err) => {
        this.onError();
      })
  }

  uploadImage(file) {
    return this.http.post('http://localhost:3000/image/upload', file);
  }
}
