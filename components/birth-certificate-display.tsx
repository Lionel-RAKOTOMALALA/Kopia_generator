"use client"
import type { BirthCertificateData } from "../types/birth-certificate"

interface BirthCertificateDisplayProps {
  data: BirthCertificateData
}

export default function BirthCertificateDisplay({ data }: BirthCertificateDisplayProps) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div
        className="w-[210mm] h-[297mm] bg-white shadow-lg print:shadow-none print:p-0 relative"
        style={{ fontFamily: "'Times New Roman', serif", fontSize: "14px", lineHeight: "1.4" }}
      >
        <div className="absolute inset-0 p-12">
          <div className="mb-8">
            {/* Top row with logos */}
            <div className="flex justify-between items-start mb-4">
              {/* Left: Province coat of arms */}
              <div className="flex flex-col items-center w-32">
                <div className="w-20 h-24 mb-2 flex items-center justify-center">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image1-YfRKuKZsWlChhsPQvhFlfgqdL40di8.png"
                    alt="Armoiries de la Province de Tuléar"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center text-xs leading-tight">
                  <p className="font-bold">Province de {data.nom_province}</p>
                  <p className="font-bold">Commune Urbaine de {data.nom_commune}</p>
                </div>
              </div>

              <div className="flex flex-col items-center w-32 ml-24">
                <div className="w-64 h-64 mb-2 -mt-8 flex items-center justify-center">
                  <img src="/images/drap.png" alt="Drapeau de Madagascar" className="w-full h-full object-contain" />
                </div>

                <div className="text-center font-light text-sm">
                  <h1 className="mb-1 whitespace-nowrap font-semibold text-sm">KOPIAN'NY SORA-PIANKOHONANA</h1>
                  <p className="text-sm">*********************</p>
                </div>
              </div>

              <div className="w-32">{/* Empty space for visual balance */}</div>
            </div>
          </div>

          <div className="flex">
            <div className="w-48 mr-8 border-white border-none mt-16 flex-shrink-0">
              <div className="text-center border border-black p-4 border-none">
                <p className="font-bold text-lg mb-2">FAHA – {data.numero}</p>
                <p className="font-bold underline mb-2">FAHATERAHANA</p>
                <p className="font-bold mb-1">{data.nom}</p>
                <p className="font-bold mb-1">{data.prenom}</p>
                <p className="font-bold mb-2">{data.date_naissance}</p>
              </div>
            </div>

            <div className="w-[400px] text-sm leading-relaxed space-y-4 flex-shrink-0">
              <p className="text-justify -mt-8">
                ----Nalaina tamin'ny bokim-piankohonana eto Kaominin'i {data.nom_commune}, taona{" "}
                {data.année_construction}, izao soratra manaraka izao. - -------------
              </p>

              <p className="text-justify">
                ----Tamin'ny {data.date_naissance}, taona {data.annee_naissance}, tamin'ny
                {data.heure_naissance}, no teraka tao amin'ny {data.lieu_naissance} :{" "}
                <strong>
                  {data.nom} {data.prenom}
                </strong>
                , {data.genre}, zanak'i {data.nom_pere} <strong>{data.prenom_pere}</strong>, {data.travail_pere}, teraka
                tamin'ny {data.date_naissance_pere}, taona {data.annee_naissance_père}, tao {data.lieu_naissance_pere},
                sy{" "}
                <strong>
                  {data.nom_mere} {data.prenom_mere}
                </strong>
                , vadiny, {data.travail_mere}, teraka tamin'ny {data.date_naissance_mere}, taona{" "}
                {data.annee_naissance_mere}, tao {data.lieu_naissance_mere}, samy monina ao
                {data.adresse_parent} (Toliara). ---------------------------------------------------------
              </p>

              <p className="text-justify">
                ----Nosoratana androany {data.date_construction_copie}, taona {data.annee_construction_copie}, tamin'ny{" "}
                {data.heure_construction_copie}, araka ny fanambarana nataon'i{" "}
                <strong>
                  {data.nom_sage_femme} {data.prenom_sage_femme}
                </strong>
                , mpampiteraka, teraka vers
                {data.annee_naissance_sage_femme}, tao {data.lieu_naissance_sage_femme}, monina ao{" "}
                {data.adresse_sage_femme} – (Toliara), izay nanatrika ny fahaterahana, ary miara-manao sonia aminay,{" "}
                <strong>
                  {data.nom_temoin} {data.prenom_temoin}
                </strong>
                , Filoha lefitra mpandraharaha ny Zom – pirenena ao Firaisampokontany ny {data.lieu_de_travail_temoin} –
                (Toliara), rehefa novakiana taminy ity soratra ity. --------------------------------
              </p>

              <div className="my-4">
                <div className="text-center">
                  <p className="font-extrabold">
                    ----------------------------- MANARAKA NY SONIA -------------------------
                  </p>
                </div>
                <p className="font-extrabold">-----</p>
              </div>

              <p className="text-justify">
                ----Kopia manontolo nadika tamin'ny Boky androany {data.date_enregistrement}, taona{" "}
                {data.annee_enregistrement}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
