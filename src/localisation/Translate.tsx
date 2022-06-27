import i18n from 'i18n-js';
import { logger } from '../app/Logger';

export enum LocaleType {
  es = 'es',
  en = 'en',
  ru = 'ru',
  ua = 'ua'
}

export enum RegionType {
  ru = 'ru',
  other = 'other',
}

const _localisationParameters = {
  locale: '',
  region: '',
  originalLocale: '',
};

export function setLocale(countryCode) {
  logger(`LocaleCode is ${countryCode}`);

  switch (countryCode) {
    case 'uk':
    case 'ua':
      i18n.locale = LocaleType.ua;
      break;
    case 'es':
      i18n.locale = LocaleType.es;
      break;
    case 'ru':
      i18n.locale = LocaleType.ru;
      break;
    default:
      i18n.locale = LocaleType.en;
  }

  _localisationParameters.locale = i18n.locale;
}

export function setOriginalLocale(locale) {
  logger(`OriginalLocaleCode is ${locale}`);

  _localisationParameters.originalLocale = locale;
}

export function setRegion(regionCode) {
  let code = 'EN';

  if (/es/i.test(regionCode)) code = 'ES';
  else if (/ru/i.test(regionCode)) code = 'RU';

  logger(`CountryCode is ${regionCode}`);

  _localisationParameters.region = code;
}

export function getRegion() { return _localisationParameters.region };

export function getLocale() {
  return i18n.locale;
}

export function getOriginalLocale() {
  return _localisationParameters.originalLocale;
}

export function i18nGet(key: string) {
  return i18n.t(key);
}

export default function translate() {
  const translations = {};

  Object.keys(translateStore).map(phraseKey => {
    const phraseTranslations = translateStore[phraseKey];
    Object.keys(phraseTranslations).map(localeKey => {
      const localePhrase = phraseTranslations[localeKey];
      if (!translations[localeKey]) translations[localeKey] = {};
      translations[localeKey][phraseKey] = localePhrase;
    })
  });

  i18n.translations = translations;
}

export function translateByKeyAndLanguage(key: string, language: LocaleType) {
  return translateStore[key][language];
}

const translateStore = {
  // STATISTICS
  minimal_value_of_period: {
    'en': 'Minimum value for the period',
    'es': 'Valor mínimo del período',
    'ru': 'Минимальное значение за период',
    'ua': 'Мiнiмальне значення за перiод',
  },
  maximal_value_of_period: {
    'en': 'Maximum value for the period',
    'es': 'Valor máximo del período',
    'ru': 'Максимальное значение за период',
    'ua': 'Максимальне значення за перiод',
  },
  count_of_days_with_at_least_one_measure: {
    'en': 'Number of days with at least one measurement',
    'es': 'Número de días con al menos una medición',
    'ru': 'Количество дней хотя бы с одним замером',
    'ua': 'Кiлькiсть днiв хоча б з одним вимiром',
  },
  count_of_measures: {
    'en': 'Number of measurements',
    'es': 'Numero de medidas',
    'ru': 'Количество измерений',
    'ua': 'Кiлькiсть вимiрiв',
  },
  average_value_of_period: {
    'en': 'Period average',
    'es': 'Promedio del período',
    'ru': 'Среднее значение за период',
    'ua': 'Середнє значення за перiод',
  },
  statistics_season_autumn: {
    'en': 'Autumn',
    'es': 'Otoño',
    'ru': 'Осень',
    'ua': 'Осiнь',
  },
  statistics_season_summer: {
    'en': 'Summer',
    'es': 'Verano',
    'ru': 'Лето',
    'ua': 'Лiто',
  },
  statistics_season_spring: {
    'en': 'Spring',
    'es': 'Primavera',
    'ru': 'Весна',
    'ua': 'Весна',
  },
  statistics_season_winter: {
    'en': 'Winter',
    'es': 'Invierno',
    'ru': 'Зима',
    'ua': 'Зима',
  },
  statistics_year: {
    'en': 'Year',
    'es': 'Año',
    'ru': 'Год',
    'ua': 'Рiк',
  },
  statistics_season: {
    'en': 'Season',
    'es': 'Estación',
    'ru': 'Сезон',
    'ua': 'Сезон',
  },
  statistics_month: {
    'en': 'Month',
    'es': 'Mes',
    'ru': 'Месяц',
    'ua': 'Мiсяць',
  },
  statistics_day: {
    'en': 'Day',
    'es': 'Día',
    'ru': 'День',
    'ua': 'День',
  },
  statistics: {
    'en': 'Statistics',
    'es': 'Estadísticas',
    'ru': 'Статистика',
    'ua': 'Статистика',
  },
  // FOOD
  find_in_the_list: {
    'en': 'Find in the list',
    'es': 'Encuentra en la lista',
    'ru': 'Найти в списке',
    'ua': 'Знайти у списку',
  },
  or: {
    'en': 'or',
    'es': 'o',
    'ru': 'или',
    'ua': 'або',
  },
  scanning_hint: {
    'en': 'Aim the camera at the barcode. If nothing happens, try moving the camera closer or further away from the product packaging so that the scanner can read the information.',
    'es': 'Apunte la cámara al código de barras. Si no sucede nada, intente acercar o alejar la cámara del embalaje del producto para que el escáner pueda leer la información.',
    'ru': 'Направьте камеру на штрих-код. Если ничего не происходит, попробуйте переместить камеру ближе или дальше от упаковки продукта, чтобы сканер прочитал информацию.',
    'ua': 'Направте камеру на штрих-код. Якщо нiчого не вiдбувається, спробуйте перемiстити камеру ближче або далi вiд упаковки, щоб сканер прочитав iнформацiю.',
  },
  publish_to_whole_world: {
    'en': 'Add a product to a shared database',
    'es': 'Agregar un producto a una base de datos compartida',
    'ru': 'Сделать продукт доступным для всех пользователей',
    'ua': 'Зробити продукт доступним для всiх користувачiв',
  },
  network_is_unavailable: {
    'en': 'No internet connection',
    'es': 'Sin conexión a Internet',
    'ru': 'Нет соединения с сетью интернет',
    'ua': `Немає з'єднання з мережею iнтернет`,
  },
  server_is_unavailable: {
    'en': 'Our server is currently unavailable. Tap to try to connect.',
    'es': 'Nuestro servidor no está disponible actualmente. Haga clic para intentar conectarse.',
    'ru': 'В данное время наш сервер недоступен. Нажмите, чтобы попробовать подключиться.',
    'ua': `Наразi наш сервер недоступний. Натиснiть, щоб спробувати з'єднатися.`,
  },
  specify_nutrients_for_100g_of_product: {
    'en': 'List the nutrients per 100 grams of food',
    'es': 'Enumere los nutrientes por cada 100 gramos de comida',
    'ru': 'Укажите питательные вещества на 100 граммов пищи',
    'ua': 'Вкажiть поживнi речовини на 100 г їжi',
  },
  unknown_product: {
    'en': 'Calculated food',
    'es': 'Comida calculada',
    'ru': 'Продукт из расчета',
    'ua': 'Продукт iз розрахунку',
  },
  indicate_fats_prots_and_other: {
    'en': 'Specify additionally proteins, fats and energy value',
    'es': 'Especificar adicionalmente proteínas, grasas y valor energético',
    'ru': 'Указать дополнительно белки, жиры и энергетичскую ценность',
    'ua': 'Вказати додатково бiлки, жири та енергетичну цiннiсть',
  },
  carbs_calculator_popup_header: {
    'en': 'Calculating carbohydrates manually',
    'es': 'Calcular carbohidratos manualmente',
    'ru': 'Расчет углеводов вручную',
    'ua': 'Розрахунок вуглеводiв вручну',
  },
  calculate_carbs: {
    'en': 'Calculation',
    'es': 'Cálculo',
    'ru': 'Расчет',
    'ua': 'Розрахунок',
  },
  hand_input: {
    'en': 'Manual input',
    'es': 'Entrada manual',
    'ru': 'Ручной ввод',
    'ua': 'Ручне введення',
  },
  added_food: {
    'en': 'Added food',
    'es': 'Productos agregados',
    'ru': 'Добавленные продукты',
    'ua': 'Доданi продукти',
  },
  sum_of_bus: {
    'en': 'Total bread units',
    'es': 'Totales raciones de HC',
    'ru': 'Всего ХЕ',
    'ua': 'Усього ХО',
  },
  sum_of_carbs: {
    'en': 'Total carbohydrates',
    'es': 'Carbohidratos totales',
    'ru': 'Всего углеводов',
    'ua': 'Усього вуглеводiв',
  },
  food_not_loaded_we_are_sorry_try_later: {
    'en': 'Failed to load data',
    'es': 'No se pudieron cargar los datos',
    'ru': 'Не удалось загрузить данные',
    'ua': 'Неможливо завантажити данi',
  },
  food_loading_now: {
    'en': 'Data is loading',
    'es': 'Los datos se están cargando',
    'ru': 'Загружаем данные',
    'ua': 'Завантажуємо данi',
  },
  food_in_dev: {
    'en': 'Food',
    'es': 'Comida',
    'ru': 'Продукты',
    'ua': 'Продукти',
  },
  scan_again: {
    'en': 'Scan again',
    'es': 'Escanea otra vez',
    'ru': 'Сканировать снова',
    'ua': 'Сканувати знову',
  },
  we_have_no_access: {
    'en': 'No access to camera',
    'es': 'Sin acceso a la cámara',
    'ru': 'Нет доступа к камере',
    'ua': 'Немає доступу до камери',
  },
  requesting_for_camera_permissions: {
    'en': 'Camera access requesting',
    'es': 'Solicitud de acceso a la cámara',
    'ru': 'Запрашиваем доступ к камере',
    'ua': 'Запитуємо доступ до камери',
  },
  scan_try_again: {
    'en': 'Try to scan again',
    'es': 'Intenta escanear de nuevo',
    'ru': 'Сканировать еще раз',
    'ua': 'Сканувати ще раз',
  },
  search_food: {
    'en': 'Find in search',
    'es': 'Encontrar en la búsqueda',
    'ru': 'Найти в поиске',
    'ua': 'Знайти у пошуку',
  },
  add_food_handly: {
    'en': 'Add this product manually',
    'es': 'Agregar este producto manualmente',
    'ru': 'Добавить этот продукт вручную',
    'ua': 'Додати цей продукт вручну',
  },
  what_you_want_to_do_later: {
    'en': 'Choose further action',
    'es': 'Elija otra acción',
    'ru': 'Выберите дальнейшее действие',
    'ua': 'Виберiть подальшу дiю',
  },
  scan_failed: {
    'en': 'The scanned product was not found',
    'es': 'No se encontró el producto escaneado',
    'ru': 'Отсканированный продукт не найден',
    'ua': 'Вiдсканований продукт не знайдено',
  },
  carbohydrates_short: {
    'en': 'C',
    'es': 'C',
    'ru': 'У',
    'ua': 'В',
  },
  fats_short: {
    'en': 'F',
    'es': 'F',
    'ru': 'Ж',
    'ua': 'Ж',
  },
  proteins_short: {
    'en': 'P',
    'es': 'P',
    'ru': 'Б',
    'ua': 'Б',
  },
  total: {
    'en': 'Total',
    'es': 'Totales',
    'ru': 'Всего',
    'ua': 'Усього',
  },
  remove_racion: {
    'en': 'Remove',
    'es': 'Eliminar',
    'ru': 'Убрать',
    'ua': 'Прибрати',
  },
  indicate_portion: {
    'en': 'Specify portion',
    'es': 'Especificar porción',
    'ru': 'Укажите порцию',
    'ua': 'Вкажiть порцiю',
  },
  gram: {
    'en': 'g',
    'es': 'g',
    'ru': 'г',
    'ua': 'г',
  },
  racion: {
    'en': 'Meal',
    'es': 'Comida',
    'ru': 'Прием пищи',
    'ua': 'Приймання їжi',
  },
  add_racion: {
    'en': 'Add meal',
    'es': 'Añadir comida',
    'ru': 'Добавить прием пищи',
    'ua': 'Додати їжу',
  },
  weight_of_product: {
    'en': 'Product weight',
    'es': 'Peso del Producto',
    'ru': 'Вес продукта',
    'ua': 'Вага продукту',
  },
  in_100_gram_product_can_not_be_nutritients_more_than_100_gramm: {
    'en': '100 grams of a product cannot contain more than 100 grams of nutrients',
    'es': '100 gramos de un producto no pueden contener más de 100 gramos de nutrientes',
    'ru': 'В 100 граммах продукта не может быть больше 100 грамм нутриентов',
    'ua': 'У 100 г продукту не може бути бiльше 100 г нутрiєнтiв',
  },
  food_is_not_added: {
    'en': 'Failed to add product',
    'es': 'No se pudo agregar el producto',
    'ru': 'Не удалось добавить продукт',
    'ua': 'Неможливо додати продукт',
  },
  one_of_these_fields_is_required_at_least: {
    'en': 'At least one of these fields is required',
    'es': 'Al menos uno de estos campos es obligatorio',
    'ru': 'По-крайней мере одно из этих полей - обязательное',
    'ua': `Принаймнi одне з цих полiв – обов'язкове`,
  },
  type_zero_if_not_exists: {
    'en': 'Enter 0 if the product does not contain the correct nutrients',
    'es': 'Ingrese 0 si el producto no contiene los nutrientes correctos',
    'ru': 'Введите 0, если продукт не содержит подходящих питательных веществ',
    'ua': 'Введiть 0, якщо продукт не мiстить вiдповiдних поживних речовин',
  },
  required: {
    'en': 'Required',
    'es': 'Obligatorio',
    'ru': 'Обязательно',
    'ua': `Обов'язково`,
  },
  food_note_bread_units: {
    'en': 'Units',
    'es': 'Unidades',
    'ru': 'ХЕ',
    'ua': 'XO',
  },
  food_creation_barcode: {
    'en': 'Barcode',
    'es': 'Código de barras',
    'ru': 'Штрих-код',
    'ua': 'Штрих код',
  },
  food_creation_carbohydrates: {
    'en': 'Carbs',
    'es': 'Hidratos',
    'ru': 'Углеводы',
    'ua': 'Вуглеводи',
  },
  food_creation_fats: {
    'en': 'Fat',
    'es': 'Grasas',
    'ru': 'Жиры',
    'ua': 'Жири',
  },
  food_creation_proteins: {
    'en': 'Protein',
    'es': 'Proteínas',
    'ru': 'Белки',
    'ua': 'Бiлки',
  },
  food_creation_energy: {
    'en': 'Energy',
    'es': 'Energía',
    'ru': 'Энергия',
    'ua': 'Енергiя',
  },
  food_creation_calories: {
    'en': 'Calories',
    'es': 'Calorías',
    'ru': 'Калорийность',
    'ua': 'Калорiйнiсть',
  },
  food_creation_brand_name: {
    'en': 'Brand name',
    'es': 'Nombre de la marca',
    'ru': 'Торговая марка',
    'ua': 'Торгова марка',
  },
  food_creation_product_name: {
    'en': 'Name',
    'es': 'Nombre',
    'ru': 'Название',
    'ua': 'Назва',
  },
  create_food_card: {
    'en': 'Add product',
    'es': 'Agregar producto',
    'ru': 'Создать продукт',
    'ua': 'Створити продукт',
  },
  food_card_creation: {
    'en': 'Product card creation',
    'es': 'Creación de tarjetas de producto',
    'ru': 'Создание карточки продукта',
    'ua': 'Створення картки продукту',
  },
  food_brand_name: {
    'en': 'Brand name',
    'es': 'Nombre de la marca',
    'ru': 'Торговый знак',
    'ua': 'Торговий знак',
  },
  food_card: {
    'en': 'Product card',
    'es': 'Tarjeta del producto',
    'ru': 'Карточка продукта',
    'ua': 'Картка продукту',
  },
  food_db_unknown: {
    'en': 'Unknown',
    'es': 'Desconocido',
    'ru': 'Неизвестно',
    'ua': 'Невiдомо',
  },
  food_db_user_local_fast_db: {
    'en': 'Product added by manual calculation',
    'es': 'Producto agregado por cálculo manual',
    'ru': 'Продукт, добавленный при ручном расчете',
    'ua': 'Продукт, доданий за ручного розрахунку',
  },
  food_db_user_local_db: {
    'en': 'The product you added. The product is hidden from all users.',
    'es': 'El producto que agregaste. El producto está oculto a todos los usuarios.',
    'ru': 'Продукт, добавленный вами. Продукт скрыт от всех пользователей.',
    'ua': 'Продукт доданий вами. Продукт прихований вiд усiх користувачiв.',
  },
  food_db_users_db: {
    'en': 'Products added by users',
    'es': 'Productos agregados por los usuarios',
    'ru': 'Продукты, добавленные пользователями',
    'ua': 'Продукти, доданi користувачами',
  },
  food_db_usda_27_portnov: {
    'en': 'USDA SR27 Nutrient Database in Russian. Translated by Portnov N.M., Mosov A.V.',
    'es': 'Base de datos de nutrientes USDA SR27 en ruso. Traducido por Portnov N.M., Mosov A.V.',
    'ru': 'База данных нутриентов продуктов USDA SR27 по-русски. Перевод Портнов Н.М., Мосов А.В.',
    'ua': 'База даних нутрiєнтiв продуктiв USDA SR27 росiйською мовою. Переклад Портнов Н.М., Мосов А.В.',
  },
  food_db_off: {
    'en': 'OpenFoodFacts',
    'es': 'OpenFoodFacts',
    'ru': 'OpenFoodFacts',
    'ua': 'OpenFoodFacts',
  },
  food_db_fat_secret: {
    'en': 'FatSecret',
    'es': 'FatSecret',
    'ru': 'FatSecret',
    'ua': 'FatSecret',
  },
  food_source: {
    'en': 'Source',
    'es': 'Fuente',
    'ru': 'Источник',
    'ua': 'Джерело',
  },
  for_100g_of_product: {
    'en': 'Per 100 grams',
    'es': 'Por 100 gramos',
    'ru': 'На 100 грамм продукта',
    'ua': 'На 100 г продукту',
  },
  food_search_tips_add: {
    'en': 'You can create a product. It will be automatically added to your favorites and you can find it in the search.',
    'es': 'Puedes crear un producto. Se agregará automáticamente a "Mis productos" y podrás encontrarlo en la búsqueda.',
    'ru': 'Вы можете создать продукт. Он будет автоматически добавлен в "Мои продукты", и вы сможете найти его в поиске.',
    'ua': 'Ви можете створити продукт. Вiн буде автоматично доданий до "Мої продукти", i ви зможете знайти його в пошуку.',
  },
  food_search_tips_4: {
    'en': 'You can add a product yourself in the "Favorites" tab',
    'es': 'Puede agregar un producto usted mismo en la pestaña "Mis productos"',
    'ru': 'Вы можете добавить продукт самостоятельно во вкладке "Мои продукты"',
    'ua': 'Ви можете додати продукт самостiйно у вкладцi "Мої продукти"',
  },
  food_search_tips_3: {
    'en': 'Search and scan history is located in the "History" tab',
    'es': 'El historial de búsqueda y escaneo se encuentra en la pestaña "Historia"',
    'ru': 'История поиска и сканирования находится во вкладке "История"',
    'ua': 'iсторiя пошуку та сканування знаходиться у вкладцi "iсторiя"',
  },
  food_search_tips_2: {
    'en': 'No results were found for this request',
    'es': 'No se encontraron resultados para esta solicitud',
    'ru': 'Ничего не найдено по данному запросу',
    'ua': 'Нiчого не знайдено за цим запитом',
  },
  food_search_tips_1: {
    'en': 'Start typing to find food',
    'es': 'Empiece a escribir para buscar comida',
    'ru': 'Начните печатать, чтобы найти продукты',
    'ua': 'Почнiть друкувати, щоб знайти продукти',
  },
  you_are_have_not_history: {
    'en': 'Search for products or scan, the whole story will be saved here',
    'es': 'Busque productos o escanee, la historia completa se guardará aquí',
    'ru': 'Ищите продукты или сканируйте, вся история сохраниться здесь',
    'ua': 'Шукайте продукти або скануйте, вся iсторiя збережеться тут',
  },
  you_not_added_any_food_yet: {
    'en': 'Products that you bookmark when searching or scanning, as well as those that you added yourself will be displayed here.',
    'es': 'Los productos que marque como favoritos al buscar o escanear, así como los que agregó usted mismo, se mostrarán aquí.',
    'ru': 'Здесь будут отображаться продукты, которые вы сохраните при поиске или сканировании, а также те, которые вы добавили',
    'ua': 'Тут будуть вiдображатися продукти, якi ви збережете пiд час пошуку або сканування, а також тi, якi ви додали',
  },
  kcal: {
    'en': 'kcal',
    'es': 'kcal',
    'ru': 'ккал',
    'ua': 'ккал',
  },
  kJ: {
    'en': 'kJ',
    'es': 'kJ',
    'ru': 'кДж',
    'ua': 'кДж',
  },
  food_energy: {
    'en': 'Energy',
    'es': 'Energía',
    'ru': 'Энергия',
    'ua': 'Енергiя',
  },
  food_calories: {
    'en': 'Calories',
    'es': 'Calorías',
    'ru': 'Калории',
    'ua': 'Калорiї',
  },
  food_fat: {
    'en': 'Fats',
    'es': 'Grasas',
    'ru': 'Жиры',
    'ua': 'Жири',
  },
  food_carbohydrates: {
    'en': 'Carbohydrates',
    'es': 'Сarbohidratos',
    'ru': 'Углеводы',
    'ua': 'Вуглеводи',
  },
  food_proteins: {
    'en': 'Proteins',
    'es': 'Proteínas',
    'ru': 'Белки',
    'ua': 'Бiлки',
  },
  type_food: {
    'en': 'Write the name',
    'es': 'Escribe el nombre',
    'ru': 'Напишите название',
    'ua': 'Напишiть назву',
  },
  food_favorites: {
    'en': 'Favorites',
    'es': 'Mis productos',
    'ru': 'Мои продукты',
    'ua': 'Мої продукти',
  },
  food_history: {
    'en': 'History',
    'es': 'Historia',
    'ru': 'История',
    'ua': 'iсторiя',
  },
  food_search: {
    'en': 'Search',
    'es': 'Buscar',
    'ru': 'Поиск',
    'ua': 'Пошук',
  },
  product_not_found: {
    'en': 'Product not found',
    'es': 'Producto no encontrado',
    'ru': 'Продукт не найден',
    'ua': 'Продукт не знайдено',
  },
  product_scanning: {
    'en': 'Barcode scanning',
    'es': 'Escaneo de código de barras',
    'ru': 'Сканирование штрих-кода',
    'ua': 'Сканування штрих-коду',
  },
  barcode_scanning_error: {
    'en': 'Barcode scanning error',
    'es': 'Error de escaneo de código de barras',
    'ru': 'Ошибка сканирования продукта',
    'ua': 'Помилка сканування продукту',
  },
  food: {
    'en': 'Food',
    'es': 'Comida',
    'ru': 'Продукты',
    'ua': 'Продукти',
  },
  add_food: {
    'en': 'Add food',
    'es': 'Agregar comida',
    'ru': 'Добавить продукт',
    'ua': 'Додати продукт',
  },
  // AUTH
  looking_for_active_session: {
    en: 'Looking for active session',
    es: 'Buscando sesión activa',
    ru: 'Поиск активной сессии',
    ua: 'Пошук активної сесiї',
  },
  continue_as: {
    en: 'Continue as:',
    es: 'Continuar como:',
    ru: 'Продолжить как:',
    ua: 'Продовжити як:',
  },
  sign_in_with_google: {
    en: 'Sign in with Google',
    es: 'Entrar con Google',
    ru: 'Войти с Google',
    ua: 'Увiйти з Google',
  },
  sign_in: {
    en: 'Sign in',
    es: 'Iniciar sesión',
    ru: 'Авторизация',
    ua: 'Авторизацiя',

  },
  // NOTES
  notes: {
    en: 'Notes',
    es: 'Notas',
    ru: 'Записи',
    ua: 'Записи',
  },
  today: {
    en: 'Today',
    es: 'Hoy',
    ru: 'Сегодня',
    ua: 'Сьогоднi',
  },
  yesterday: {
    en: 'Yesterday',
    es: 'Ayer',
    ru: 'Вчера',
    ua: 'Вчора',
  },

  january: {
    en: 'january',
    es: 'enero',
    ru: 'января',
    ua: 'ciчня',
  },
  february: {
    en: 'february',
    es: 'febrero',
    ru: 'февраля',
    ua: 'лютого',
  },
  march: {
    en: 'march',
    es: 'marzo',
    ru: 'марта',
    ua: 'березня',
  },
  april: {
    en: 'april',
    es: 'abril',
    ru: 'апреля',
    ua: 'квiтня',
  },
  may: {
    en: 'may',
    es: 'mayo',
    ru: 'мая',
    ua: 'травня',
  },
  june: {
    en: 'june',
    es: 'junio',
    ru: 'июня',
    ua: 'червня',
  },
  july: {
    en: 'july',
    es: 'julio',
    ru: 'июля',
    ua: 'липня',
  },
  august: {
    en: 'august',
    es: 'agosto',
    ru: 'августа',
    ua: 'серпня',
  },
  september: {
    en: 'september',
    es: 'septiembre',
    ru: 'сентября',
    ua: 'вересня',
  },
  october: {
    en: 'october',
    es: 'octubre',
    ru: 'октября',
    ua: 'жовтня',
  },
  november: {
    en: 'november',
    es: 'noviembre',
    ru: 'ноября',
    ua: 'листопада',
  },
  december: {
    en: 'december',
    es: 'diciembre',
    ru: 'декабря',
    ua: 'грудня',
  },

  january_capital_infinitive: {
    en: 'January',
    es: 'Enero',
    ru: 'Январь',
    ua: 'Сiчень',
  },
  february_capital_infinitive: {
    en: 'February',
    es: 'Febrero',
    ru: 'Февраль',
    ua: 'Лютий',
  },
  march_capital_infinitive: {
    en: 'March',
    es: 'Marzo',
    ru: 'Март',
    ua: 'Березень',
  },
  april_capital_infinitive: {
    en: 'April',
    es: 'Abril',
    ru: 'Апрель',
    ua: 'Квiтень',
  },
  may_capital_infinitive: {
    en: 'May',
    es: 'Mayo',
    ru: 'Май',
    ua: 'Травень',
  },
  june_capital_infinitive: {
    en: 'June',
    es: 'Junio',
    ru: 'Июнь',
    ua: 'Червень',
  },
  july_capital_infinitive: {
    en: 'July',
    es: 'Julio',
    ru: 'Июль',
    ua: 'Липня',
  },
  august_capital_infinitive: {
    en: 'August',
    es: 'Agosto',
    ru: 'Август',
    ua: 'Серпень',
  },
  september_capital_infinitive: {
    en: 'September',
    es: 'Septiembre',
    ru: 'Сентябрь',
    ua: 'Вересень',
  },
  october_capital_infinitive: {
    en: 'October',
    es: 'Octubre',
    ru: 'Октябрь',
    ua: 'Жовтень',
  },
  november_capital_infinitive: {
    en: 'November',
    es: 'Noviembre',
    ru: 'Ноябрь',
    ua: 'Листопад',
  },
  december_capital_infinitive: {
    en: 'December',
    es: 'Diciembre',
    ru: 'Декабрь',
    ua: 'Грудень',
  },
  january_capital_short: {
    en: 'Jan',
    es: 'Ene',
    ru: 'Янв',
    ua: 'Ciч',
  },
  february_capital_short: {
    en: 'Feb',
    es: 'Feb',
    ru: 'Фев',
    ua: 'Лют',
  },
  march_capital_short: {
    en: 'Mar',
    es: 'Mar',
    ru: 'Мар',
    ua: 'Бер',
  },
  april_capital_short: {
    en: 'Apr',
    es: 'Abr',
    ru: 'Апр',
    ua: 'Квiт',
  },
  may_capital_short: {
    en: 'May',
    es: 'May',
    ru: 'Май',
    ua: 'Трав',
  },
  june_capital_short: {
    en: 'Jun',
    es: 'Jun',
    ru: 'Июн',
    ua: 'Черв',
  },
  july_capital_short: {
    en: 'Jul',
    es: 'Jul',
    ru: 'Июл',
    ua: 'Липн',
  },
  august_capital_short: {
    en: 'Aug',
    es: 'Ago',
    ru: 'Авг',
    ua: 'Серп',
  },
  september_capital_short: {
    en: 'Sep',
    es: 'Sep',
    ru: 'Сен',
    ua: 'Вер',
  },
  october_capital_short: {
    en: 'Oct',
    es: 'Oct',
    ru: 'Окт',
    ua: 'Жовт',
  },
  november_capital_short: {
    en: 'Nov',
    es: 'Nov',
    ru: 'Нояб',
    ua: 'Лист',
  },
  december_capital_short: {
    en: 'Dec',
    es: 'Dic',
    ru: 'Дек',
    ua: 'Груд',
  },
  show_more: {
    en: 'Show more',
    es: 'Mostrar más',
    ru: 'Показать больше',
    ua: 'Показати бiльше',
  },
  notes_not_found: {
    en: 'Notes not found',
    es: 'Sin notas',
    ru: 'Записи не найдены',
    ua: 'Записи не знайдено',
  },
  need_to_inject: {
    'en': 'Need to inject',
    'es': 'Es necesario inyectar',
    'ru': 'Необходимо ввести',
    'ua': 'Потрiбно ввести',
  },
  change_insulin_insulin_props: {
    'en': 'Edit coefficient',
    'es': 'Editar coeficiente',
    'ru': 'Изменить коэффициент',
    'ua': 'Змiнити коефiцiєнт',
  },
  fill_out_your_diabetes_profile_for_recommendations: {
    en: 'Complete your diabetic profile for insulin dosage recommendations',
    es: 'Complete su perfil de diabético para conocer las recomendaciones de dosis de insulina',
    ru: 'Заполните диабетический профиль для получения рекомендаций по дозировке инсулина',
    ua: 'Заповнiть дiабетичний профiль для отримання рекомендацiй щодо дозування iнсулiну',
  },
  enter_blood_glucose_value_to_get_recommendation: {
    en: 'Enter glucose value for insulin dosage recommendation',
    es: 'Ingrese el valor de glucosa para la recomendación de dosis de insulina',
    ru: 'Введите значение глюкозы, чтобы получить рекомендацию по дозировке инсулина',
    ua: 'Введiть значення глюкози, щоб отримати рекомендацiю щодо дозування iнсулiну',
  },
  insulin_is_not_recommended: {
    en: 'Insulin is not recommended',
    es: 'No se recomienda inyectar insulina',
    ru: 'Вводить инсулин не рекомендуется',
    ua: 'Вводити iнсулiн не рекомендується',
  },
  inject_insulin_after_meal: {
    en: 'Inject insulin after meals. \n Recommended insulin value',
    es: 'Inyecta insulina después de la comida. \nValor recomendado de insulina',
    ru: 'Введите инсулин после еды. \nРекомендуемое значение инсулина',
    ua: 'Введiть iнсулiн пiсля їди. \nРекомендоване значення iнсулiну',
  },
  restore_your_glucose_level_first: {
    en: 'First restore your glucose level to normal',
    es: 'Primero restaure su nivel de glucosa',
    ru: 'Сначала восстановите свой уровень глюкозы',
    ua: 'Спочатку вiдновiть рiвень глюкози',
  },
  recommended_insulin_value: {
    en: 'Recommended insulin value',
    es: 'Valor recomendado de insulina',
    ru: 'Рекомендуемое значение инсулина',
    ua: 'Рекомендоване значення iнсулiну',
  },
  add: {
    en: 'Add',
    es: 'Añadir',
    ru: 'Добавить',
    ua: 'Додати',
  },
  add_note: {
    en: 'Add note',
    es: 'Añadir nota',
    ru: 'Добавить запись',
    ua: 'Додати запис',
  },
  glucose: {
    en: 'Blood sugar',
    es: 'Glucosa',
    ru: 'Глюкоза',
    ua: 'Глюкоза',
  },
  breadUnits: {
    en: 'Bread unit',
    es: 'Racion de HC',
    ru: 'ХЕ',
    ua: 'XO',
  },
  insulin: {
    en: 'Short-acting',
    es: 'Insulina ultra rápida',
    ru: 'Короткий',
    ua: 'Короткий',
  },
  longInsulin: {
    en: 'Long-acting',
    es: 'Insulina prolongada',
    ru: 'Длинный',
    ua: 'Довгий',
  },
  comment: {
    en: 'Comment',
    es: 'Сomentario',
    ru: 'Комментарий',
    ua: 'Коментар',
  },
  write: {
    en: 'Write',
    es: 'Escribir',
    ru: 'Записать',
    ua: 'Записати',
  },
  rewrite: {
    en: 'Rewrite',
    es: 'Sobrescribir',
    ru: 'Перезаписать',
    ua: 'Перезаписати',
  },
  fill_at_least_one_parameter: {
    en: 'Fill at least one parameter',
    es: 'Ingrese al menos un parámetro',
    ru: 'Введите хотя бы один параметр',
    ua: 'Введiть хоча б один параметр',
  },
  delete: {
    en: 'Delete',
    es: 'Eliminar',
    ru: 'Удалить',
    ua: 'вилучити',
  },
  carb_gram: {
    en: 'grams',
    es: 'gramos',
    ru: 'грамм',
    ua: 'грам',
  },
  carbs_units: {
    en: 'units',
    es: 'Racion de HC',
    ru: 'ХЕ',
    ua: 'XO',
  },

  // CHARTS
  chart_select_date: {
    'en': 'Select date/time',
    'es': 'Seleccionar fecha/hora',
    'ru': 'Выберите дату/время',
    'ua': 'Виберiть дату/час',
  },
  chart_select_time_only: {
    'en': 'Select time',
    'es': 'Seleccionar hora',
    'ru': 'Выберите время',
    'ua': 'Виберiть час',
  },
  chart_select_date_only: {
    'en': 'Select date',
    'es': 'Seleccionar fecha',
    'ru': 'Выберите дату',
    'ua': 'Виберiть дату',
  },
  charts: {
    en: 'Charts',
    es: 'Gráficos',
    ru: 'Графики',
    ua: 'Графiки',
  },
  chart_period_day: {
    en: 'Day',
    es: 'Día',
    ru: 'День',
    ua: 'День',
  },
  chart_period_month: {
    en: 'Month',
    es: 'Mes',
    ru: 'Месяц',
    ua: 'Мiсяць',
  },
  chart_period_three_month: {
    en: 'Three month',
    es: 'Tres meses',
    ru: 'Три месяца',
    ua: 'Три мiсяцi',
  },
  chart_today: {
    en: 'Today',
    es: 'Hoy',
    ru: 'Сегодня',
    ua: 'Три мiсяцi',
  },
  chart_yesterday: {
    en: 'Yesterday',
    es: 'Ayer',
    ru: 'Вчера',
    ua: 'Вчора',
  },
  chart_period: {
    en: 'Period',
    es: 'Período',
    ru: 'Период',
    ua: 'Перiод',
  },
  chart_period_3_month: {
    en: '3 month',
    es: '3 meses',
    ru: '3 месяца',
    ua: '3 мiсяцi',
  },
  chart_update_date: {
    en: 'Update date',
    es: 'Cambiar fecha',
    ru: 'Обновить дату',
    ua: 'Оновити дату',
  },
  info_day_chart: {
    en: 'Day chart',
    es: 'Gráfico del dia',
    ru: 'Дневной график',
    ua: 'Дневной график',
  },
  info_month_chart: {
    en: 'Month chart',
    es: 'Gráfico del mes',
    ru: 'Месячный график',
    ua: 'Мiсячний графiк',
  },
  info_three_month_chart: {
    en: 'Three month chart',
    es: 'Gráfico de tres meses',
    ru: 'Трехмесячный график',
    ua: 'Тримiсячний графiк',
  },

  info_day_chart_part_1: {
    en: 'Charts visualize the spreading of blood sugar, insulin and carbohydrates throughout the day. ' +
      "As you know, blood sugar increases with food intake and decreases with insulin.",
    es: "Los gráficos visualizan la distribución de azúcar en sangre, insulina y Racion de HC a lo largo del día. " +
      "Como saben, el azúcar en la sangre aumenta con la ingesta de alimentos y disminuye con la insulina..",
    ru: "Графики визуализируют распределение сахара крови, инсулина и ХЕ в течение дня. " +
      "Как известно, сахар крови повышается с принятием пищи и понижается с введением инсулина.",
    ua: "Графiки вiзуалiзують розподiл цукру кровi, iнсулiну та ХО протягом дня. Як вiдомо, цукор кровi пiдвищується з їдою i знижується з введенням iнсулiну.",
  },
  info_day_chart_part_2: {
    en: 'The graph of blood glucose (in the middle) is an indicator of the correctness of the selected dose for each specific time of day. ' +
      'If you notice systematically repeated spikes in blood sugar, consult your doctor to adjust your dose of short or long-acting insulin.',
    es: "El gráfico de glucosa en sangre (en el medio) es un indicador de la exactitud de la dosis seleccionada para cada momento específico del día. " +
      "Si nota un aumento sistemático repetido en el azúcar en la sangre, consulte a su médico para ajustar la dosis de insulina corta o larga.",
    ru: "График глюкозы крови(посередине) является показателем корректности подобранной дозы для каждого конкретного времени дня. " +
      "Если вы замечаете систематически повторяющиеся скачки сахара крови - обратитесь к врачу для корректировки дозы короткого или пролонгированного инсулина.",
    ua: "Графiк глюкози кровi (посерединi) є показником коректностi пiдiбраної дози кожного конкретного часу дня. Якщо ви помiчаєте стрибки цукру кровi, що систематично повторюються, - звернiться до лiкаря для коригування дози короткого або пролонгованого iнсулiну.",
  },
  info_day_chart_part_3: {
    en: "The graph of insulin (above) approximately reflects the distribution of short insulin in the body during the day. If 4 hours have not passed since the last injection, the mechanism of summation of the injected insulin can be observed. " +
      "When summarizing active insulins, the risk of hypoclycemia increases! In addition, find out the maximum permissible dose of insulin from the endocrinologist and try not to exceed it, including in cases of summation.",
    es: "El gráfico de insulina (arriba) refleja aproximadamente la distribución de insulina corta en el cuerpo durante el día. En el caso de que no hayan pasado 4 horas desde la última inyección, puede observar el mecanismo de aplicación de insulina." +
      "Al aplicar insulinas activas, ¡aumenta el riesgo de hipoclucemia! También solicite a su endocrinólogo la dosis máxima aceptable de insulina y trate de no excederla, incluso en el caso de la aplicación.",
    ru: "График инсулина(сверху) приблизительно отражает распределение короткого инсулина в организме в течение дня. В случае, когда с последней инъекции не прошло 4 часов, вы можете наблюдать механизм наложения введенного инсулина. " +
      "При наложении действующих инсулинов повышается опасность возникновения гипокликемии! Так же узнайте у врача-эндокринолога вашу максимально приемлемую дозировку инсулина и старайтесь не превышать её, в том числе, в случая наложения.",
    ua: "Графiк iнсулiну (згори) приблизно вiдбиває розподiл короткого iнсулiну в органiзмi протягом дня. Якщо з останньою iн'єкцiєю не минуло 4 годин, ви можете спостерiгати механiзм накладання введеного iнсулiну. При накладеннi iнсулiнiв, що дiють, пiдвищується небезпека виникнення гiпоклiкемiї! Також дiзнайтеся у лiкаря-ендокринолога ваше максимально прийнятне дозування iнсулiну i намагайтеся не перевищувати його, у тому числi, у разi накладання.",
  },
  info_day_chart_part_4: {
    en: 'The insulin graph values are directed downward, reflecting the opposite direction with the carbohydrate graph.',
    es: 'Los valores del gráfico de insulina se presionan hacia abajo, lo que refleja la dirección opuesta con el gráfico de unidades de pan',
    ru: 'Значения графика инсулина отложены вниз, что отражает противонаправленность с графиком хлебных единиц',
    ua: 'Значення графiка iнсулiну вiдкладенi вниз, що вiдображає протиспрямованiсть iз графiком хлiбних одиниць',
  },
  info_day_chart_part_5: {
    en: 'The graph of carbohydrates (bottom) is an average picture of the absorption of carbohydrates in the blood. Ask your endocrinologist about your maximum portion of carbohydrates and always try to keep within the prescribed limits.',
    es: 'El gráfico de Racion de HC (abajo) muestra promedio de la absorción de carbohidratos en la sangre.Consulte con su endocrinólogo cuál es la porción máxima de carbohidratos y siempre trate de mantenerse dentro de los límites prescritos',
    ru: 'График хлебных единиц(снизу) является усредненной картиной всасывания углеводов в кровь. Узнайте у врача-эндокринолога вашу максимальную порцию углеводов и старайтесь всегда укладываться в заданные рамки.',
    ua: 'Графiк хлiбних одиниць (знизу) є усередненою картиною всмоктування вуглеводiв у кров. Дiзнайтеся у лiкаря-ендокринолога вашу максимальну порцiю вуглеводiв i намагайтеся завжди вкладатись у заданi рамки.',
  },

  info_month_chart_part_1: {
    en: "On the monthly chart, the dots show the average levels of blood sugar, insulin and carbohydrates for the corresponding day.",
    es: "En el gráfico mensual, los puntos muestran el promedio de azúcar en sangre, isulina y Racion de HC para el día correspondiente.",
    ru: "На месячном графике точками показаны средние показатели сахара крови, иснулина и ХЕ за соотвествующий день.",
    ua: "На мiсячному графiку крапками показанi середнi показники цукру кровi, iнсулiну та ХО за вiдповiдний день.",
  },
  info_month_chart_part_2: {
    en: "Red vertical lines indicate the weekend. You can notice a systematic increase and decrease in sugar on different days of the week and analyze the cause of such jumps.",
    es: "Las líneas verticales rojas indican los fines de semana. Puede notar aumentos y disminuciones sistemáticos de azúcar en diferentes días de la semana y analizar la causa de tales saltos.",
    ru: "Красными вертикальными линиями показаны выходные дни. Вы можете заметить систематические повышения и снижения сахара в различные дни недели и проанализировать причину таких скачков.",
    ua: "Червонi вертикальнi лiнiї показують вихiднi днi. Ви можете помiтити систематичнi пiдвищення та зниження цукру у рiзнi днi тижня та проаналiзувати причину таких стрибкiв.",
  },

  info_three_month_chart_part_1: {
    en: 'Points are average values per unit of time. On a three-month chart, the unit of time is a week.',
    es: 'Los puntos son valores promedio por unidad de tiempo. En un gráfico de tres meses, la unidad de tiempo es una semana.',
    ru: 'Точки - средние значения за единицу времени. На трехмесячном графике единицей времени является неделя.',
    ua: 'Крапки – середнi значення за одиницю часу. На тримiсячному графiку одиницею часу є тиждень.',
  },
  info_three_month_chart_part_2: {
    en: 'Keep track of the seasonal distribution of blood glucose. You can determine the systematic jumps in sugar and correlate with a certain period of life. For example, vacation, illness, diet, or any specific period of life. Next time you may be better prepared for the same situation.',
    es: 'Observe el patrón estacional de distribución de glucosa en sangre. Puede determinar los saltos sistemáticos en el azúcar y correlacionarlos con un cierto período de vida. Por ejemplo, vacaciones, enfermedad, dieta o cualquier período específico de la vida. La próxima vez puede estar un poco mejor preparado para la misma situación.',
    ru: 'Наблюдайте за сезонным харакетром распределения глюкозы в крови. Вы можете определить систематические скачки сахара и соотнести с определенным периодом жизни. Например, отпуском, болезнью, диетой или любым специфическим периодом жизни. В следующий раз вы сможете быть подготовленным к такой же ситуации немного лучше.',
    ua: 'Спостерiгайте за сезонним характером розподiлу глюкози в кровi. Ви можете визначити систематичнi стрибки цукру та спiввiднести з певним перiодом життя. Наприклад, вiдпусткою, хворобою, дiєтою чи будь-яким специфiчним перiодом життя. Наступного разу ви зможете бути пiдготовленим до такої самої ситуацiї трохи краще.',
  },

  // PROFILE
  language_profile: {
    'en': 'Language',
    'es': 'Idioma',
    'ru': 'Язык',
    'ua': 'Мова',
  },
  language_change: {
    'en': 'Change',
    'es': 'Cambiar',
    'ru': 'Сменить',
    'ua': 'Змiнити',
  },
  language_change_language: {
    'en': 'Change language',
    'es': 'Cambiar idioma',
    'ru': 'Сменить язык',
    'ua': 'Змiнити мову',
  },
  language_russian: {
    'en': 'Russian',
    'es': 'Ruso',
    'ru': 'Русский',
    'ua': 'Росiйська',
  },
  language_spanish: {
    'en': 'Spanish',
    'es': 'Espanol',
    'ru': 'Испанский',
    'ua': 'iспанська',
  },
  language_english: {
    'en': 'English',
    'es': 'Ingles',
    'ru': 'Английский',
    'ua': 'Англiйська',
  },
  language_ukrainian: {
    'en': 'Ukrainian',
    'es': 'Ucranio',
    'ru': 'Украинский',
    'ua': 'Українська',
  },
  language_pick_language: {
    'en': 'Pick',
    'es': 'Elige',
    'ru': 'Выберите',
    'ua': 'Выберите',
  },
  language_approve_changing: {
    'en': 'Confirm action',
    'es': 'Confirmar acción',
    'ru': 'Подтвердите действие',
    'ua': 'Пiдтвердiть дiю',
  },
  language_popup_restarting: {
    'en': 'App will be restarted',
    'es': 'La aplicación se reiniciará',
    'ru': 'Приложение будет перезапущено',
    'ua': 'Додаток буде перезапущено',
  },
  language_restarting_causes_description: {
    'en': 'After changing the language, the application will automatically restart',
    'es': 'Después de cambiar el idioma, la aplicación se reiniciará automáticamente',
    'ru': 'После смены языка приложение будет самостоятельно перезапустится',
    'ua': 'Пiсля змiни мови програма буде самостiйно перезапустити',
  },
  write_to_developer: {
    'en': 'Write to developer',
    'es': 'Escribir al desarrollador',
    'ru': 'Написать разработчику',
    'ua': 'Написати розробнику',
  },
  shedule_select_value: {
    'en': 'Pick the coefficient for the selected elements',
    'es': 'Seleccione el coeficiente para los elementos seleccionados',
    'ru': 'Выберите коэфициент для выбранных элементов',
    'ua': 'Виберiть коефiцiєнт для вибраних елементiв',
  },
  shedule_value_popup_header: {
    'en': 'Change coefficient for selected list items',
    'es': 'Cambiar coeficiente para elementos de lista seleccionados',
    'ru': 'Изменить коэффициент для выбранных элементов списка',
    'ua': 'Змiнити коефiцiєнт для вибраних елементiв списку',
  },
  shedule_item_selected: {
    'en': 'Select',
    'es': 'Marca',
    'ru': 'Выбрать',
    'ua': 'Вибрати',
  },
  shedule_coefficient: {
    'en': 'Coefficient',
    'es': 'Coeficiente',
    'ru': 'Коэффициент',
    'ua': 'Коефiцiєнт',
  },
  shedule_time: {
    'en': 'Time',
    'es': 'Tiempo',
    'ru': 'Время',
    'ua': 'Час',
  },
  shedule_range_period: {
    'en': 'Period',
    'es': 'Período',
    'ru': 'Период',
    'ua': 'Перiод',
  },
  shedule_not_made: {
    'en': 'Schedule not yet drawn up',
    'es': 'Calendario aún no elaborado',
    'ru': 'Расписание еще не составлен',
    'ua': 'Розклад ще не складений',
  },
  change_shedule_value: {
    'en': 'Change value',
    'es': 'Cambiar valor',
    'ru': 'Изменить значение',
    'ua': 'Змiнити значення',
  },
  change_schedule: {
    'en': 'Change schedule',
    'es': 'Cambiar horario',
    'ru': 'Изменить расписание',
    'ua': 'Змiнити розклад',
  },
  make_a_schedule: {
    'en': 'Make a schedule',
    'es': 'Hacer un horario',
    'ru': 'Составить расписание',
    'ua': 'Скласти розклад',
  },
  settings_insulin_sensitivity_factor_title: {
    en: 'Insulin sensitivity factor (ISF)',
    es: 'Factor de sensibilidad a la insulina (FSI)',
    ru: 'Фактор чувствительности к инсулину (ФЧИ)',
    ua: 'Чинник чутливостi до iнсулiну (ЧЧi)',
  },
  settings_insulin_sensitivity_factor_description: {
    en: 'Insulin sensitivity factor, or correction factor, refers to the number of %glycemia_type% by which blood sugar levels fall when a person takes 1 unit of insulin',
    es: 'Muestra cuántos  %glycemia_type%  de glucosa en sangre disminuirá con la introducción de 1 unidad. insulina ultrarrápida ',
    ru: 'Показывает, на сколько %glycemia_type% понизится глюкоза крови при введении 1 ед. ультракороткого инсулина',
    ua: 'Показує, скiльки %glycemia_type% знизиться глюкоза кровi при введеннi 1 од. ультракороткого iнсулiну',
  },
  settings_insulin_sensitivity_factor_hint: {
    en: 'Define IFS for various time periods',
    es: 'Especifique el FSI para varios períodos de tiempo',
    ru: 'Укажите ФЧИ для различных промежутков времени',
    ua: 'Вкажiть ФЧi для рiзних промiжкiв часу',
  },
  profile: {
    en: 'Profile',
    es: 'Perfil',
    ru: 'Профиль',
    ua: 'Профiль',
  },
  diabetic_profile: {
    en: 'Diabetic profile',
    es: 'Perfil diabético',
    ru: 'Диабетический профиль',
    ua: 'Дiабетичний профiль',
  },
  about_diabetes_profile: {
    en: 'Adjust your settings and improve diabetes compensation',
    es: 'Ajuste su configuración y mejore la compensación',
    ru: 'Настройте ваши параметры и улучшите компенсацию',
    ua: 'Налаштуйте вашi параметри та покращiть компенсацiю',
  },
  log_out: {
    en: 'Logout',
    es: 'Cerrar sesión',
    ru: 'Выйти из аккаунта',
    ua: 'Вийти з облiкового запису',
  },
  log_out_hint: {
    en: 'To use your notes, you need to log in to your account again.',
    es: 'Para usar sus notas, deberá iniciar sesión nuevamente en su cuenta.',
    ru: 'Чтобы использовать ваши записи необходимо будет зайти снова в ваш аккаунт',
    ua: 'Щоб використовувати вашi записи необхiдно буде зайти знову до вашого облiкового запису',
  },
  leave: {
    en: 'Leave',
    es: 'Salir',
    ru: 'Выйти',
    ua: 'Вийти',
  },

  ['mg/dL']: {
    en: 'mg\u2060/\u2060dL',
    es: 'mg\u2060/\u2060dL',
    ru: 'мг\u2060/\u2060дл',
    ua: 'мг\u2060/\u2060дл',
  },
  ['mg/dL_long']: {
    en: 'milligrams per deciliter',
    es: 'miligramo por decilitro',
    ru: 'миллиграмм на децилитр',
    ua: 'мiлiграм/децилiтр',
  },
  ['mmol/L']: {
    en: 'mmol\u2060/\u2060L',
    es: 'mmol\u2060/\u2060l',
    ru: 'ммоль\u2060/\u2060л',
    ua: 'ммоль\u2060/\u2060л',
  },
  ['mmol/L_long']: {
    en: 'millimole per liter',
    es: 'milimoles por litro',
    ru: 'миллимоль на литр',
    ua: 'ммоль на лiтр',
  },
  go_to: {
    en: 'Go to',
    es: 'ir',
    ru: 'Перейти',
    ua: 'Перейти',
  },
  carbohydrates_parent_case: {
    en: 'carbohydrates',
    es: 'carbohidratos',
    ru: 'углеводов',
    ua: 'вуглеводiв'
  },
  breadUnits_parent_case: {
    en: 'carbs units',
    es: 'Racion de HC',
    ru: 'ХЕ',
    ua: 'XO',
  },
  target_glycemia: {
    en: 'Target glycemia',
    es: 'Glucemia objetivo',
    ru: 'Целевая гликемия',
    ua: 'Цiльова глiкемiя',
  },
  target_glycemia_description: {
    en: 'Enter your blood sugar target',
    es: "Indica tu objetivo de azúcar en sangre",
    ru: "Укажите целевое значение сахара крови",
    ua: "Вкажiть цiльове значення цукру в кровi",
  },

  glycemia_unit: {
    en: 'Glycemia unit',
    es: 'Unidad de glucemia',
    ru: 'Система измерений глюкометра',
    ua: 'Система вимiрiв глюкометра',
  },
  glycemia_unit_description: {
    en: 'Select which blood sugar measurement system you use',
    es: 'Indique qué sistema de medición de azúcar en la sangre usa.',
    ru: 'Укажите какой системой измерений сахара крови вы пользуетесь',
    ua: 'Вкажiть якою системою вимiрювань цукру кровi ви користуєтеся',
  },

  carb_unit_title: {
    en: 'Carbohydrates unit',
    es: 'Sistema de conteo de carbohidratos',
    ru: 'Система подсчета углеводов',
    ua: 'Система пiдрахунку вуглеводiв',
  },

  carb_unit_description: {
    en: 'Indicate which carbohydrate counting system you use',
    es: 'Indique qué sistema de conteo de carbohidratos usa',
    ru: 'Укажите какой системой подсчета углеводов вы пользуетесь',
    ua: 'Вкажiть якою системою пiдрахунку вуглеводiв ви користуєтеся',
  },

  breadUnits_measuring: {
    en: 'Carbs unit (10-12 grams)',
    es: 'Racion de HC(10-12 gramos)',
    ru: 'Хлебная единица (ХЕ)',
    ua: 'Хлiбна одиниця (ХО)',
  },
  carbohydrates_measuring: {
    en: 'Carbohydrates in grams',
    es: 'Carbohidratos en gramos',
    ru: 'Углеводы в граммах',
    ua: 'Вуглеводи у грамах',
  },

  carb_unit_weight_title: {
    en: 'Amount of carbohydrates in carbs unit',
    es: 'Cantidad de carbohidratos en Racion de HC',
    ru: 'Количество углеводов в ХЕ',
    ua: 'Кiлькiсть вуглеводiв у ХО',
  },
  carb_unit_weight_description: {
    en: 'Select the weight of the carbs unit of the system you are using',
    es: 'Especifique la cantidad de carbohidratos en Racion de HC que usa al calcular',
    ru: 'Укажите количество углеводов в ХЕ, которые вы используете при подсчете',
    ua: 'Вкажiть кiлькiсть вуглеводiв у ХО, якi ви використовуєте при пiдрахунку',
  },

  shedule_since: {
    en: 'Since(h)',
    es: 'De (horas)',
    ru: 'С(часов)',
    ua: 'З(годин)',
  },
  shedule_until: {
    en: 'Until(h)',
    es: 'Hasta (horas)',
    ru: 'До(часов)',
    ua: 'До(годин)',
  },
  shedule_value: {
    en: 'Value',
    es: 'Valor',
    ru: 'Знач.',
    ua: 'Знач.',
  },

  shedule_change: {
    en: 'Change',
    es: 'Editar',
    ru: 'Изменить',
    ua: 'Змiнити',
  },
  shedule_add: {
    en: 'Add',
    es: 'Añadir',
    ru: 'Добавить',
    ua: 'Додати',
  },
  shedule_clear: {
    en: 'Clear',
    es: 'Borrar',
    ru: 'Стереть',
    ua: 'Стерти',
  },

  insulin_sensitivity_factor: {
    en: 'Insulin sensitivity factor (ISF)',
    es: 'Factor de sensibilidad a la insulina (FSI)',
    ru: 'Фактор чувствительности к инсулину (ФЧИ)',
    ua: 'Чинник чутливостi до iнсулiну (ЧЧi)',
  },
  insulin_sensitivity_factor_description: {
    en: 'Insulin sensitivity factor, or correction factor, refers to the number of %glycemia_type% by which blood sugar levels fall when a person takes 1 unit of insulin',
    es: 'Muestra cuántos  %glycemia_type%  de glucosa en sangre disminuirá con la introducción de 1 unidad. insulina ultrarrápida ',
    ru: 'Показывает, на сколько %glycemia_type% понизится глюкоза крови при введении 1 ед. ультракороткого инсулина',
    ua: 'Показує, скiльки %glycemia_type% знизиться глюкоза кровi при введеннi 1 од. ультракороткого iнсулiну',
  },
  insulin_sensitivity_factor_hint: {
    en: 'Define IFS for various time periods',
    es: 'Especifique el FSI para varios períodos de tiempo',
    ru: 'Укажите ФЧИ для различных промежутков времени',
    ua: 'Вкажiть ЧЧi для рiзних промiжкiв часу',
  },

  insulin_to_carb_rate: {
    en: 'Insulin-to-carb ratio',
    es: 'Relación insulina a carbohidratos',
    ru: 'Углеводный коэффициент (УК)',
    ua: 'Вуглеводний коефiцiєнт (ВК)',
  },
  insulin_to_carb_rate_description: {
    en: 'The coefficient shows the amount of %breadUnits_type% absorbed by 1 unit of insulin',
    es: 'Muestra la cantidad de %breadUnits_type% absorbidos por 1 unidad de insulina.',
    ru: 'Показывает количество %breadUnits_type%, усваиваемых 1 единицей инсулина',
    ua: 'Показує кiлькiсть %breadUnits_type%, що засвоюються 1 одиницею iнсулiну',
  },
  insulin_to_carb_rate_hint: {
    en: 'Define insulin-to-carb for various time periods',
    es: 'Indique su relación insulina a carbohidratos durante varios períodos de tiempo.',
    ru: 'Укажите ваш УК для различных промежутков времени',
    ua: 'Вкажiть ваш ВК для рiзних промiжкiв часу',
  },

  since: {
    en: 'since',
    es: 'de',
    ru: 'с',
    ua: 'з',
  },
  until: {
    en: 'until',
    es: 'antes de',
    ru: 'до',
    ua: 'до',
  },
  save: {
    en: 'Save',
    es: 'Guardar',
    ru: 'Сохранить',
    ua: 'Зберегти',
  },
  need_to_fill_time_period: {
    en: 'Time gaps required',
    es: 'Rellene los espacios de tiempo',
    ru: 'Необходимо заполнить временные промежутки',
    ua: 'Необхiдно заповнити часовi промiжки',
  },

  profile_change: {
    en: 'Change',
    es: 'Editar',
    ru: 'Изменить',
    ua: 'Змiнити',
  },
  profile_apply: {
    en: 'Apply',
    es: 'Aplicar',
    ru: 'Применить',
    ua: 'Застосувати',
  },

  glycemia_settings: {
    en: 'Glycemia settings',
    es: 'Configuraciones de glucemia',
    ru: 'Настройки сахара крови',
    ua: 'Налаштування цукру кровi',
  },
  glycemia_settings_description: {
    en: 'Change your target glycemia and type of measurement for your meter',
    es: 'Cambie su glucemia objetivo y el tipo de medida para su medidor',
    ru: 'Измените целевую гликемию и тип измерений вашего глюкометра',
    ua: 'Змiнiть цiльову глiкемiю та тип вимiрювань вашого глюкометра',
  },
  carbohydrates_settings: {
    en: 'Carbs settings',
    es: 'Сonfiguraciones de contabilidad de carbohidratos',
    ru: 'Параметры учета углеводов',
    ua: 'Параметри облiку вуглеводiв',
  },
  carbohydrates_settings_description: {
    en: 'Indicate how you count carbohydrates',
    es: 'Indica como cuentas los carbohidratos',
    ru: 'Укажите как вы считаете углеводы',
    ua: 'Вкажiть як ви вважаєте вуглеводи',
  },
  insulin_settings: {
    en: 'Insulin parameters',
    es: 'Parámetros de insulina',
    ru: 'Параметры инсулина',
    ua: 'Параметри iнсулiну',
  },

  insulin_settings_description: {
    en: "Fill out and use your doctor's recommended dosage of insulin when creating notes",
    es: 'Indica su insulina recomendada "para bajar el azúcar en la sangre" и "cantidad para comer"',
    ru: 'Укажите ваш рекомендуемый инсулин "на понижение" и "на еду"',
    ua: 'Вкажiть ваш рекомендований iнсулiн "на зниження" та "на їжу"',
  },

  we_will_recalculating_your_notes: {
    en: 'App will recalculate your data',
    es: 'Contamos sus datos',
    ru: 'Мы пересчитаем ваши данные',
    ua: 'Ми перерахуємо вашi данi',
  },
  its_need_to_fit: {
    en: 'It is need to fit the new measurement system',
    es: 'Esto es necesario para cumplir con el nuevo sistema de medición.',
    ru: 'Это необходимо для соответствия новой системе измерений',
    ua: 'Це необхiдно для вiдповiдностi новiй системi вимiрювань',
  },
  please_do_not_close_app: {
    en: 'Please do not close the application! It does not take much time',
    es: '¡Por favor no cierre la aplicación! No toma mucho tiempo',
    ru: 'Пожалуйста, не закрывайте приложение! Это не займет много времени',
    ua: 'Будь ласка, не закривайте програму! Це не займе багато часу',
  },
  sync_data_with_server: {
    'en': 'Execute',
    'es': 'Ejecutar',
    'ru': 'Выполнить',
    'ua': 'Виконати',
  },
  sync_data_with_server_description: {
    'en': 'Sync data with server',
    'es': 'Sincronizar datos con el servidor',
    'ru': 'Синхронизировать данные с сервером',
    'ua': 'Синхронiзувати данi iз сервером',
  },
  synced_successfully: {
    'en': 'Data synced successfully',
    'es': 'Datos sincronizados correctamente',
    'ru': 'Данные успешно синхронизированы',
    'ua': 'Данi успiшно синхронiзованi',
  },
  go_to_main: {
    'en': 'To the main',
    'es': 'A la principal',
    'ru': 'На главную',
    'ua': 'На головну',
  },
  sync_end_cool: {
    'en': 'Great',
    'es': 'Bueno',
    'ru': 'Отлично',
    'ua': 'Чудово',
  },

  // GENERAL
  cancel: {
    en: 'Cancel',
    es: 'Cancelar',
    ru: 'Отмена',
    ua: 'Скасування',
  },
  back: {
    en: 'Back',
    es: 'Atrás',
    ru: 'Назад',
    ua: 'Назад',
  },
  not_selected: {
    en: 'not selected',
    es: 'No seleccionado',
    ru: 'не выбрано',
    ua: 'не обрано',
  },
  are_you_sure: {
    en: 'Are you sure?',
    es: 'Está seguro?',
    ru: 'Вы уверены?',
    ua: 'Ви впевненi?',
  },

  ok: {
    en: 'OK',
    es: 'OK',
    ru: 'OK',
    ua: 'OK',
  },
  yes: {
    en: 'Yes',
    es: 'Si',
    ru: 'Да',
    ua: 'Так',
  },
  got_it: {
    en: 'Ok. Got it',
    es: 'Entendido',
    ru: 'Ок, понятно',
    ua: 'Оk, зрозумiло',
  },

  links_in_text: {
    'en': 'Links in the text',
    'es': 'Enlaces en el texto',
    'ru': 'Ссылки в тексте',
    'ua': 'Посилання у текстi',
  },

  active_network_needed: {
    en: 'You need to connect to the internet',
    es: 'Se necesita red activa',
    ru: 'Необходимо интернет-соединение',
    ua: `Необхiдне iнтернет-з'єднання`,
  },
  server_is_not_available_try_to_restart_app: {
    en: 'Server is currently unavailable. Try restarting the application.',
    es: 'El servidor no está disponible actualmente. Intenta reiniciar la aplicación.',
    ru: 'В данный момент сервер недоступен. Попробуйте перезапустить приложение.',
    ua: 'На даний момент сервер недоступний. Спробуйте перезапустити програму.',
  },
  no_data_for_the_period: {
    en: 'There is no data for the period',
    es: 'No hay datos para el período',
    ru: 'Нет данных за данный период',
    ua: 'Немає даних за цей перiод',
  },

  //ERROR
  user_properties_changing_error: {
    en: 'Error changing user settings',
    es: 'Error al cambiar la configuración del usuario',
    ru: 'Ошибка при изменении параметров пользователя',
    ua: 'Помилка змiни параметрiв користувача',
  },
  shedule_sync_error: {
    en: 'Error synchronizing schedule with server',
    es: 'Error al sincronizar la programación con el servidor',
    ru: 'Ошибка синхронизации расписания с сервером',
    ua: 'Помилка синхронiзацiї розкладу iз сервером',
  },
  sync_pending_error: {
    en: 'Error synchronizing tags with server',
    es: 'Error al sincronizar las etiquetas con el servidor',
    ru: 'Ошибка при синхронизации тегов с сервером',
    ua: 'Помилка при синхронiзацiї тегiв iз сервером',
  },
  note_updating_error: {
    en: 'Error updating record on server',
    es: 'Error al actualizar el registro en el servidor',
    ru: 'Ошибка обновления записи на сервере',
    ua: 'Помилка оновлення запису на серверi',
  },
  notes_sync_error: {
    en: 'Error synchronizing records with the server',
    es: 'Error al sincronizar registros con el servidor',
    ru: 'Ошибка синхронизации записей с сервером',
    ua: 'Помилка синхронiзацiї записiв iз сервером',
  },
  notes_deleting_error: {
    en: 'Error deleting record from server',
    es: 'Error al eliminar el registro del servidor',
    ru: 'Ошибка удаления записи с сервера',
    ua: 'Помилка видалення запису iз сервера',
  },
  notes_get_error: {
    en: 'Error getting notes from server',
    es: 'Error al obtener registros del servidor',
    ru: 'Ошибка получения записей с сервера',
    ua: 'Помилка отримання записiв iз сервера',
  },
  notes_creating_error: {
    en: 'Error creating server record',
    es: 'Error al crear el registro del servidor',
    ru: 'Ошибка создания записи на сервер',
    ua: 'Помилка створення запису на сервер',
  },
  google_auth_error: {
    en: 'Login failed',
    es: 'Error de inicio de sesion',
    ru: 'Войти не удалось',
    ua: 'Увiйти не вдалося',
  },
  export_error: {
    en: 'Export error',
    es: 'Error de exportación',
    ru: 'Ошибка экспорта',
    ua: 'Помилка експорту',
  },
  onboarding_complete_error: {
    en: 'An error occurred while saving the entered data. You can try again in settings. We apologize',
    es: 'Se produjo un error al guardar los datos ingresados. Puedes volver a intentarlo en la configuración. Pedimos disculpas',
    ru: 'Произошла ошибка при сохранении введенных данных. Вы можете повторить загрузку в настройках. Приносим свои извинения',
    ua: 'Виникла помилка при збереженнi введених даних. Ви можете повторити завантаження в установках. Приносимо свої вибачення',
  },

  // DASHBOARD
  compensation: {
    en: 'Compensation',
    es: 'Сompensación',
    ru: 'Компенсация',
    ua: 'Компенсацiя',
  },
  last_notes: {
    en: 'Recent notes',
    es: 'Ultimas notas',
    ru: 'Последние записи',
    ua: 'Останнi записи',
  },
  no_recent_notes_today: {
    en: 'No notes yet today',
    es: 'No hay registros para hoy',
    ru: 'Нет записей за сегодняшний день',
    ua: 'Немає записiв за сьогоднiшнiй день',
  },
  glucose_chart: {
    en: 'Glucose chart',
    es: 'Gráfico de glucosa',
    ru: 'График глюкозы',
    ua: 'Графiк глюкози',
  },
  rest_active_insulin: {
    en: 'Active insulin',
    es: 'Insulina activa',
    ru: 'Действующий инсулин',
    ua: 'Чинний iнсулiн',
  },
  expires_in: {
    en: 'Expires in',
    es: 'Expira en',
    ru: 'Истекает через',
    ua: 'Спливає через',
  },
  minutes_short: {
    en: 'min',
    es: 'min',
    ru: 'мин',
    ua: 'хв',
  },
  hours_short: {
    en: 'h',
    es: 'h',
    ru: 'ч',
    ua: 'год',
  },
  statistics_today: {
    en: 'Today',
    es: 'Hoy',
    ru: 'Сегодня',
    ua: 'Сьогоднi',
  },
  statistics_yesterday: {
    en: 'Yesterday',
    es: 'Ayer',
    ru: 'Вчера',
    ua: 'Вчора',
  },
  statistics_last_month: {
    en: 'Last month',
    es: 'El mes pasado',
    ru: 'Последний месяц',
    ua: 'Останнiй мiсяць',
  },
  statistics_last_three_month: {
    en: 'Last three month',
    es: 'Últimos tres meses',
    ru: 'Последние три месяца',
    ua: 'Останнi три мiсяцi',
  },

  breadUnits_long: {
    en: 'Carbs units',
    es: 'Racion de HC',
    ru: 'Хлебные единицы',
    ua: 'Хлiбнi одиницi',
  },
  carbohydrates_long: {
    en: 'Carbohydrates',
    es: 'Carbohidratos',
    ru: 'Углеводы',
    ua: 'Вуглеводи',
  },
  one_bread_unit_contents: {
    en: '.\nCarbs unit contents %number% grams of carbohydrates.',
    es: '.\n1 Racion de HC contiene %number% gramos de carbohidratos.',
    ru: '.\nОдна ХЕ содержит %number% грамм углеводов.',
    ua: '.\nОдна ХO мiстить %number% г вуглеводiв.',
  },

  hypoglycemia_count: {
    en: 'Hypoglycemia',
    es: 'Hipoglucemia',
    ru: 'Гипогликемия',
    ua: 'Гiпоглiкемiя',
  },
  hyperglycemia_count: {
    en: 'Hyperglycemia',
    es: 'Hiperglucemia',
    ru: 'Гипергликемия',
    ua: 'Гiперглiкемiя',
  },
  normalglycemia_count: {
    en: 'Normal sugar',
    es: 'Norma',
    ru: 'Норма',
    ua: 'Норма',
  },

  glucose_icon_tooltip: {
    en: 'Blood glucose. Measured in %measure%.\nTarget glycemia is %target% %measure%.\nNormal sugar is between %min% and %max%.',
    es: 'Glucosa en sangre.Se mide en %measure%.\nGlucemia objetivo indicada como %target% %measure%.\nNorma que va desde %min% hasta %max%.',
    ru: 'Глюкоза крови. Измеряется в %measure%.\nЦелевая гликемия указана как %target% %measure%.\nНорма в пределах от %min% до %max%.',
    ua: 'Глюкоза кровi. Вимiрюється у %measure%.\Цiльова глiкемiя вказана як %target% %measure%.\nНорма в межах вiд %min% до %max%.',
  },
  breadunits_icon_tooltip: {
    en: '%type%%for_bu%',
    es: '%type%%for_bu%',
    ru: '%type%%for_bu%',
    ua: '%type%%for_bu%',
  },
  note_date_and_time: {
    en: 'Note time',
    es: 'Tiempo de creación de nota',
    ru: 'Время записи',
    ua: 'Час запису',
  },
  short_insulin_icon_tooltip: {
    en: 'Ultra short-acting Insulin',
    es: 'Insulina de acción ultrarapida',
    ru: 'Инсулин ультракороткого действия',
    ua: 'iнсулiн ультракороткої дiї',
  },
  long_insulin_icon_tooltip: {
    en: 'Long-acting insulin',
    es: 'Insulina de acción prolongada',
    ru: 'Инсулин пролонгированного действия',
    ua: 'iнсулiн пролонгованої дiї',
  },

  your_hba1c: {
    en: 'HbA1c',
    es: 'HbA1c',
    ru: 'HbA1c',
    ua: 'HbA1c',
  },
  glycated_hemoglobin: {
    en: 'Glycated hemoglobin',
    es: 'Hemoglobina glicada',
    ru: 'Гликированный гемоглобин',
    ua: 'Глiкований гемоглобiн',
  },
  calculated_days: {
    en: 'Calculated days',
    es: 'Cantidad de dias',
    ru: 'Количество дней',
    ua: 'Кiлькiсть днiв',
  },
  calculate: {
    en: 'Calculate',
    es: 'Calcular',
    ru: 'Рассчитать',
    ua: 'Розрахувати',
  },
  too_little_data_for_advanced_analys: {
    en: 'Too little data for accurate analysis.',
    es: 'Muy pocos datos para un análisis preciso.',
    ru: 'Слишком мало данных для точного анализа.',
    ua: 'Занадто мало даних для точного аналiзу.',
  },
  glucose_not_found_for_diagram: {
    en: 'No glucose data to display diagram',
    es: 'No hay datos de glucosa disponibles para mostrar el gráfico',
    ru: 'Нет данных для глюкозы, чтобы отобразить диаграмму',
    ua: 'Немає даних для глюкози, щоб вiдобразити дiаграму',
  },

  // EXPORT
  export_date_descending: {
    'en': 'From new to old',
    'es': 'De nuevo a viejo',
    'ru': 'От новых к старым',
    'ua': 'Вiд нових до старих',
  },
  export_date_ascending: {
    'en': 'From old to new',
    'es': 'De viejo a nuevo',
    'ru': 'От старых к новым',
    'ua': 'Вiд старих до нових',
  },
  export_date_sort: {
    'en': 'Sort by date',
    'es': 'Ordenar por fecha',
    'ru': 'Сортировка по дате',
    'ua': 'Сортування за датою',
  },
  export_data: {
    en: 'Data export',
    es: 'Exportación de datos',
    ru: 'Экспорт данных',
    ua: 'Експорт даних',
  },
  export_data_description: {
    en: 'Create report about your diabetes in the .XLSX extention. Open it with EXCEL',
    es: 'Crear informes de registros en formato .XLSX. Ábrelos en EXCEL',
    ru: 'Создавайте отчеты о записях в формате .XLSX. Открывайте их в EXCEL',
    ua: 'Створюйте звiти про записи у форматi .XLSX. Вiдкривайте їх у EXCEL',
  },

  export_data_creating: {
    en: 'Creating export',
    es: 'Crear exportación',
    ru: 'Создание экспорта',
    ua: 'Створення експорту',
  },
  export_data_create_xlsx: {
    en: 'Create xlsx file',
    es: 'Crear reporte',
    ru: 'Создать файл',
    ua: 'Створити файл',
  },
  export_data_date_period: {
    en: 'Period',
    es: 'Período',
    ru: 'Период',
    ua: 'Перiод',
  },
  export_data_date_from: {
    en: 'From',
    es: 'De',
    ru: 'С',
    ua: 'З',
  },
  export_data_date_to: {
    en: 'To',
    es: 'Hasta',
    ru: 'До',
    ua: 'До',
  },
  export_titles_date: {
    en: 'Date',
    es: 'Fecha',
    ru: 'Дата',
    ua: 'Дата',
  },
  export_titles_time: {
    en: 'Time',
    es: 'Tiempo',
    ru: 'Время',
    ua: 'Час',
  },
  export_titles_glucose: {
    en: 'Glucose (%type%)',
    es: 'Glucosa (%type%)',
    ru: 'Глюкоза (%type%)',
    ua: 'Глюкоза (%type%)',
  },
  exports_titles_breadUnits: {
    en: '%type% %weight_if_bu%',
    es: '%type% %weight_if_bu%',
    ru: '%type% %weight_if_bu%',
    ua: '%type% %weight_if_bu%',
  },
  exports_titles_insulin: {
    en: 'Rapid insulin',
    es: 'Insulina ultrarapida',
    ru: 'Короткий инсулин',
    ua: 'Короткий iнсулiн',
  },
  exports_titles_longInsulin: {
    en: 'Long insulin',
    es: 'Insulina prolongada',
    ru: 'Пролонгированный инсулин',
    ua: 'Пролонгований iнсулiн',
  },
  exports_titles_comment: {
    en: 'Comment',
    es: 'Comentario',
    ru: 'Комментарий',
    ua: 'Коментар',
  },
  export_data_titles_statistics_name: {
    en: "Name",
    es: 'Tipo',
    ru: "Название",
    ua: "Назва",
  },
  export_data_titles_statistics_name_value: {
    en: "Value",
    es: 'Valor',
    ru: "Значение",
    ua: "Значення",
  },
  export_data_titles_average_glucose: {
    en: 'Average daily glucose (%type%)',
    es: 'Glucosa diaria promedio(%type%)',
    ru: 'Средняя глюкоза (%type%)',
    ua: 'Середня глюкоза (%type%)',
  },
  export_data_titles_average_breadUnits: {
    en: 'Average daily carbs. %type% %weight_if_bu%',
    es: 'Promedio de carbohidratos diarios. %type% %weight_if_bu%',
    ru: 'Среднесуточные углеводы. %type% %weight_if_bu%',
    ua: 'Середньодобовi вуглеводи. %type% %weight_if_bu%',
  },
  export_data_titles_average_insulin: {
    en: 'Average daily short insulin',
    es: 'Promedio diario de insulina ultrarapida',
    ru: 'Среднесуточный короткий инслуин',
    ua: 'Середньодобовий короткий iнсулiн',
  },
  export_data_titles_average_long_insulin: {
    en: 'Average daily long insulin',
    es: 'Promedio diario de insulina prolongada',
    ru: 'Среднесуточный пролонгированный инсулин',
    ua: 'Середньодобовий пролонгований iнсулiн',
  },
  export_data_titles_average_total_notes: {
    en: 'Total notes in report',
    es: 'Registros totales',
    ru: 'Всего записей',
    ua: 'Усього записiв',
  },
  export_data_titles_average_date_from: {
    en: 'Report start date',
    es: 'Fecha de inicio del informe',
    ru: 'Дата начала отчета',
    ua: 'Дата початку звiту',
  },
  export_data_titles_average_date_to: {
    en: 'Report end date',
    es: 'Fecha de finalización del informe',
    ru: 'Дата окончания отчета',
    ua: 'Дата закiнчення звiту',
  },

  //ONBOARDING
  continue: {
    en: 'Continue',
    es: 'Continuar',
    ru: 'Продолжить',
    ua: 'Продовжити',
  },
  skip: {
    en: 'Skip',
    es: 'Omitir',
    ru: 'Пропустить',
    ua: 'Пропустити',
  },
  fill_information_about_yourself: {
    en: 'Fill in information about yourself',
    es: 'Complete la información sobre usted',
    ru: 'Заполните информацию о себе',
    ua: 'Заповнiть iнформацiю про себе',
  },
  do_you_use_insulin: {
    'en': 'I use insulin',
    'es': 'Yo uso insulina',
    'ru': 'Я использую инсулин',
    'ua': 'Я використовую iнсулiн',
  },
  select_insulin_type_you_use: {
    'en': 'Choose the type of action of your insulin',
    'es': 'Elige el tipo de acción de tu insulina',
    'ru': 'Выберите тип действия вашего инсулина',
    'ua': 'Виберiть тип дiї вашого iнсулiну',
  },
  short_insulin: {
    'en': 'Short-acting insulin',
    'es': 'Insulina rápida',
    'ru': 'Инсулин короткого действия',
    'ua': 'iнсулiн короткої дiї',
  },
  ultra_short_insulin: {
    'en': 'Rapid-acting insulin',
    'es': 'Insulina ultrarápida',
    'ru': 'Инсулин ультракороткого действия',
    'ua': 'iнсулiн ультракороткої дiї',
  },
  you_can_change_it_later: {
    'en': 'You can change these parameters later in the settings',
    'es': 'Puede cambiar estos parámetros más adelante en la configuración',
    'ru': 'Вы можете изменить эти параметры позже в настройках',
    'ua': 'Ви можете змiнити цi параметри пiзнiше в налаштуваннях',
  },
  active_insulin_counter_description: {
    'en': 'Remaining insulin from the last injection. This is an approximate value',
    'es': 'Insulina restante de la última inyección. Este es un valor aproximado',
    'ru': 'Оставшийся инсулин после последней инъекции. Это приблизительное значение',
    'ua': `iнсулiн, що залишився пiсля останньої iн'єкцiї. Це приблизне значення`,
  },
  to_observe_your_active_insuline_select_your_short_insulin_type_please: {
    'en': 'To track insulin distribution over time, select your short insulin type',
    'es': 'Para rastrear la distribución de insulina a lo largo del tiempo, seleccione el tipo de insulina corta',
    'ru': 'Чтобы отслеживать распределение инсулина с течением времени, выберите короткий тип инсулина',
    'ua': 'Щоб вiдстежувати розподiл iнсулiну з часом, виберiть короткий тип iнсулiну',
  },
  set_insulin_type: {
    'en': 'Specify type',
    'es': 'Especifique el tipo',
    'ru': 'Указать тип',
    'ua': 'Вказати тип',
  },
  it_needs_to_show_charts_and_calculating_active_insulin: {
    'en': 'This is necessary for calculating active insulin and charts',
    'es': 'Esto es necesario para calcular la insulina activa y los gráficos',
    'ru': 'Это необходимо для расчета активного инсулина и графиков',
    'ua': 'Це необхiдно для розрахунку активного iнсулiну та графiкiв',
  },
  short_insulin_brief: {
    'en': 'The onset of action is usually 30-60 minutes.\n The maximum effect occurs in 2-4 hours.\n The total duration of action is up to 6-8 hours',
    'es': 'El inicio de acción suele ser de 30 a 60 minutos.\n El efecto máximo ocurre en 2-4 horas.\n La duración total de la acción es de hasta 6-8 horas.',
    'ru': 'Начало действия обычно составляет 30-60 минут.\n Максимальный эффект наступает через 2-4 часа.\n Общая продолжительность действия до 6-8 часов',
    'ua': 'Початок дiї зазвичай становить 30-60 хвилин.\n Максимальний ефект настає через 2-4 години.\n Загальна тривалiсть дiї до 6-8 годин',
  },
  ultra_short_insulin_brief: {
    'en': 'The onset of action is usually 10-20 minutes.\n The maximum effect occurs in 1-2 hours.\n The total duration of action is up to 4-5 hours',
    'es': 'El inicio de acción suele ser de 10 a 20 minutos. El efecto máximo ocurre en 1-2 horas. La duración total de la acción es de hasta 4-5 horas',
    'ru': 'Начало действия обычно составляет 10-20 минут.\n Максимальный эффект наступает через 1-2 часа.\n Общая продолжительность действия до 4-5 часов',
    'ua': 'Початок дiї зазвичай становить 10-20 хвилин.\n Максимальний ефект настає через 1-2 години.\n Загальна тривалiсть дiї до 4-5 годин',
  },
  default_selection: {
    'en': 'Default selection',
    'es': 'Selección predeterminada',
    'ru': 'Выбор по умолчанию',
    'ua': 'Вибiр за замовчуванням',
  },

  //NOTE_EDITOR
  note_editing: {
    'en': 'Edit note',
    'es': 'Editar nota',
    'ru': 'Редактирование записи',
    'ua': 'Редагування запису',
  },
  note_creation: {
    'en': 'Create note',
    'es': 'Crear nota',
    'ru': 'Создание записи',
    'ua': 'Створення запису',
  },
  add_tag_to_note: {
    'en': 'Add tag',
    'es': 'Añadir etiqueta',
    'ru': 'Добавить тег',
    'ua': 'Додати тег',
  },
  there_are_no_tags: {
    'en': 'No tags found',
    'es': 'No se encontraron etiquetas',
    'ru': 'Теги не найдены',
    'ua': 'Мiтки не знайденi',
  },
  create_tags: {
    'en': 'Create tags',
    'es': 'Crear etiquetas',
    'ru': 'Создать теги',
    'ua': 'Створити теги',
  },
  before_meal: {
    'en': 'Before eating',
    'es': 'Antes de comer',
    'ru': 'Перед едой',
    'ua': 'Перед їжею',
  },
  after_meal: {
    'en': '2 hours after eating',
    'es': '2 horas después de comer',
    'ru': '2 часа после еды',
    'ua': '2 години пiсля їди',
  },
  tags: {
    'en': 'Tags',
    'es': 'Etiquetas',
    'ru': 'Теги',
    'ua': 'Теги',
  },
  tags_run_out: {
    'en': 'Tags have run out',
    'es': 'No más etiquetas',
    'ru': 'Теги закончились',
    'ua': 'Теги закiнчилися',
  },
  tag_editor: {
    'en': 'Tags',
    'es': 'Etiquetas',
    'ru': 'Теги',
    'ua': 'Теги',
  },
  create: {
    'en': 'Create',
    'es': 'Crear',
    'ru': 'Создать',
    'ua': 'Створити',
  },
  enter_tag: {
    'en': 'Enter a tag',
    'es': 'Ingrese una etiqueta',
    'ru': 'Введите тег',
    'ua': 'Введiть тег',
  },
  you_want_to_delete_tag: {
    'en': 'Do you want to remove this tag?',
    'es': '¿Quieres eliminar esta etiqueta?',
    'ru': 'Хотите удалить этот тег?',
    'ua': 'Бажаєте видалити цей тег?',
  },
  you_wont_use_this_tag_anymore_for_filtering_notes: {
    'en': 'You will no longer be able to use this tag when filtering notes',
    'es': 'Ya no podrá usar esta etiqueta al filtrar notas',
    'ru': 'Вы не сможете больше использовать этот тег для фильтрации записей',
    'ua': 'Ви не зможете бiльше використовувати цей тег для фiльтрацiї записiв',
  },
  filter: {
    'en': 'Filter',
    'es': 'Filtrar',
    'ru': 'Фильтр',
    'ua': 'Фiльтр',
  },
  with_high_glucose: {
    'en': 'Hyperglycemia',
    'es': 'Hiperglucemia',
    'ru': 'Гипергликемия',
    'ua': 'Гiперглiкемiя',
  },
  with_low_glucose: {
    'en': 'Hypoglycemia',
    'es': 'Hipoglucemia',
    'ru': 'Гипогликемия',
    'ua': 'Гiпоглiкемiя',
  },
  with_normal_glucose: {
    'en': 'Normal glycemia',
    'es': 'Glucemia normal',
    'ru': 'Нормальная гликемия',
    'ua': 'Нормальна глiкемiя',
  },
  with_comment: {
    'en': 'With comment',
    'es': 'Con comentario',
    'ru': 'С комментарием',
    'ua': 'З коментарем',
  },
  with_tags: {
    'en': 'With tags',
    'es': 'Con etiquetas',
    'ru': 'С тегами',
    'ua': 'З тегами',
  },
  clear: {
    'en': 'Clear',
    'es': 'Regreso',
    'ru': 'Очистить',
    'ua': 'Очистити',
  },
  apply: {
    'en': 'Apply',
    'es': 'Aplicar',
    'ru': 'Применить',
    'ua': 'Застосувати',
  },
  fasting: {
    'en': 'Fasting',
    'es': 'En ayunas',
    'ru': 'Натощак',
    'ua': 'Натщесерце',
  },
  before_bedtime: {
    'en': 'Before bedtime',
    'es': 'Аntes de dormir',
    'ru': 'Перед сном',
    'ua': 'Перед сном',
  },
  cannot_open_tg_webpage: {
    'en': 'Failed to open internet browser. Please find the account in the telegram app yourself.',
    'es': 'No se pudo abrir el navegador de Internet. Encuentre la cuenta en la aplicación de Telegram usted mismo.',
    'ru': 'Не получилось открыть интернет-браузер. Пожалуйста, найдите аккаунт в приложении телеграм самостоятельно.',
    'ua': 'Не вдалося вiдкрити iнтернет-браузер. Будь ласка, знайдiть облiковий запис у програмi телеграм самостiйно.',
  },
  cannot_open_mail_app: {
    'en': 'Failed to open mail app. Please go to the mail yourself and send a message.',
    'es': 'Error al abrir la aplicación de correo. Por favor, vaya al correo usted mismo y envíe un mensaje.',
    'ru': 'Не получилось открыть почтовое приложение. Пожалуйста, перейдите на почту самостоятельно и отправьте сообщение.',
    'ua': 'Не вдалося вiдкрити поштову програму. Будь ласка, перейдiть на пошту самостiйно та надiшлiть повiдомлення.',
  },
  notifications: {
    'en': 'Notifications',
    'es': 'Notificaciones',
    'ru': 'Уведомления',
    'ua': 'Сповіщення',
  },
  mark_as_red: {
    'en': 'Mark all as read',
    'es': 'Marcar todo como leido',
    'ru': 'Пометить всё как прочитанное',
    'ua': 'Позначити все як прочитане',
  },
}
