# Citizenship.UI

Bu proje, vatandaşlık bilgilerini sorgulama ve yönetme amaçlı bir web uygulamasıdır.

## 🚀 Özellikler

- Vatandaş Sorgulama
- Adres Sorgulama
- SMS Gönderimi
- Kullanıcı Yönetimi
- JWT Tabanlı Kimlik Doğrulama

## 🛠️ Kullanılan Teknolojiler

- **Frontend Framework**: React 18
- **Tip Güvenliği**: TypeScript
- **Durum Yönetimi**: Recoil
- **UI Kütüphanesi**: Chakra UI
- **Tablo Bileşeni**: AG Grid
- **HTTP İstemcisi**: Axios
- **Stil**: Tailwind CSS
- **Geliştirme Ortamı**: Vite
- **Yönlendirme**: React Router
- **Bildirimler**: React Toastify

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/kullaniciadi/citizenship.ui.git
cd citizenship.ui
```

2. Gerekli paketleri yükleyin:
```bash
npm install --legacy-peer-deps
```

3. `.env` dosyasını oluşturun:
```bash
cp .env.example .env
```

4. `.env` dosyasını düzenleyin ve gerekli değişkenleri ayarlayın:
```env
VITE_API_BASE_URL=https://api.example.com
VITE_SMS_API_URL=https://sms-api.example.com
VITE_API_PORT=443
VITE_DEV_PORT=9876
```

5. Uygulamayı başlatın:
```bash
npm run dev
```

## 🚀 Dağıtım

Projeyi derlemek için:
```bash
npm run build
```

Derlenen dosyalar `dist` klasöründe oluşturulacaktır.

## 📁 Proje Yapısı

```
src/
├── controllers/     # API istekleri
├── models/         # Tip tanımlamaları
├── recoil/         # Durum yönetimi
├── utils/          # Yardımcı fonksiyonlar
└── views/          # UI bileşenleri
    ├── pages/      # Sayfa bileşenleri
    └── components/ # Genel bileşenler
```

## 🔒 Güvenlik

- JWT token'ları localStorage'da saklanır
- API istekleri için HTTPS kullanılır
- Hassas bilgiler .env dosyasında tutulur
- Rate limiting uygulanır

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Bir Pull Request oluşturun

## 📝 Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.
