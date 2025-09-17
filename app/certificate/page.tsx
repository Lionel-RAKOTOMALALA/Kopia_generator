"use client"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import BirthCertificateDisplay from "../../components/birth-certificate-display"
import PDFGenerator from "../../components/pdf-generator"
import type { BirthCertificateData } from "../../types/birth-certificate"

function CertificateContent() {
  const searchParams = useSearchParams()

  const certificateData: BirthCertificateData = {
    nom_province: searchParams.get("nom_province") || "TULEAR",
    nom_commune: searchParams.get("nom_commune") || "Tuléar",
    numero: searchParams.get("numero") || "114",

    nom: searchParams.get("nom") || "RAKOTOMALALA",
    prenom: searchParams.get("prenom") || "Tolotriniaina Lionel",
    date_naissance: searchParams.get("date_naissance") || "11 Mai 1991",
    annee_naissance: searchParams.get("annee_naissance") || "1991",
    heure_naissance: searchParams.get("heure_naissance") || "6h10",
    lieu_naissance: searchParams.get("lieu_naissance") || "Clinique Saint-Luc - Toliara",
    genre: searchParams.get("genre") || "Zazavavy",

    nom_pere: searchParams.get("nom_pere") || "NOURAH",
    prenom_pere: searchParams.get("prenom_pere") || "Inaiataly Asgaraly",
    travail_pere: searchParams.get("travail_pere") || "Transporteur",
    date_naissance_pere: searchParams.get("date_naissance_pere") || "30 Mai 1954",
    annee_naissance_père: searchParams.get("annee_naissance_père") || "1954",
    lieu_naissance_pere: searchParams.get("lieu_naissance_pere") || "Toliara",

    nom_mere: searchParams.get("nom_mere") || "HAIDARALY",
    prenom_mere: searchParams.get("prenom_mere") || "Parvise Banou",
    travail_mere: searchParams.get("travail_mere") || "Ménagère",
    date_naissance_mere: searchParams.get("date_naissance_mere") || "1er Janvier 1950",
    annee_naissance_mere: searchParams.get("annee_naissance_mere") || "1950",
    lieu_naissance_mere: searchParams.get("lieu_naissance_mere") || "Morombe",

    adresse_parent: searchParams.get("adresse_parent") || "Tanambao-II",

    nom_sage_femme: searchParams.get("nom_sage_femme") || "RAKOTOMAVO",
    prenom_sage_femme: searchParams.get("prenom_sage_femme") || "Jeanne Henriette",
    annee_naissance_sage_femme: searchParams.get("annee_naissance_sage_femme") || "vers 1932",
    lieu_naissance_sage_femme: searchParams.get("lieu_naissance_sage_femme") || "Toliara",
    adresse_sage_femme: searchParams.get("adresse_sage_femme") || "Andabizy Clinique",

    nom_temoin: searchParams.get("nom_temoin") || "RAKOTONIRINA",
    prenom_temoin: searchParams.get("prenom_temoin") || "Désiré Oswald Roger",
    lieu_de_travail_temoin: searchParams.get("lieu_de_travail_temoin") || "Tanambao-II",

    année_construction: searchParams.get("année_construction") || "1991",
    date_construction_copie: searchParams.get("date_construction_copie") || "22 Avril 2005",
    annee_construction_copie: searchParams.get("annee_construction_copie") || "2005",
    heure_construction_copie: searchParams.get("heure_construction_copie") || "10h30",
    date_enregistrement: searchParams.get("date_enregistrement") || "13 Mai 1991",
    annee_enregistrement: searchParams.get("annee_enregistrement") || "1991",
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-6">Certificat de Naissance</h1>
          <PDFGenerator data={certificateData} />
        </div>
        <BirthCertificateDisplay data={certificateData} />
      </div>
    </div>
  )
}

export default function CertificatePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <CertificateContent />
    </Suspense>
  )
}
