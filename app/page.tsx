"use client"
import { useState } from "react"
import BirthCertificateForm from "../components/birth-certificate-form"
import type { BirthCertificateData } from "../types/birth-certificate"

const defaultData: BirthCertificateData = {
  // Administrative info
  nom_province: "TULEAR",
  nom_commune: "Tuléar",
  numero: "114",

  // Child information
  nom: "RAKOTOMALALA",
  prenom: "Tolotriniaina Lionel",
  date_naissance: "11 MAI",
  annee_naissance: "1991",
  heure_naissance: "enina ora sy folo minitra",
  lieu_naissance: "Hôpital de Tuléar",
  genre: "zazalahy",

  // Father information
  nom_pere: "NOURAH",
  prenom_pere: "Inaiataly Asgaraly",
  travail_pere: "Transporteur",
  date_naissance_pere: "30 Mai 1954",
  annee_naissance_père: "1954",
  lieu_naissance_pere: "Toliara",

  // Mother information
  nom_mere: "HAIDARALY",
  prenom_mere: "Parvise Banou",
  travail_mere: "Ménagère",
  date_naissance_mere: "1er Janvier 1950",
  annee_naissance_mere: "1950",
  lieu_naissance_mere: "Morombe",

  // Parents address
  adresse_parent: "Tanambao-II",

  // Midwife information
  nom_sage_femme: "RAKOTOMAVO",
  prenom_sage_femme: "Jeanne Henriette",
  annee_naissance_sage_femme: "1932",
  lieu_naissance_sage_femme: "Toliara",
  adresse_sage_femme: "Andabizy Clinique",

  // Witness information
  nom_temoin: "RAKOTONIRINA",
  prenom_temoin: "Désiré Oswald Roger",
  lieu_de_travail_temoin: "Tanambao-II",

  // Document dates
  année_construction: "1991",
  date_construction_copie: "22 Avril 2005",
  annee_construction_copie: "2005",
  heure_construction_copie: "10h30",
  date_enregistrement: "13 Mai 1991",
  annee_enregistrement: "1991",
}

export default function HomePage() {
  const [certificateData, setCertificateData] = useState<BirthCertificateData>(defaultData)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Fanaovana Kopia Nahaterahana</h1>
          <BirthCertificateForm onDataChange={setCertificateData} initialData={certificateData} />
        </div>
      </div>
    </div>
  )
}
