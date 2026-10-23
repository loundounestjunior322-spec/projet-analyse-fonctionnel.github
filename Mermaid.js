/* Définitions Mermaid des 3 diagrammes + rendu */

const classes = `
  classDef user fill:#E8DFFB,stroke:#6D3FD6,stroke-width:2px,color:#2B1470;
  classDef obj fill:#D6F4EF,stroke:#0E9F8E,stroke-width:2px,color:#07463F;
  classDef robot fill:#14213D,stroke:#14213D,color:#fff,font-weight:bold;
  classDef goal fill:#FFE8D9,stroke:#E8590C,stroke-width:2px,color:#7A2A00;
  classDef fp fill:#E8590C,stroke:#B64400,color:#fff,font-weight:bold;
  classDef fc fill:#1C6FE0,stroke:#0F4FA8,color:#fff,font-weight:bold;
  classDef ft fill:#D6F4EF,stroke:#0E9F8E,stroke-width:2px,color:#07463F;
  classDef sol fill:#DDF4E6,stroke:#2F9E5B,stroke-width:2px,color:#12502D;
  classDef env fill:#EEF2F8,stroke:#5B6478,stroke-width:2px,color:#1B2437;
`;

const BETE = `flowchart TB
  A["<b>À qui rend-il service ?</b><br/>Étudiants et enseignants<br/>du laboratoire HESTIM"]:::user
  B["<b>Sur quoi agit-il ?</b><br/>Objets légers (≤ 250 g)<br/>cubes, pièces, jetons"]:::obj
  R(["<b>myCobot 280 Pi</b><br/>et<br/><b>mechArm 270 Pi</b><br/>bras robotisés 6 axes"]):::robot
  G["<b>Dans quel but ?</b><br/>Manipuler et déplacer avec précision des objets,<br/>et apprendre à programmer un robot"]:::goal
  A -->|"rend service à"| R
  B -->|"est manipulé par"| R
  R ==>|"pour"| G
  linkStyle 0 stroke:#6D3FD6,stroke-width:3px
  linkStyle 1 stroke:#0E9F8E,stroke-width:3px
  linkStyle 2 stroke:#E8590C,stroke-width:4px
  ${classes}`;

const PIEUVRE = `flowchart LR
  U(["Utilisateur<br/>(étudiant, enseignant)"]):::user
  O(["Objet à manipuler<br/>(≤ 250 g)"]):::obj
  L(["Logiciel de programmation<br/>(Python, myBlockly, ROS)"]):::user
  N(["PC / réseau<br/>(USB, Wi-Fi, Bluetooth)"]):::env
  E(["Énergie électrique<br/>(secteur, 12 V DC)"]):::env
  S(["Support de travail<br/>(table, plan de fixation)"]):::env
  V(["Environnement<br/>du laboratoire"]):::env
  X(["Normes et sécurité<br/>(CE, ISO 10218)"]):::env
  R{{"<b>ROBOT</b><br/>myCobot 280 Pi<br/>mechArm 270 Pi"}}:::robot
  U ===|"FP1"| R
  R ===|"FP1"| O
  U ===|"FP2"| R
  R ===|"FP2"| L
  E ---|"FC1"| R
  S ---|"FC2"| R
  N ---|"FC3"| R
  V ---|"FC4"| R
  X ---|"FC5"| R
  linkStyle 0,1,2,3 stroke:#E8590C,stroke-width:4px
  linkStyle 4,5,6,7,8 stroke:#1C6FE0,stroke-width:3px
  ${classes}`;

const FAST = `flowchart LR
  FP1["<b>FP1</b><br/>Manipuler précisément<br/>un objet"]:::fp
  FP2["<b>FP2</b><br/>Programmer et piloter<br/>le robot"]:::fp
  FC1["<b>FC1</b><br/>S'alimenter<br/>en énergie"]:::fc
  FC2["<b>FC2</b><br/>Se fixer<br/>sur le support"]:::fc

  FP1 --> T1["Générer le mouvement"]:::ft
  FP1 --> T2["Saisir et relâcher l'objet"]:::ft
  FP1 --> T3["Commander et contrôler"]:::ft
  T1 --> T11["Convertir l'énergie<br/>électrique en rotation"]:::ft --> S11["6 servomoteurs<br/>dans les articulations"]:::sol
  T1 --> T12["Transmettre et guider<br/>le mouvement"]:::ft --> S12["Réducteurs à engrenages<br/>et structure en bras"]:::sol
  T2 --> S2["Préhenseur : pince électrique<br/>ou ventouse à vide"]:::sol
  T3 --> T31["Traiter les consignes"]:::ft --> S31["Raspberry Pi 4B<br/>(Ubuntu)"]:::sol
  T3 --> T32["Mesurer la position<br/>des axes"]:::ft --> S32["Capteurs d'angle<br/>(codeurs) des servomoteurs"]:::sol

  FP2 --> T4["Communiquer"]:::ft --> S4["USB, Wi-Fi, Bluetooth,<br/>broches GPIO"]:::sol
  FP2 --> T5["Écrire le programme"]:::ft --> S5["Python (pymycobot),<br/>myBlockly, ROS"]:::sol

  FC1 --> T6["Fournir et distribuer<br/>l'énergie"]:::ft --> S6["Bloc secteur 12 V / 5 A<br/>et carte de gestion"]:::sol
  FC2 --> T7["Immobiliser la base"]:::ft --> S7["Embase à trous de fixation,<br/>serre-joint ou vis"]:::sol
  ${classes}`;

const defs = { "d-bete": BETE, "d-pieuvre": PIEUVRE, "d-fast": FAST };
for (const id in defs) document.getElementById(id).textContent = defs[id];

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "base",
  themeVariables: { fontFamily: "Segoe UI, Roboto, Arial, sans-serif", fontSize: "15px", lineColor: "#5B6478" },
  flowchart: { htmlLabels: true, curve: "basis", padding: 14, nodeSpacing: 40, rankSpacing: 60, useMaxWidth: false }
});
mermaid.run({ querySelector: "pre.mermaid" });