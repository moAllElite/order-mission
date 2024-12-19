import { Employee } from "./employee"

export interface Paiement {

    id: number
    dateCreation: string
    moyen_de_transfert: string
    beneficiaire: Employee
    montant: number
  }
export enum MoyenDeTransfer{
  VirementBancaire="Virement Bancaire",
  FreeMoney="Free Money",
  OrangeMoney="Orange Money",
  Wizall = "Wizall",
  Wave="Wave"
}
