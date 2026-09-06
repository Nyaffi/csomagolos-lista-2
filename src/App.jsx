import { useState } from "react";

// ─── ADATBÁZIS ────────────────────────────────────────────────────────────────

const SZEMELYEI = [
  { id: "szamoc", nev: "Szamóc", emoji: "👩", szin: "#FEE2E2" },
  { id: "szaxy",  nev: "Szaxy",  emoji: "👨", szin: "#DBEAFE" },
  { id: "annamari", nev: "Annamari", emoji: "👧", szin: "#FEF3C7" },
  { id: "beni",  nev: "Beni",   emoji: "🧒", szin: "#D1FAE5" },
];

const UTAZAS_TIPUSOK = [
  { id: "tenger",  nev: "Tengerparti", emoji: "🏖️", szin: "#BAE6FD" },
  { id: "kir",     nev: "Kirándulós",  emoji: "🥾", szin: "#BBF7D0" },
  { id: "snow",    nev: "Snowboard",   emoji: "🏂", szin: "#C7D2FE" },
  { id: "wellness",nev: "Wellness",    emoji: "🛁", szin: "#FDE68A" },
  { id: "varos",   nev: "Városnézős", emoji: "🗺️", szin: "#FECDD3" },
];

const UTAZASI_ESZKOZOK = [
  { id: "auto",   nev: "Autó",   emoji: "🚗", szin: "#D1FAE5" },
  { id: "busz",   nev: "Busz",   emoji: "🚌", szin: "#FEF3C7" },
  { id: "vonat",  nev: "Vonat",  emoji: "🚆", szin: "#DBEAFE" },
  { id: "repulo", nev: "Repülő", emoji: "✈️", szin: "#E0E7FF" },
];

// Repülőtéri biztonsági szabályok — általános figyelmeztető lista, nem tétel-specifikus.
const LEGI_FIGYELMEZTETES = [
  "Folyadék csak max. 100 ml-es tartályokban, összesen egy 1 literes záras zacskóban (fogkrém, sampon, tusfürdő, naptej, parfüm is folyadéknak számít)",
  "Éles tárgyak nem vihetők: kés, olló (6 cm penge felett), borotvapenge, dugóhúzó",
  "Zsebkés / multi-tool kézipoggyászban tilos — ha kell, csak feladott poggyászban",
  "Öngyújtó: légitársaságtól függően max. 1 db/fő lehet megengedett, gyufa jellemzően nem — érdemes otthon hagyni",
  "Aeroszolos termékek (hajlakk, dezodor spray) csak 100 ml alatt",
  "Powerbank / külön akkumulátor csakis kézipoggyászban vihető (feladott poggyászban tilos!), wattóra-korlát lehet",
  "Trekking bot, sátorcövek jellegű hegyes/fémes eszköz jellemzően nem engedélyezett kézipoggyászban",
];

const RUHAZAT = {
  szamoc: [
    { nev: "Alsónemű (bugyi/boxer)", napra: 1 },
    { nev: "Zokni", napra: 1 },
    { nev: "Póló", napra: 1, csak: "meleg" },
    { nev: "Hosszú ujjú póló", napra: 0.25 },
    { nev: "Pizsama", napra: 0.2 },
    { nev: "Rövidnadrág / szoknya", napra: 0.25, csak: "meleg" },
    { nev: "Hosszúnadrág", fix: 1 },
    { nev: "Kapucnis pulcsi", fix: 1 },
    { nev: "Vékony pulcsi", fix: 1 },
    { nev: "Esőkabát", fix: 1, csak: "meleg" },
    { nev: "Fürdőruha", napra: 0.15 },
    { nev: "Papucs", fix: 1 },
    { nev: "Sportcipő", fix: 1 },
    { nev: "Napszemüveg", fix: 1 },
    { nev: "Vastag téli kabát", fix: 1, csak: "hideg" },
    { nev: "Meleg sapka", fix: 1, csak: "hideg" },
    { nev: "Sál / nyaksál", fix: 1, csak: "hideg" },
    { nev: "Kesztyű", fix: 1, csak: "hideg" },
    { nev: "Vastag zokni (téli)", fix: 2, csak: "hideg" },
    { nev: "Téli bakancs", fix: 1, csak: "hideg" },
    { nev: "Hosszú aláöltözet (alsó)", fix: 1, csak: "hideg" },
    { nev: "Strandtörölköző", tenger: true },
  ],
  annamari: [
    { nev: "Bugyi", napra: 1 },
    { nev: "Melltartó", napra: 0.4 },
    { nev: "Zokni", napra: 1 },
    { nev: "Póló / trikó", napra: 1, csak: "meleg" },
    { nev: "Hosszú ujjú póló", napra: 0.25 },
    { nev: "Rövidnadrág", napra: 0.25, csak: "meleg" },
    { nev: "Szoknya / ruha", napra: 0.25, csak: "meleg" },
    { nev: "Pizsama", napra: 0.2 },
    { nev: "Hosszúnadrág", fix: 1 },
    { nev: "Kapucnis pulcsi", fix: 1 },
    { nev: "Vékony pulcsi", fix: 1 },
    { nev: "Esőkabát", fix: 1, csak: "meleg" },
    { nev: "Fürdőruha", napra: 0.2 },
    { nev: "Papucs", fix: 1 },
    { nev: "Sportcipő", fix: 1 },
    { nev: "Sapka / baseball sapka", fix: 1, csak: "meleg" },
    { nev: "Vastag téli kabát", fix: 1, csak: "hideg" },
    { nev: "Meleg sapka", fix: 1, csak: "hideg" },
    { nev: "Sál", fix: 1, csak: "hideg" },
    { nev: "Kesztyű", fix: 1, csak: "hideg" },
    { nev: "Vastag zokni (téli)", fix: 2, csak: "hideg" },
    { nev: "Téli bakancs", fix: 1, csak: "hideg" },
    { nev: "Hosszú aláöltözet (alsó)", fix: 1, csak: "hideg" },
    { nev: "Napszemüveg", fix: 1 },
    { nev: "Strandtörölköző", tenger: true },
  ],
  beni: [
    { nev: "Alsónadrág", napra: 1 },
    { nev: "Zokni", napra: 1 },
    { nev: "Póló / trikó", napra: 1, csak: "meleg" },
    { nev: "Hosszú ujjú póló", napra: 0.25 },
    { nev: "Rövidnadrág", napra: 0.25, csak: "meleg" },
    { nev: "Pizsama", napra: 0.2 },
    { nev: "Hosszúnadrág", fix: 1 },
    { nev: "Kapucnis pulcsi", fix: 1 },
    { nev: "Vékony pulcsi", fix: 1 },
    { nev: "Esőkabát", fix: 1, csak: "meleg" },
    { nev: "Fürdőnadrág", napra: 0.2 },
    { nev: "Papucs", fix: 1 },
    { nev: "Sportcipő", fix: 1 },
    { nev: "Sapka / baseball sapka", fix: 1, csak: "meleg" },
    { nev: "Vastag téli kabát", fix: 1, csak: "hideg" },
    { nev: "Meleg sapka", fix: 1, csak: "hideg" },
    { nev: "Sál", fix: 1, csak: "hideg" },
    { nev: "Kesztyű", fix: 1, csak: "hideg" },
    { nev: "Vastag zokni (téli)", fix: 2, csak: "hideg" },
    { nev: "Téli bakancs", fix: 1, csak: "hideg" },
    { nev: "Hosszú aláöltözet (alsó)", fix: 1, csak: "hideg" },
    { nev: "Napszemüveg", fix: 1 },
    { nev: "Strandtörölköző", tenger: true },
  ],
};

const SZEKCIOK = {
  szamoc: {
    "Fontos! 📋": ["bankkártya","személyi igazolvány","utasbiztosítás","jogosítvány","SZÉP kártya","készpénz","autó forgalmi","autó zöldkártya (külföld)","foglalási adatok (kinyomtatva/fotózva)","telefonszámok, címek","aprópénz (borravalóhoz, WC)"],
    "Kiegészítők 🎒": ["fülhallgató","töltő","éjszakai fény","mini elemlámpa","Vízszűrős kulacs (Philips) — csapvízzel tölthető, klórízt szűri","szennyestartó zacskó","olvasó szemüveg","kis kirándulós hátizsák","mini kapszulás kávéfőző","saját pohár"],
    "Gyógyszer 💊": ["→ lásd: Gyógyszercsomag fül"],
    "Tisztálkodás 🧴": ["fogkefe, fogkrém","tusfürdő","Nunimosó","hajbalzsam","sampon","hajzselé","arckrém","szájvíz","borotvakészlet","manikűrkészlet","tű/cérna"],
    "Szórakozás 🎲": ["toll, ceruza, papír","könyv / e-book olvasó","kártya/társasjáték"],
  },
  annamari: {
    "Fontos! 📋": ["bankkártya","személyi igazolvány","utasbiztosítás, EU kártya","készpénz","jogosítvány","autó forgalmi","autó zöldkártya (külföld)","foglalási adatok","telefonszámok, címek","aprópénz"],
    "Kiegészítők 🎒": ["fülhallgató","töltő","éjszakai fény","alvó kispárna","szennyestartó zacskó","szemüveg","kis kirándulós hátizsák","Vízszűrős kulacs (Philips) — csapvízzel tölthető, klórízt szűri","napszemüveg","füldugó"],
    "Gyógyszer 💊": ["menzesz fájdalomcsillapító","Nospa","Vellena italpor"],
    "Tisztálkodás 🧴": ["fogkefe, fogkrém","tusfürdő","smink + lemosó","deo/parfüm","betét/tampon","fésű","hajbalzsam","sampon","hajzselé","Nunimosó","hajgumi","manikűrkészlet","tű/cérna"],
  },
  beni: {
    "Fontos! 📋": ["bankkártya","személyi igazolvány","utasbiztosítás, EU kártya","készpénz","jogosítvány","autó forgalmi","autó zöldkártya (külföld)","foglalási adatok","telefonszámok, címek","aprópénz"],
    "Kiegészítők 🎒": ["fülhallgató","töltők","éjszakai fény","alvó kispárna","szennyestartó zacskó","szemüveg","kis kirándulós hátizsák","Vízszűrős kulacs (Philips) — csapvízzel tölthető, klórízt szűri","napszemüveg","füldugó"],
    "Gyógyszer 💊": ["Nasivin (orrvérzés esetén)"],
    "Tisztálkodás 🧴": ["fogkefe, fogkrém","tusfürdő","fésű","hajbalzsam","sampon","hajzselé","fogszabályzó","fogszabályzó tisztító tabletta","deo/OldSpice spray","borotvakészlet","manikűrkészlet"],
  },
};

const SPECI_ESZKOZOK = {
  tenger: { cim: "Tengerparti / Strand 🏖️", szin: "#BAE6FD", tetelek: [["Strandtáska (nagy)","az egész felszerelésnek"],["Homokfogó szőnyeg",null,true],["Napernyő / napsátor","cövekekkel együtt!",true],["Napsátor letűző cövekek",null,true],["Napozószék / kempingszék",null,true],["Tengerparti játékok (homokozószett, KUBB)",null],["Beach ball / röplabda",null],["Matrac / úszógumi",null,true],["SUP","csak ha tudjátok szállítani",true],["Matracpumpa","matraccal kötelező",true],["Vízálló telefontok",null],["Snorkel + búvárszemüveg",null],["Vízicipő / aqua cipő","kövecses tengerparton kötelező"],["Hűtőtáska + jégakku","étel, ital a strandra"],["Naptej (UV50 vízálló)","tengerparton erős SPF"],["Napozás utáni krém / Panthenol",null],["Plusz strandtörölköző (+1 extra)","sós víztől hamar tapadós"]] },
  kir:    { cim: "Kirándulós / Túrás 🥾",    szin: "#BBF7D0", tetelek: [["Kis kirándulós hátizsák (20-30l)","minden napra"],["Túrabakancs / erős cipő","nem sportcipő!"],["Vastag zokni (túra)","megelőzi a hólyagot"],["Esőkabát / poncsó","hegyvidéki idő gyorsan változik"],["Térkép / offline GPS app","Maps.me, OsmAnd"],["Fejlámpa + tartalék elem","barlangtúrához is kell"],["Kulacs (min. 1 l/fő)",null],["Energiaszelet / trail mix",null],["Elsősegélyes mini csomag","sebtapasz, bandázs, fertőtlenítő"],["Kullancsriasztó (DEET-alapú)","erdős területen kötelező"],["Napkrém (UV30)",null],["Trekking botok (opcionális)","meredek szakaszon hasznos",true],["Baseball sapka",null],["Zsebkés / multi-tool",null],["Vékony gyorsan száradó törülköző",null],["Polarflíz / vékony meleg réteg","hegyekben reggelente hideg"]] },
  snow:   { cim: "Snowboard / Téli Síelés 🏂", szin: "#C7D2FE", tetelek: [["Snowboard (saját vagy bérlés?)","bérléshez: láb méretét jegyezd fel",true],["Snowboard cipő",null,true],["Sisak","KÖTELEZŐ"],["Snowboard nadrág (vízálló)",null],["Snowboard kabát (vízálló)",null],["Síkesztyű (vízálló)",null],["Kesztyű csuklógumi",null],["Aláöltözet felső + alsó (termo)",null],["Sí/snowboard zokni (vastag, hosszú szárú)",null],["Goggle / síszemüveg",null],["Napszemüveg (tartalék)",null],["Nyaksál / gokartos sapka",null],["Akkus talpfűtés","hosszú felvonóvárakozáshoz"],["Naptej arc (UV50 + ajakvédő)","havon visszaverődik a fény"],["Térdvédő",null],["Snowboard bokapánt",null],["Pihekabát (szállásra, városba)",null],["Hótaposó / bakancs","szállásra, városba"],["Bakancshordó vállpánt",null],["Snowboardzsák",null,true],["Bérlettartó jojó",null],["Karabínerek",null],["Snowboard lopásgátló zár",null],["Mobil szerszámkészlet","csavar meglazulhat"],["Express ragasztó",null],["Kis hátizsák (napra)",null],["Termosz / kulacs",null],["GoPro / akciókamera","opcionális"]] },
  wellness:{ cim: "Wellness / Fürdős 🛁",    szin: "#FDE68A", tetelek: [["Fürdőruha / fürdőnadrág (2 db)","hogy megszáradjon"],["Papucs (csúszásgátlós)",null],["Fürdőköpeny","szállodai spa-ba kell"],["Hajszárító","apartmanban nincs mindig"],["Úszósapka",null],["Strandtáska (törülközőnek)",null],["Vízálló telefontok","medencés felvételekhez"],["Papírzsepi / mini kozmetikai csomag","öltözőhöz"],["SZÉP kártya!","wellness-nél elfogadják"]] },
  varos:  { cim: "Városnézős / Kulturális 🗺️", szin: "#FECDD3", tetelek: [["Kényelmes séta-cipő","egész napos gyalogláshoz"],["Kis városnézős hátizsák / válltáska",null],["Kompakt esőkabát (zsebbevaló)",null],["Telefontok / hasiási tok / telefonpánt",null],["Külső akkumulátor (powerbank)",null],["Útikönyv / offline Wikipedia app",null],["Kis összehajtható szatyor","múzeumi bolt, piac"],["Ünnepélyesebb öltözék 1 napra","drágább étterem, opera"]] },
};

const GYOGYSZERCSOMAG = [
  { szekció: "💊 Alap szerek", tetelek: ["Algoflex (fájdalom)","Nospa (görcsoldó)","Szaxy: vérnyomás gyógyszer (napi)","Canesten (gomba)","Beni: Nasivin (orrvérzés esetén)","Szamóc: Neumi ital (napi)","Szamóc: női vitaminok","sebtapasz (gyors, Leukoplast)","popsitörlő kendő","kézfertőtlenítő gél","szúnyog/kullancsriasztó","4RLF jeunesse ampulla","Septosyl szemkenőcs"] },
  { szekció: "🌟 Speciális, FONTOS!", tetelek: ["allergiagyógyszerek (Szaxy: pollenallergia)","Visine szemcsepp","Probiosan, C-vitamin","Zovirax herpeszkrém","Smecta (hasmenésre)","Sudocrem","naptej (UV30, 50)","napozás utáni krém","zöld krém","First","Lip","hónaljstift","testápoló"] },
];

const KUTYA_CUCCOS = ["Oltási könyv (mindkét kutyához)","Automata póráz (2 db)","Kakis zacsi guriga (+tartalék) 3 db","Etető/itató tányérkák (2 db)","Itató kulacs útra","Kullancscsipesz","Kullancsriasztó pipetta (2 db)","Kutyasampon","Nyakörv, hám (2 db)","Mobil kennel (autóba) (2 db)","Pokróc, alvópárna (2 db)","Szürke puha takaró","Fürdőtörölköző (2 db)","Popsitörlő","Sípolós játék (2 db)","Teniszlabda (2 db)","Jutalomfalat","Barnaalga-por (kajára)","Szösztelenítő henger","35l-es szemetes zacsi (vizes cuccnak)"];

const APARTMAN_MINIMAL = [["HiBREW / kapszulás kávéfőző","saját, mert apartmanban ritka"],["Éles kés (kenyér + szeletelő)","apartmanban általában nincs"],["Melegszendvics-sütő",null],["Éles svájci bicska / multi-tool","sörnyitó, konzervnyitó, dugóhúzó"],["Zacskózáró csipeszek",null],["Öngyújtó / gyufa",null],["Só, paprika, alapfűszer keverék","kis adagban"],["Olívaolaj (mini üveg)",null],["Leveskocka (2-3 db)",null],["Kávé / kapszula",null],["Első 1-2 nap kajája","úton nem kell megállni boltban"],["Mosogatószer (mini)",null],["Szivacs",null],["Konyharuha (1-2 db)",null],["Szalvéta (kisebb csomag)",null],["Fogpiszkáló",null],["Elosztó / hosszabbító","konnektorok ritkán jó helyen"],["Kis hajszárító","apartmanban NEM mindig van"]];

const APARTMAN_TELJES = [["Vágódeszka",null],["Fakanál / spatula",null],["Botmixer / shaker",null],["Folpack + alufólia",null],["Papírtörlő",null],["Szívószál",null],["Szemetes zsák (nagy)",null],["Nylonzacskók (több méret)",null],["Mosogatógép tabletta (ha van gép)",null],["Folyékony mosószer",null],["Folttisztító por",null],["Gumikesztyű",null],["Fertőtlenítős kendő",null],["WC illatosító",null],["Kézmosó szappan",null],["Csipesz + szárítókötél","ha nincs mosógép"],["Ágyneműhuzat (ha kérni kell)",null],["Szúnyogriasztó gyertya/lámpa",null]];

const INTEZNIVALOK = [
  { kat: "Foglalás", teendo: "Szállások visszaigazolása, check-in időpontok egyeztetése" },
  { kat: "Foglalás", teendo: "Éttermi asztalfoglalás (ha szükséges)" },
  { kat: "Adminisztráció", teendo: "SZÉP kártya egyenleg ellenőrzése" },
  { kat: "Adminisztráció", teendo: "Útlevelek, jogosítvány érvényességének ellenőrzése" },
  { kat: "Adminisztráció", teendo: "Utasbiztosítás megkötése / ellenőrzése" },
  { kat: "Kutyák", teendo: "Oltási könyvek előkészítése" },
  { kat: "Autó", teendo: "Autópálya matrica megvásárlása" },
  { kat: "Autó", teendo: "Műszaki, olajcsere ellenőrzése hosszú út előtt" },
  { kat: "Programok", teendo: "Online jegyek megvásárlása (Aggtelek, Aquaticum, Aqua-Palace, Vadaspark)" },
  { kat: "Csomagolás", teendo: "Bevásárlás: gyógyszerek, naptej" },
  { kat: "Csomagolás", teendo: "Bevásárlás: önellátós kajához alapanyagok" },
  { kat: "Repülő ✈️", teendo: "Online check-in, beszállókártyák letöltése/kinyomtatása", felt: b => b.eszkozok.includes("repulo") },
  { kat: "Repülő ✈️", teendo: "Kézipoggyász méretének leellenőrzése otthon (mérőkeret vagy mérőszalag)", felt: b => b.eszkozok.includes("repulo") },
  { kat: "Repülő ✈️", teendo: "Reptéri parkolás / transzfer lefoglalása és kifizetése", felt: b => b.eszkozok.includes("repulo") },
  { kat: "Repülő ✈️", teendo: "Külföldi valuta beszerzése (készpénz + kártya, helyi tömegközlekedéshez/étkezéshez)", felt: b => b.eszkozok.includes("repulo") },
];

// ─── SEGÉDFÜGGVÉNYEK ──────────────────────────────────────────────────────────

function szamolDb(item, napok, idojaras, vanTenger, vanMosogep) {
  if (item.tenger) return vanTenger ? (vanMosogep ? 1 : 2) : 0;
  if (item.csak === "hideg" && idojaras !== "hideg") return 0;
  if (item.csak === "meleg" && idojaras === "hideg") return 0;
  if (item.fix !== undefined) return item.fix;
  if (item.napra !== undefined) return Math.ceil(napok * item.napra);
  return 1;
}

function letszam(beall) {
  return beall.szemelyek.length + (beall.vendeg || 0);
}

// ─── ALAP KOMPONENSEK ────────────────────────────────────────────────────────

const COLORS = {
  primary: "#F97316", dark: "#0F4C5C", bg: "#F9FAFB", white: "#FFFFFF",
  border: "#E5E7EB", muted: "#6B7280", text: "#1F2937",
};

function ToggleKartya({ aktiv, onClick, emoji, nev, szin }) {
  return (
    <button onClick={onClick} style={{
      background: aktiv ? szin : "#F9FAFB",
      border: `2px solid ${aktiv ? "#9CA3AF" : "#E5E7EB"}`,
      borderRadius: 14, padding: "10px 14px", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      fontSize: 12, fontWeight: aktiv ? 800 : 500,
      color: aktiv ? "#1F2937" : "#6B7280",
      transition: "all 0.15s", minWidth: 80,
      boxShadow: aktiv ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
      transform: aktiv ? "scale(1.05)" : "scale(1)",
    }}>
      <span style={{ fontSize: 26 }}>{emoji}</span>
      {nev}
    </button>
  );
}

function CRow({ id, checked, onToggle, label, badge, badgeColor }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "3px 0", borderBottom: "1px solid #F3F4F6" }}>
      <input type="checkbox" checked={checked} onChange={() => onToggle(id)}
        style={{ width: 14, height: 14, accentColor: COLORS.primary, cursor: "pointer", flexShrink: 0, marginTop: 2 }} />
      <span style={{ fontSize: 12, color: COLORS.text, flex: 1, lineHeight: 1.4 }}>{label}</span>
      {badge && (
        <span style={{
          background: badgeColor || "#FFF7ED", color: badgeColor ? "#fff" : "#EA580C",
          fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 999,
          border: `1px solid ${badgeColor || "#FED7AA"}`, flexShrink: 0, whiteSpace: "nowrap",
        }}>{badge}</span>
      )}
    </div>
  );
}

function SzekcioFejlec({ cim, szin }) {
  return (
    <div style={{
      background: szin || "#F3F4F6", padding: "6px 12px",
      fontWeight: 700, fontSize: 12, color: COLORS.dark,
      borderRadius: "8px 8px 0 0",
    }}>{cim}</div>
  );
}

function Blokk({ cim, szin, children }) {
  return (
    <div style={{ background: COLORS.white, borderRadius: 10, border: `1px solid ${COLORS.border}`, overflow: "hidden", marginBottom: 10 }}>
      <SzekcioFejlec cim={cim} szin={szin} />
      <div style={{ padding: "8px 12px" }}>{children}</div>
    </div>
  );
}

function Fej({ cim, al }) {
  return (
    <div style={{ borderBottom: `2px solid ${COLORS.border}`, marginBottom: 8, paddingBottom: 4 }}>
      <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.dark }}>{cim}</div>
      {al && <div style={{ fontSize: 11, color: COLORS.muted }}>{al}</div>}
    </div>
  );
}

// ─── FÜLSÁV ──────────────────────────────────────────────────────────────────

const FULEK = [
  { id: "szemelyek", label: "👤 Személyek" },
  { id: "kutya",     label: "🐕 Kutyák",    felt: b => b.vanKutya },
  { id: "speci",     label: "🎯 Speciális", felt: b => b.tipusok.length > 0 },
  { id: "gyogyszer", label: "💊 Gyógyszer" },
  { id: "apartman",  label: "🏠 Apartman",  felt: b => b.szallas === "apartman" },
  { id: "bevasarlas",label: "🛒 Bevásárlás", felt: b => b.onellatos },
  { id: "intezni",   label: "📋 Intéznivalók" },
];

function Fulek({ aktiv, setAktiv, beall }) {
  const lathatoFulek = FULEK.filter(f => !f.felt || f.felt(beall));
  return (
    <div style={{ display: "flex", gap: 4, overflowX: "auto", padding: "0 4px 4px", scrollbarWidth: "none" }}>
      {lathatoFulek.map(f => (
        <button key={f.id} onClick={() => setAktiv(f.id)} style={{
          background: aktiv === f.id ? COLORS.dark : COLORS.white,
          color: aktiv === f.id ? "#fff" : COLORS.muted,
          border: `1.5px solid ${aktiv === f.id ? COLORS.dark : COLORS.border}`,
          borderRadius: 10, padding: "7px 12px", cursor: "pointer",
          fontSize: 12, fontWeight: aktiv === f.id ? 700 : 500,
          whiteSpace: "nowrap", transition: "all 0.15s",
        }}>{f.label}</button>
      ))}
    </div>
  );
}

// ─── LISTÁK TARTALOM ─────────────────────────────────────────────────────────

function LegiFigyelmezteto() {
  return (
    <div style={{ background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
      <div style={{ fontWeight:800, fontSize:13, color:"#1E3A8A", marginBottom:6, fontFamily:"Nunito,sans-serif" }}>✈️ Repülős út — amit ÁLTALÁBAN nem engednek fel kézipoggyászban</div>
      <ul style={{ margin:0, paddingLeft:18, fontSize:11.5, color:"#1E40AF", lineHeight:1.6 }}>
        {LEGI_FIGYELMEZTETES.map((t,i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}

function SzemelyCsomaglista({ sz, beall, checked, onToggle }) {
  const ruha = RUHAZAT[sz.id] || RUHAZAT.szamoc;
  const szek = SZEKCIOK[sz.id] || SZEKCIOK.szamoc;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        background: `linear-gradient(135deg, ${sz.szin}, #fff)`,
        border: `2px solid ${sz.szin}`, borderRadius: 14,
        padding: "12px 16px", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 28 }}>{sz.emoji}</span>
        <div>
          <div style={{ fontWeight: 900, fontSize: 18, color: COLORS.dark, fontFamily: "Nunito, sans-serif" }}>{sz.nev}</div>
          <div style={{ fontSize: 11, color: COLORS.muted }}>személyes csomaglista</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {/* Ruházat */}
        <div>
          <Fej cim="👗 Ruházat" />
          {ruha.map((item, i) => {
            const db = szamolDb(item, beall.napok, beall.idojaras, beall.vanTenger, beall.vanMosogep);
            if (db === 0) return null;
            return <CRow key={i} id={`${sz.id}_r_${i}`} checked={checked[`${sz.id}_r_${i}`]||false} onToggle={onToggle} label={item.nev} badge={`${db} db`} />;
          })}
        </div>
        {/* Fontos + Kiegészítők */}
        <div>
          {["Fontos! 📋","Kiegészítők 🎒"].map(s => szek[s] && (
            <div key={s} style={{ marginBottom: 10 }}>
              <Fej cim={s} />
              {szek[s].map((t,i) => <CRow key={i} id={`${sz.id}_${s}_${i}`} checked={checked[`${sz.id}_${s}_${i}`]||false} onToggle={onToggle} label={t} />)}
            </div>
          ))}
        </div>
        {/* Gyógyszer + Tisztálkodás + Szórakozás */}
        <div>
          {["Gyógyszer 💊","Tisztálkodás 🧴","Szórakozás 🎲"].map(s => szek[s] && (
            <div key={s} style={{ marginBottom: 10 }}>
              <Fej cim={s} />
              {szek[s].map((t,i) => <CRow key={i} id={`${sz.id}_${s}_${i}`} checked={checked[`${sz.id}_${s}_${i}`]||false} onToggle={onToggle} label={t} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KutyakTab({ beall, checked, onToggle }) {
  const kajak = [
    { nev: "Reggeli: toastkenyér (légmentes dobozban)", db: `${2 * beall.napok} szelet` },
    { nev: "Reggeli: májkrém (100g-os tubus)", db: `${Math.ceil(beall.napok/7)} db` },
    { nev: "Bucky száraztáp", db: `${100*beall.napok}g` },
    { nev: "Natasha száraztáp", db: `${80*beall.napok}g` },
    { nev: "Száraztáp összesen", db: `${((180*beall.napok)/1000).toFixed(2)}kg` },
    { nev: "Konzerv (Bucky 60g + Natasha 40g/nap)", db: `${Math.ceil(100*beall.napok/400)} konzerv (400g)` },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Blokk cim="🎒 Felszerelés" szin="#EDE9FE">
        {KUTYA_CUCCOS.map((t,i) => <CRow key={i} id={`kutya_${i}`} checked={checked[`kutya_${i}`]||false} onToggle={onToggle} label={t} />)}
      </Blokk>
      <Blokk cim={`🍗 Kutyakaja – ${beall.napok} napra`} szin="#EDE9FE">
        {kajak.map((t,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"3px 0", borderBottom:"1px solid #F3F4F6" }}>
            <input type="checkbox" checked={checked[`kutyakaja_${i}`]||false} onChange={() => onToggle(`kutyakaja_${i}`)} style={{ width:14, height:14, accentColor:COLORS.primary, cursor:"pointer", flexShrink:0 }} />
            <span style={{ fontSize:12, color:COLORS.text, flex:1 }}>{t.nev}</span>
            <span style={{ background:"#7C3AED", color:"#fff", fontSize:10, fontWeight:700, padding:"1px 7px", borderRadius:999, flexShrink:0 }}>{t.db}</span>
          </div>
        ))}
      </Blokk>
    </div>
  );
}

function TulmeretFigyelmezteto() {
  return (
    <div style={{ gridColumn:"1/-1", background:"#FFF7ED", border:"1px solid #FDBA74", borderRadius:10, padding:"10px 14px", fontSize:12, color:"#9A3412", marginBottom:2 }}>
      ⚠️ Poggyászméret miatt néhány nagyméretű tárgyat elrejtettünk a listáról. Ha ezeket is látni szeretnéd, válassz autós utazást a Beállításokban.
    </div>
  );
}

function SpeiciTab({ beall, checked, onToggle }) {
  const repulovel = beall.eszkozok.includes("repulo");
  let vanElrejtve = false;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {repulovel && vanTulmeretesTetelSpeci(beall) && <TulmeretFigyelmezteto />}
      {beall.tipusok.map(tid => {
        const tip = SPECI_ESZKOZOK[tid];
        if (!tip) return null;
        const tetelek = tip.tetelek
          .map((tetel, i) => ({ tetel, i }))
          .filter(({ tetel: [,,tulmeretes] }) => !(repulovel && tulmeretes));
        if (tetelek.length === 0) return null;
        return (
          <Blokk key={tid} cim={tip.cim} szin={tip.szin}>
            {tetelek.map(({ tetel: [nev, megj], i }) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"3px 0", borderBottom:"1px solid #F9FAFB" }}>
                <input type="checkbox" checked={checked[`speci_${tid}_${i}`]||false} onChange={() => onToggle(`speci_${tid}_${i}`)} style={{ width:14, height:14, accentColor:COLORS.primary, cursor:"pointer", flexShrink:0, marginTop:2 }} />
                <div>
                  <span style={{ fontSize:12, color:COLORS.text }}>{nev}</span>
                  {megj && <span style={{ fontSize:10, color:COLORS.muted, marginLeft:5 }}>({megj})</span>}
                </div>
              </div>
            ))}
          </Blokk>
        );
      })}
    </div>
  );
}

function vanTulmeretesTetelSpeci(beall) {
  return beall.tipusok.some(tid => SPECI_ESZKOZOK[tid]?.tetelek.some(([,,t]) => t));
}

function GyogyszerTab({ checked, onToggle }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {GYOGYSZERCSOMAG.map((szek, si) => (
        <Blokk key={si} cim={szek.szekció} szin="#FEE2E2">
          {szek.tetelek.map((t,i) => <CRow key={i} id={`gyogy_${si}_${i}`} checked={checked[`gyogy_${si}_${i}`]||false} onToggle={onToggle} label={t} />)}
        </Blokk>
      ))}
    </div>
  );
}

function ApartmanTab({ beall, checked, onToggle }) {
  const repulovel = beall.eszkozok.includes("repulo");
  const szures = lista => lista
    .map((tetel, i) => ({ tetel, i }))
    .filter(({ tetel: [,,tulmeretes] }) => !(repulovel && tulmeretes));
  const minTetelek = szures(APARTMAN_MINIMAL);
  const telTetelek = szures(APARTMAN_TELJES);
  const vanElrejtve = repulovel && (minTetelek.length < APARTMAN_MINIMAL.length || telTetelek.length < APARTMAN_TELJES.length);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {vanElrejtve && <TulmeretFigyelmezteto />}
      <Blokk cim="✅ MINIMÁL – mindig visszük" szin="#D1FAE5">
        {minTetelek.map(({ tetel: [nev,megj], i }) => (
          <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"3px 0", borderBottom:"1px solid #F9FAFB" }}>
            <input type="checkbox" checked={checked[`apt_min_${i}`]||false} onChange={() => onToggle(`apt_min_${i}`)} style={{ width:14, height:14, accentColor:COLORS.primary, cursor:"pointer", flexShrink:0, marginTop:2 }} />
            <div>
              <span style={{ fontSize:12, color:COLORS.text }}>{nev}</span>
              {megj && <span style={{ fontSize:10, color:COLORS.muted, marginLeft:5 }}>({megj})</span>}
            </div>
          </div>
        ))}
      </Blokk>
      {beall.apartmanMod === "teljes" ? (
        <Blokk cim="➕ TELJES ÖNELLÁTÓS – extra felszerelés" szin="#FEF3C7">
          {telTetelek.map(({ tetel: [nev,megj], i }) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"3px 0", borderBottom:"1px solid #F9FAFB" }}>
              <input type="checkbox" checked={checked[`apt_tel_${i}`]||false} onChange={() => onToggle(`apt_tel_${i}`)} style={{ width:14, height:14, accentColor:COLORS.primary, cursor:"pointer", flexShrink:0, marginTop:2 }} />
              <div>
                <span style={{ fontSize:12, color:COLORS.text }}>{nev}</span>
                {megj && <span style={{ fontSize:10, color:COLORS.muted, marginLeft:5 }}>({megj})</span>}
              </div>
            </div>
          ))}
        </Blokk>
      ) : (
        <div style={{ background:"#F9FAFB", border:`1.5px dashed ${COLORS.border}`, borderRadius:10, padding:20, display:"flex", alignItems:"center", justifyContent:"center", color:COLORS.muted, fontSize:13, textAlign:"center" }}>
          💡 Teljes önellátós lista inaktív.<br />A Beállításokban „Teljes"-re váltva jelenik meg.
        </div>
      )}
    </div>
  );
}

function BevasarlasTab({ beall, checked, onToggle }) {
  const fo = letszam(beall);
  const n = beall.napok;
  const bevasarlas = [
    { kat:"☕ Reggeli", tetelek:[
      { nev:"Tej / növényi tej", db:`${Math.round(fo*n*0.2*10)/10} l`, kiszereles:"1 l-es doboz" },
      { nev:"Müzli / cornflakes", db:`${fo*n*60}g`, kiszereles:"500g-os zacskó" },
      { nev:"Kenyér / zsemle", db:`${Math.ceil(fo*n*1.5)} db`, kiszereles:"" },
      { nev:"Vaj / margarin", db:`${Math.ceil(fo*n*20/200)} csomag`, kiszereles:"200g-os kocka" },
      { nev:"Lekvár / méz", db:`${Math.ceil(fo*n*15/350)} üveg`, kiszereles:"350g-os üveg" },
      { nev:"Felvágott / sajt", db:`${Math.ceil(fo*n*30/100)} csomag`, kiszereles:"100g-os csomag" },
      { nev:"Tojás", db:`${Math.ceil(fo*n*0.5/10)} tálca`, kiszereles:"10 db-os tálca" },
    ]},
    { kat:"🍝 Tészta-alap (pl. carbonara)", tetelek:[
      { nev:"Tészta", db:`${Math.ceil(fo*100/500)} csomag`, kiszereles:"500g-os csomag" },
      { nev:"Tejszín / főzőtejszín", db:`${Math.ceil(fo*50/200)} doboz`, kiszereles:"200ml-es doboz" },
      { nev:"Szalonna / bacon", db:`${Math.ceil(fo*40/150)} csomag`, kiszereles:"150g-os csomag" },
      { nev:"Tojás", db:`${Math.ceil(fo/10)} tálca`, kiszereles:"10 db-os tálca" },
      { nev:"Reszelt parmezán / sajt", db:`${Math.ceil(fo*20/100)} zacskó`, kiszereles:"100g-os zacskó" },
    ]},
    { kat:"🥪 Melegszendvics", tetelek:[
      { nev:"Toastkenyér", db:`${Math.ceil(fo*4/25)} csomag`, kiszereles:"500g-os (~25 szelet)" },
      { nev:"Sajt szeletelt", db:`${Math.ceil(fo*30/100)} csomag`, kiszereles:"100g-os csomag" },
      { nev:"Sonka / felvágott", db:`${Math.ceil(fo*30/100)} csomag`, kiszereles:"100g-os csomag" },
      { nev:"Vaj (kenéshez)", db:`${Math.ceil(fo*10/200)} csomag`, kiszereles:"200g-os kocka" },
    ]},
    { kat:"🫓 Tortilla-batyu (sütőben)", tetelek:[
      { nev:"Tortillalap", db:`${Math.ceil(fo*1.5/6)} csomag`, kiszereles:"6 db-os csomag" },
      { nev:"Darált hús (bolognai)", db:`${Math.ceil(fo*80/500)} csomag`, kiszereles:"500g-os csomag" },
      { nev:"Passzírozott paradicsom", db:`${Math.ceil(fo*50/500)} doboz`, kiszereles:"500g-os doboz" },
      { nev:"Reszelt sajt", db:`${Math.ceil(fo*25/100)} zacskó`, kiszereles:"100g-os zacskó" },
      { nev:"Felvágott (alt. töltelék)", db:`${Math.ceil(fo*40/100)} csomag`, kiszereles:"100g-os csomag" },
    ]},
    { kat:"🥕 Zöldség (szendvicshez)", tetelek:[
      { nev:"Paradicsom", db:`${fo} db`, kiszereles:"≈120g/db" },
      { nev:"Kígyóuborka", db:`${Math.ceil(fo*0.25)} db`, kiszereles:"≈400g/db" },
      { nev:"Zöldpaprika", db:`${fo} db`, kiszereles:"≈150g/db" },
    ]},
    { kat:"🧂 Alapfűszer / kamra", tetelek:[
      { nev:"Só, bors, paprika", db:"1 készlet", kiszereles:"" },
      { nev:"Olívaolaj / olaj", db:"1 üveg", kiszereles:"1 l-es üveg" },
      { nev:"Fokhagyma, hagyma", db:"ízlés szerint", kiszereles:"" },
      { nev:"Leveskocka", db:"1 doboz", kiszereles:"10 db-os doboz" },
    ]},
    { kat:"💧 Italok", tetelek:[
      { nev:"Ásványvíz", db:`${Math.ceil(fo*n*1.5/(1.5*6))} karton`, kiszereles:"6×1,5l-es karton" },
      { nev:"Üdítő / szörp", db:"ízlés szerint", kiszereles:"" },
      { nev:"Kávé (kapszula / őrölt)", db:`${Math.ceil(fo*n*2/16)} csomag`, kiszereles:"≈16 adagos csomag" },
    ]},
    { kat:"🍎 Gyümölcs", tetelek:[
      { nev:"Friss gyümölcs", db:`${Math.round(fo*n*1.5)} db`, kiszereles:"≈150g/db" },
    ]},
  ];

  return (
    <div>
      <div style={{ background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:12, color:"#166534" }}>
        💡 Mennyiségek: <strong>{fo} fő × {n} nap</strong> alapján számolva, felfelé kerekítve. Szamóc: tejmentes alternatívát vegyél figyelembe!
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:12 }}>
        {bevasarlas.map((szek, si) => (
          <Blokk key={si} cim={szek.kat} szin="#F0FDF4">
            {szek.tetelek.map((t,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"3px 0", borderBottom:"1px solid #F9FAFB" }}>
                <input type="checkbox" checked={checked[`bev_${si}_${i}`]||false} onChange={() => onToggle(`bev_${si}_${i}`)} style={{ width:14, height:14, accentColor:COLORS.primary, cursor:"pointer", flexShrink:0 }} />
                <span style={{ fontSize:12, color:COLORS.text, flex:1 }}>{t.nev}</span>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <span style={{ background:"#166534", color:"#fff", fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:999, display:"block" }}>{t.db}</span>
                  {t.kiszereles && <span style={{ fontSize:9, color:COLORS.muted }}>{t.kiszereles}</span>}
                </div>
              </div>
            ))}
          </Blokk>
        ))}
      </div>
    </div>
  );
}

function IntezniTab({ beall, checked, onToggle }) {
  const katSzin = { "Foglalás":"#DBEAFE", "Adminisztráció":"#FEF3C7", "Kutyák":"#EDE9FE", "Autó":"#D1FAE5", "Programok":"#FEE2E2", "Csomagolás":"#F3F4F6", "Repülő ✈️":"#E0E7FF" };
  const csoportok = INTEZNIVALOK.filter(t => !t.felt || t.felt(beall)).reduce((acc, t) => {
    if (!acc[t.kat]) acc[t.kat] = [];
    acc[t.kat].push(t.teendo);
    return acc;
  }, {});
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:12 }}>
      {Object.entries(csoportok).map(([kat, tetelek], ki) => (
        <Blokk key={ki} cim={kat} szin={katSzin[kat]||"#F3F4F6"}>
          {tetelek.map((t,i) => <CRow key={i} id={`int_${ki}_${i}`} checked={checked[`int_${ki}_${i}`]||false} onToggle={onToggle} label={t} />)}
        </Blokk>
      ))}
    </div>
  );
}

// ─── BEÁLLÍTÁSOK OLDAL ────────────────────────────────────────────────────────

function BeallitasokOldal({ beall, setBeall, onGeneral }) {
  const toggle = (arr, val) => arr.includes(val) ? arr.filter(x=>x!==val) : [...arr, val];
  const Kartya = ({ children }) => (
    <div style={{ background:COLORS.white, borderRadius:16, padding:"18px 20px", marginBottom:14, boxShadow:"0 1px 4px rgba(0,0,0,0.06)", border:`1px solid ${COLORS.border}` }}>
      {children}
    </div>
  );
  const H = ({ children }) => <h2 style={{ fontFamily:"Nunito,sans-serif", fontSize:15, fontWeight:800, color:COLORS.dark, margin:"0 0 12px" }}>{children}</h2>;
  const L = ({ children }) => <label style={{ display:"block", fontSize:11, fontWeight:600, color:COLORS.muted, marginBottom:3, textTransform:"uppercase", letterSpacing:.5 }}>{children}</label>;
  const I = (props) => <input {...props} style={{ width:"100%", padding:"8px 11px", borderRadius:9, border:`1.5px solid ${COLORS.border}`, fontSize:13, color:COLORS.text, background:"#FAFAFA", outline:"none", boxSizing:"border-box", fontFamily:"inherit", ...props.style }} />;

  return (
    <div style={{ maxWidth:660, margin:"0 auto", padding:"0 16px 40px" }}>
      <div style={{ textAlign:"center", padding:"28px 0 20px" }}>
        <div style={{ fontSize:44, marginBottom:6 }}>🧳</div>
        <h1 style={{ fontFamily:"Nunito,sans-serif", fontSize:26, fontWeight:900, color:COLORS.dark, margin:0 }}>Utazási SOS listák</h1>
        <p style={{ color:COLORS.muted, fontSize:13, marginTop:5 }}>Add meg az utazás adatait — generáljuk a csomaglistát!</p>
      </div>

      <Kartya>
        <H>✈️ Alapadatok</H>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <div style={{ gridColumn:"1/-1" }}>
            <L>Utazás neve</L>
            <I placeholder="pl. Debrecen-körtúra 2026" value={beall.nev} onChange={e=>setBeall(b=>({...b,nev:e.target.value}))} />
          </div>
          <div><L>Napok száma</L><I type="number" min={1} max={30} value={beall.napok} onChange={e=>setBeall(b=>({...b,napok:parseInt(e.target.value)||1}))} /></div>
          <div><L>Időjárás</L>
            <select style={{ width:"100%", padding:"8px 11px", borderRadius:9, border:`1.5px solid ${COLORS.border}`, fontSize:13, color:COLORS.text, background:"#FAFAFA", fontFamily:"inherit" }} value={beall.idojaras} onChange={e=>setBeall(b=>({...b,idojaras:e.target.value}))}>
              <option value="meleg">☀️ Meleg</option>
              <option value="hideg">❄️ Hideg</option>
              <option value="vegyes">🌤️ Vegyes</option>
            </select>
          </div>
          <div><L>Szállás típusa</L>
            <select style={{ width:"100%", padding:"8px 11px", borderRadius:9, border:`1.5px solid ${COLORS.border}`, fontSize:13, color:COLORS.text, background:"#FAFAFA", fontFamily:"inherit" }} value={beall.szallas} onChange={e=>setBeall(b=>({...b,szallas:e.target.value}))}>
              <option value="apartman">🏠 Apartman</option>
              <option value="hotel">🏨 Hotel</option>
            </select>
          </div>
          <div><L>Apartman mód</L>
            <select style={{ width:"100%", padding:"8px 11px", borderRadius:9, border:`1.5px solid ${COLORS.border}`, fontSize:13, color:COLORS.text, background:"#FAFAFA", fontFamily:"inherit", opacity:beall.szallas==="hotel"?.4:1 }} value={beall.apartmanMod} disabled={beall.szallas==="hotel"} onChange={e=>setBeall(b=>({...b,apartmanMod:e.target.value}))}>
              <option value="minimal">Minimál (alap)</option>
              <option value="teljes">Teljes önellátós</option>
            </select>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:10, flexWrap:"wrap" }}>
          {[["vanMosogep","🫧 Van mosógép"],["vanTenger","🌊 Tengerparti cél"],["vanKutya","🐕 Kutyák jönnek"],["onellatos","🍳 Önellátós főzés"]].map(([k,l]) => (
            <label key={k} style={{ display:"flex", alignItems:"center", gap:6, background:beall[k]?"#FFF7ED":"#F9FAFB", border:`1.5px solid ${beall[k]?"#FDBA74":COLORS.border}`, borderRadius:9, padding:"6px 11px", cursor:"pointer", fontSize:12, fontWeight:600, transition:"all .15s" }}>
              <input type="checkbox" checked={beall[k]} onChange={()=>setBeall(b=>({...b,[k]:!b[k]}))} style={{ accentColor:COLORS.primary, width:13, height:13 }} />
              {l}
            </label>
          ))}
        </div>
      </Kartya>

      <Kartya>
        <H>👨‍👩‍👧‍👦 Ki utazik?</H>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"flex-end" }}>
          {SZEMELYEI.map(sz => (
            <ToggleKartya key={sz.id} aktiv={beall.szemelyek.includes(sz.id)} onClick={()=>setBeall(b=>({...b,szemelyek:toggle(b.szemelyek,sz.id)}))} emoji={sz.emoji} nev={sz.nev} szin={sz.szin} />
          ))}
          <div style={{ marginLeft:4 }}>
            <L>+ Vendég (fő)</L>
            <I type="number" min={0} max={20} value={beall.vendeg} onChange={e=>setBeall(b=>({...b,vendeg:parseInt(e.target.value)||0}))} style={{ width:70, textAlign:"center" }} />
          </div>
        </div>
      </Kartya>

      <Kartya>
        <H>🚗 Utazási eszköz <span style={{ fontSize:11, color:COLORS.muted, fontWeight:500 }}>(több is bejelölhető)</span></H>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {UTAZASI_ESZKOZOK.map(e => (
            <ToggleKartya key={e.id} aktiv={beall.eszkozok.includes(e.id)} onClick={()=>setBeall(b=>({...b,eszkozok:toggle(b.eszkozok,e.id)}))} emoji={e.emoji} nev={e.nev} szin={e.szin} />
          ))}
        </div>
        {beall.eszkozok.includes("repulo") && (
          <p style={{ fontSize:11, color:"#9A3412", background:"#FFF7ED", border:"1px solid #FDBA74", borderRadius:8, padding:"6px 10px", marginTop:8 }}>
            ✈️ Repülő kiválasztva: a listákon figyelmeztetést kapsz a kézipoggyászban tiltott tárgyakról, és a poggyászméretet meghaladó nagy tételeket automatikusan elrejtjük.
          </p>
        )}
      </Kartya>

      <Kartya>
        <H>🗺️ Utazás típusa <span style={{ fontSize:11, color:COLORS.muted, fontWeight:500 }}>(több is bejelölhető)</span></H>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {UTAZAS_TIPUSOK.map(t => (
            <ToggleKartya key={t.id} aktiv={beall.tipusok.includes(t.id)} onClick={()=>setBeall(b=>({...b,tipusok:toggle(b.tipusok,t.id)}))} emoji={t.emoji} nev={t.nev} szin={t.szin} />
          ))}
        </div>
      </Kartya>

      <button onClick={onGeneral} disabled={beall.szemelyek.length===0} style={{
        width:"100%", background:beall.szemelyek.length===0?"#D1D5DB":"linear-gradient(135deg, #F97316, #EA580C)",
        color:"white", border:"none", borderRadius:14, padding:"16px 24px",
        fontSize:16, fontWeight:800, fontFamily:"Nunito,sans-serif",
        cursor:beall.szemelyek.length===0?"not-allowed":"pointer",
        boxShadow:beall.szemelyek.length===0?"none":"0 4px 16px rgba(249,115,22,.35)",
      }}>
        🚀 Csomaglista generálása!
      </button>
      {beall.szemelyek.length===0 && <p style={{ textAlign:"center", color:COLORS.muted, fontSize:12, marginTop:6 }}>Jelölj be legalább egy személyt</p>}
    </div>
  );
}

// ─── LISTÁK OLDAL ─────────────────────────────────────────────────────────────

function ListakOldal({ beall, onVissza }) {
  const [aktFul, setAktFul] = useState("szemelyek");
  const [checked, setChecked] = useState({});
  const onToggle = k => setChecked(c => ({...c,[k]:!c[k]}));
  const activeSzem = SZEMELYEI.filter(sz => beall.szemelyek.includes(sz.id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Inter:wght@400;500;600&display=swap');
        @media print {
          .no-print { display:none !important; }
          .print-break { page-break-before: always; }
          * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* Sáv */}
      <div className="no-print" style={{ background:"linear-gradient(135deg,#0F4C5C,#1A6B80)", padding:"10px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 8px rgba(0,0,0,.15)" }}>
        <button onClick={onVissza} style={{ background:"rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.3)", color:"white", borderRadius:9, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:600 }}>← Vissza</button>
        <span style={{ color:"white", fontWeight:800, fontFamily:"Nunito,sans-serif", fontSize:15 }}>🧳 {beall.nev||"Csomaglista"} — {beall.napok} nap</span>
        <button onClick={()=>window.print()} style={{ background:"linear-gradient(135deg,#F97316,#EA580C)", border:"none", color:"white", borderRadius:9, padding:"7px 16px", cursor:"pointer", fontSize:13, fontWeight:700, boxShadow:"0 2px 8px rgba(249,115,22,.4)" }}>🖨️ Nyomtatás</button>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"16px 14px 60px", fontFamily:"Inter,sans-serif" }}>
        {/* Fejléc */}
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <h1 style={{ fontFamily:"Nunito,sans-serif", fontSize:22, fontWeight:900, color:COLORS.dark, margin:"0 0 3px" }}>🧳 {beall.nev||"Csomaglista"}</h1>
          <p style={{ color:COLORS.muted, fontSize:12, margin:0 }}>
            {beall.napok} nap · {beall.idojaras==="meleg"?"☀️ Meleg":beall.idojaras==="hideg"?"❄️ Hideg":"🌤️ Vegyes"} · {beall.szallas==="apartman"?"🏠 Apartman":"🏨 Hotel"}{beall.eszkozok.length>0?` · ${beall.eszkozok.map(id=>UTAZASI_ESZKOZOK.find(e=>e.id===id)?.emoji).join(" ")}`:""} · {activeSzem.map(s=>s.nev).join(", ")}{beall.vendeg>0?` + ${beall.vendeg} vendég`:""}
          </p>
        </div>

        {/* Fülsáv */}
        <div className="no-print" style={{ background:COLORS.white, borderRadius:12, padding:10, marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,.06)", border:`1px solid ${COLORS.border}` }}>
          <Fulek aktiv={aktFul} setAktiv={setAktFul} beall={beall} />
        </div>

        {/* Tartalom */}
        {aktFul==="szemelyek" && beall.eszkozok.includes("repulo") && <LegiFigyelmezteto />}
        {aktFul==="szemelyek" && activeSzem.map(sz => <SzemelyCsomaglista key={sz.id} sz={sz} beall={beall} checked={checked} onToggle={onToggle} />)}
        {aktFul==="kutya"     && beall.vanKutya && <KutyakTab beall={beall} checked={checked} onToggle={onToggle} />}
        {aktFul==="speci"     && beall.tipusok.length>0 && <SpeiciTab beall={beall} checked={checked} onToggle={onToggle} />}
        {aktFul==="gyogyszer" && <GyogyszerTab checked={checked} onToggle={onToggle} />}
        {aktFul==="apartman"  && beall.szallas==="apartman" && <ApartmanTab beall={beall} checked={checked} onToggle={onToggle} />}
        {aktFul==="bevasarlas"&& beall.onellatos && <BevasarlasTab beall={beall} checked={checked} onToggle={onToggle} />}
        {aktFul==="intezni"   && <IntezniTab beall={beall} checked={checked} onToggle={onToggle} />}
      </div>
    </>
  );
}

// ─── FŐ APP ───────────────────────────────────────────────────────────────────

export default function App() {
  const [oldal, setOldal] = useState("beallitasok");
  const [beall, setBeall] = useState({
    nev:"", napok:7, idojaras:"meleg", szallas:"apartman", apartmanMod:"minimal",
    vanMosogep:true, vanTenger:false, vanKutya:true, onellatos:false,
    szemelyek:["szamoc","szaxy","annamari","beni"], vendeg:0, tipusok:[], eszkozok:[],
  });
  return (
    <div style={{ minHeight:"100vh", background:oldal==="beallitasok"?"linear-gradient(160deg,#FFF7ED,#F0FDFA)":"#F9FAFB", fontFamily:"Inter,sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Inter:wght@400;500;600&display=swap'); *{box-sizing:border-box}`}</style>
      {oldal==="beallitasok"
        ? <BeallitasokOldal beall={beall} setBeall={setBeall} onGeneral={()=>setOldal("lista")} />
        : <ListakOldal beall={beall} onVissza={()=>setOldal("beallitasok")} />
      }
    </div>
  );
}
