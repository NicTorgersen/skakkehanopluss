# Ska'ru'kke ha no' pluss, du'a?

Hvis du er helt sikker på det...

## Sånn bygges prosjektet
### Noen forutsetninger
Du må ha følgende programvare for å bruke verktøyene:
- `node` og `npm`.

```cmd
$ echo "Jeg har disse versjonene"
Jeg har disse versjonene
$ node -v
v6.10.0
$ npm -v
3.10.6
```
- [Filen .editorconfig brukes for å holde kodestilen lik mellom utviklere (Ekstern lenke).](http://editorconfig.org/)
- Jeg pleier ikke å bruke semikolon i Javascript (det trengs bare i for-loops og i noen andre sammenhenger 🤡)

### Steg
1. `npm i`
2. `npm run build`
3. Output er i mappene `/build` og `/debug`
4. Er'u keen, så kan du bytte filstier i `gulpfile.js`

#### Debugging i Chrome (v 62.0.3202.94)
> Fordi jeg er pleb har jeg norsk versjon... Regner med at alt er direkte oversatt fra engelsk

1. `npm run watch` sånn at du ikke trenger å gjøre `npm run build` hver gang du gjør no' småtteri.
2. `Åpne Chrome->Flere verktøy->Utvidelser->Last inn upakket utvidelse`
3. Velg så `/debug/chrome` som nå bør finnes i rotmappen av prosjektet
4. Besøk en av sidene definert i `/src/manifest.json`

#### Debugging i Firefox (v 57.0)
> Jeg er såpass pleb at jeg har Firefox på norsk også...

1. `npm run watch`
2. `Åpne Firefox->Utvidelser->Tannhjulet øverst i høyre->Debug-utvidelser->Load Temporary Add-on` [mer info](https://developer.mozilla.org/en-US/docs/Tools/about%3Adebugging#Enabling_add-on_debugging)
3. Velg så `/debug/firefox` som nå bør finnes i rotmappen av prosjektet
4. Besøk en av sidene definert i `/src/manifest.json`

##### Hvis du er helt kake
1. Ta og lag to mapper (en for firefox og en for chrome), døtt koden i `src/chrome` og `src/firefox` i sin respektive mappe
2. Så er'e egentlig bare å putte `src/common` i hver av de
3. Også må du ha `src/libs` der... Enn så lenge så livnærer jeg meg på jQuery, men dette kan skrives om til rein Javascript for å veie litt mindre
4. Så må du ha `manifest.json` i roten av begge
