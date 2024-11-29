import { Injectable } from '@angular/core';
import { jsPDF, } from "jspdf";
import { OrdreMission } from '../models/ordre-mission';

import autoTable from 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class PdfService {

    public generatePDF(order: any) {
      const doc = new jsPDF();

      // Vérification et fallback pour les champs
      const numOdm = order[0].num_odm || 'Numéro manquant';
      const destination = order[0].destination || 'Destination inconnue';
      const dateDeb = order[0].date_deb  || 'Date de début inconnue';
      const dateFin = order[0].date_fin || 'Date de fin inconnue';
      const moyenTransport = order[0].moyen_transport || 'Moyen de transport inconnu';
      const salarie = order[0].salarie || 'Salarié inconnu';
      const objet = order[0].objet_mission|| 'objet inconnue';
      const direction = order[0].direction || 'Direction inconnue';
      const itineraire = order[0].itineraire;
      const matricule = order[0].matricule;
      const unite = order[0].unite;
       //font police
       const ubuntuBold= 'public/fonts/Ubuntu-Bold.ttf' // load the *.ttf font file as binary string

       // add the font to jsPDF
      doc.addFileToVFS("Ubuntu-Bold.ttf", ubuntuBold);
       doc.addFont("Ubuntu-Bold.ttf", "ubuntuBold", "bold");
       doc.setFont("Ubuntu-Bold");

      const ubuntuMedium = 'public/fonts/Ubuntu-Medium.ttf'
       doc.addFileToVFS("Ubuntu-Medium.ttf", ubuntuMedium);
       doc.addFont("Ubuntu-Medium.ttf", "ubuntuMedium", "normal");
       doc.setFont("Ubuntu-Medium");

      //en tête
      doc.setFontSize(13);
      doc.text(`Direction ${direction}`,10,7);

      // Titre
      doc.setFontSize(20);
      doc.text(`ORDRE DE MISSION N°${numOdm}`, 105, 20, { align: 'center' });

      //Table nom | mat agent
      autoTable(doc, {
        head: [['Mle','Prénom et Nom', 'Email', 'Country']],
        body: [
          [`${matricule}`,`${salarie}`,`${matricule}`,  `${unite}`]
          // ...
        ],
      });



      // Contenu

      doc.text(`Sont autorisés à se rendre en mission à: ${destination}`, 10, 40 ).
      setFont("Ubuntu-Medium")
      .setFontSize(8);

      doc.setFontSize(12);

      doc.text(`Date Départ: ${dateDeb }`, 10, 50);
      doc.text(`Retour prévu le : ${dateFin}`, 10, 60);
      doc.text(`Moyen de transport : ${moyenTransport}`, 10, 70);
      doc.text(`Itinéraire : ${itineraire}`, 10, 80);
      doc.text(`Objet de la mission : ${objet}`, 10, 90);
      doc.text(`Itinéraire : Sens inverse`, 10, 100);

      // Téléchargement du PDF
     doc
      .save(`Ordre Mission  ${numOdm}.pdf`);
    }

}



