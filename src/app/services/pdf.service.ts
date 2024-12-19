import { Injectable } from '@angular/core';
import { GState, jsPDF, } from "jspdf";
import { format } from 'date-fns';
import { Base64 } from 'js-base64';
import autoTable from 'jspdf-autotable'; // table imports
import { fr } from "date-fns/locale"; //for i18
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
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
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
      const pre_valid = order[0].pre_valid;
      const service = order[0].salarie.service;
      const valid= order[0].valid;
      // logo senelec
      var logoSenelec ='assets/logo-senelec.png';
      doc.setGState(new GState({opacity:0.5})); // opacity set 0.5
      doc.addImage(logoSenelec,90,10,width /6.5 ,height / 9.5);

      doc.setGState(new GState({opacity:1})); // reset opacity to 1

      //en tête
      doc.setFontSize(13).setTextColor("#1434A4");
      doc.text(`Direction ${direction}`,10,50);

      // Titre
      doc.setFontSize(15).setTextColor("#0000");
      doc.text(`ORDRE DE MISSION N°${numOdm}`, 105, 68, { align: 'center' });


      //Table nom | mat agent
      autoTable(doc, {
        head: [['N°','Prénom et Nom', 'Mle', 'Unité']],
        body: [
          [`1`,`${nom_complet}`,`${matricule}`,  `${unite}`]
          // ...
        ],
        margin: { top: 76, left: 10, bottom: 2 },
        theme:'grid',
        tableWidth: 190,
      });



      // Contenu
      doc.setFontSize(12.5);
      doc.text(`Est autorisé à se rendre en mission à: ${destination}`, 10, 105 )
        // .setFont("Ubuntu-Medium")

      const end =  format(dateFin,'dd MMMM yyyy',{ locale: fr }, );
      const start:string = format(dateDeb,'dd MMMM yyyy',{ locale: fr });
      doc.text('Date Départ: '+start.toLowerCase() , 10, 120);
      doc.text(`Retour prévu le : ` + end.toLowerCase(), 10, 135);
      doc.text(`Moyen de transport : ${moyenTransport}`, 10, 150);
      doc.text(`Itinéraire : ${itineraire}`, 10, 165);
      doc.text(`Objet de la mission : ${objet}`, 10, 180);
      doc.text(`Itinéraire : Sens inverse`, 10, 195);
      //decode image base 64
      var imgData = pre_valid;
      var imageValid = valid;
      console.log(imgData);
      doc.setFontSize(13);
      doc.text(`Le Chef de service ${service}`,15.6,225);
      doc.text(`Le Directeur d'unité ${direction}`,140,225);
      if(imgData){
        doc.addImage(imgData, 'PNG',10,225 ,width / 4, height / 5.5, );
      }
      if(imageValid){
        doc.addImage(imageValid, 'PNG',130,225 ,width / 4, height / 5.5, );
      }
      doc.setFontSize(11);
      doc.text('Signature', 40,259,{align:'center'});
      doc.text('Signature', 168,259,{align:'center'});
      //pied de page
      doc.setGState(new GState({opacity:0.5})); // opacity set 0.5
      doc.setFontSize(9);
      doc.text('Société Annonyme  au capital : XY Francs CFA',width / 3, height - 10,   );
      doc.text(`28 Rue Vincens - BP 93,Dakar(Sénégal)  Tél:(221) 33 XXX XX XX  Fax:(221) 33 XXX XX XX`,width /5, height - 4, );
      // Téléchargement du PDF

     doc
      .save(`Ordre Mission  ${numOdm}.pdf`);
    }

}



