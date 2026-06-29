# Базовый образ Node.js
FROM node:lts-slim AS base

# Рабочая директория
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY ["package.json", "package-lock.json*", "./"]

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Строим приложение
RUN npm run build

# Экспонируем порт, на котором работает приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "run", "start:dev"]