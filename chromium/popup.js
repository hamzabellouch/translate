/**
 * Google Translate Capsule - Clean Browser Style Capsule Grid Controller (Chromium MV3)
 * Supports Quick Capsules + Full 243 Languages Browser with Live State Sync & Fast Translation
 */

const ALL_LANGUAGES = [
  { code: 'ab', name: 'Abkhaz', native: 'Аҧсуа', flag: '🇬🇪' },
  { code: 'ace', name: 'Acehnese', native: 'Acèh', flag: '🇮🇩' },
  { code: 'ach', name: 'Acholi', native: 'Acoli', flag: '🇺🇬' },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans', flag: '🇿🇦' },
  { code: 'sq', name: 'Albanian', native: 'Shqip', flag: '🇦🇱' },
  { code: 'alz', name: 'Alur', native: 'Alur', flag: '🇺🇬' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇲🇦' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն', flag: '🇦🇲' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'av', name: 'Avar', native: 'Авар', flag: '🇷🇺' },
  { code: 'awa', name: 'Awadhi', native: 'अवधी', flag: '🇮🇳' },
  { code: 'ay', name: 'Aymara', native: 'Aymar aru', flag: '🇧🇴' },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan', flag: '🇦🇿' },
  { code: 'ban', name: 'Balinese', native: 'Basa Bali', flag: '🇮🇩' },
  { code: 'bal', name: 'Baluchi', native: 'بلوچی', flag: '🇵🇰' },
  { code: 'bm', name: 'Bambara', native: 'Bamanankan', flag: '🇲🇱' },
  { code: 'ba', name: 'Bashkir', native: 'Башҡортса', flag: '🇷🇺' },
  { code: 'eu', name: 'Basque', native: 'Euskara', flag: '🇪🇸' },
  { code: 'btx', name: 'Batak Karo', native: 'Batak Karo', flag: '🇮🇩' },
  { code: 'bts', name: 'Batak Simalungun', native: 'Batak Simalungun', flag: '🇮🇩' },
  { code: 'bbc', name: 'Batak Toba', native: 'Batak Toba', flag: '🇮🇩' },
  { code: 'be', name: 'Belarusian', native: 'Беларуская', flag: '🇧🇾' },
  { code: 'bem', name: 'Bemba', native: 'Ichibemba', flag: '🇿🇲' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
  { code: 'bew', name: 'Betawi', native: 'Betawi', flag: '🇮🇩' },
  { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी', flag: '🇮🇳' },
  { code: 'bik', name: 'Bikol', native: 'Bikol', flag: '🇵🇭' },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski', flag: '🇧🇦' },
  { code: 'br', name: 'Breton', native: 'Brezhoneg', flag: '🇫🇷' },
  { code: 'bg', name: 'Bulgarian', native: 'Български', flag: '🇧🇬' },
  { code: 'bua', name: 'Buryat', native: 'Буряад', flag: '🇷🇺' },
  { code: 'yue', name: 'Cantonese', native: '粵語', flag: '🇭🇰' },
  { code: 'ca', name: 'Catalan', native: 'Català', flag: '🇪🇸' },
  { code: 'ceb', name: 'Cebuano', native: 'Cebuano', flag: '🇵🇭' },
  { code: 'ch', name: 'Chamorro', native: 'Chamoru', flag: '🇬🇺' },
  { code: 'ce', name: 'Chechen', native: 'Нохчийн', flag: '🇷🇺' },
  { code: 'ny', name: 'Chichewa (Nyanja)', native: 'Chichewa', flag: '🇲🇼' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '中文 (简体)', flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', native: '中文 (繁體)', flag: '🇹🇼' },
  { code: 'chk', name: 'Chuukese', native: 'Chuuk', flag: '🇫🇲' },
  { code: 'cv', name: 'Chuvash', native: 'Чӑвашла', flag: '🇷🇺' },
  { code: 'co', name: 'Corsican', native: 'Corsu', flag: '🇫🇷' },
  { code: 'crh', name: 'Crimean Tatar', native: 'Qırımtatarca', flag: '🇺🇦' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski', flag: '🇭🇷' },
  { code: 'cs', name: 'Czech', native: 'Čeština', flag: '🇨🇿' },
  { code: 'da', name: 'Danish', native: 'Dansk', flag: '🇩🇰' },
  { code: 'fa-AF', name: 'Dari', native: 'دری', flag: '🇦🇫' },
  { code: 'dv', name: 'Dhivehi', native: 'ދިވެހި', flag: '🇲🇻' },
  { code: 'din', name: 'Dinka', native: 'Thuɔŋjäŋ', flag: '🇸🇸' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी', flag: '🇮🇳' },
  { code: 'dov', name: 'Dombe', native: 'Dombe', flag: '🇿🇼' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands', flag: '🇳🇱' },
  { code: 'dyu', name: 'Dyula', native: 'Julakan', flag: '🇨🇮' },
  { code: 'dz', name: 'Dzongkha', native: 'རྫོང་ཁ', flag: '🇧🇹' },
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'eo', name: 'Esperanto', native: 'Esperanto', flag: '<svg class="custom-flag-svg" viewBox="0 0 36 24" width="20" height="14"><rect width="36" height="24" fill="#009900"/><rect width="13" height="12" fill="#ffffff"/><polygon points="6.5,2 7.6,5 10.8,5.1 8.2,7.1 9.1,10.1 6.5,8.3 3.9,10.1 4.8,7.1 2.2,5.1 5.4,5" fill="#009900"/></svg>' },
  { code: 'et', name: 'Estonian', native: 'Eesti', flag: '🇪🇪' },
  { code: 'ee', name: 'Ewe', native: 'Eʋegbe', flag: '🇬🇭' },
  { code: 'fo', name: 'Faroese', native: 'Føroyskt', flag: '🇫🇴' },
  { code: 'fj', name: 'Fijian', native: 'Na Vosa Vakaviti', flag: '🇫🇯' },
  { code: 'fil', name: 'Filipino (Tagalog)', native: 'Filipino', flag: '🇵🇭' },
  { code: 'fi', name: 'Finnish', native: 'Suomi', flag: '🇫🇮' },
  { code: 'fon', name: 'Fon', native: 'Fɔngbe', flag: '🇧🇯' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'fy', name: 'Frisian', native: 'Frysk', flag: '🇳🇱' },
  { code: 'fur', name: 'Friulian', native: 'Furlan', flag: '🇮🇹' },
  { code: 'ff', name: 'Fulani', native: 'Fulfulde', flag: '🇸🇳' },
  { code: 'gaa', name: 'Ga', native: 'Ga', flag: '🇬🇭' },
  { code: 'gl', name: 'Galician', native: 'Galego', flag: '🇪🇸' },
  { code: 'ka', name: 'Georgian', native: 'ქართული', flag: '🇬🇪' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'gn', name: 'Guarani', native: 'Avañeʼẽ', flag: '🇵🇾' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl ayisyen', flag: '🇭🇹' },
  { code: 'cnh', name: 'Hakha Chin', native: 'Lai holh', flag: '🇲🇲' },
  { code: 'ha', name: 'Hausa', native: 'Hausa', flag: '🇳🇬' },
  { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi', flag: '🇺🇸' },
  { code: 'hil', name: 'Hiligaynon', native: 'Ilonggo', flag: '🇵🇭' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'hmn', name: 'Hmong', native: 'Hmoob', flag: '🇱🇦' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar', flag: '🇭🇺' },
  { code: 'hrx', name: 'Hunsrik', native: 'Hunsrik', flag: '🇧🇷' },
  { code: 'iba', name: 'Iban', native: 'Iban', flag: '🇲🇾' },
  { code: 'is', name: 'Icelandic', native: 'Íslenska', flag: '🇮🇸' },
  { code: 'ig', name: 'Igbo', native: 'Asụsụ Igbo', flag: '🇳🇬' },
  { code: 'ilo', name: 'Ilocano', native: 'Ilokano', flag: '🇵🇭' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'iu', name: 'Inuktitut', native: 'ᐃᓄᒃᑎᑐᑦ', flag: '🇨🇦' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge', flag: '🇮🇪' },
  { code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  { code: 'jam', name: 'Jamaican Patois', native: 'Patwa', flag: '🇯🇲' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'jw', name: 'Javanese', native: 'Basa Jawa', flag: '🇮🇩' },
  { code: 'kac', name: 'Jingpo', native: 'Jingpho', flag: '🇲🇲' },
  { code: 'kl', name: 'Kalaallisut', native: 'Kalaallisut', flag: '🇬🇱' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'kr', name: 'Kanuri', native: 'Kanuri', flag: '🇳🇬' },
  { code: 'pam', name: 'Kapampangan', native: 'Kapampangan', flag: '🇵🇭' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақ тілі', flag: '🇰🇿' },
  { code: 'kha', name: 'Khasi', native: 'Khasi', flag: '🇮🇳' },
  { code: 'km', name: 'Khmer', native: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'cgg', name: 'Kiga', native: 'Rukiga', flag: '🇺🇬' },
  { code: 'kg', name: 'Kikongo', native: 'Kikongo', flag: '🇨🇩' },
  { code: 'rw', name: 'Kinyarwanda', native: 'Ikinyarwanda', flag: '🇷🇼' },
  { code: 'ktu', name: 'Kituba', native: 'Kituba', flag: '🇨🇬' },
  { code: 'trp', name: 'Kokborok', native: 'Kokborok', flag: '🇮🇳' },
  { code: 'kv', name: 'Komi', native: 'Коми', flag: '🇷🇺' },
  { code: 'gom', name: 'Konkani', native: 'कोंकणी', flag: '🇮🇳' },
  { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷' },
  { code: 'kri', name: 'Krio', native: 'Krio', flag: '🇸🇱' },
  { code: 'ku', name: 'Kurdish (Kurmanji)', native: 'Kurdî', flag: '🇹🇷' },
  { code: 'ckb', name: 'Kurdish (Sorani)', native: 'کوردی', flag: '🇮🇶' },
  { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча', flag: '🇰🇬' },
  { code: 'lo', name: 'Lao', native: 'ລາວ', flag: '🇱🇦' },
  { code: 'ltg', name: 'Latgalian', native: 'Latgalīšu', flag: '🇱🇻' },
  { code: 'la', name: 'Latin', native: 'Latina', flag: '🇻🇦' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu', flag: '🇱🇻' },
  { code: 'lij', name: 'Ligurian', native: 'Lìgure', flag: '🇮🇹' },
  { code: 'li', name: 'Limburgish', native: 'Limburgs', flag: '🇳🇱' },
  { code: 'ln', name: 'Lingala', native: 'Lingála', flag: '🇨🇩' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lmo', name: 'Lombard', native: 'Lombard', flag: '🇮🇹' },
  { code: 'lg', name: 'Luganda', native: 'Oluganda', flag: '🇺🇬' },
  { code: 'luo', name: 'Luo', native: 'Dholuo', flag: '🇰🇪' },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch', flag: '🇱🇺' },
  { code: 'mk', name: 'Macedonian', native: 'Македонски', flag: '🇲🇰' },
  { code: 'mad', name: 'Madurese', native: 'Madhurâ', flag: '🇮🇩' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली', flag: '🇮🇳' },
  { code: 'mak', name: 'Makassar', native: 'Mangkasara', flag: '🇮🇩' },
  { code: 'mg', name: 'Malagasy', native: 'Malagasy', flag: '🇲🇬' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'ms-Arab', name: 'Malay (Jawi)', native: 'بهاس ملايو', flag: '🇲🇾' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mt', name: 'Maltese', native: 'Malti', flag: '🇲🇹' },
  { code: 'mam', name: 'Mam', native: 'Qyol Mam', flag: '🇬🇹' },
  { code: 'mni-Mtei', name: 'Manipuri (Meitei)', native: 'ꯃꯤꯇꯩꯂꯣꯟ', flag: '🇮🇳' },
  { code: 'gv', name: 'Manx', native: 'Gaelg', flag: '🇮🇲' },
  { code: 'mi', name: 'Maori', native: 'Te Reo Māori', flag: '🇳🇿' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'mh', name: 'Marshallese', native: 'Kajin M̧ajeļ', flag: '🇲🇭' },
  { code: 'mwr', name: 'Marwadi', native: 'मारवाड़ी', flag: '🇮🇳' },
  { code: 'mfe', name: 'Mauritian Creole', native: 'Morisien', flag: '🇲🇺' },
  { code: 'mzn', name: 'Mazanderani', native: 'مازِرونی', flag: '🇮🇷' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол', flag: '🇲🇳' },
  { code: 'my', name: 'Myanmar (Burmese)', native: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'nhe', name: 'Nahuatl (Eastern Huasteca)', native: 'Nahuatl', flag: '🇲🇽' },
  { code: 'ndc-MZ', name: 'Ndau', native: 'Ndau', flag: '🇲🇿' },
  { code: 'nr', name: 'Ndebele (South)', native: 'isiNdebele', flag: '🇿🇦' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵' },
  { code: 'new', name: 'Newari (Nepal Bhasa)', native: 'नेपाल भाषा', flag: '🇳🇵' },
  { code: 'nso', name: 'Northern Sotho (Sepedi)', native: 'Sesotho sa Leboa', flag: '🇿🇦' },
  { code: 'no', name: 'Norwegian', native: 'Norsk', flag: '🇳🇴' },
  { code: 'nus', name: 'Nuer', native: 'Thok Nath', flag: '🇸🇸' },
  { code: 'oc', name: 'Occitan', native: 'Occitan', flag: '🇫🇷' },
  { code: 'or', name: 'Odia (Oriya)', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'om', name: 'Oromo', native: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'os', name: 'Ossetian', native: 'Ирон', flag: '🇷🇺' },
  { code: 'pag', name: 'Pangasinan', native: 'Pangasinan', flag: '🇵🇭' },
  { code: 'pap', name: 'Papiamento', native: 'Papiamentu', flag: '🇨🇼' },
  { code: 'ps', name: 'Pashto', native: 'پښتو', flag: '🇦🇫' },
  { code: 'fa', name: 'Persian', native: 'فارسی', flag: '🇮🇷' },
  { code: 'pl', name: 'Polish', native: 'Polski', flag: '🇵🇱' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇵🇹' },
  { code: 'pa', name: 'Punjabi (Gurmukhi)', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'pa-Arab', name: 'Punjabi (Shahmukhi)', native: 'پنجابی', flag: '🇵🇰' },
  { code: 'qu', name: 'Quechua', native: 'Runa Simi', flag: '🇵🇪' },
  { code: 'rom', name: 'Romani', native: 'Romani', flag: '<svg class="custom-flag-svg" viewBox="0 0 36 24" width="20" height="14"><rect width="36" height="12" fill="#1866c2"/><rect y="12" width="36" height="12" fill="#2e9e43"/><circle cx="18" cy="12" r="5.5" fill="none" stroke="#cc241d" stroke-width="1.1"/><circle cx="18" cy="12" r="1.6" fill="#cc241d"/><g stroke="#cc241d" stroke-width="0.8"><line x1="12.5" y1="12" x2="23.5" y2="12"/><line x1="12.5" y1="12" x2="23.5" y2="12" transform="rotate(22.5 18 12)"/><line x1="12.5" y1="12" x2="23.5" y2="12" transform="rotate(45 18 12)"/><line x1="12.5" y1="12" x2="23.5" y2="12" transform="rotate(67.5 18 12)"/><line x1="12.5" y1="12" x2="23.5" y2="12" transform="rotate(90 18 12)"/><line x1="12.5" y1="12" x2="23.5" y2="12" transform="rotate(112.5 18 12)"/><line x1="12.5" y1="12" x2="23.5" y2="12" transform="rotate(135 18 12)"/><line x1="12.5" y1="12" x2="23.5" y2="12" transform="rotate(157.5 18 12)"/></g></svg>' },
  { code: 'ro', name: 'Romanian', native: 'Română', flag: '🇷🇴' },
  { code: 'rn', name: 'Rundi', native: 'Ikirundi', flag: '🇧🇮' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'sm', name: 'Samoan', native: 'Gagana Samoa', flag: '🇼🇸' },
  { code: 'sg', name: 'Sango', native: 'Sängö', flag: '🇨🇫' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', flag: '🇮🇳' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳' },
  { code: 'gd', name: 'Scots Gaelic', native: 'Gàidhlig', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { code: 'sr', name: 'Serbian', native: 'Српски', flag: '🇷🇸' },
  { code: 'st', name: 'Sesotho', native: 'Sesotho', flag: '🇱🇸' },
  { code: 'crs', name: 'Seychellois Creole', native: 'Seselwa', flag: '🇸🇨' },
  { code: 'shn', name: 'Shan', native: 'လိၵ်ႈတႆး', flag: '🇲🇲' },
  { code: 'sn', name: 'Shona', native: 'chiShona', flag: '🇿🇼' },
  { code: 'scn', name: 'Sicilian', native: 'Sicilianu', flag: '🇮🇹' },
  { code: 'szl', name: 'Silesian', native: 'Ślōnski', flag: '🇵🇱' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي', flag: '🇵🇰' },
  { code: 'si', name: 'Sinhala', native: 'සිංහල', flag: '🇱🇰' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina', flag: '🇸🇮' },
  { code: 'so', name: 'Somali', native: 'Soomaali', flag: '🇸🇴' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda', flag: '🇮🇩' },
  { code: 'sus', name: 'Susu', native: 'Sosoxui', flag: '🇬🇳' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇹🇿' },
  { code: 'ss', name: 'Swati', native: 'SiSwati', flag: '🇸🇿' },
  { code: 'sv', name: 'Swedish', native: 'Svenska', flag: '🇸🇪' },
  { code: 'ty', name: 'Tahitian', native: 'Reo Tahiti', flag: '🇵🇫' },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ', flag: '🇹🇯' },
  { code: 'ber-Latn', name: 'Tamazight (Latin)', native: 'Tamaziɣt', flag: '<svg class="custom-flag-svg" viewBox="0 0 900 600" width="20" height="14"><rect width="900" height="200" fill="#09c"/><rect y="200" width="900" height="200" fill="#9c3"/><rect y="400" width="900" height="200" fill="#FFE513"/><polygon points="429.68 477.64 458.13 507.72 466.26 97.97 450 80.897" fill="#c03"/><path d="m657.32 515.85l54.471-23.577c-104.88-104.06-165.04-142.28-264.22-144.71-126.02 8.9431-208.13 59.349-243.09 159.35l24.39-4.8778c99.999-123.58 156.91-109.76 220.32-117.07 67.479 2.4391 136.58 46.341 208.13 130.89z" fill="#c03"/><path d="m289.84 93.092l-52.032 13.821c50.406 89.43 122.76 143.9 215.44 147.97 122.76 0.81292 193.49-82.113 242.27-156.91l-41.463 12.195c-78.861 111.38-164.23 115.45-202.44 109.76-64.227-4.8778-117.07-57.723-161.79-126.83z" fill="#c03"/></svg>', aliases: ['Amazigh', 'Berber', 'الأمازيغية', 'امازيغية', 'ber'] },
  { code: 'ber-Tfng', name: 'Tamazight (Tifinagh)', native: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '<svg class="custom-flag-svg" viewBox="0 0 900 600" width="20" height="14"><rect width="900" height="200" fill="#09c"/><rect y="200" width="900" height="200" fill="#9c3"/><rect y="400" width="900" height="200" fill="#FFE513"/><polygon points="429.68 477.64 458.13 507.72 466.26 97.97 450 80.897" fill="#c03"/><path d="m657.32 515.85l54.471-23.577c-104.88-104.06-165.04-142.28-264.22-144.71-126.02 8.9431-208.13 59.349-243.09 159.35l24.39-4.8778c99.999-123.58 156.91-109.76 220.32-117.07 67.479 2.4391 136.58 46.341 208.13 130.89z" fill="#c03"/><path d="m289.84 93.092l-52.032 13.821c50.406 89.43 122.76 143.9 215.44 147.97 122.76 0.81292 193.49-82.113 242.27-156.91l-41.463 12.195c-78.861 111.38-164.23 115.45-202.44 109.76-64.227-4.8778-117.07-57.723-161.79-126.83z" fill="#c03"/></svg>', aliases: ['Amazigh', 'Berber', 'الأمازيغية', 'تيفيناغ', 'امازيغية', 'zgh'] },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'tt', name: 'Tatar', native: 'Татарча', flag: '🇷🇺' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'tet', name: 'Tetum', native: 'Tetun', flag: '🇹🇱' },
  { code: 'th', name: 'Thai', native: 'ไทย', flag: '🇹🇭' },
  { code: 'bo', name: 'Tibetan', native: 'བོད་སྐད', flag: '🇨🇳' },
  { code: 'ti', name: 'Tigrinya', native: 'ትግርኛ', flag: '🇪🇷' },
  { code: 'tiv', name: 'Tiv', native: 'Tiv', flag: '🇳🇬' },
  { code: 'tpi', name: 'Tok Pisin', native: 'Tok Pisin', flag: '🇵🇬' },
  { code: 'to', name: 'Tongan', native: 'Lea Fakatonga', flag: '🇹🇴' },
  { code: 'ts', name: 'Tsonga', native: 'Xitsonga', flag: '🇿🇦' },
  { code: 'tn', name: 'Tswana', native: 'Setswana', flag: '🇧🇼' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe', flag: '🇹🇷' },
  { code: 'tk', name: 'Turkmen', native: 'Türkmençe', flag: '🇹🇲' },
  { code: 'tyv', name: 'Tuvan', native: 'Тыва дыл', flag: '🇷🇺' },
  { code: 'ak', name: 'Twi (Akan)', native: 'Twi', flag: '🇬🇭' },
  { code: 'udm', name: 'Udmurt', native: 'Удмурт', flag: '🇷🇺' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська', flag: '🇺🇦' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰' },
  { code: 'ug', name: 'Uyghur', native: 'ئۇيغۇرچە', flag: '🇨🇳' },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha', flag: '🇺🇿' },
  { code: 've', name: 'Venda', native: 'Tshivenḓa', flag: '🇿🇦' },
  { code: 'vec', name: 'Venetian', native: 'Vèneto', flag: '🇮🇹' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'war', name: 'Waray', native: 'Winaray', flag: '🇵🇭' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  { code: 'wo', name: 'Wolof', native: 'Wolof', flag: '🇸🇳' },
  { code: 'xh', name: 'Xhosa', native: 'isiXhosa', flag: '🇿🇦' },
  { code: 'sah', name: 'Yakut (Sakha)', native: 'Саха тыла', flag: '🇷🇺' },
  { code: 'yo', name: 'Yoruba', native: 'Èdè Yorùbá', flag: '🇳🇬' },
  { code: 'zap', name: 'Zapotec', native: 'Diidxazá', flag: '🇲🇽' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu', flag: '🇿🇦' },
  { code: 'aa', name: "Afar", native: "Qafár af", flag: '🇩🇯', aliases: ["Afar", "الأفار"] },
  { code: 'bci', name: "Baoul\u00e9", native: "Baoulé", flag: '🇨🇮', aliases: ["Baoule", "الباولية"] },
  { code: 'crh-Latn', name: "Crimean Tatar (Latin)", native: "Qırımtatarca", flag: '🇺🇦', aliases: ["Crimean Tatar", "التتارية القرمية"] },
  { code: 'fr-CA', name: "French (Canada)", native: "Français (Canada)", flag: '🇨🇦', aliases: ["French Canadian", "الفرنسية كندا"] },
  { code: 'iu-Latn', name: "Inuktut (Latin)", native: "Inuktitut", flag: '🇨🇦', aliases: ["Inuktitut Latin", "الإنكتيتوتية اللاتينية"] },
  { code: 'chm', name: "Meadow Mari", native: "Олык марий", flag: '🇷🇺', aliases: ["Mari", "المارية الشرقية"] },
  { code: 'min', name: "Minang", native: "Baso Minang", flag: '🇮🇩', aliases: ["Minangkabau", "المينانغكابو"] },
  { code: 'lus', name: "Mizo", native: "Mizo ṭawng", flag: '🇮🇳', aliases: ["Mizo", "الميزو"] },
  { code: 'bm-Nkoo', name: "N'Ko", native: "ߒߞߏ", flag: '🇬🇳', aliases: ["NKo", "Nko", "النكو"] },
  { code: 'ndc-ZW', name: "Ndau (Zimbabwe)", native: "Ndau", flag: '🇿🇼', aliases: ["Ndau Zimbabwe", "النداو زيمبابوي"] },
  { code: 'pt-PT', name: "Portuguese (Portugal)", native: "Português (Portugal)", flag: '🇵🇹', aliases: ["European Portuguese", "البرتغالية البرتغال"] },
  { code: 'kek', name: "Q\u02bceqchi\u02bc", native: "Qʼeqchiʼ", flag: '🇬🇹', aliases: ["Qeqchi", "الكيكتشي"] },
  { code: 'se', name: "Sami (North)", native: "Davvisámegiella", flag: '🇳🇴', aliases: ["Northern Sami", "السامي الشمالية"] },
  { code: 'sat-Latn', name: "Santali (Latin)", native: "Santali", flag: '🇮🇳', aliases: ["Santali Latin", "السنتالية اللاتينية"] },
  { code: 'lua', name: "Tshiluba", native: "Tshiluba", flag: '🇨🇩', aliases: ["Tshiluba", "Luba-Kasai", "التشيلوبا"] },
  { code: 'tcy', name: "Tulu", native: "ತುಳು", flag: '🇮🇳', aliases: ["Tulu", "التولو"] },
  { code: 'tum', name: "Tumbuka", native: "chiTumbuka", flag: '🇲🇼', aliases: ["Tumbuka", "التومبوكا"] },
  { code: 'yi', name: "Yiddish", native: "ייִדיש", flag: '🇩🇪', aliases: ["Yiddish", "الييدية"] },
  { code: 'yua', name: "Yucatec Maya", native: "Màaya t'àan", flag: '🇲🇽', aliases: ["Yucatec Maya", "المايا اليوكاتية"] },
];

ALL_LANGUAGES.sort((a, b) => a.name.localeCompare(b.name));

// 22 Arab League Member States' Flag Emojis, starting with Morocco (🇲🇦)
const ARAB_FLAGS = [
  '🇲🇦', '🇸🇦', '🇩🇿', '🇪🇬', '🇦🇪', '🇶🇦', '🇰🇼', '🇧🇭',
  '🇴🇲', '🇯🇴', '🇵🇸', '🇱🇧', '🇸🇾', '🇮🇶', '🇾🇪', '🇹🇳',
  '🇱🇾', '🇸🇩', '🇲🇷', '🇸🇴', '🇩🇯', '🇰🇲'
];

document.addEventListener('DOMContentLoaded', async () => {
  const mainView = document.getElementById('main-view');
  const allLanguagesView = document.getElementById('all-languages-view');
  const btnOpenMore = document.getElementById('btn-open-more');
  const btnBackMain = document.getElementById('btn-back-main');
  const langSearchInput = document.getElementById('lang-search-input');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const languagesListContainer = document.getElementById('languages-list-container');
  const langCountBadge = document.getElementById('lang-count-badge');
  const labelMoreName = document.getElementById('label-more-name');
  const labelMoreDesc = document.getElementById('label-more-desc');

  const btnDefaultLang = document.getElementById('btn-default-lang');
  const labelDefaultLangDesc = document.getElementById('label-default-lang-desc');
  const targetLangButtons = document.querySelectorAll('.lang-target-btn');
  const statusBar = document.getElementById('status-bar');
  const statusText = document.getElementById('status-text');
  const statusBarAll = document.getElementById('status-bar-all');
  const statusTextAll = document.getElementById('status-text-all');

  let activeTab = null;
  let defaultLang = 'en';
  let currentTl = defaultLang;

  const quickLangCodes = new Set(['en', 'ar', 'fr', 'es', 'de', 'tr', 'ru', 'zh-CN', 'ja', 'ko']);

  // Arabic Flag Auto-cycle (starts with Morocco, rotates through all 22 Arab nations)
  let arabFlagIndex = 0;

  function cycleArabFlag(advance = true) {
    if (advance) {
      arabFlagIndex = (arabFlagIndex + 1) % ARAB_FLAGS.length;
    }
    const currentFlag = ARAB_FLAGS[arabFlagIndex];

    const arLang = ALL_LANGUAGES.find((l) => l.code === 'ar');
    if (arLang) {
      arLang.flag = currentFlag;
    }

    const arIconBoxes = document.querySelectorAll('.capsule-btn[data-lang="ar"] .capsule-icon-box');
    arIconBoxes.forEach((box) => {
      box.innerHTML = currentFlag;
    });

    if (btnOpenMore && btnOpenMore.classList.contains('active') && currentTl === 'ar') {
      const moreIconBox = btnOpenMore.querySelector('.capsule-icon-box');
      if (moreIconBox) moreIconBox.innerHTML = currentFlag;
    }
  }

  // Automatic cycle every 1 second (1000ms)
  setInterval(() => {
    cycleArabFlag(true);
  }, 1000);

  // Detect navigator system language
  const browserNavLang = (navigator.language || 'en').split('-')[0].toLowerCase();
  const foundDefault = ALL_LANGUAGES.find((l) => l.code === browserNavLang || l.code.startsWith(browserNavLang));
  if (foundDefault) {
    defaultLang = foundDefault.code;
  }
  if (labelDefaultLangDesc) {
    labelDefaultLangDesc.textContent = getLangName(defaultLang);
  }

  function setStatus(text, type = 'normal') {
    if (statusText) statusText.textContent = text;
    if (statusBar) statusBar.className = `status-footer ${type}`;
    if (statusTextAll) statusTextAll.textContent = text;
    if (statusBarAll) statusBarAll.className = `status-footer ${type}`;
  }

  function setTranslatedStateUI(selectedLang) {
    let matchedQuick = false;
    targetLangButtons.forEach((btn) => {
      if (btn.dataset.lang === selectedLang) {
        btn.classList.add('active');
        matchedQuick = true;
      } else {
        btn.classList.remove('active');
      }
    });

    if (selectedLang === defaultLang) {
      btnDefaultLang.classList.add('active');
    } else {
      btnDefaultLang.classList.remove('active');
    }

    if (btnOpenMore) {
      const moreIconBox = btnOpenMore.querySelector('.capsule-icon-box');
      if (!matchedQuick) {
        btnOpenMore.classList.add('active');
        const langObj = ALL_LANGUAGES.find((l) => l.code === selectedLang);
        if (langObj) {
          if (labelMoreName) labelMoreName.textContent = `Selected: ${langObj.name}`;
          if (labelMoreDesc) labelMoreDesc.textContent = langObj.native || 'Active Target';
          if (moreIconBox) moreIconBox.innerHTML = langObj.flag || '🌍';
        }
      } else {
        btnOpenMore.classList.remove('active');
        if (labelMoreName) labelMoreName.textContent = 'More Languages';
        if (labelMoreDesc) labelMoreDesc.textContent = '250 Languages (A-Z)';
        if (moreIconBox) moreIconBox.innerHTML = '🌍';
      }
    }

    const allItemBtns = languagesListContainer.querySelectorAll('.capsule-btn');
    allItemBtns.forEach((b) => {
      if (b.dataset.lang === selectedLang) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    setStatus(`✓ Page translated to ${getLangName(selectedLang)}`, 'success');
  }

  function setOriginalStateUI() {
    targetLangButtons.forEach((btn) => {
      btn.classList.remove('active');
    });

    btnDefaultLang.classList.remove('active');

    if (btnOpenMore) {
      btnOpenMore.classList.remove('active');
      if (labelMoreName) labelMoreName.textContent = 'More Languages';
      if (labelMoreDesc) labelMoreDesc.textContent = '250 Languages (A-Z)';
      const moreIconBox = btnOpenMore.querySelector('.capsule-icon-box');
      if (moreIconBox) moreIconBox.innerHTML = '🌍';
    }

    const allItemBtns = languagesListContainer.querySelectorAll('.capsule-btn');
    allItemBtns.forEach((b) => b.classList.remove('active'));

    setStatus('Select a language to translate', 'normal');
  }

  function persistSettings(tl) {
    chrome.runtime.sendMessage({
      action: 'SAVE_SETTINGS',
      settings: {
        sl: 'auto',
        tl: tl,
        defaultLang: defaultLang
      }
    }, () => {
      void chrome.runtime.lastError;
    });
  }

  function isRestrictedUrl(url) {
    if (!url) return false;
    return (
      url.startsWith('chrome://') ||
      url.startsWith('chrome-extension://') ||
      url.startsWith('edge://') ||
      url.startsWith('about:') ||
      url.startsWith('moz-extension://') ||
      url.startsWith('view-source:') ||
      url.startsWith('https://chrome.google.com/webstore') ||
      url.startsWith('https://chromewebstore.google.com') ||
      url.startsWith('https://addons.mozilla.org')
    );
  }

  function renderAllLanguages(filterText = '') {
    languagesListContainer.innerHTML = '';
    const query = filterText.trim().toLowerCase();

    let filtered = ALL_LANGUAGES;
    if (query) {
      filtered = ALL_LANGUAGES.filter((l) =>
        l.name.toLowerCase().includes(query) ||
        (l.native && l.native.toLowerCase().includes(query)) ||
        l.code.toLowerCase().includes(query) ||
        (l.aliases && l.aliases.some((a) => a.toLowerCase().includes(query)))
      );
    }

    if (langCountBadge) {
      langCountBadge.textContent = `${filtered.length} Languages`;
    }

    if (filtered.length === 0) {
      languagesListContainer.innerHTML = `
        <div class="no-results-msg">
          No languages found matching "<strong>${escapeHtml(filterText)}</strong>"
        </div>
      `;
      return;
    }

    const groups = {};
    for (const item of filtered) {
      const firstLetter = item.name.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(item);
    }

    const sortedLetters = Object.keys(groups).sort();
    for (const letter of sortedLetters) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'alpha-group';

      const header = document.createElement('div');
      header.className = 'alpha-letter-badge';
      header.innerHTML = `
        <span>${letter}</span>
        <span class="count">${groups[letter].length}</span>
      `;
      groupDiv.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'alpha-items-grid';

      for (const lang of groups[letter]) {
        const btn = document.createElement('button');
        btn.className = `capsule-btn ${lang.code === currentTl ? 'active' : ''}`;
        btn.dataset.lang = lang.code;
        btn.title = `Translate to ${lang.name}`;
        btn.innerHTML = `
          <div class="capsule-icon-box">${lang.flag || '🌐'}</div>
          <div class="capsule-text-col">
            <span class="capsule-name">${escapeHtml(lang.name)}</span>
            <span class="capsule-desc">${escapeHtml(lang.native || lang.code)}</span>
          </div>
        `;

        btn.addEventListener('click', () => {
          if (lang.code === 'ar') {
            cycleArabFlag(true);
          }
          triggerPageTranslation(lang.code);
          setTimeout(() => {
            switchToMainView();
          }, 150);
        });

        grid.appendChild(btn);
      }

      groupDiv.appendChild(grid);
      languagesListContainer.appendChild(groupDiv);
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  renderAllLanguages();

  langSearchInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (btnClearSearch) {
      btnClearSearch.style.display = val.length > 0 ? 'block' : 'none';
    }
    renderAllLanguages(val);
  });

  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      langSearchInput.value = '';
      btnClearSearch.style.display = 'none';
      renderAllLanguages('');
      langSearchInput.focus();
    });
  }

  function switchToAllLanguagesView() {
    mainView.style.display = 'none';
    allLanguagesView.style.display = 'flex';
    langSearchInput.value = '';
    if (btnClearSearch) btnClearSearch.style.display = 'none';
    renderAllLanguages('');
    setTimeout(() => langSearchInput.focus(), 50);
  }

  function switchToMainView() {
    allLanguagesView.style.display = 'none';
    mainView.style.display = 'flex';
  }

  btnOpenMore.addEventListener('click', switchToAllLanguagesView);
  btnBackMain.addEventListener('click', switchToMainView);

  // Identify active tab reliably
  async function resolveActiveTab() {
    try {
      const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (tabs && tabs[0]) return tabs[0];
    } catch (e) {}
    try {
      const tabs2 = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs2 && tabs2[0]) return tabs2[0];
    } catch (e) {}
    return null;
  }

  activeTab = await resolveActiveTab();

  // Load stored settings
  chrome.runtime.sendMessage({ action: 'GET_SETTINGS' }, (res) => {
    if (chrome.runtime.lastError) return;
    if (res?.success && res.settings) {
      if (res.settings.defaultLang) {
        defaultLang = res.settings.defaultLang;
        if (labelDefaultLangDesc) {
          labelDefaultLangDesc.textContent = getLangName(defaultLang);
        }
      }
      if (res.settings.tl) {
        currentTl = res.settings.tl;
      }
    }
  });

  // Query active tab state directly from content script and background
  if (activeTab && activeTab.id) {
    if (isRestrictedUrl(activeTab.url)) {
      setStatus('Protected browser page (cannot translate)', 'normal');
      setOriginalStateUI();
    } else {
      chrome.tabs.sendMessage(activeTab.id, { action: 'GET_PAGE_STATUS' }, (res) => {
        if (chrome.runtime.lastError || !res || !res.success) {
          // Fallback to background tab state
          chrome.runtime.sendMessage({ action: 'GET_TAB_STATE', tabId: activeTab.id }, (bgRes) => {
            if (chrome.runtime.lastError) return;
            if (bgRes?.success && bgRes.state && bgRes.state.isTranslated) {
              currentTl = bgRes.state.tl || currentTl;
              setTranslatedStateUI(currentTl);
            } else {
              setOriginalStateUI();
            }
          });
        } else {
          if (res.isTranslated) {
            currentTl = res.tl || currentTl;
            setTranslatedStateUI(currentTl);
          } else {
            setOriginalStateUI();
          }
        }
      });
    }
  }

  async function ensureContentScriptInjected(tabId) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      });
    } catch (e) {
      // already injected or restricted
    }
  }

  async function triggerPageTranslation(tl) {
    if (!activeTab || !activeTab.id) {
      activeTab = await resolveActiveTab();
      if (!activeTab || !activeTab.id) {
        setStatus('Could not connect to active tab', 'normal');
        return;
      }
    }

    if (isRestrictedUrl(activeTab.url)) {
      setStatus('Protected browser page (cannot translate)', 'normal');
      return;
    }

    currentTl = tl;
    persistSettings(tl);

    setStatus(`Translating page to ${getLangName(tl)}...`, 'loading');

    // Send translation command to tab
    chrome.tabs.sendMessage(activeTab.id, {
      action: 'START_PAGE_TRANSLATION',
      sl: 'auto',
      tl: tl
    }, async (response) => {
      if (chrome.runtime.lastError || !response || !response.success) {
        // Tab might not have content script yet, inject and retry
        await ensureContentScriptInjected(activeTab.id);
        chrome.tabs.sendMessage(activeTab.id, {
          action: 'START_PAGE_TRANSLATION',
          sl: 'auto',
          tl: tl
        }, (retryRes) => {
          if (retryRes && retryRes.success) {
            setTranslatedStateUI(tl);
          } else {
            setStatus('Translation failed. Please try again.', 'normal');
            setOriginalStateUI();
          }
        });
      } else {
        setTranslatedStateUI(tl);
      }
    });
  }

  // System Default Button
  btnDefaultLang.addEventListener('click', () => {
    triggerPageTranslation(defaultLang);
  });

  // Quick Target Language Buttons
  targetLangButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.dataset.lang;
      if (selectedLang === 'ar') {
        cycleArabFlag(true);
      }
      triggerPageTranslation(selectedLang);
    });
  });

  function getLangName(code) {
    const found = ALL_LANGUAGES.find((l) => l.code === code);
    if (found) return found.name;
    return code;
  }
});
