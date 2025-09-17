"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import type { BirthCertificateData } from "../types/birth-certificate"

interface BirthCertificateFormProps {
  onDataChange: (data: BirthCertificateData) => void
  initialData?: Partial<BirthCertificateData>
}

export default function BirthCertificateForm({ onDataChange, initialData }: BirthCertificateFormProps) {
  const [formData, setFormData] = useState<BirthCertificateData>({
    // Administrative info
    nom_province: initialData?.nom_province || "TULEAR",
    nom_commune: initialData?.nom_commune || "Tuléar",
    numero: initialData?.numero || "114",

    // Child information
    nom: initialData?.nom || "RAKOTOMALALA",
    prenom: initialData?.prenom || "Tolotriniaiana Lionel",
    date_naissance: initialData?.date_naissance || "11 MAI",
    annee_naissance: initialData?.annee_naissance || "1991",
    heure_naissance: initialData?.heure_naissance || "enina ora sy folo minitra",
    lieu_naissance: initialData?.lieu_naissance || "Hôpital de Tuléar",
    genre: initialData?.genre || "zazalahy",

    // Father information
    nom_pere: initialData?.nom_pere || "RAKOTOMAVO",
    prenom_pere: initialData?.prenom_pere || "Jeanne Henriette",
    travail_pere: initialData?.travail_pere || "Cultivateur",
    date_naissance_pere: initialData?.date_naissance_pere || "15 Janvier 1960",
    annee_naissance_père: initialData?.annee_naissance_père || "1960",
    lieu_naissance_pere: initialData?.lieu_naissance_pere || "Morombe",

    // Mother information
    nom_mere: initialData?.nom_mere || "RAKOTONIRINA",
    prenom_mere: initialData?.prenom_mere || "Désiré Oswald Roger",
    travail_mere: initialData?.travail_mere || "Ménagère",
    date_naissance_mere: initialData?.date_naissance_mere || "20 Mars 1965",
    annee_naissance_mere: initialData?.annee_naissance_mere || "1965",
    lieu_naissance_mere: initialData?.lieu_naissance_mere || "Tanambao",

    // Parents address
    adresse_parent: initialData?.adresse_parent || "Tanambao II",

    // Sage-femme information
    nom_sage_femme: initialData?.nom_sage_femme || "RAHARISON",
    prenom_sage_femme: initialData?.prenom_sage_femme || "Marie Claire",
    annee_naissance_sage_femme: initialData?.annee_naissance_sage_femme || "1955",
    lieu_naissance_sage_femme: initialData?.lieu_naissance_sage_femme || "Tuléar",
    adresse_sage_femme: initialData?.adresse_sage_femme || "Andabazy Clinique",

    // Witness information
    nom_temoin: initialData?.nom_temoin || "RANDRIAMANANTSOA",
    prenom_temoin: initialData?.prenom_temoin || "Paul Henri",
    lieu_de_travail_temoin: initialData?.lieu_de_travail_temoin || "Tanambao",

    // Document dates
    année_construction: initialData?.année_construction || "1991",
    date_construction_copie: initialData?.date_construction_copie || "15 Mai 1991",
    annee_construction_copie: initialData?.annee_construction_copie || "1991",
    heure_construction_copie: initialData?.heure_construction_copie || "14h30",
    date_enregistrement: initialData?.date_enregistrement || "15 Mai 1991",
    annee_enregistrement: initialData?.annee_enregistrement || "1991",
  })

  const router = useRouter()

  const handleInputChange = (field: keyof BirthCertificateData, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    onDataChange(updatedData)
  }

  const handleValidateForm = () => {
    const params = new URLSearchParams()
    Object.entries(formData).forEach(([key, value]) => {
      params.append(key, value)
    })
    router.push(`/certificate?${params.toString()}`)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Taratasy fanamarinana fahaterahana</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="administrative" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="administrative">Fanjakana</TabsTrigger>
            <TabsTrigger value="child">Zaza</TabsTrigger>
            <TabsTrigger value="parents">Ray aman-dreny</TabsTrigger>
            <TabsTrigger value="officials">Tompon'andraikitra</TabsTrigger>
            <TabsTrigger value="dates">Daty</TabsTrigger>
          </TabsList>

          <TabsContent value="administrative" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom_province">Faritany</Label>
                <Input
                  id="nom_province"
                  value={formData.nom_province}
                  onChange={(e) => handleInputChange("nom_province", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="nom_commune">Kaominina</Label>
                <Input
                  id="nom_commune"
                  value={formData.nom_commune}
                  onChange={(e) => handleInputChange("nom_commune", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="numero">Laharana</Label>
                <Input
                  id="numero"
                  value={formData.numero}
                  onChange={(e) => handleInputChange("numero", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="child" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Anarana</Label>
                <Input id="nom" value={formData.nom} onChange={(e) => handleInputChange("nom", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="prenom">Fanampin'anarana</Label>
                <Input
                  id="prenom"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange("prenom", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="date_naissance">Daty nahaterahana</Label>
                <Input
                  id="date_naissance"
                  value={formData.date_naissance}
                  onChange={(e) => handleInputChange("date_naissance", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="annee_naissance">Taona nahaterahana</Label>
                <Input
                  id="annee_naissance"
                  value={formData.annee_naissance}
                  onChange={(e) => handleInputChange("annee_naissance", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="heure_naissance">Ora nahaterahana</Label>
                <Input
                  id="heure_naissance"
                  value={formData.heure_naissance}
                  onChange={(e) => handleInputChange("heure_naissance", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lieu_naissance">Toerana nahaterahana</Label>
                <Input
                  id="lieu_naissance"
                  value={formData.lieu_naissance}
                  onChange={(e) => handleInputChange("lieu_naissance", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="genre">Lahy/Vavy</Label>
                <Select value={formData.genre} onValueChange={(value) => handleInputChange("genre", value)}>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Misafidiana..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zazalahy">Zazalahy</SelectItem>
                    <SelectItem value="zazavavy">Zazavavy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parents" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ray</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom_pere">Anaran-dray</Label>
                  <Input
                    id="nom_pere"
                    value={formData.nom_pere}
                    onChange={(e) => handleInputChange("nom_pere", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="prenom_pere">Fanampin'anaran-dray</Label>
                  <Input
                    id="prenom_pere"
                    value={formData.prenom_pere}
                    onChange={(e) => handleInputChange("prenom_pere", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="travail_pere">Asan-dray</Label>
                  <Input
                    id="travail_pere"
                    value={formData.travail_pere}
                    onChange={(e) => handleInputChange("travail_pere", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="date_naissance_pere">Date naissance père</Label>
                  <Input
                    id="date_naissance_pere"
                    value={formData.date_naissance_pere}
                    onChange={(e) => handleInputChange("date_naissance_pere", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Reny</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom_mere">Anaran-dreny</Label>
                  <Input
                    id="nom_mere"
                    value={formData.nom_mere}
                    onChange={(e) => handleInputChange("nom_mere", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="prenom_mere">Fanampin'anaran-dreny</Label>
                  <Input
                    id="prenom_mere"
                    value={formData.prenom_mere}
                    onChange={(e) => handleInputChange("prenom_mere", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="travail_mere">Asan-dreny</Label>
                  <Input
                    id="travail_mere"
                    value={formData.travail_mere}
                    onChange={(e) => handleInputChange("travail_mere", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="adresse_parent">Adiresin'ny ray aman-dreny</Label>
                  <Input
                    id="adresse_parent"
                    value={formData.adresse_parent}
                    onChange={(e) => handleInputChange("adresse_parent", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="officials" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Mpampivelona</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom_sage_femme">Anaran'ny mpampivelona</Label>
                  <Input
                    id="nom_sage_femme"
                    value={formData.nom_sage_femme}
                    onChange={(e) => handleInputChange("nom_sage_femme", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="prenom_sage_femme">Fanampin'anaran'ny mpampivelona</Label>
                  <Input
                    id="prenom_sage_femme"
                    value={formData.prenom_sage_femme}
                    onChange={(e) => handleInputChange("prenom_sage_femme", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Vavolombelona</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom_temoin">Anaran'ny vavolombelona</Label>
                  <Input
                    id="nom_temoin"
                    value={formData.nom_temoin}
                    onChange={(e) => handleInputChange("nom_temoin", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="prenom_temoin">Fanampin'anaran'ny vavolombelona</Label>
                  <Input
                    id="prenom_temoin"
                    value={formData.prenom_temoin}
                    onChange={(e) => handleInputChange("prenom_temoin", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dates" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="année_construction">Taona namoronana</Label>
                <Input
                  id="année_construction"
                  value={formData.année_construction}
                  onChange={(e) => handleInputChange("année_construction", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="date_construction_copie">Daty namoronana ny kopia</Label>
                <Input
                  id="date_construction_copie"
                  value={formData.date_construction_copie}
                  onChange={(e) => handleInputChange("date_construction_copie", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="date_enregistrement">Daty nanoratana</Label>
                <Input
                  id="date_enregistrement"
                  value={formData.date_enregistrement}
                  onChange={(e) => handleInputChange("date_enregistrement", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="annee_enregistrement">Taona nanoratana</Label>
                <Input
                  id="annee_enregistrement"
                  value={formData.annee_enregistrement}
                  onChange={(e) => handleInputChange("annee_enregistrement", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Button onClick={handleValidateForm} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
            Hamarino sy hamorony ny taratasy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
