# Vefforritun 1 - Hópverkefni 2
Hópverkefni 2 í Vefforritun 1 gengur út á það að hanna vef þar sem notandi getur haldið utan um þær bækur sem hann hefur lesið. Hægt er að bæta við bók, gefa þeim einkunn, skrifa umsögn, skoða lista yfir bækur og raða bókum eftir titil, höfundi og einkunn. 

## Útfærsla 
Verkefnið var unnið sem einstaklingsverkefni svo ásamt grunnvirkni voru útfærð tvö aukaverkefni.

### Frekari gögn fyrir bók
- Hér var útfærð einkunnagjöf frá 0-5, með möguleika á að gefa einkunn í hálfum tölum. Þetta var einnig útfært á sjónrænan hátt með stjörnum með JS og CSS.  

- Einnig var bætt við möguleika á að gefa bók umsögn. 

### Röðun á efni 
- Hér var útfært dropdown takki á yfirlitssíðunni (Bókasafnið mitt) þar sem hægt er að velja að raða bókum eftir titil, höfundi eða einkunn. Þar sem hægt er að gefa bók 0 stjörnur í einkunn þá koma bækurnar sem hafa ekki fengið einkunn fyrir aftan bækurnar sem fengu 0. 

## Keyrsla á verkefninu 
Til þess að keyra verkefnið þarf að hafa Node.js og npm uppsett. 

Keyra skal verkefnið með eftirfarandi skipunum í terminal: 

```bash
npm install 
npm run dev 
```

Einnig: 
```bash
npm run build 
npm run preview 
npm run lint 
```

## Uppsetning
Verkefnið var unnið í HTML, JavaScript og CSS, ekki var notað Sass í þessu verkefni. 

### Möppur
```text
Hópverkefni 2/
├── myndir/
│   ├── baetaBok.svg
│   ├── bokasafn.svg
│   ├── bokavefurinn.svg
│   ├── bookCoverPlaceholder.svg
│   └── bygging.svg
├── src/
│   ├── lib/
│   │   ├── baekur.js
│   │   ├── baetaBok.js
│   │   ├── elements.js
│   │   └── ui.js
│   ├── main.js
│   └── style.css
├── .gitignore
├── .stylelintrc.mjs
├── eslint.config.mjs
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## Hópmeðlimir 
| Nafn | Netfang | GitHub |
|---|---|---|
| Elísabet Jónsdóttir | elj50@hi.is |elisabetjons|


