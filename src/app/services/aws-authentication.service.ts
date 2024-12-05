import { Injectable } from '@angular/core';
import AWS, {S3Client} from "@aws-sdk/client-s3";
@Injectable({
  providedIn: 'root'
})
export class AwsAuthenticationService {

  constructor() { }
  region:string='';

  public  getAuthentication(){
    const client = new  S3Client(
      {
         region:this.region,
        
      })
  }
}
