"use client"
import { useState } from "react"
import BirthCertificateForm from "../components/birth-certificate-form"
import type { BirthCertificateData } from "../types/birth-certificate"

const defaultData: BirthCertificateData = {
  child: {
    laharana: "114",
    anarana: "RAKOTOMALALA",
    fanampin_anarana: "Tolotriniaina Lionel",
    lahy_na_vavy: "Zazavavy",
    daty_nahaterahana: "11 Mai 1991",
    ora_nahaterahana: "6h10",
    toerana_nahaterahana: "Clinique Saint-Luc - Toliara",
  },
  father: {
    anarana: "NOURAH",
    fanampin_anarana: "Inaiataly Asgaraly",
    asa: "Transporteur",
    daty_nahaterahana: "30 Mai 1954",
    toerana_nahaterahana: "Toliara",
    adiresy_ankehitriny: "Tanambao-II (Toliara)",
  },
  mother: {
    anarana: "HAIDARALY",
    fanampin_anarana: "Parvise Banou",
    asa: "Ménagère",
    daty_nahaterahana: "1er Janvier 1950",
    toerana_nahaterahana: "Morombe",
    adiresy_ankehitriny: "Tanambao-II (Toliara)",
  },
  midwife: {
    anarana: "RAKOTOMAVO",
    fanampin_anarana: "Jeanne Henriette",
    asa: "Mpampiteraka",
    daty_nahaterahana: "vers 1932",
    toerana_nahaterahana: "Toliara",
    adiresy_ankehitriny: "Andabizy Clinique (Toliara)",
  },
  registrar: {
    anarana: "RAKOTONIRINA",
    fanampin_anarana: "Désiré Oswald Roger",
    asa: "Filoha lefitra mpandraharaha ny Zom-pirenena",
    kaominina_na_fokontany: "Firaisampokontany ny Tanambao-II (Toliara)",
  },
  administrative: {
    faritany: "Province de Tuléar",
    kaominina: "Commune Urbaine de Tuléar",
    daty_fisoratana: "13 Mai 1991",
    ora_fisoratana: "10h30",
    daty_namoahana_kopia: "22 Avril 2005",
    mpitantana_sora_piankohonana: "Kaominina Toliara",
  },
}

export default function HomePage() {
  const [certificateData, setCertificateData] = useState<BirthCertificateData>(defaultData)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Générateur de Certificat de Naissance</h1>
          <BirthCertificateForm data={certificateData} onChange={setCertificateData} />
        </div>
      </div>
    </div>
  )
}
