// app/api/generate-pdf/route.js
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { NextResponse } from 'next/server'
import ConvertApi from 'convertapi'

const convertapi = new ConvertApi('ObPHAB0OPfftEutS5XLKsACV4Xe8zlwT')

// Fonction pour charger le template DOCX depuis l'URL publique
async function loadTemplateFromPublic() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Lionel-RAKOTOMALALA/Kopia_generator/main/public/modele/certificat-template.docx')
    if (!response.ok) throw new Error('Impossible de charger le template')
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    console.error('Erreur lors du chargement du template:', error)
    throw error
  }
}

export async function POST(request) {
  try {
    const certificateData = await request.json()

    // Charger le template DOCX depuis l'URL publique
    console.log('Chargement du template DOCX...')
    const templateBuffer = await loadTemplateFromPublic()
    
    // Générer le document DOCX en mémoire
    console.log('Génération du DOCX...')
    const zip = new PizZip(templateBuffer)
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true })
    doc.render(certificateData)
    
    // Obtenir le buffer du DOCX
    const docxBuffer = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' })

    console.log('Conversion DOCX vers PDF en cours...')

    // Convertir DOCX -> PDF avec ConvertAPI
    console.log('Envoi à ConvertAPI...')
    const result = await convertapi.convert('pdf', {
      Raw: docxBuffer,
      FileName: 'document.docx'
    }, 'docx')

    const pdfFile = result?.response?.Files?.[0]
    if (!pdfFile || !pdfFile.FileName) throw new Error('Aucun PDF généré par ConvertAPI')

    console.log('Téléchargement du PDF...')
    const pdfResponse = await fetch(pdfFile.Url)
    if (!pdfResponse.ok) throw new Error('Erreur lors du téléchargement du PDF')

    const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())
    
    console.log('Envoi du PDF au navigateur...')
    
    // Renvoyer le PDF directement au navigateur
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="certificat.pdf"',
      },
    })

  } catch (error) {
    console.error('Erreur lors de la génération:', error)
    return NextResponse.json(
      { error: 'Erreur de génération', details: error.message },
      { status: 500 }
    )
  }
}