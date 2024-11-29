export interface OrdreMission {
    id: number
    numOdm: string
    destination: string
    dateDeb: Date
    dateFin: Date
    moyenTransport: string
    salarie: string
    fonction : Fonction
    direction:Direction
    matricule: string
    unite: string
    objet_mission: string
    itineraire: string
    statut: string
}

enum Fonction{
  Maitrise="Agent maitrise",
  Delegue="délégué",
  Directeur="directeur",
  Secretaire="secretaire"
}

enum Direction{
  Transport="Transport",
  Distribution = 'Distribution',
  DRH ='DRH',
  DSI ='DSI'
}
