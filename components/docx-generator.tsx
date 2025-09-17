"use client"
import { useState } from "react"
import { FileText, Printer } from "lucide-react"

interface BirthCertificateData {
  nom_province: string
  nom_commune: string
  numero: string
  nom: string
  prenom: string
  date_naissance: string
  annee_naissance: string
  heure_naissance: string
  lieu_naissance: string
  genre: string
  nom_pere: string
  prenom_pere: string
  travail_pere: string
  date_naissance_pere: string
  annee_naissance_père: string
  lieu_naissance_pere: string
  nom_mere: string
  prenom_mere: string
  travail_mere: string
  date_naissance_mere: string
  annee_naissance_mere: string
  lieu_naissance_mere: string
  adresse_parent: string
  nom_sage_femme: string
  prenom_sage_femme: string
  annee_naissance_sage_femme: string
  lieu_naissance_sage_femme: string
  adresse_sage_femme: string
  nom_temoin: string
  prenom_temoin: string
  lieu_de_travail_temoin: string
  année_construction: string
  date_construction_copie: string
  annee_construction_copie: string
  heure_construction_copie: string
  date_enregistrement: string
  annee_enregistrement: string
}

interface SimpleDocxGeneratorProps {
  data: BirthCertificateData
}

export default function SimpleDocxGenerator({ data }: SimpleDocxGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAndOpenPDF = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la génération')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      // Ouvrir le PDF dans un nouvel onglet
      const newWindow = window.open(url, '_blank')
      
      if (newWindow) {
        // Attendre que le PDF se charge, puis ouvrir la boîte de dialogue d'impression
        newWindow.onload = () => {
          setTimeout(() => {
            newWindow.print()
          }, 1000)
        }
      }
      
      // Nettoyer l'URL après un délai
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 5000)
      
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la génération du document')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="text-3xl font-bold mb-8">Certificat de Naissance</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Résumé</h2>
          <p className="text-lg">
            <strong>{data.nom} {data.prenom}</strong>
          </p>
          <p className="text-gray-600">
            Né le {data.date_naissance} à {data.lieu_naissance}
          </p>
          <p className="text-gray-600">
            Province de {data.nom_province} - {data.nom_commune}
          </p>
        </div>

        <button
          onClick={generateAndOpenPDF}
          disabled={isGenerating}
          className={`px-8 py-3 rounded-lg font-semibold flex items-center mx-auto ${
            isGenerating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Génération...
            </>
          ) : (
            <>
              <Printer className="mr-2" size={20} />
              Générer PDF et Imprimer
            </>
          )}
        </button>
        
        <p className="text-sm text-gray-500 mt-4">
          Le PDF s'ouvrira dans un nouvel onglet prêt à imprimer
        </p>
      </div>
    </div>
  )
}