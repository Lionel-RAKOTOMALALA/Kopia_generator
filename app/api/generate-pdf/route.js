// app/api/generate-pdf/route.js
import fs from 'fs'
import path from 'path'
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import { NextResponse } from 'next/server'
import ConvertApi from 'convertapi'

const convertapi = new ConvertApi('ObPHAB0OPfftEutS5XLKsACV4Xe8zlwT')

export async function POST(request) {
  let tempDocxPath = null

  try {
    const certificateData = await request.json()

    // Chemin vers le template DOCX
    const templatePath = path.join(process.cwd(), 'public', 'modele', 'certificat-template.docx')
    const templateBuffer = fs.readFileSync(templatePath)
    const zip = new PizZip(templateBuffer)
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true })
    doc.render(certificateData)

    // Générer le DOCX
    const docxBuffer = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' })

    // Créer dossier temporaire
    const tempDir = path.join(process.cwd(), 'tmp')
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })

    // Sauvegarder le DOCX temporaire
    tempDocxPath = path.join(tempDir, `temp.docx`)
    fs.writeFileSync(tempDocxPath, docxBuffer)

    console.log('Conversion DOCX vers PDF en cours...')

    // Convertir DOCX -> PDF avec ConvertAPI
    const result = await convertapi.convert('pdf', { File: tempDocxPath }, 'docx')
    const pdfFile = result?.response?.Files?.[0]
    if (!pdfFile || !pdfFile.FileName) throw new Error('Aucun PDF généré par ConvertAPI')

    // Télécharger le PDF
    const pdfResponse = await fetch(pdfFile.Url)
    if (!pdfResponse.ok) throw new Error('Erreur lors du téléchargement du PDF')

    const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())

    // Sauvegarder **toujours le même fichier PDF**
    const tempPdfPath = path.join(tempDir, 'certificat.pdf')
    fs.writeFileSync(tempPdfPath, pdfBuffer)

    console.log(`PDF généré et sauvegardé dans tmp: ${tempPdfPath}`)

    // Renvoyer le PDF pour affichage dans le navigateur
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

  } finally {
    // Supprimer uniquement le DOCX temporaire
    if (tempDocxPath && fs.existsSync(tempDocxPath)) {
      fs.unlinkSync(tempDocxPath)
    }
  }
}
