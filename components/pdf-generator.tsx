"use client"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { BirthCertificateData } from "../types/birth-certificate"
import { FileDown, Printer } from "lucide-react"

interface PDFGeneratorProps {
  data: BirthCertificateData
}

export default function PDFGenerator({ data }: PDFGeneratorProps) {
  const generatePDF = async () => {
    try {
      // Créer un élément temporaire pour le PDF
      const element = document.createElement("div")
      element.className = "pdf-container"
      element.style.position = "absolute"
      element.style.left = "-9999px"
      element.style.top = "0"
      element.style.background = "white"
      element.style.width = "210mm"
      element.style.minHeight = "297mm"
      element.style.padding = "20px"
      element.style.fontSize = "12px"
      element.style.lineHeight = "1.4"
      element.style.color = "#000"
      element.style.fontFamily = "'Times New Roman', serif"

      element.innerHTML = `
        <div class="pdf-header" style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px;">
          <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
            <div style="width: 80px; height: 80px; background: #ccc; margin-right: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
              <span style="font-size: 10px;">ARMOIRIES</span>
            </div>
            <div>
              <h1 style="font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 10px 0;">REPOBLIKAN'I MADAGASIKARA</h1>
              <p style="font-size: 12px; margin: 5px 0;">Fitiavana - Tanindrazana - Fandrosoana</p>
            </div>
            <div style="width: 80px; height: 80px; background: #ccc; margin-left: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
              <span style="font-size: 10px;">DRAPEAU</span>
            </div>
          </div>
          <h2 style="font-size: 20px; font-weight: bold; margin: 15px 0;">KOPIA</h2>
          <h3 style="font-size: 16px; font-weight: bold; margin: 10px 0;">TARATASIM-PITERAHANA</h3>
          <p style="font-size: 12px; margin: 5px 0;">(Extrait d'Acte de Naissance)</p>
        </div>

        <div style="margin-bottom: 25px; border: 1px solid #000; padding: 15px;">
          <h4 style="font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px;">🧍‍♂️ Zaza vao teraka</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div><span style="font-weight: bold;">Laharana (N°):</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.child.laharana}</span></div>
            <div><span style="font-weight: bold;">Anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.child.anarana}</span></div>
            <div><span style="font-weight: bold;">Fanampin'anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.child.fanampin_anarana}</span></div>
            <div><span style="font-weight: bold;">Lahy na vavy:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.child.lahy_na_vavy}</span></div>
            <div><span style="font-weight: bold;">Daty nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.child.daty_nahaterahana}</span></div>
            <div><span style="font-weight: bold;">Ora nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.child.ora_nahaterahana}</span></div>
          </div>
          <div style="margin-top: 10px;"><span style="font-weight: bold;">Toerana nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 300px;">${data.child.toerana_nahaterahana}</span></div>
        </div>

        <div style="margin-bottom: 25px; border: 1px solid #000; padding: 15px;">
          <h4 style="font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px;">👨‍👩‍👧 Ray aman-dreny</h4>
          
          <div style="margin-bottom: 20px;">
            <h5 style="font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Ray (Père)</h5>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div><span style="font-weight: bold;">Anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.father.anarana}</span></div>
              <div><span style="font-weight: bold;">Fanampin'anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.father.fanampin_anarana}</span></div>
              <div><span style="font-weight: bold;">Asa:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.father.asa}</span></div>
              <div><span style="font-weight: bold;">Daty nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.father.daty_nahaterahana}</span></div>
              <div><span style="font-weight: bold;">Toerana nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.father.toerana_nahaterahana}</span></div>
              <div><span style="font-weight: bold;">Adiresy ankehitriny:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.father.adiresy_ankehitriny}</span></div>
            </div>
          </div>

          <div>
            <h5 style="font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Reny (Mère)</h5>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div><span style="font-weight: bold;">Anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.mother.anarana}</span></div>
              <div><span style="font-weight: bold;">Fanampin'anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.mother.fanampin_anarana}</span></div>
              <div><span style="font-weight: bold;">Asa:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.mother.asa}</span></div>
              <div><span style="font-weight: bold;">Daty nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.mother.daty_nahaterahana}</span></div>
              <div><span style="font-weight: bold;">Toerana nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.mother.toerana_nahaterahana}</span></div>
              <div><span style="font-weight: bold;">Adiresy ankehitriny:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.mother.adiresy_ankehitriny}</span></div>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 25px; border: 1px solid #000; padding: 15px;">
          <h4 style="font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px;">👩‍⚕️ Mpampiteraka (na mpanambara)</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div><span style="font-weight: bold;">Anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.midwife.anarana}</span></div>
            <div><span style="font-weight: bold;">Fanampin'anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.midwife.fanampin_anarana}</span></div>
            <div><span style="font-weight: bold;">Asa:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.midwife.asa}</span></div>
            <div><span style="font-weight: bold;">Daty nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.midwife.daty_nahaterahana}</span></div>
            <div><span style="font-weight: bold;">Toerana nahaterahana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.midwife.toerana_nahaterahana}</span></div>
            <div><span style="font-weight: bold;">Adiresy ankehitriny:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.midwife.adiresy_ankehitriny}</span></div>
          </div>
        </div>

        <div style="margin-bottom: 25px; border: 1px solid #000; padding: 15px;">
          <h4 style="font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px;">🧑‍⚖️ Tompon'andraikitry ny fanoratana</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div><span style="font-weight: bold;">Anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.registrar.anarana}</span></div>
            <div><span style="font-weight: bold;">Fanampin'anarana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.registrar.fanampin_anarana}</span></div>
            <div><span style="font-weight: bold;">Asa:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.registrar.asa}</span></div>
            <div><span style="font-weight: bold;">Kaominina na fokontany:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.registrar.kaominina_na_fokontany}</span></div>
          </div>
        </div>

        <div style="margin-bottom: 25px; border: 1px solid #000; padding: 15px;">
          <h4 style="font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px;">🏙️ Fampahalalana ara-panjakana</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div><span style="font-weight: bold;">Faritany:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.administrative.faritany}</span></div>
            <div><span style="font-weight: bold;">Kaominina:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.administrative.kaominina}</span></div>
            <div><span style="font-weight: bold;">Daty fisoratana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.administrative.daty_fisoratana}</span></div>
            <div><span style="font-weight: bold;">Ora fisoratana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.administrative.ora_fisoratana}</span></div>
            <div><span style="font-weight: bold;">Daty namoahana kopia:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.administrative.daty_namoahana_kopia}</span></div>
            <div><span style="font-weight: bold;">Mpitantana sora-piankohonana:</span> <span style="border-bottom: 1px solid #000; padding: 2px 5px; display: inline-block; min-width: 100px;">${data.administrative.mpitantana_sora_piankohonana}</span></div>
          </div>
        </div>

        <div style="margin-top: 50px; display: flex; justify-content: space-between;">
          <div style="width: 200px; text-align: center;">
            <p style="font-size: 12px; margin-bottom: 5px;">Soniavina ny mpanambara</p>
            <div style="border-bottom: 1px solid #000; height: 50px; margin: 20px 0 10px 0;"></div>
            <p style="font-size: 10px;">(Signature du déclarant)</p>
          </div>
          <div style="width: 200px; text-align: center;">
            <p style="font-size: 12px; margin-bottom: 5px;">Soniavina ny mpitantana</p>
            <div style="border-bottom: 1px solid #000; height: 50px; margin: 20px 0 10px 0;"></div>
            <p style="font-size: 10px;">(Signature de l'officier d'état civil)</p>
          </div>
        </div>
      `

      document.body.appendChild(element)

      const canvas = await html2canvas(element, {
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123, // A4 height in pixels at 96 DPI
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      document.body.removeChild(element)

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")

      pdf.addImage(imgData, "PNG", 0, 0, 210, 297)

      const fileName = `Copie-Naissance-${data.child.anarana}-${data.child.fanampin_anarana}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      alert("Erreur lors de la génération du PDF. Veuillez réessayer.")
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={generatePDF}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
      >
        <FileDown className="w-4 h-4" />
        <span>Télécharger PDF</span>
      </button>

      <button
        onClick={handlePrint}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
      >
        <Printer className="w-4 h-4" />
        <span>Imprimer</span>
      </button>
    </div>
  )
}
