export type BaseFoodItem = {
  id: string;
  name: string;
  category: string;
  caloriesPer100g: number;
};

export type UnverifiedFoodSource = {
  sourceStatus: "unverified";
  sourceUrl: null;
  reviewedAt: null;
};

export type VerifiedFoodSource = {
  sourceStatus: "verified";
  sourceUrl: string;
  reviewedAt: string;
};

export type FoodItem = BaseFoodItem & (UnverifiedFoodSource | VerifiedFoodSource);
export const iranianFoods: FoodItem[] = [
  ["rice-white","برنج سفید پخته","غلات",130],["rice-brown","برنج قهوه‌ای پخته","غلات",112],["naan-sangak","نان سنگک","نان",260],["naan-barbari","نان بربری","نان",270],["naan-lavash","نان لواش","نان",250],
  ["kabab-koobideh","کباب کوبیده","خوراک",280],["joojeh","جوجه‌کباب","خوراک",195],["kabab-barg","کباب برگ","خوراک",250],["kabab-chenjeh","کباب چنجه","خوراک",290],["ghormeh","قرمه‌سبزی","خورش",150],["gheymeh","قیمه","خورش",170],
  ["zereshk-polo-morgh","زرشک‌پلو با مرغ","غذای ترکیبی",180],["baghali-polo","باقالی‌پلو با گوشت","غذای ترکیبی",185],["adas-polo","عدس‌پلو","غذای ترکیبی",180],["makaroni","ماکارونی ایرانی","غذای ترکیبی",210],["ash-reshteh","آش رشته","سوپ/آش",95],["abgoosht","آبگوشت","خوراک",160],
  ["kaleh-pache","کله‌پاچه (میانگین)","خوراک",260],["kashk-bademjan","کشک بادمجان","پیش‌غذا",140],["falafel","فلافل","ساندویچ/فست‌فود",280],["kookoo-sabzi","کوکو سبزی","غذای گیاهی",190],["dolmeh","دلمه","غذای گیاهی",120],["sholeh-zard","شله‌زرد","دسر",150],["halim","حلیم","صبحانه",190],
  ["mast-yo","ماست یونانی کم‌چرب","لبنیات",60],["dogh","دوغ","لبنیات",30],["paneer-liqvan","پنیر لیقوان","لبنیات",280],["khorma","خرما","میوه و خشکبار",280],["seeb","سیب","میوه",52],["moz","موز","میوه",89],["badam","بادام","خشکبار",575],
  ["kateh","کته","غلات",150],["sabzi-polo","سبزی‌پلو","غذای ترکیبی",170],["loobia-polo","لوبیاپلو","غذای ترکیبی",190],["estamboli","استانبولی","غذای ترکیبی",160],["tahchin","ته‌چین","غذای ترکیبی",200],["tahdig","ته‌دیگ","غلات",450],
  ["fesenjan","خورش فسنجان","خورش",300],["gheymeh-bademjan","قیمه بادمجان","خورش",190],["khoresht-karafs","خورش کرفس","خورش",140],["ghalyeh-mahi","قلیه‌ماهی","خوراک",150],["kotlet","کتلت","خوراک",300],["shami","شامی","خوراک",270],["mahi-grill","ماهی گریل","خوراک",170],
  ["mirza-ghasemi","میرزا قاسمی","غذای گیاهی",120],["baghali-ghatogh","باقالی‌قاتوق","غذای گیاهی",130],["nimroo","نیمرو","صبحانه",196],["boiled-egg","تخم‌مرغ آبپز","صبحانه",155],["omlet-gojeh","املت گوجه","صبحانه",140],
  ["salad-shirazi","سالاد شیرازی","سالاد",30],["salad-fasl","سالاد فصل","سالاد",50],["salad-olivieh","سالاد الویه","سالاد",260],["mast-khiar","ماست و خیار","پیش‌غذا",80],["mast-mosir","ماست موسیر","پیش‌غذا",110],["loubia-chiti-cooked","لوبیا چیتی پخته","حبوبات",140],["adas-cooked","عدس پخته","حبوبات",116],
  ["tuna-oil","کنسرو تن ماهی در روغن","کنسروی",200],["french-fries","سیب‌زمینی سرخ‌کرده","خوراک",312],["potato-boiled","سیب‌زمینی آبپز","خوراک",87],["naan-taftoon","نان تافتون","نان",260],["naan-shirmal","نان شیرمال","نان",340],
  ["zoolbia-bamieh","زولبیا و بامیه","شیرینی/تنقلات",450],["sohan","سوهان","شیرینی/تنقلات",540],["gaz","گز","شیرینی/تنقلات",420],["baghlava","باقلوا","شیرینی/تنقلات",520],["halva","حلوا","دسر",460],["shir-berenj","شیر برنج","دسر",120],
  ["tea","چای بدون شکر","نوشیدنی",1],["tea-sweet","چای شیرین","نوشیدنی",20],["milk-lowfat","شیر کم‌چرب","لبنیات",45],["milk-full","شیر پرچرب","لبنیات",60],["anar","انار","میوه",83],["hendavaneh","هندوانه","میوه",30],["angoor","انگور","میوه",69],["pesteh","پسته","خشکبار",560],["gerdoo","گردو","خشکبار",654],["olive-oil","روغن زیتون","چاشنی/سس",884]
].map(([id,name,category,caloriesPer100g]) => ({
  id: String(id),
  name: String(name),
  category: String(category),
  caloriesPer100g: Number(caloriesPer100g),
  sourceStatus: "unverified" as const,
  sourceUrl: null,
  reviewedAt: null,
}));
