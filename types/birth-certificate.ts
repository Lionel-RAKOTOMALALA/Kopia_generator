export interface BirthCertificateData {
  // Administrative info
  nom_province: string
  nom_commune: string
  numero: string

  // Child information
  nom: string
  prenom: string
  date_naissance: string
  annee_naissance: string
  heure_naissance: string
  lieu_naissance: string
  genre: string

  // Father information
  nom_pere: string
  prenom_pere: string
  travail_pere: string
  date_naissance_pere: string
  annee_naissance_père: string
  lieu_naissance_pere: string

  // Mother information
  nom_mere: string
  prenom_mere: string
  travail_mere: string
  date_naissance_mere: string
  annee_naissance_mere: string
  lieu_naissance_mere: string

  // Parents address
  adresse_parent: string

  // Sage-femme (midwife) information
  nom_sage_femme: string
  prenom_sage_femme: string
  annee_naissance_sage_femme: string
  lieu_naissance_sage_femme: string
  adresse_sage_femme: string

  // Witness information
  nom_temoin: string
  prenom_temoin: string
  lieu_de_travail_temoin: string

  // Document construction dates
  année_construction: string
  date_construction_copie: string
  annee_construction_copie: string
  heure_construction_copie: string
  date_enregistrement: string
  annee_enregistrement: string
}
