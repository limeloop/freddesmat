/**
 * Cateringmenyn – hämtad ur Freddes Mats cateringmeny 2021 och julmeny 2025 (PDF).
 * Ändra rätter och priser direkt här. Kategorierna visas i samma ordning på /catering.
 */

export type MenuItem = {
  name: string
  desc?: string
  /** Pris i kronor, eller text som ”Ring för dagspris”. */
  price?: number | string
  /** Visar ”Totalt” framför priset. */
  total?: boolean
  veg?: boolean
}

export type MenuGroup = {
  title?: string
  note?: string
  items: MenuItem[]
}

export type Buffet = {
  name: string
  price: number
  items: string[]
  addon?: { text: string; price: number }
  /** Mörkt kort för att bryta av rytmen. */
  featured?: boolean
}

export type MenuSection = {
  id: string
  title: string
  intro: string
  /** Ersätter kategorinumret, t.ex. ”Julmeny 2025”. */
  label?: string
  buffets?: Buffet[]
  groups?: MenuGroup[]
  dressings?: string[]
  footnote?: string
}

export const cateringMenu = [
  {
    "id": "buffeer",
    "title": "Bufféer",
    "intro": "Är det något vi arbetar hårt med på Freddes Mat så är det våra bufféer, som är väldigt populära både till vardag och fest. Allt är noga smaksatt och upplagt så att både ögon och mage blir nöjda. Maten kommer färdig – det är bara att ställa fram och njuta!",
    "buffets": [
      {
        "name": "Lilla skärgårdsbuffén",
        "price": 195,
        "items": [
          "Kall inkokt lax med romsås och finskuren gräslök",
          "Potatis- och fänkålssallad med yoghurt",
          "Färskostcrème med citron och dill",
          "Surdegsbröd av råg"
        ]
      },
      {
        "name": "Gröna buffén",
        "price": 195,
        "items": [
          "Quinoa med skurna primörer, granatäpple och mango",
          "Ugnsbakade tomater med basilikaolja",
          "Rostad aubergine med citron och rapsolja",
          "Syrad tomatsallad med lök",
          "Kryddig coleslaw med lime och koriander",
          "Rostade rotsaker",
          "Levainbröd med flingsaltat smör"
        ],
        "addon": {
          "text": "Lägg till en varm vegetarisk lasagne med färsk spenat och fetaost",
          "price": 75
        }
      },
      {
        "name": "Amerikanska buffén",
        "price": 245,
        "items": [
          "Pulled pork (varm)",
          "Ugnsbakad, BBQ-glacerad kycklingfilé (varm)",
          "Pastasallad Caesar med krutonger",
          "Coleslaw med fänkål, morot och äpple",
          "Bönsallad",
          "Salsa med mango",
          "Majschips och tortillabröd"
        ]
      },
      {
        "name": "Stora skärgårdsbuffén",
        "price": 275,
        "items": [
          "Matjessill med gräddfil, ägg, gräs- och rödlök",
          "Stekt inlagd strömming",
          "Rustik sallad med varmrökt lax, senaps- och pepparrotsdressing",
          "Ägghalva med rommajonnäs",
          "Dillkokt potatis (varm)",
          "Syrade tomater och rödlök",
          "Västerbottenost",
          "Spisbröd och vispat smör"
        ],
        "featured": true
      },
      {
        "name": "Norrlandsbuffén",
        "price": 295,
        "items": [
          "Tunnbrödrulle med rökt laxmousse",
          "Rökt sik med örtcrème",
          "Ägghalvor med stenbitsrom",
          "Västerbottenpaj med kantareller",
          "Potatissallad med mandelpotatis och färska örter",
          "Rökt renstek med lingon",
          "Tjälknöl med egeninlagd gurka",
          "Tunnbröd och vispat smör",
          "Hjortronpannacotta"
        ],
        "addon": {
          "text": "Lägg till en varm rotsaksgratäng",
          "price": 55
        }
      },
      {
        "name": "Italienska buffén",
        "price": 295,
        "items": [
          "Pestobakad kyckling (varm)",
          "Pastasallad med vitlök, oliver och crème fraiche",
          "Tomatsallad med mozzarella",
          "Grillad, marinerad zucchini",
          "Stekt potatis med svartpeppar & vitlök (varm)",
          "Melon och lufttorkad skinka på en bädd av ruccola",
          "Focaccia & vispat vitlökssmör"
        ],
        "addon": {
          "text": "Lägg till en ostbricka med cambozola, gorgonzola, vindruvor, päron och saltade kex",
          "price": 95
        }
      },
      {
        "name": "Medelhavsmenyn",
        "price": 315,
        "items": [
          "Örtmarinerad kycklinginnerfilé med riven parmesan",
          "Vitlöksdressing",
          "Sallad av tre olika sorters melon med fetaost och vinägrett",
          "Potatisgratäng med soltorkade tomater, fetaost och grillad paprika (varm)",
          "Tzatziki",
          "Lammfärsspett med färsk timjan (varm)",
          "Lufttorkad skinka"
        ]
      },
      {
        "name": "Orientaliska buffén",
        "price": 275,
        "items": [
          "Glasnudlar med wokade grönsaker",
          "Teriyakikyckling på spett (varm)",
          "Strimlad biff i kokosmjölk, grön curry och bambuskott (varm)",
          "Räkor i sweetchili och riven ingefära",
          "Grönsallad med granatäpple",
          "Naanbröd och vispat smör"
        ]
      },
      {
        "name": "Svenska tacobuffén",
        "price": 155,
        "items": [
          "Isbergssallad, gurka, tomat, paprika, lök och majs",
          "Jalapeños och salsa",
          "Majschips och mjuka tortillabröd",
          "Crème fraîche, riven ost och guacamole",
          "Kryddad nötköttfärs"
        ],
        "featured": true
      }
    ]
  },
  {
    "id": "forratter",
    "title": "Förrätter",
    "intro": "En förrätt ska vara en liten aptitretare – en smakstart på vad som komma skall. Vissa av våra förrätter levereras i en mindre glas- eller porslinsform som du kan behålla om du vill, till en kostnad av 20 kr/st.",
    "groups": [
      {
        "items": [
          {
            "name": "Skagentoast",
            "desc": "Toppas med rom, citron och färsk dill",
            "price": 85
          },
          {
            "name": "Rensteksröra",
            "desc": "Med pepparrotscrème i tortillabröd",
            "price": 95
          },
          {
            "name": "SOS",
            "desc": "(Smör, ost och sill) Inlagd sill, senapssill, gubbröra, lagrad Västerbottenost, tunnbröd och kokt potatis",
            "price": 125
          },
          {
            "name": "Liten landgång",
            "desc": "Med gravlax, senapssås, ägghalva med majonnäs och räka, rostbiff och salami",
            "price": 90
          },
          {
            "name": "Gazpacho",
            "desc": "Kall tomatsoppa med räkor och crème fraîche",
            "price": 90
          },
          {
            "name": "Grillad grön sparris",
            "desc": "Med rostade pinjenötter och krossad chèvre",
            "price": 85
          },
          {
            "name": "Asiatiska räkor",
            "desc": "Papaya, äpple, gurka och rödlök i glas med sweetchilivinägrett",
            "price": 90
          },
          {
            "name": "Skaldjurssallad",
            "desc": "Med wasabimajonnäs",
            "price": 90
          }
        ]
      }
    ]
  },
  {
    "id": "varmratter",
    "title": "Varmrätter",
    "intro": "Huvudpersonen i en meny. Den ska vara smakrik och ha en bra balans mellan sina komponenter. Vid köp av endast varmrätt ingår en nygräddad minibaguette och smör.",
    "groups": [
      {
        "title": "Fiskrätter",
        "items": [
          {
            "name": "Stekt strömmingsflundra",
            "desc": "Med rårörda lingon, skirat dillsmör och potatismos",
            "price": 110
          },
          {
            "name": "Panerad rödspätta",
            "desc": "Med skagenröra och kokt potatis",
            "price": 120
          },
          {
            "name": "Laxpudding",
            "desc": "Med dill, citron och skirat smör",
            "price": 125
          },
          {
            "name": "Kall inkokt lax",
            "desc": "Med skagenröra och kokt potatis",
            "price": 155
          },
          {
            "name": "Fisk- och skaldjursgryta",
            "desc": "Med saffran, lax, torsk, räkor, lök, morötter, fänkål och kokt potatis",
            "price": 165
          },
          {
            "name": "Tandoorikryddad lax",
            "desc": "Med kokt potatis, gräslök- och citronmajonnäs",
            "price": 155
          }
        ]
      },
      {
        "title": "Fågelrätter",
        "items": [
          {
            "name": "Kyckling",
            "desc": "Med currysås och ris",
            "price": 110
          },
          {
            "name": "Caesarsallad",
            "desc": "Med sotat kycklingbröst och vitlöksbröd",
            "price": 140
          },
          {
            "name": "Baconrullat, mozzarellafyllt kycklingbröst",
            "desc": "Med sweetchilisås och ris",
            "price": 140
          },
          {
            "name": "Smörstekt majskyckling",
            "desc": "Med timjankryddad rödvinssky och rotsakspuré",
            "price": 145
          },
          {
            "name": "Pulled chicken",
            "desc": "Med paprika, rödlök, crème fraîche, tortillabröd och sallad",
            "price": 145
          },
          {
            "name": "Wokad kyckling",
            "desc": "Med jasminris",
            "price": 145
          }
        ]
      },
      {
        "title": "Kötträtter",
        "items": [
          {
            "name": "Wallenbergare",
            "desc": "Med gröna ärtor, skirat smör, rårörda lingon och potatismos",
            "price": 155
          },
          {
            "name": "Helstekt fläskfilé",
            "desc": "Med ädelostsås och timjanstekt potatis",
            "price": 135
          },
          {
            "name": "Kotlettrad",
            "desc": "Med kantarellsås, kokta grönsaker och kokt potatis",
            "price": 130
          },
          {
            "name": "Viltskavsgryta",
            "desc": "Med svamp, grädde och potatismos",
            "price": 135
          },
          {
            "name": "Örtmarinerad fläskfilé",
            "desc": "På en bädd av kantareller med pepparsås och potatisgratäng",
            "price": 140
          },
          {
            "name": "Tjälknöl",
            "desc": "Med viltsås, svartvinbärsgelé och potatisgratäng",
            "price": 145
          },
          {
            "name": "Långsambakad rostbiff",
            "desc": "Med cognacssås och purjolökspotatis",
            "price": 155
          },
          {
            "name": "Ryggbiff",
            "desc": "Med bearnaisesås och stekt klyftpotatis",
            "price": 165
          },
          {
            "name": "Svensk biffstek",
            "desc": "Med lök och stekt potatis",
            "price": 170
          },
          {
            "name": "Tre musketörer",
            "desc": "(Fläsk, biff och oxfilé) med kantarellsås, pepparsås och bearnaisesås",
            "price": 195
          },
          {
            "name": "Helstekt oxfilé",
            "desc": "Med wokade grönsaker, rödvinssås och rotsaksgratäng",
            "price": "Ring för dagspris"
          }
        ]
      }
    ]
  },
  {
    "id": "grillratter",
    "title": "Grillrätter",
    "intro": "Grillrätter kan man njuta av året om. Välj om vi grillar färdigt eller om ni själva grillar klart kött, fisk eller det vegetariska. Priset gäller färdiggrillat – väljer ni att grilla själva får ni 15 % rabatt.",
    "groups": [
      {
        "items": [
          {
            "name": "Grillad majskyckling",
            "desc": "Med avokadoröra och krämig pastasallad som toppas med vitlökskrutonger",
            "price": 175
          },
          {
            "name": "Salsiccia-/chorizospett",
            "desc": "Med ajvar relish, surkål med bacon och timjan, picklad rödlök, potatissallad smaksatt med syrad grädde, dijonsenap och skurna primörer",
            "price": 185
          },
          {
            "name": "Helgrillad fläskfilé",
            "desc": "Med ramslökscrème, rostad potatissallad med balsamico, brynt smör, ruccola och rödlök",
            "price": 175
          },
          {
            "name": "Grillad karré",
            "desc": "Med chimichurricrème, grovskuren melonsallad med fetaost och färsk mynta. Serveras med smörstekt kulpotatis",
            "price": 185
          },
          {
            "name": "Grillade laxspett",
            "desc": "Med parmesancrème, grillad citron och ljummen potatissallad med legymer och färska örter",
            "price": 185
          },
          {
            "name": "Grillad zucchini",
            "veg": true,
            "desc": "Fylld med svamp- och örtstuvning på en bädd av wokade grönsaker och timjanstekt potatis",
            "price": 145
          }
        ]
      }
    ]
  },
  {
    "id": "husmanskost",
    "title": "Husmanskost",
    "intro": "Klassisk husmanskost är något vi aldrig tröttnar på. Här är ett urval av våra populäraste rätter som funkar både till fest och vardag. Sallad på säsongens grönsaker, smör och bröd ingår.",
    "groups": [
      {
        "items": [
          {
            "name": "Stekt strömmingsflundra",
            "desc": "Med potatismos",
            "price": 110
          },
          {
            "name": "Biffsautéstroganoff",
            "desc": "Med ris och saltgurka",
            "price": 145
          },
          {
            "name": "Ärtsoppa",
            "desc": "Med rimmat fläsk och senap, pannkakor med sylt och grädde",
            "price": 110
          },
          {
            "name": "Köttbullar",
            "desc": "Med gräddsås, rårörda lingon och potatismos",
            "price": 130
          },
          {
            "name": "Kokt rimmat fläsklägg",
            "desc": "Med rotmos och senap",
            "price": 110
          },
          {
            "name": "Oxjärpar",
            "desc": "Med gräddsås, pressgurka och potatismos",
            "price": 120
          },
          {
            "name": "Pannbiffar",
            "desc": "Med löksky, saltgurka och kokt potatis",
            "price": 110
          },
          {
            "name": "Kyckling",
            "desc": "Med currysås och ris",
            "price": 130
          },
          {
            "name": "Pytt i panna",
            "desc": "Eller gräddstuvad pytt med ägg och rödbetor",
            "price": 115
          },
          {
            "name": "Fiskgratäng",
            "desc": "Med färsk sparris, tomat, gräslök och kokt potatis",
            "price": 130
          },
          {
            "name": "Biff Lindström",
            "desc": "Med kryddsmör, haricots verts och stekt potatis",
            "price": 120
          },
          {
            "name": "Kall inkokt lax",
            "desc": "Med dillmajonnäs, pressgurka och kokt potatis",
            "price": 155
          },
          {
            "name": "Honungsglacerad fläskkarré",
            "desc": "Med varma grönsaker, äppelmos, sås och kokt potatis",
            "price": 120
          },
          {
            "name": "Porterstek",
            "desc": "Med gräddsås, varma primörer, gelé och kokt potatis",
            "price": 155
          },
          {
            "name": "Lasagne al forno",
            "desc": "Med riven parmesanost",
            "price": 120
          },
          {
            "name": "Stekt rödspätta",
            "desc": "Med skagenröra och kokt potatis",
            "price": 135
          },
          {
            "name": "Laxpudding",
            "desc": "Med skirat smör",
            "price": 120
          },
          {
            "name": "Halstrad gravlax",
            "desc": "Med citron och dillstuvad potatis",
            "price": 155
          },
          {
            "name": "Isterband",
            "desc": "Med rödbetor och dillstuvad potatis",
            "price": 135
          }
        ]
      }
    ]
  },
  {
    "id": "sallader",
    "title": "Quicher & sallader",
    "intro": "Som lättare middag, lunch eller kanske till en picknick? Till varje quiche ingår sallad, smör och bröd. Salladerna kan portionsförpackas eller läggas upp i större skålar så att alla kan ta själva – och till dem ingår alltid smör och bröd.",
    "dressings": [
      "Rhode Island",
      "Vitlök",
      "Vinägrett",
      "Tzatziki",
      "Pepparrotscrème",
      "Mangosalsa",
      "Blue cheese"
    ],
    "groups": [
      {
        "title": "Quicher",
        "items": [
          {
            "name": "Festostquiche",
            "veg": true,
            "desc": "Med spenat, ruccola, oliver och oregano"
          },
          {
            "name": "Norrländsk quiche",
            "desc": "Med rökt renkött, svamp, lingon och svecia"
          },
          {
            "name": "Quiche Lorraine",
            "desc": "Med rökt skinka, purjolök och lagrad ost"
          },
          {
            "name": "Quiche med kronärtskockshjärtan",
            "veg": true,
            "desc": "Ruccola, oliver och mozzarella"
          },
          {
            "name": "Quiche med kyckling",
            "desc": "Curry och rostade grönsaker"
          },
          {
            "name": "Skärgårdsquiche",
            "desc": "Med lax, spenat och dill"
          },
          {
            "name": "Quiche med tacokryddad köttfärs",
            "desc": "Morötter, lök och cheddarost"
          }
        ],
        "note": "varje quiche räcker till 4 personer, 75 kr per portion"
      },
      {
        "title": "Sallader",
        "items": [
          {
            "name": "Blandsallad",
            "desc": "Med sotat kycklingbröst, körsbärstomater och färsk basilika",
            "price": 85
          },
          {
            "name": "Veggiesallad",
            "veg": true,
            "desc": "Med bakade rotsaker, granatäpple, rostad mandel, sultanrussin, grillad aubergine och harissacrème",
            "price": 85
          },
          {
            "name": "Grekisk sallad",
            "desc": "Med fetaost, tomat, rödlök, paprika, gurka och oregano",
            "price": 85
          },
          {
            "name": "Blandsallad",
            "desc": "Med rökt skinka, ost, granatäpple, rödlök, tomat och gurka",
            "price": 95
          },
          {
            "name": "Caesarsallad",
            "desc": "Med kyckling, avokado, champinjoner, parmesan och krutonger",
            "price": 120
          },
          {
            "name": "Rustiksallad",
            "desc": "Med varmrökt lax, rostade grönsaker och linser",
            "price": 120
          },
          {
            "name": "Blandsallad",
            "desc": "Med handskalade räkor, ägg, krasse, körsbärstomat och bulgur",
            "price": 120
          }
        ]
      }
    ]
  },
  {
    "id": "vegetariskt",
    "title": "Vegetariskt",
    "intro": "Här har vi komponerat ihop ett flertal vegetariska rätter. Vi kallar det ”Hälsans kök”. Smaklig måltid!",
    "groups": [
      {
        "title": "Förrätter",
        "items": [
          {
            "name": "Gazpacho",
            "desc": "Med örtkrutonger",
            "price": 80
          },
          {
            "name": "Rostad paprikasoppa",
            "desc": "Med lättsaltade kex",
            "price": 80
          },
          {
            "name": "Liten grekisk sallad",
            "desc": "Med vitlöksbröd",
            "price": 75
          }
        ]
      },
      {
        "title": "Varmrätter",
        "items": [
          {
            "name": "Caesarsallad",
            "desc": "Med vitlöksbröd",
            "price": 125
          },
          {
            "name": "Sojakorvar",
            "desc": "Med stekt potatis, bostongurka och rostad lök",
            "price": 145
          },
          {
            "name": "Couscouspytt",
            "desc": "Med rödbetor",
            "price": 130
          },
          {
            "name": "Smörstekt falafel",
            "desc": "Med timjankryddad rödvinssky och rotsakspuré",
            "price": 145
          },
          {
            "name": "Grönsakspytt",
            "desc": "Med rödbetor",
            "price": 130
          },
          {
            "name": "Fylld paprika",
            "desc": "Med rödlök, ostcrème och ris",
            "price": 145
          },
          {
            "name": "Selleristicks",
            "desc": "Med kantarellsås och kokt potatis",
            "price": 135
          },
          {
            "name": "Bräckt quornfilé",
            "desc": "Med potatissallad och rostad lök",
            "price": 145
          },
          {
            "name": "Grönsaksbiffar",
            "desc": "Med myntasås och ris",
            "price": 135
          },
          {
            "name": "Rödbetsbiffar",
            "desc": "Med jerusalemgratäng",
            "price": 150
          },
          {
            "name": "Pasta",
            "desc": "Med quornfärssås",
            "price": 140
          },
          {
            "name": "Medelhavsinspirerad lasagne",
            "desc": "Med fetaost och färsk spenat",
            "price": 160
          },
          {
            "name": "Mozzarellafylld quornfilé",
            "desc": "Med sweetchilisås och ris",
            "price": 140
          }
        ]
      }
    ]
  },
  {
    "id": "desserter",
    "title": "Desserter",
    "intro": "Avsluta en fantastisk varmrätt med en liten dessert. Vissa desserter levereras i en mindre glas- eller porslinsform som du kan behålla om du vill, till en kostnad av 20 kr/st.",
    "groups": [
      {
        "items": [
          {
            "name": "Chokladtårta",
            "desc": "Med rårörda bär och vispad grädde",
            "price": 70
          },
          {
            "name": "Rabarberpaj",
            "desc": "Med vaniljsås",
            "price": 65
          },
          {
            "name": "Hjortronpannacotta",
            "desc": "Med lättvispad grädde",
            "price": 75
          },
          {
            "name": "Crème brûlée",
            "price": 85
          },
          {
            "name": "Äppelpaj",
            "desc": "Med vaniljsås",
            "price": 65
          },
          {
            "name": "Söta bär",
            "desc": "I citronkräm",
            "price": 80
          },
          {
            "name": "Bärpaj",
            "desc": "Med vaniljsås",
            "price": 65
          }
        ]
      }
    ]
  },
  {
    "id": "jul",
    "title": "Jul",
    "intro": "Tänk vad skönt att slippa allt stök med julmat! Duka fram, ät och njut med nära och kära – och låt oss fixa maten. Vi levererar julmat från och med vecka 46 ända fram till dagen innan julafton, den 23 december. Minsta antal: julbuffé 6 st, julbord 8 st.",
    "label": "Julmeny 2025",
    "groups": [
      {
        "items": [
          {
            "name": "Freddes klassiska jultallrik m småvarmt",
            "desc": "Inlagd sill, rödlök, senapssill, inlagd strömming, gravad lax m hovmästarsås, citron och färsk dill, potatissallad, ost, ägghalva m majonnäs och räka, oliver, saltgurka, kalvsylta, rödbetssallad, rostbiff, leverpastej, julskinka m senap, bladpersilja, kokt potatis, revbensspjäll, prinskorv, köttbullar och Janssons frestelse",
            "price": 215
          },
          {
            "name": "+ Desserttallrik",
            "desc": "Ostkaka med sylt & grädde, pepparkaka med ädelost och marmelad, godis – skumtomte, polkakäpp och twistblandning",
            "price": 295,
            "total": true
          },
          {
            "name": "Julbuffé",
            "desc": "Inlagd sill, rödlök, senapssill, inlagd strömming, gravad lax m hovmästarsås, citron, färsk dill, potatissallad, ost, ägghalva m majonnäs och räka, oliver, saltgurka, kalvsylta, rödbetssallad, rostbiff, leverpastej, julskinka, senap, bladpersilja, kokt potatis, revbensspjäll, prinskorv, köttbullar och Janssons frestelse",
            "price": 349,
            "total": true
          },
          {
            "name": "Julbord",
            "desc": "Inlagd sill, rödlök, senapssill, årets sill, inlagd strömming, gravad lax m hovmästarsås, citron, färsk dill, varmrökt lax, inkokt lax, potatissallad, ost, ägghalva m majonnäs och räka, saltgurka, kalvsylta, rödbetssallad, rostbiff, leverpastej, julskinka, senap, oliver, bladpersilja, kokt potatis, revbensspjäll, prinskorv, köttbullar, rödkål, Janssons frestelse, ris à la Malta, ostkaka med sylt, pepparkaka och godis",
            "price": 595,
            "total": true
          },
          {
            "name": "Jultallrik kall",
            "desc": "Inlagd sill, rödlök, senapssill, inlagd strömming, gravad lax m hovmästarsås, citron och färsk dill, potatissallad, ost, ägghalva m majonnäs och räka, oliver, saltgurka, kalvsylta, rödbetssallad, rostbiff, leverpastej, julskinka m senap och bladpersilja",
            "price": 165
          },
          {
            "name": "Jultallrik",
            "desc": "Som jultallrik kall, med kokt potatis",
            "price": 180
          },
          {
            "name": "Jullandgång",
            "desc": "Ägghalva m majonnäs och räka, leverpastej m saltgurka, julskinka m senap, kalvsylta m rödbetssallad, gravlax m hovmästarsås, inlagd sill och köttbulle på spett",
            "price": 125
          },
          {
            "name": "Julgröt",
            "desc": "Risgrynsgröt med mjölk, kanel och socker",
            "price": 100
          },
          {
            "name": "Julfika",
            "desc": "Kaffe/glögg, lussebulle och pepparkaka",
            "price": 60
          },
          {
            "name": "Julsmörgås liten",
            "desc": "En skiva vörtlimpa med julskinka och senap",
            "price": 20
          },
          {
            "name": "Julsmörgås stor",
            "desc": "Thekaka med sallad, julskinka och senap – eller med sallad, rödbetssallad och köttbullar",
            "price": 60
          },
          {
            "name": "Att dricka & köpa till",
            "desc": "Julmust, jullättöl, Loka eller övrig läsk 25:- · Julservett 5:-",
            "price": 25
          }
        ]
      }
    ],
    "footnote": "Till alla jultallrikar, julbuffén och julbordet ingår julknäckebröd, vörtlimpa och smör."
  }
] satisfies MenuSection[]
