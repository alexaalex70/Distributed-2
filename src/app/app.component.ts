import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
    console.log(event);
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
        console.log(res);
        this.onSuccess();
      },
      (err) => {
        console.log(err);
        this.onError();
      })
    // const formData = new FormData();
    // formData.append("inputFile", this.selectedFile.file, this.selectedFile.file.name);
    // console.log(this.selectedFile.file)
    // fetch('http://localhost:3000/image/upload', { // Your POST endpoint
    //   method: 'POST',
    //   body: formData // This is your file object
    // }).then(
    //   response => response.text() // if the response is a JSON object
    // ).then(
    //   success => this.onSuccess() // Handle the success response object
    // ).catch(
    //   error => this.onError() // Handle the error response object
    // );
  }

  uploadImage(file) {
    const formData = new FormData();
    formData.append("image", this.selectedFile.file);
    console.log(this.selectedFile);
    return this.http.post('http://localhost:3000/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text',
    });
  }
}
