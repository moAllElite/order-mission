import { Injectable } from '@angular/core';
import { jsPDF, } from "jspdf";
import { format } from 'date-fns';
import autoTable from 'jspdf-autotable';
@Injectable({
  providedIn: 'root'
})
export class PdfService {

    public generatePDF(order: any) {
      const doc :jsPDF= new jsPDF({
        orientation: 'portrait', // ou 'landscape' pour horizontal
        unit: 'mm',              // unités utilisées (mm, cm, pt, in)
        format: 'a4'             // format A4
      });

      // Vérification et fallback pour les champs
      const numOdm = order[0].num_odm || 'Numéro manquant';
      const destination = order[0].destination || 'Destination inconnue';
      const dateDeb:Date = order[0].date_deb  || 'Date de début inconnue';
      const dateFin:Date = order[0].date_fin || 'Date de fin inconnue';
      const moyenTransport = order[0].moyen_transport || 'Moyen de transport inconnu';
      const nom_complet = order[0].salarie.nom_complet || 'Salarié inconnu';
      const objet = order[0].objet_mission|| 'objet inconnue';
      const direction = order[0].salarie.direction || 'Direction inconnue';
      const itineraire = order[0].itineraire;
      const matricule = order[0].salarie.matricule;
      const unite = order[0].salarie.unite;
       //font police
      /* const ubuntuBold= 'public/fonts/Ubuntu-Bold.ttf' // load the *.ttf font file as binary string

       // add the font to jsPDF
      doc.addFileToVFS("Ubuntu-Bold.ttf", ubuntuBold);
     doc.addFont("Ubuntu-Bold.ttf", "ubuntuBold", "bold");
      doc.setFont("Ubuntu-Bold");
      
      const ubuntuMedium = 'public/fonts/Ubuntu-Medium.ttf'
       doc.addFileToVFS("Ubuntu-Medium.ttf", ubuntuMedium);
       doc.addFont("Ubuntu-Medium.ttf", "ubuntuMedium", "normal");
       doc.setFont("Ubuntu-Medium");*/

      //en tête
      doc.setFontSize(13).setTextColor("#1434A4");
      doc.text(`Direction ${direction}`,10,7);
      
       // .setFont("Ubuntu-Bold");

      // Titre
      doc.setFontSize(25).setTextColor("#0000");
      doc.text(`ORDRE DE MISSION `, 105, 40, { align: 'center' });
      doc.text(`N°${numOdm}`, 105, 57, { align: 'center' });

      //Table nom | mat agent
      autoTable(doc, {
        head: [['N°','Prénom et Nom', 'Mle', 'Unité']],
        body: [
          [`1`,`${nom_complet}`,`${matricule}`,  `${unite}`]
          // ...
        ],
        margin: { top: 73, left: 10, bottom: 35 },
        theme:'grid',
        tableWidth: 190,
      });



      // Contenu

      doc.text(`Sont autorisés à se rendre en mission à: ${destination}`, 10, 105 ).
        // .setFont("Ubuntu-Medium")
      setFontSize(13);

      doc.setFontSize(12);
       
    
      const end =  format(dateFin,'dd-MM-yyyy');
      const start:string = format(dateDeb,'dd-MM-yyyy');
      doc.text('Date Départ: '+start , 10, 120);

      doc.text(`Retour prévu le : ` + end, 10, 130);
      doc.text(`Moyen de transport : ${moyenTransport}`, 10, 140);
      doc.text(`Itinéraire : ${itineraire}`, 10, 150);
      doc.text(`Objet de la mission : ${objet}`, 10, 160);
      doc.text(`Itinéraire : Sens inverse`, 10, 170);

      // Téléchargement du PDF
     doc
      .save(`Ordre Mission  ${numOdm}.pdf`);
    }

}



