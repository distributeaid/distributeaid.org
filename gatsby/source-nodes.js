const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

module.exports = {
  /*
  Needs Assessment Data
  ================================================================================
  */
  sourceNeedsAssessmentData: async ({
    actions: { createNode },
    createContentDigest,
    reporter,
    createNodeId,
  }) => {
    const survey = {
      id: '01G4X7XTMCD6MFHDT5KS7Z27GF',
      year: '2022',
      quarter: 'q3',
      region: 'southernGreece',
    }
    const url = `https://storage.needs-assessment.distributeaid.dev/form/${survey.id}/summary?basicInfo.region=${survey.region}&timeOfYear.quarter=${survey.quarter}`
    const result = await fetch(url)
    if (result.status !== 200) {
      reporter.panic(
        `Build failed`,
        new Error(`Could not source needs assessment data: ${url}`),
      )
    }
    const resultData = await result.json()

    createNode({
      // Node Data
      survey: {
        ...survey,
        responseCount: resultData.stats.count,
      },
      results: {
        ...resultData.summary,
      },

      // Gatsby Fields
      id: createNodeId(
        `DA Needs Assessment Summary - ${survey.id} ${survey.year} ${survey.quarter} ${survey.region}`,
      ),
      parent: null,
      children: [],
      internal: {
        type: `DANeedsAssessmentSummary`,
        contentDigest: createContentDigest(resultData),
      },
    })
  },
}

const categoryMap = {
  hygieneItems: { category: 'Hygiene' },
  shelter: { catgory: 'Shelter' },
  education: { category: 'Education' },
  foodItems: { category: 'Food' },
  womensClothing: { category: 'Clothing', ageGender: 'Woman' },
  mensClothing: { category: 'Clothing', ageGender: 'Man' },
  girlsClothing: { category: 'Clothing', ageGender: 'Girl' },
  boysClothing: { category: 'Clothing', ageGender: 'Boy' },
  babyClothing: { category: 'Clothing', ageGender: 'Baby' },
}

const itemMap = {
  // hygieneItems
  clothMasks: { item: 'Mask', sizeStyle: 'Cloth' },
  surgicalMasks: { item: 'Mask', sizeStyle: 'Surgical' },
  n95Ffp2Masks: { item: 'Mask', sizeStyle: 'N95 / FFP2' },
  barSoap: { item: 'Soap', sizeStyle: 'Bar' },
  liquidSoap: { item: 'Soap', sizeStyle: 'Liquid' },
  shampoo: { item: 'Shampoo' },
  toothbrushes: { item: 'Toothbrush' },
  toothpaste: { item: 'Toothpaste' },
  sanitaryPadsReusable: { item: 'Sanitary Pad', sizeStyle: 'Reusable' },
  sanitaryPadsDisposable: { item: 'Sanitary Pad', sizeStyle: 'Disposable' },
  deodorant: { item: 'Deodorant' },
  disposableRazors: { item: 'Razor', sizeStyle: 'Disposable' },
  shavingFoam: { item: 'Shaving Foam' },
  condoms: { item: 'Condom' },
  diapersSize0: { category: 'Baby', item: 'Diaper', sizeStyle: 'Size 0' },
  diapersSize1: { category: 'Baby', item: 'Diaper', sizeStyle: 'Size 1' },
  diapersSize2: { category: 'Baby', item: 'Diaper', sizeStyle: 'Size 2' },
  diapersSize3: { category: 'Baby', item: 'Diaper', sizeStyle: 'Size 3' },
  diapersSize4: { category: 'Baby', item: 'Diaper', sizeStyle: 'Size 4' },
  diapersSize5: { category: 'Baby', item: 'Diaper', sizeStyle: 'Size 5' },
  diapersSize6: { category: 'Baby', item: 'Diaper', sizeStyle: 'Size 6' },
  adultDiapers: { item: 'Diaper', ageGender: 'Adult' },
  washingDetergent: { item: 'Washing Detergent' },
  bleach: { item: 'Bleach' },
  wetwipes: { item: 'Wet Wipe', sizeStyle: 'Pack' },

  // shelter
  tents: { item: 'Tent' },
  tarps: { item: 'Tarp' },
  sleepingBags: { item: 'Sleeping Bag' },
  blankets: { item: 'Blanket' },
  backpacks: { item: 'Backpack' },
  suitcases: { item: 'Suitcase' },

  // education
  notepads: { item: 'Notepad' },
  pens: { item: 'Pen' },
  pencils: { item: 'Pencil' },
  pencilSharpeners: { item: 'Pencil Sharpener' },
  erasers: { item: 'Eraser' },
  printerPaper: { item: 'Printer Paper', sizeStyle: 'Pack', unit: '500 Count' },

  // foodItems
  rice: { item: 'Rice' },
  potatoes: { item: 'Potato' },
  onions: { item: 'Onion' },
  garlic: { item: 'Garlic' },
  flour: { item: 'Flour' },
  salt: { item: 'Salt' },
  sugar: { item: 'Sugar' },
  oil: { item: 'Oil' },
  milk: { item: 'Milk' },
  cannedTomatoes: { item: 'Tomato', sizeStyle: 'Canned' },
  cannedBeans: { item: 'Beans', sizeStyle: 'Canned' },
  cannedFish: { item: 'Fish', sizeStyle: 'Canned' },
  sweetcorn: { item: 'Sweetcorn', sizeStyle: 'Canned' },
  tea: { item: 'Tea' },
  coffee: { item: 'Coffee' },

  // womensClothing
  // NOTE: `ageGender` property already set by category conversion
  womensJackets: { item: 'Jacket' },
  womensJumpers: { item: 'Jumper' },
  womensTShirts: { item: 'T-Shirt' }, // "Top"? "Short Sleeve Top"?
  womensLongSlevedTops: { item: 'Long Sleeve Top' },
  womensShorts: { item: 'Shorts' },
  womensTrousers: { item: 'Trousers' },
  womensPantsUnderwear: { item: 'Underwear' },
  womensSocks: { item: 'Socks' },
  womensShoes: { item: 'Shoes' },
  womensHats: { item: 'Hat' },
  womensScarves: { item: 'Scarf' },
  womensGloves: { item: 'Gloves' },
  womensDresses: { item: 'Dress' },
  womensLeggings: { item: 'Leggings' },
  womensBras: { item: 'Bra' },
  womensHijabs: { item: 'Hijab' },
  womensAbayas: { item: 'Abaya' },

  // mensClothing
  // NOTE: `ageGender` property already set by category conversion
  mensJackets: { item: 'Jacket' },
  mensJumpers: { item: 'Jumper' },
  mensTShirts: { item: 'T-Shirt' }, // "Top"? "Short Sleeve Top"?
  mensLongSlevedTops: { item: 'Long Sleeve Top' },
  mensShorts: { item: 'Shorts' },
  mensTrousers: { item: 'Trousers' },
  mensPantsUnderwear: { item: 'Underwear' },
  mensSocks: { item: 'Socks' },
  mensShoes: { item: 'Shoes' },
  mensHats: { item: 'Hat' },
  mensScarves: { item: 'Scarf' },
  mensGloves: { item: 'Gloves' },

  // girlsClothing
  // NOTE: `ageGender` property already set by category conversion
  girlsJackets: { item: 'Jacket' },
  girlsJumpers: { item: 'Jumper' },
  girlsTShirts: { item: 'T-Shirt' }, // "Top"? "Short Sleeve Top"?
  girlsLongSlevedTops: { item: 'Long Sleeve Top' },
  girlsShorts: { item: 'Shorts' },
  girlsTrousers: { item: 'Trousers' },
  girlsPantsUnderwear: { item: 'Underwear' },
  girlsSocks: { item: 'Socks' },
  girlsShoes: { item: 'Shoes' },
  girlsHats: { item: 'Hat' },
  girlsScarves: { item: 'Scarf' },
  girlsGloves: { item: 'Gloves' },
  girlsDresses: { item: 'Dress' },
  girlsLeggings: { item: 'Leggings' },

  // boysClothing
  // NOTE: `ageGender` property already set by category conversion
  boysJackets: { item: 'Jacket' },
  boysJumpers: { item: 'Jumper' },
  boysTShirts: { item: 'T-Shirt' }, // "Top"? "Short Sleeve Top"?
  boysLongSlevedTops: { item: 'Long Sleeve Top' },
  boysShorts: { item: 'Shorts' },
  boysTrousers: { item: 'Trousers' },
  boysPantsUnderwear: { item: 'Underwear' },
  boysSocks: { item: 'Socks' },
  boysShoes: { item: 'Shoes' },
  boysHats: { item: 'Hat' },
  boysScarves: { item: 'Scarf' },
  boysGloves: { item: 'Gloves' },

  // babyClothing
  // NOTE: `ageGender` property already set by category conversion
  babyJackets: { item: 'Jacket' },
  babyJumpers: { item: 'Jumper' },
  babyTShirts: { item: 'T-Shirt' },
  babyShorts: { item: 'Shorts' },
  babyBodies: { item: 'Bodysuit / Romper' },
  babyOnesies: { item: 'Onesie / Pajamas' },
  babyTroursers: { item: 'Trousers' },
  babySocks: { item: 'Socks' },
  babyShoes: { item: 'Shoes' },
  babyHats: { item: 'Hat' },
  babyGloves: { item: 'Gloves' },
}

const unitMap = {
  // hygieneItems
  masks: { unit: 'Item' },
  bars100g: { unit: '100g' },
  bottles250ml: { unit: '250ml' },
  toothbrushes: { unit: 'Item' },
  tubes100ml: { unit: '100ml' },
  pads: { unit: 'Item' },
  rollers100ml: { unit: '100ml' },
  razors: { unit: 'Item' },
  cans200ml: { unit: '200ml' },
  condoms: { unit: 'Item' },
  diapersSize0: { unit: 'Item' },
  diapersSize1: { unit: 'Item' },
  diapersSize2: { unit: 'Item' },
  diapersSize3: { unit: 'Item' },
  diapersSize4: { unit: 'Item' },
  diapersSize5: { unit: 'Item' },
  diapersSize6: { unit: 'Item' },
  washCycles: { unit: 'Wash Cycle' }, // 1L bottle = 38, 5k bag = 90
  bottle1l: { unit: '1l' },
  pack100: { unit: '100 Count' },

  // shelter
  items: { unit: 'Item' },

  // education
  // NOTE: "packs" as the unit name for printer paper is too generic
  //       so the unit is set at the item level.

  // foodItems
  kg: { unit: '1kg' },
  l: { unit: '1l' },
  cans: { unit: 'Item' },
  // tea: 1 serving = 0.003 kg
  // coffee: 1 serving = 0.01 kg

  // all clothing
  // most units are just items: {unit: "Item"} which is already listed above
  pairs: { unit: 'Pairs' },
}

const productMapper = (category, item, unit, count) => {}
