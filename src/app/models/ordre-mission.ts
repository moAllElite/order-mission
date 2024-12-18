import {Employee} from './employee';

export interface OrdreMission {
    id: any
    num_odm: string
    destination: string
    date_deb: Date
    date_fin: Date
    moyen_transport: string
    salarie: Employee
    objet_mission: string
    itineraire: string
    statut: Statut
    pre_valid:string
    valid:string
}

enum Fonction{
  Maitrise="Agent maitrise",
  Delegue="délégué",
  Directeur="directeur",
  Secretaire="secretaire"
}

export enum Statut{
  EnAttente='En attente',
  Valider='Validé',
  Rejeter='Rejeté',
  Prevalider='Prévalidé'
}
export enum Direction{
  Transport="Transport",
  Distribution = 'Distribution',
  DRH ='DRH',
  DSI ='DSI'
}
