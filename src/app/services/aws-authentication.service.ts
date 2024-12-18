import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as CryptoJS from 'crypto-js'; // Utilisé pour générer des chaînes aléatoires
// import individual service
import S3 from 'aws-sdk/clients/s3';

@Injectable({ providedIn: 'root' })
export class AwsService {
  // Configuration initiale des informations sur le bucket S3 et les clés d'accès
  bucketName: string = environment.bucketName;

  constructor(protected http: HttpClient) {}

  // Région et informations d'authentification pour l'accès S3
  region: string = environment.region;
  accessKeyId: string = environment.accessKeyId;
  secretAccessKey: string = environment.secretAccessKey;
  minuteExpire: number = 1; // Temps d'expiration en minutes pour les URL signées

  /**
   * Génère une chaîne hexadécimale aléatoire pour servir de nom de fichier unique.
   * Utilise CryptoJS pour garantir la compatibilité avec les navigateurs.
   * @param size La taille en octets de la chaîne aléatoire.
   * @returns Une chaîne hexadécimale aléatoire.
   */
  private generateRandomHex(size: number): string {
    return CryptoJS.lib.WordArray.random(size).toString(CryptoJS.enc.Hex);
  }

  /**
   * Génère une URL signée pour permettre le téléchargement sécurisé d'un fichier sur un bucket S3.
   * @returns Une promesse contenant l'URL signée.
   */
  public async generateUploadUrl(): Promise<string> {
    // Initialisation du client S3 avec les informations d'authentification
    const s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey
      },
    });

    // Génération d'un nom de fichier unique
    const imageName = this.generateRandomHex(16);

    // Préparation de la commande pour S3
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: imageName,
    });

    // Génération de l'URL signée avec une expiration spécifiée
    const uploadUrl =// await s3Client.getSignedUrlPromise('putObject',param)
      await getSignedUrl(s3Client, command, { expiresIn: this.minuteExpire });
    return uploadUrl;
  }

  /**
   * Récupère une URL sécurisée via le serveur et effectue une requête HTTP GET.
   * Cette méthode est principalement utilisée pour valider l'accès à l'URL générée.
   * @returns Une requête HTTP GET envoyée à l'URL sécurisée.
   */
  public async getSecureUrl() {
    const url = await this.generateUploadUrl(); // Récupération de l'URL signée
    console.log(url);
    console.log(`type of : ${typeof url}`); // Affichage du type de l'URL pour débogage
    return this.http.get(url); // Envoi d'une requête HTTP GET
  }

  /**
   * Envoie directement une image au bucket S3 en utilisant une URL signée.
   * @returns Une requête HTTP PUT pour télécharger l'image.
   * @param base64Image
   */
  public async postSignatureToAws(base64Image: string): Promise<string> {
    try {
      const uploadUrl = await this.generateUploadUrl();

      // Extract MIME type from base64 data
      const base64Parts = base64Image.split(',');
      const mimeType = base64Parts[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
      const imageData = atob(base64Parts[1]); // Decode base64 to binary
      const binaryImage = new Uint8Array(imageData.length);

      for (let i = 0; i < imageData.length; i++) {
        binaryImage[i] = imageData.charCodeAt(i);
      }

      // Upload to S3
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': mimeType,
        },
        body: binaryImage.buffer,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image to S3');
      }

      // Return the object URL without query params
      return uploadUrl.split('?')[0];
    } catch (error) {
      console.error('Error uploading to S3:', error);
      throw error;
    }
  }

}
