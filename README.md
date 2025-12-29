# 📋 Django & Vue 3 Kanban App 

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, **Sürükle-Bırak (Drag & Drop)** özellikli bir görev yönetim uygulamasıdır. Kullanıcıların görevlerini "Yapılacaklar", "Sürüyor" ve "Tamamlandı" statüleri arasında kolayca taşımasına olanak tanır.

![Proje Ekran Görüntüsü](https://via.placeholder.com/800x400?text=Proje+Ekran+Goruntusu+Buraya)
*(Buraya projenin çalışan halinin ekran görüntüsünü veya GIF'ini koyacağız)*

## 🚀 Özellikler

* **Full Stack Mimari:** Django REST Framework (Backend) ve Vue 3 (Frontend) haberleşmesi.
* **Kanban Pano:** `vuedraggable` kütüphanesi ile pürüzsüz sürükle-bırak deneyimi.
* **JWT Authentication:** Güvenli giriş ve çıkış işlemleri.
* **CRUD İşlemleri:** Görev ekleme, silme ve statü güncelleme.
* **Responsive Tasarım:** Hem masaüstü hem mobilde şık görünüm.

## 🛠️ Kullanılan Teknolojiler

### Backend
* **Python & Django:** Güçlü ve ölçeklenebilir altyapı.
* **Django REST Framework:** RESTful API servisi.
* **SQLite:** Geliştirme aşaması veritabanı.
* **CORS Headers:** Güvenli frontend-backend iletişimi.

### Frontend
* **Vue.js 3 (Composition API):** Modern ve reaktif arayüz.
* **Vue Router:** Sayfa yönlendirmeleri.
* **Axios:** HTTP istekleri ve API entegrasyonu.
* **Vue Draggable:** Sürükle bırak mantığı için.

## 💻 Kurulum (Bilgisayarınızda Çalıştırma)

Projeyi klonlayın:
```bash
git clone [https://github.com/hazalgelenbey/django-vue-kanban-app.git](https://github.com/hazalgelenbey/django-vue-kanban-app.git)
cd django-vue-kanban-app
cd backend
# Sanal ortamı oluşturun ve aktif edin (Windows için)
python -m venv venv
.\venv\Scripts\activate

# Gereksinimleri yükleyin
pip install -r requirements.txt

# Veritabanını oluşturun
python manage.py migrate

# Sunucuyu başlatın
python manage.py runserver

cd frontend/vue-project
# Paketleri yükleyin
npm install

# Uygulamayı başlatın
npm run dev
