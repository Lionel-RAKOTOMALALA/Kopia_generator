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

    // Convertir DOCX -> PDF avec ConvertAPI avec timeout et retry
    let retryCount = 0;
    let result;
    
    while (retryCount < 3) {
      try {
        result = await Promise.race([
          convertapi.convert('pdf', { File: tempDocxPath }, 'docx'),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 15000)
          )
        ]);
        break; // Si réussi, sortir de la boucle
      } catch (error) {
        retryCount++;
        if (retryCount === 3) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1s avant de réessayer
      }
    }

    const pdfFile = result?.response?.Files?.[0]
    if (!pdfFile || !pdfFile.FileName) throw new Error('Aucun PDF généré par ConvertAPI')

    // Télécharger le PDF avec timeout et retry
    let pdfResponse;
    retryCount = 0;
    
    while (retryCount < 3) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        pdfResponse = await fetch(pdfFile.Url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!pdfResponse.ok) throw new Error('Erreur lors du téléchargement du PDF');
        break;
      } catch (error) {
        retryCount++;
        if (retryCount === 3) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())

    // Générer un nom de fichier unique basé sur un timestamp
    const timestamp = Date.now()
    const tempPdfPath = path.join(tempDir, `certificat-${timestamp}.pdf`)
    fs.writeFileSync(tempPdfPath, pdfBuffer)

    console.log(`PDF généré et sauvegardé dans tmp: ${tempPdfPath}`)

    // Supprimer l'ancien fichier PDF après un certain délai pour le nettoyage
    setTimeout(() => {
      try {
        if (fs.existsSync(tempPdfPath)) {
          fs.unlinkSync(tempPdfPath)
          console.log(`Ancien PDF supprimé: ${tempPdfPath}`)
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du PDF temporaire:', error)
      }
    }, 5000)

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
