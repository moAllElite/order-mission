import {Employee} from './employee';

export interface OrdreMission {
    id: number
    numOdm: string
    destination: string
    dateDeb: Date
    dateFin: Date
    moyenTransport: string
    salarie: Employee
    objet_mission: string
    itineraire: string
    statut: Statut
}

enum Fonction{
  Maitrise="Agent maitrise",
  Delegue="délégué",
  Directeur="directeur",
  Secretaire="secretaire"
}

enum Statut{
  EnAttente='En attente',
  Valider='Validé',
  Rejeter='Rejeté'
}
enum Direction{
  Transport="Transport",
  Distribution = 'Distribution',
  DRH ='DRH',
  DSI ='DSI'
}
