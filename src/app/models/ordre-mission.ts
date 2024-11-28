export interface OrdreMission {
    id: number
    num_odm: string
    destination: string
    date_deb: Date
    date_fin: Date
    moyen_transport: string
    salarie: string
    fonction : Fonction
    direction:Direction
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