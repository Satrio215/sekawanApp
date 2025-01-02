# TUTORIAL INSTALL DIBAWAH
## Requirements

Before setting up the project, ensure that you have the following installed:

- PHP (version 8.3.6)
- Laravel (version 11.36.1)
- PHPMYADMIN (version 5.2.1)
- Composer
- NPM
- MySQL

## Installation

Follow the steps below to set up the project:

### 1. Clone the repository

```shell
git clone https://github.com/Satrio215/sekawanApp.git
cd sekawanApp
```

### 2. Install npm and Composer

```shell
npm i
composer i
```

### 3. Set up environment variables

```shell
cp .env.example .env
```

### 4. Migrate tables to the database

```shell
php artisan migrate:fresh --seed
```

### 5. Run the application

```shell
npm run dev
php artisan serve
```

### 6. Login Admin

```shell
admin@sekawan.dev
antiApp
```

## Tambahan

### 1. Struktur Model
  <img src="https://i.ibb.co.com/5WwnGpN/struktur.png"/>

### 2. Activity Peminjaman
  <img src="https://i.ibb.co.com/JjbPJxB/activity.png"/>

### 3. Log Aplikasi
  <img src="https://i.ibb.co.com/BPtyJX5/add.png"/>
  <img src="https://i.ibb.co.com/RB2gVCm/update.png"/>
  <img src="https://i.ibb.co.com/92zDFvN/delete.png"/>



