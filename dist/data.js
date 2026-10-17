(function () {
  const places = [
    ["Arosa","Switzerland","Graubünden","Alpine"],["Zermatt","Switzerland","Valais","Alpine"],["St. Moritz","Switzerland","Engadin","Alpine"],["Gstaad","Switzerland","Bernese Oberland","Alpine"],["Andermatt","Switzerland","Uri","Alpine"],["Crans-Montana","Switzerland","Valais","Alpine"],["Saas-Fee","Switzerland","Valais","Alpine"],["Wengen","Switzerland","Bernese Oberland","Alpine"],
    ["Megève","France","Haute-Savoie","Alpine"],["Chamonix","France","Haute-Savoie","Alpine"],["Courchevel","France","Savoie","Alpine"],["Val d’Isère","France","Savoie","Alpine"],["Annecy","France","French Alps","Wellness"],["Évian-les-Bains","France","Lake Geneva","Wellness"],["Saint-Tropez","France","Côte d’Azur","Coast"],["Cap d’Antibes","France","Côte d’Azur","Coast"],["Île de Ré","France","Atlantic Coast","Coast"],["Biarritz","France","Basque Coast","Coast"],
    ["Cortina d’Ampezzo","Italy","Dolomites","Alpine"],["Ortisei","Italy","Dolomites","Alpine"],["San Cassiano","Italy","Dolomites","Alpine"],["Madonna di Campiglio","Italy","Trentino","Alpine"],["Lake Como","Italy","Lombardy","Wellness"],["Lake Garda","Italy","Northern Lakes","Wellness"],["Monte Argentario","Italy","Tuscany","Coast"],["Portofino","Italy","Liguria","Coast"],["Taormina","Italy","Sicily","Coast"],["Capri","Italy","Campania","Coast"],["Puglia","Italy","Itria Valley","Countryside"],["Val d’Orcia","Italy","Tuscany","Countryside"],["Langhe","Italy","Piedmont","Countryside"],["Sardinia","Italy","Costa Smeralda","Coast"],
    ["Lech","Austria","Vorarlberg","Alpine"],["Kitzbühel","Austria","Tyrol","Alpine"],["Seefeld","Austria","Tyrol","Alpine"],["Zell am See","Austria","Salzburg","Alpine"],["Bad Gastein","Austria","Salzburg","Wellness"],["Altaussee","Austria","Styria","Wellness"],
    ["Mallorca","Spain","Balearic Islands","Coast"],["Menorca","Spain","Balearic Islands","Coast"],["Ibiza North","Spain","Balearic Islands","Coast"],["Costa Brava","Spain","Catalonia","Coast"],["Marbella","Spain","Andalusia","Coast"],["La Gomera","Spain","Canary Islands","Coast"],["Lanzarote","Spain","Canary Islands","Coast"],["Sierra Nevada","Spain","Andalusia","Alpine"],["La Rioja","Spain","Rioja","Countryside"],
    ["Comporta","Portugal","Alentejo Coast","Coast"],["Madeira","Portugal","Atlantic Islands","Coast"],["Algarve West","Portugal","Algarve","Coast"],["Douro Valley","Portugal","Northern Portugal","Countryside"],["Sintra","Portugal","Lisbon Coast","Countryside"],["São Miguel","Portugal","Azores","Wellness"],
    ["Santorini","Greece","Cyclades","Coast"],["Paros","Greece","Cyclades","Coast"],["Milos","Greece","Cyclades","Coast"],["Crete West","Greece","Crete","Coast"],["Corfu","Greece","Ionian Islands","Coast"],["Halkidiki","Greece","Macedonia","Coast"],["Peloponnese","Greece","Southern Greece","Coast"],
    ["Hvar","Croatia","Dalmatia","Coast"],["Rovinj","Croatia","Istria","Coast"],["Dubrovnik Riviera","Croatia","Dalmatia","Coast"],["Lošinj","Croatia","Kvarner Gulf","Wellness"],["Brač","Croatia","Dalmatia","Coast"],["Bay of Kotor","Montenegro","Adriatic","Coast"],
    ["Bled","Slovenia","Upper Carniola","Wellness"],["Bohinj","Slovenia","Julian Alps","Alpine"],["Piran","Slovenia","Adriatic","Coast"],
    ["Geilo","Norway","Buskerud","Nordic"],["Lofoten","Norway","Nordland","Nordic"],["Hardangerfjord","Norway","Vestland","Nordic"],["Lyngen Alps","Norway","Troms","Nordic"],["Åre","Sweden","Jämtland","Nordic"],["Gotland","Sweden","Baltic Sea","Nordic"],["Finnish Lakeland","Finland","Lakeland","Nordic"],["Saariselkä","Finland","Lapland","Nordic"],["Rovaniemi","Finland","Lapland","Nordic"],["Westfjords","Iceland","Westfjords","Nordic"],["South Iceland","Iceland","Southern Region","Nordic"],
    ["The Cotswolds","United Kingdom","England","Countryside"],["Lake District","United Kingdom","England","Countryside"],["Scottish Highlands","United Kingdom","Scotland","Countryside"],["Isle of Skye","United Kingdom","Scotland","Nordic"],["Cornwall","United Kingdom","England","Coast"],["Pembrokeshire","United Kingdom","Wales","Coast"],["County Kerry","Ireland","Wild Atlantic Way","Countryside"],["Connemara","Ireland","County Galway","Countryside"],
    ["Baden-Baden","Germany","Black Forest","Wellness"],["Tegernsee","Germany","Bavaria","Wellness"],["Sylt","Germany","North Sea","Coast"],["Berchtesgaden","Germany","Bavaria","Alpine"],["South Tyrol","Italy","Alto Adige","Wellness"],["Provence","France","Southern France","Countryside"],["Alentejo","Portugal","Southern Portugal","Countryside"],["Transylvania","Romania","Carpathians","Countryside"],["Zakopane","Poland","Tatra Mountains","Alpine"],["Lake Balaton","Hungary","Transdanubia","Wellness"],["Jūrmala","Latvia","Baltic Coast","Coast"],["Saaremaa","Estonia","Baltic Sea","Nordic"]
  ];

  const firstBatch = [
    ["Obergurgl","Austria","Tyrol","Alpine"],["Schladming","Austria","Styria","Alpine"],["St. Anton am Arlberg","Austria","Tyrol","Alpine"],["Wachau Valley","Austria","Lower Austria","Countryside"],["Bad Ischl","Austria","Salzkammergut","Wellness"],["Lake Wörthersee","Austria","Carinthia","Wellness"],["Bregenzerwald","Austria","Vorarlberg","Countryside"],
    ["Morzine","France","Haute-Savoie","Alpine"],["Les Gets","France","Haute-Savoie","Alpine"],["La Clusaz","France","Haute-Savoie","Alpine"],["La Baule","France","Loire-Atlantique","Coast"],["Hossegor","France","Landes","Coast"],["Saint-Jean-de-Luz","France","Basque Coast","Coast"],["Dordogne","France","Nouvelle-Aquitaine","Countryside"],["Vichy","France","Auvergne","Wellness"],
    ["Garmisch-Partenkirchen","Germany","Bavaria","Alpine"],["Oberstdorf","Germany","Bavaria","Alpine"],["Winterberg","Germany","North Rhine-Westphalia","Alpine"],["Usedom","Germany","Baltic Coast","Coast"],["Rügen","Germany","Baltic Sea","Coast"],["Moselle Valley","Germany","Rhineland-Palatinate","Countryside"],["Wiesbaden","Germany","Hesse","Wellness"],
    ["Hemsedal","Norway","Buskerud","Nordic"],["Trysil","Norway","Innlandet","Nordic"],["Sognefjord","Norway","Vestland","Nordic"],["Geirangerfjord","Norway","Møre og Romsdal","Nordic"],["Kvitfjell","Norway","Innlandet","Alpine"],["Farris Bad","Norway","Vestfold","Wellness"],["Hvaler","Norway","Østfold","Coast"],
    ["Bath","United Kingdom","Somerset","Wellness"],["North Norfolk","United Kingdom","Norfolk","Coast"],["St Ives","United Kingdom","Cornwall","Coast"],["Yorkshire Dales","United Kingdom","Yorkshire","Countryside"],["Brecon Beacons","United Kingdom","Wales","Countryside"],["Cairngorms","United Kingdom","Scotland","Alpine"],["Torridon","United Kingdom","Highlands","Nordic"],
    ["Texel","Netherlands","Wadden Islands","Coast"],["Zeeland Coast","Netherlands","Zeeland","Coast"],["Veluwe","Netherlands","Gelderland","Countryside"],["Giethoorn","Netherlands","Overijssel","Countryside"],["Valkenburg","Netherlands","Limburg","Wellness"],["Amsterdamse Bos","Netherlands","North Holland","Wellness"],
    ["Spa","Belgium","Liège","Wellness"],["Ardennes","Belgium","Wallonia","Countryside"],["Knokke-Heist","Belgium","West Flanders","Coast"],["De Haan","Belgium","Belgian Coast","Coast"],["Hautes Fagnes","Belgium","East Cantons","Nordic"],["Durbuy","Belgium","Luxembourg Province","Countryside"],["La Roche-en-Ardenne","Belgium","Ardennes","Alpine"],["Nieuwpoort","Belgium","West Flanders","Coast"],["Malmedy","Belgium","Ardennes","Countryside"],["Bastogne","Belgium","Luxembourg Province","Alpine"]
  ];

  const imagePool = [
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1443632864897-14973fa006cf?auto=format&fit=crop&w=1200&q=82"
  ];

  const firstBatchImages = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1520962922320-2038eebab146?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1443632864897-14973fa006cf?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1443632864897-14973fa006cf?auto=format&fit=crop&w=1200&q=82&sat=18","https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=82&sat=18",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1520962922320-2038eebab146?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=1200&q=82&hue=12","https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=1200&q=82","https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=82"
  ];

  const seasonsByType = { Alpine:["Winter","Summer"], Coast:["Summer","Spring"], Wellness:["Autumn","Spring"], Countryside:["Spring","Autumn"], Nordic:["Winter","Summer"] };
  const moodLine = {
    Alpine: "Clear air, long trails and a rewarding return to warmth.",
    Coast: "Salt-bright days shaped by coves, terraces and late dinners.",
    Wellness: "A restorative base for water, ritual and unhurried mornings.",
    Countryside: "Landscape-led stays with produce, paths and room to exhale.",
    Nordic: "Big skies, quiet design and nature on its own terms."
  };
  const bestFor = {
    Alpine:["Active couples","Ski weeks","Summer hikers","Design lovers"],
    Coast:["Sun seekers","Slow families","Honeymoons","Swimmers"],
    Wellness:["Reset weekends","Solo stays","Spa devotees","Quiet couples"],
    Countryside:["Food-led trips","Road trips","Families","Slow travellers"],
    Nordic:["Nature seekers","Winter magic","Photographers","Adventurers"]
  };
  const slugify = value => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const allPlaces = places.concat(firstBatch);
  const resorts = allPlaces.map((p, i) => {
    const [name,country,region,type] = p;
    const seasons = seasonsByType[type];
    return {
      id: `resort-${i+1}`,
      slug: slugify(name),
      name, country, region, type, seasons,
      budget: ["€€","€€€","€€€€", "€€€"][i % 4],
      image: i < places.length ? imagePool[i % imagePool.length] : firstBatchImages[(i - places.length) % firstBatchImages.length],
      position: `${28 + (i*13)%54}% center`,
      dek: moodLine[type],
      bestFor: bestFor[type][i % 4],
      days: 3 + (i % 5),
      intro: `${name} makes a compelling base for travellers drawn to ${type.toLowerCase()} landscapes without giving up a strong sense of place. This editorial profile is designed to help you judge the rhythm of the destination—what the days feel like, who it suits and when it comes into its own.`,
      highlights: type === "Coast" ? ["Swimmable coastline","Long-table dining","Boat-day potential","Easy evenings"] : type === "Alpine" ? ["Trail access","Big-view terraces","Winter character","Village atmosphere"] : type === "Nordic" ? ["Immersive nature","Design-led stays","Seasonal light","Outdoor rituals"] : type === "Wellness" ? ["Spa culture","Gentle itineraries","Water and warmth","Restorative pace"] : ["Local produce","Scenic drives","Heritage character","Slow mornings"]
    };
  });

  const collectionSeeds = [
    ["The quiet side of the Mediterranean","Mood","Coast"],["Europe’s most cinematic mountain stays","Mood","Alpine"],["Spa towns worth travelling for","Mood","Wellness"],["Country escapes built around the table","Mood","Countryside"],["Wild north, warm room","Mood","Nordic"],
    ["Where summer starts early","Season","Coast"],["High summer without the crowds","Season","Alpine"],["The first signs of spring","Season","Countryside"],["Autumn colour and open fires","Season","Countryside"],["A proper European winter","Season","Alpine"],
    ["Resorts for two","Company","Wellness"],["The unhurried family holiday","Company","Coast"],["Big houses, long tables","Company","Countryside"],["A restorative solo week","Company","Wellness"],["The grown-up friends’ escape","Company","Coast"],
    ["No car required","Practical","Wellness"],["Worth the beautiful drive","Practical","Countryside"],["A long weekend from London","Practical","Coast"],["Seven nights, one beautiful base","Practical","Alpine"],["Lower-impact stays by rail","Practical","Alpine"],
    ["Blue water, small islands","Mood","Coast"],["Lakes to wake up beside","Mood","Wellness"],["Cabins at the edge of the world","Mood","Nordic"],["Vineyards beyond the obvious","Mood","Countryside"],["Where the forest comes first","Mood","Nordic"],
    ["May’s best escapes","Season","Spring"],["Where to go in June","Season","Summer"],["September’s softer sun","Season","Autumn"],["The magic of midwinter","Season","Winter"],["Europe between Christmas and New Year","Season","Winter"],
    ["A first ski week","Company","Alpine"],["Honeymoons with a sense of place","Company","Coast"],["Teen-friendly, parent-approved","Company","Coast"],["Three-generation holidays","Company","Countryside"],["Quiet retreats for new parents","Company","Wellness"],
    ["Considered stays under €300","Practical","Countryside"],["The splurge list","Practical","Coast"],["Easy arrivals, maximum escape","Practical","Wellness"],["Shoulder season’s smartest stays","Practical","Coast"],["Four nights, thoughtfully spent","Practical","Wellness"],
    ["The new Alpine grand tour","Mood","Alpine"],["Sea views without the scene","Mood","Coast"],["Europe’s restorative lakes","Mood","Wellness"],["Stone houses and olive groves","Mood","Countryside"],["Under the northern lights","Mood","Nordic"],
    ["Snow in late season","Season","Alpine"],["The best of October","Season","Autumn"],["Winter sun, closer to home","Season","Coast"],["Wildflowers and walking boots","Season","Spring"],["The long-light summer","Season","Nordic"]
  ];

  const collections = collectionSeeds.map((c,i) => ({
    id:`collection-${i+1}`, slug:slugify(c[0]), title:c[0], group:c[1], tag:c[2],
    count: 7 + (i % 7),
    dek: `A considered shortlist of ${7 + (i % 7)} places, chosen for atmosphere, setting and the way they shape a trip.`,
    resortIds: resorts.filter(r => c[2] === "Spring" || c[2] === "Summer" || c[2] === "Autumn" || c[2] === "Winter" ? r.seasons.includes(c[2]) : r.type === c[2]).slice(i % 6, (i % 6) + 10).map(r => r.id)
  }));

  const guideTitles = [
    "The thoughtful guide to the Dolomites","How to choose a Greek island","A first-timer’s guide to Alpine summer","The quieter corners of Mallorca","A slow route through the Douro Valley","Northern lights without the rush","Lake Como beyond the day trip","How to plan a coastal Croatia week","The new rules of the family ski trip","A restorative weekend in Baden-Baden",
    "When to visit the Mediterranean","Europe month by month","Why September is the new August","The case for mountains in June","Where winter still feels magical","Spring on the Atlantic coast","The art of an autumn escape","How far ahead should you book?","Reading Europe’s shoulder seasons","Finding snow later in the year",
    "Getting to the Alps without a car","The beautiful drive: Tuscany to the sea","Island hopping, without over-planning","How to build a one-base holiday","A practical guide to night trains","Ferries, flights and the last mile","What a resort transfer really involves","Seven days in western Crete","A rail-led week in Switzerland","The smartest way to reach Lapland",
    "What €250 a night buys in Europe","When all-inclusive makes sense","How to judge value in high season","The hidden costs of a ski week","A calmer way to plan a honeymoon","Booking direct or using a platform?","How to compare resort meal plans","The real budget for an island week","Where a suite is worth the upgrade","Planning a special trip without excess",
    "A field guide to European spa culture","What makes a great family resort?","Choosing between a villa and a hotel","Sea swimming for beginners","Walking holidays with good beds","The rise of the modern mountain lodge","How to travel well with three generations","The quiet pleasure of a lake holiday","A design lover’s resort checklist","Twenty questions to ask before you book"
  ];
  const guideCategory = i => i < 10 ? "Destination" : i < 20 ? "When to go" : i < 30 ? "Getting there" : i < 40 ? "Budget & booking" : "Travel better";
  const guides = guideTitles.map((title,i) => ({
    id:`guide-${i+1}`, slug:slugify(title), title, category:guideCategory(i), read:5 + (i%7),
    dek:["Clear context, useful questions and a route into planning with confidence.","A practical edit of the decisions that make the biggest difference.","The small details, seasonal rhythms and trade-offs worth knowing." ][i%3],
    intro:`${title} begins with one principle: make fewer, better decisions. This field guide brings together the context that matters most—timing, pace, access and the character of the experience—so you can plan a trip that feels coherent from the first day to the last.`,
    sections:["The short answer","What changes the experience","A better way to plan","Before you book"]
  }));

  window.TRAVELBER = { resorts, collections, guides, imagePool };
})();
