import { Injectable } from '@angular/core';
import aws from 'aws-sdk';
import crypto, { randomBytes } from 'crypto';  import { promisify } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({ providedIn: 'root'})
export class AwsService {
  randomBytes = promisify(crypto.randomBytes);
  bucketName: string=environment.bucketName;

  constructor(private http:HttpClient) { }

  // params for S3 auth Import from our environnement
  region :string = environment.region;
  accessKeyId :string = environment.accessKeyId;
  secretAccessKey :string = environment.secretAccessKey;
  minuteExpire:number = 60;

  //Ulpoad an image on AWS S3
  public async generateUploadUrl( ){
    //GET IAM user authentication by accesKeyId & secretKey
    const s3 = new aws.S3({
      region: this.region,
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey
    });

    // image name encryption
    const [rawByte] = await Promise.all([randomBytes(16)]);
    const imageName = rawByte.toString('hex');
    const params = ({
      Bucket:this.bucketName,
      Key:imageName,
      Expire: this.minuteExpire  });
    const uploadUrl:any= await s3.getSignedUrlPromise(   'putObject',params  );    return uploadUrl;   }

  // get secure URL from our server
  public async getSecureUrl(){
    const url = await this.generateUploadUrl();
    console.log(url);
    console.log(`type of : ${typeof url}`);
    return this.http.get(url);
  }

  //POST the image directly to S3 bucket
  public async postSignatureToAws(image:any){
    const url = await this.generateUploadUrl();
    const httpHeaders: HttpHeaders = new HttpHeaders();
    httpHeaders.set('content-type','mutlipart-data');
    return this.http.put(    url,image,   {    headers: httpHeaders    }  );
  }
}
