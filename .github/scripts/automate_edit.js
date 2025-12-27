          const fs = require('fs');
          const https = require('https');
          const url = 'https://cdn.jsdelivr.net/npm/denque@2.1.0/index.js';

          function fetchText(u){
            return new Promise((resolve, reject) => {
              https.get(u, res => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                  // follow redirects
                  return resolve(fetchText(res.headers.location));
                }
                if (res.statusCode !== 200) {
                  return reject(new Error('Request Failed. Status Code: ' + res.statusCode));
                }
                let raw = '';
                res.setEncoding('utf8');
                res.on('data', chunk => raw += chunk);
                res.on('end', () => resolve(raw));
              }).on('error', reject);
            });
          }

          (async () => {
            try {
              const source = await fetchText(url);
              // Remove CommonJS export line(s)
              const modified = source.replace(/module\.exports\s*=\s*Denque;?/g, '');

              const copyright =
`// Denque module on Github: https://github.com/invertase/denque
// Denque written by Mike Diarmid (a.k.a. Salakar) - https://github.com/Salakar
// Denque source code copyright (c) 2018 Invertase Limited - https://github.com/invertase/
// Repackaged for userscripts instead of a CommonJS module for Node.js

`;

              const metadata =
`// ==UserScript==
// @name        Denque-on-Greasy-Fork
// @namespace   github.com/JasonAMelancon
// @version     2.1.0h
// @author      Jason Melancon
// @license     Apache License 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
// @description (https://github.com/Salakar) Fast, well-tested double-ended queue implementation based on ring buffer
// @description:af       (https://github.com/Salakar) Vinnige, goed-getoetste dubbel-einde wagimplementering gebaseer op 'n ringbuffer
// @description:am       (https://github.com/Salakar) ፈጣን፣ ጥራት ያለው የሁለት-ጫፍ ተሰናዳይ ክስተት ማስፈጻሚ በሪንግ ባፈር ተመሠረተ
// @description:ar       (https://github.com/Salakar) تنفيذ طابور ذو طرفين سريع ومُختبر جيدًا يستند إلى حلقة مؤقتة
// @description:az       (https://github.com/Salakar) Halqa buferinə əsaslanan, sürətli və yaxşı sınanmış iki uclu növbə tətbiqi
// @description:be       (https://github.com/Salakar) Хуткая, добра пратэставаная рэалізацыя двухканцовай чаргі, заснаваная на кольцавым буферы
// @description:bg       (https://github.com/Salakar) Бърза, добре тествана реализация на двустранна опашка, базирана на кръгов буфер
// @description:bn       (https://github.com/Salakar) রিং বাফারের উপর ভিত্তি করে দ্রুত, ভাল-পরীক্ষিত ডাবল-এন্ডেড কিউ বাস্তবায়ন
// @description:bs       (https://github.com/Salakar) Brza, dobro testirana implementacija dvostruke reda zasnovana na kružnom baferu
// @description:ca       (https://github.com/Salakar) Implementació ràpida i ben provada de cua de doble extrem basada en un buffer circular
// @description:cs       (https://github.com/Salakar) Rychlá, dobře otestovaná implementace obousměrné fronty založená na kruhovém bufferu
// @description:cy       (https://github.com/Salakar) Gweithredu ciwdi dwyran gyflym, wedi'i brofi'n dda yn seiliedig ar gronfa cylch
// @description:da       (https://github.com/Salakar) Hurtig, veldokumenteret dobbelt-ended kø-implementation baseret på ringbuffer
// @description:de       (https://github.com/Salakar) Schnelle, gut getestete Implementierung einer doppelt-enden Warteschlange basierend auf einem Ringpuffer
// @description:el       (https://github.com/Salakar) Γρήγορη, καλά δοκιμασμένη υλοποίηση διπλής ουράς βασισμένη σε κυκλικό buffer
// @description:es       (https://github.com/Salakar) Implementación rápida y bien probada de una cola de doble extremo basada en un búfer circular
// @description:et       (https://github.com/Salakar) Kiire, hästi testitud kaheotsaline järjekorra teostus, mis põhineb ringpuhvril
// @description:fa       (https://github.com/Salakar) پیاده‌سازی سریع و خوب‌آزمایش‌شده‌ی صف دوطرفه بر پایه‌ی حلقه بافر
// @description:fi       (https://github.com/Salakar) Nopea, hyvin testattu kaksipäinen jono -toteutus rengaspuskurin pohjalta
// @description:fil      (https://github.com/Salakar) Mabilis, mahusay na nasubok na implementasyon ng double-ended queue batay sa ring buffer
// @description:fr       (https://github.com/Salakar) Implémentation rapide et bien testée d'une file double extrémité basée sur un tampon circulaire
// @description:ga       (https://github.com/Salakar) Cur i bhfeidhm tapa, deimhnithe go maith ar chlib dhúbailte bunaithe ar bhuafr fáinne
// @description:gl       (https://github.com/Salakar) Implementación rápida e ben probada dunha cola dobre baseada nun buffer circular
// @description:gu       (https://github.com/Salakar) રિંગ બફર આધારિત, ઝડપી અને સારી રીતે પરીक्षित ડબલ-એન્ડેડ ક્યુ અમલ
// @description:he       (https://github.com/Salakar) מימוש מהיר ומנוסה של תור דו-קצוות המבוסס על חוצץ טבעתי
// @description:hi       (https://github.com/Salakar) रिंग बफर पर आधारित तेज़, अच्छी तरह परखा गया डबल-एंडेड क्यू का कार्यान्वयन
// @description:hr       (https://github.com/Salakar) Brza, dobro testirana implementacija dvostrukog reda bazirana na kružnom međuspremniku
// @description:hu       (https://github.com/Salakar) Gyors, jól letesztelt kétszélű sor megvalósítás gyűrűpuffer alapján
// @description:hy       (https://github.com/Salakar) Արագ, լավ փորձարկված երկվայրանի հերթի իրագործում՝ հիմնված օղակաձև բուֆերի վրա
// @description:id       (https://github.com/Salakar) Implementasi antrian dua ujung yang cepat dan teruji dengan baik berbasis ring buffer
// @description:is       (https://github.com/Salakar) Hraðvirk, vel prófuð útfærsla á tvíenda biðröð byggð á hringbakka
// @description:it       (https://github.com/Salakar) Implementazione veloce e ben testata di una coda a doppia estremità basata su buffer circolare
// @description:ja       (https://github.com/Salakar) リングバッファに基づく、高速で十分にテストされた両端キューの実装
// @description:ka       (https://github.com/Salakar) სწრაფი, კარგად შემოწმებული ორი-მხრივი რიგის იმპლემენტაცია ქიმბუფერზე დაფუძნებით
// @description:kk       (https://github.com/Salakar) Тез, жақсы тексерілген екі ұштық кезек іске асыруы, шеңбер буферіне негізделген
// @description:km       (https://github.com/Salakar) ការអនុវត្ត queue ទាំងពីរប៉ាន់ ដែលលឿន និងបានសាកល្បងល្អ ដាក់លើ ring buffer
// @description:kn       (https://github.com/Salakar) ರಿಂಗ್ ಬಫರ್ ಆಧರಿತ ವೇಗದ, ಚೆನ್ನಾಗಿ ಪರೀಕ್ಷಿಸಲಾದ ಡಬಲ್-ಎಂಡೆಡ್ ಕ್ಯೂ ಅನುಷ್ಠಾನ
// @description:ko       (https://github.com/Salakar) 링 버퍼 기반의 빠르고 충분히 테스트된 양끝 큐 구현
// @description:ku       (https://github.com/Salakar) Cihaza ring-bufferê li ser bingehîn, rêza double-endedê zû û baş testkirî
// @description:lo       (https://github.com/Salakar) ການນໍາໃຊ້ຄວບຄຸມ queue ທີ່ມີສອງທາງ ຄົບຖ້ວນ ແລະ ໄວ ອີກທັງ ທີ່ສ້າງຈາກ ring buffer
// @description:lt       (https://github.com/Salakar) Greitai, gerai išbandyta dvipusės eilės implementacija, paremta žiediniu buferiu
// @description:lv       (https://github.com/Salakar) Ātra, labi pārbaudīta divpusējas rindas īstenošana, balstīta uz apļveida buferi
// @description:mk       (https://github.com/Salakar) Брза, добро тестиранa реализација на двострана редица заснована на кружен бафер
// @description:ml       (https://github.com/Salakar) റിംഗ് ബഫറിനെ അടിസ്ഥാനമാക്കി വേഗമുള്ള, നന്നായി പരിശോധിച്ച ഡബിൾ-എൻഡഡ് ക്യൂ നിർവഹണം
// @description:mn       (https://github.com/Salakar) Шингэн буфер дээр суурилсан хурдан, сайн шалгасан хоёр үзүүртэй дараалал хэрэгжүүлэлт
// @description:mr       (https://github.com/Salakar) रिंग बफरवर आधारित वेगवान, चांगले तपासलेले डबल-एंडेड क्यू अंमलबजावणी
// @description:ms       (https://github.com/Salakar) Pelaksanaan antrean dua hujung yang pantas dan diuji dengan baik berdasarkan penimbal cincin
// @description:mt       (https://github.com/Salakar) Implimentazzjoni mgħaġġla u tajba ttestjata ta' queue bi tmiem doppju bbażata fuq ring buffer
// @description:nb       (https://github.com/Salakar) Rask, godt testet implementering av dobbelt-ended kø basert på ringbuffer
// @description:ne       (https://github.com/Salakar) रिंग बफरमा आधारित छिटो, राम्रोसँग परीक्षण गरिएको डबल-एन्डेड क्यू कार्यान्वयन
// @description:nl       (https://github.com/Salakar) Snelle, goed-geteste implementatie van een double-ended queue gebaseerd op een ringbuffer
// @description:nn       (https://github.com/Salakar) Rask, godt testa implementering av dobbel-ended kø basert på ringbuffer
// @description:or       (https://github.com/Salakar) ରିଙ୍ଗ ବଫର୍ ଉପରେ ଆଧାରିତ ଦ୍ବି-ଶେଷ କ୍ୟୁର ତତ୍କ୍ଷଣାତ୍ ଏବଂ ଭଲ ଭାବରେ ପରୀକ୍ଷିତ କରାଯାଇଛି
// @description:pa       (https://github.com/Salakar) ਰਿੰਗ ਬਫਰ ਅਧਾਰਿਤ ਤੇਜ਼, ਚੰਗੀ ਤਰ੍ਹਾਂ ਟੈਸਟ ਕੀਤੀ ਡਬਲ-ਏਂਡਿਡ ਕਿਊ ਇੰਪਲੀਮੇੰਟੇਸ਼ਨ
// @description:pl       (https://github.com/Salakar) Szybka, dobrze przetestowana implementacja kolejki obustronnej oparta na buforze pierścieniowym
// @description:ps       (https://github.com/Salakar) د رینګ بفر پراساس چټک، ښه ازمویل شوې دوه اړخیزه قطار پلي کول
// @description:pt       (https://github.com/Salakar) Implementação rápida e bem testada de fila com extremidades duplas baseada em buffer circular
// @description:ro       (https://github.com/Salakar) Implementare rapidă, bine testată, de coadă cu două capete bazată pe buffer circular
// @description:ru       (https://github.com/Salakar) Быстрая, хорошо протестированная реализация двусторонней очереди на основе кольцевого буфера
// @description:si       (https://github.com/Salakar) රිං බෆර් මත පදනම්ව නිරතුරු පරීක්ෂාකල ඉක්මන් දෙ-අන්තය කේටිය ක්‍රියාත්මක කිරීම
// @description:sk       (https://github.com/Salakar) Rýchla, dobre otestovaná implementácia obojstrannej fronty založená na kruhovom buffri
// @description:sl       (https://github.com/Salakar) Hitro, dobro preizkušena implementacija dvostranskega čakalnega seznama, osnovana na krožnem predpomnilniku
// @description:sq       (https://github.com/Salakar) Zbatim i shpejtë, i provuar mirë i radhës me dy skaje bazuar në buffer unazor
// @description:sr       (https://github.com/Salakar) Brza, dobro testirana implementacija dvostranog reda bazirana na kružnom baferu
// @description:sv       (https://github.com/Salakar) Snabb, väl testad implementering av dubbeländad kö baserad på ringbuffert
// @description:sw       (https://github.com/Salakar) Utekelezaji wa foleni yenye mwisho mara mbili, haraka na iliyojaribiwa vizuri, msingi wake ni ring buffer
// @description:ta       (https://github.com/Salakar) ரிங் பப்பருக்கு அடிப்படையாகக் கொண்டு வேகமான, நன்கு சோதிக்கப்பட்ட இரு முனை வரிசை செயலாக்கம்
// @description:te       (https://github.com/Salakar) రింగ్ బఫర్ ఆధారంగా వేగవంతమైన, బాగా పరీక్షించిన డబుల్-ఎండెಡ್ క్యూఇ అమలు
// @description:th       (https://github.com/Salakar) การนำคิวสองด้านไปใช้ที่รวดเร็วและทดสอบอย่างดี โดยอิงจากบัฟเฟอร์แบบวงแหวน
// @description:tl       (https://github.com/Salakar) Mabilis, mahusay na nasubok na implementasyon ng double-ended queue na nakabase sa ring buffer
// @description:tr       (https://github.com/Salakar) Halka arabelleğine dayalı, hızlı ve iyi test edilmiş çift uçlu kuyruk uygulaması
// @description:uk       (https://github.com/Salakar) Швидка, добре протестована реалізація двобічної черги на основі кільцевого буфера
// @description:ur       (https://github.com/Salakar) رِنگ بفر پر مبنی تیز، اچھی طرح جانچی گئی ڈبل-اینڈڈ قطار کا نفاذ
// @description:uz       (https://github.com/Salakar) Ring bufferga asoslangan, tez va yaxshi sinovdan o'tgan ikki uchli navbat ishlanmasi
// @description:vi       (https://github.com/Salakar) Triển khai hàng đợi hai đầu nhanh, được kiểm thử kỹ dựa trên bộ đệm vòng
// @description:xh       (https://github.com/Salakar) Ukuphunyezwa kweqoqo elinee-ntambo ezimbini okukhawulezayo, okuvivinyiweyo okuhle, esekwe kwi-ring buffer
// @description:yi       (https://github.com/Salakar) שנעלזאַמיגע, גוט־טעסטירטע דאַבאַל-ענדעד קיו ימפלאַמענטאַטיאָן באַזירט אויף רינג בופער
// @description:zh-CN    (https://github.com/Salakar) 基于环形缓冲区的快速且经过充分测试的双端队列实现
// @description:zh-TW    (https://github.com/Salakar) 基於環形緩衝區的快速且經充分測試的雙端隊列實作
// @description:zh-HK    (https://github.com/Salakar) 基於環形緩衝區的快速且經充分測試的雙端隊列實作
// @name:af     Denque-on-Greasy-Fork
// @name:am     Denque-on-Greasy-Fork
// @name:ar     Denque-on-Greasy-Fork
// @name:az     Denque-on-Greasy-Fork
// @name:be     Denque-on-Greasy-Fork
// @name:bg     Denque-on-Greasy-Fork
// @name:bn     Denque-on-Greasy-Fork
// @name:bs     Denque-on-Greasy-Fork
// @name:ca     Denque-on-Greasy-Fork
// @name:cs     Denque-on-Greasy-Fork
// @name:cy     Denque-on-Greasy-Fork
// @name:da     Denque-on-Greasy-Fork
// @name:de     Denque-on-Greasy-Fork
// @name:el     Denque-on-Greasy-Fork
// @name:es     Denque-on-Greasy-Fork
// @name:et     Denque-on-Greasy-Fork
// @name:fa     Denque-on-Greasy-Fork
// @name:fi     Denque-on-Greasy-Fork
// @name:fil    Denque-on-Greasy-Fork
// @name:fr     Denque-on-Greasy-Fork
// @name:ga     Denque-on-Greasy-Fork
// @name:gl     Denque-on-Greasy-Fork
// @name:gu     Denque-on-Greasy-Fork
// @name:he     Denque-on-Greasy-Fork
// @name:hi     Denque-on-Greasy-Fork
// @name:hr     Denque-on-Greasy-Fork
// @name:hu     Denque-on-Greasy-Fork
// @name:hy     Denque-on-Greasy-Fork
// @name:id     Denque-on-Greasy-Fork
// @name:is     Denque-on-Greasy-Fork
// @name:it     Denque-on-Greasy-Fork
// @name:ja     Denque-on-Greasy-Fork
// @name:ka     Denque-on-Greasy-Fork
// @name:kk     Denque-on-Greasy-Fork
// @name:km     Denque-on-Greasy-Fork
// @name:kn     Denque-on-Greasy-Fork
// @name:ko     Denque-on-Greasy-Fork
// @name:ku     Denque-on-Greasy-Fork
// @name:lo     Denque-on-Greasy-Fork
// @name:lt     Denque-on-Greasy-Fork
// @name:lv     Denque-on-Greasy-Fork
// @name:mk     Denque-on-Greasy-Fork
// @name:ml     Denque-on-Greasy-Fork
// @name:mn     Denque-on-Greasy-Fork
// @name:mr     Denque-on-Greasy-Fork
// @name:ms     Denque-on-Greasy-Fork
// @name:mt     Denque-on-Greasy-Fork
// @name:nb     Denque-on-Greasy-Fork
// @name:ne     Denque-on-Greasy-Fork
// @name:nl     Denque-on-Greasy-Fork
// @name:nn     Denque-on-Greasy-Fork
// @name:or     Denque-on-Greasy-Fork
// @name:pa     Denque-on-Greasy-Fork
// @name:pl     Denque-on-Greasy-Fork
// @name:ps     Denque-on-Greasy-Fork
// @name:pt     Denque-on-Greasy-Fork
// @name:ro     Denque-on-Greasy-Fork
// @name:ru     Denque-on-Greasy-Fork
// @name:si     Denque-on-Greasy-Fork
// @name:sk     Denque-on-Greasy-Fork
// @name:sl     Denque-on-Greasy-Fork
// @name:sq     Denque-on-Greasy-Fork
// @name:sr     Denque-on-Greasy-Fork
// @name:sv     Denque-on-Greasy-Fork
// @name:sw     Denque-on-Greasy-Fork
// @name:ta     Denque-on-Greasy-Fork
// @name:te     Denque-on-Greasy-Fork
// @name:th     Denque-on-Greasy-Fork
// @name:tl     Denque-on-Greasy-Fork
// @name:tr     Denque-on-Greasy-Fork
// @name:uk     Denque-on-Greasy-Fork
// @name:ur     Denque-on-Greasy-Fork
// @name:uz     Denque-on-Greasy-Fork
// @name:vi     Denque-on-Greasy-Fork
// @name:xh     Denque-on-Greasy-Fork
// @name:yi     Denque-on-Greasy-Fork
// @name:zh-CN  Denque-on-Greasy-Fork
// @name:zh-TW  Denque-on-Greasy-Fork
// @name:zh-HK  Denque-on-Greasy-Fork
// @supportURL  https://greasyfork.org/en/scripts/559642-denque-on-greasy-fork/feedback
// @homepageURL https://greasyfork.org/en/scripts/559642-denque-on-greasy-fork
// ==/UserScript==

/* jshint esversion: 11 */
/* jshint moz: true */
`;

              const webContent = copyright + modified;
              const greasyForkContent = 
`${metadata}

// import double-ended queue implementation that is based on a ring buffer rather than plain js array;
// unfortunately, it's written as a commonJS (cjs) module for node.js, so this has been automatically
// converted to code that can run in a userscript
function getDenqueClass() {

${webContent}

return Denque;
}
`;

              fs.writeFileSync('denque_for_web.js', webContent, 'utf8');
              fs.writeFileSync('denque_for_greasy_fork.js', greasyForkContent, 'utf8');

              console.log('Files written: denque_for_web.js, denque_for_greasy_fork.js');
              process.exit(0);
            } catch (err) {
              console.error('Failed:', err);
              process.exit(1);
            }
          })();
