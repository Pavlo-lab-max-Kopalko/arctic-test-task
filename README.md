# Snippet Manager App (Fullstack Test Task)

Виконував: Копалко Павло
Посилання на тестове завдання: https://drive.google.com/file/d/1fWYNE4807Lt31qZ_j-7usAuSCzTBDZRw/view

Це повноцінний додаток для керування кодовими сніпетами з можливістю пошуку, фільтрації та CRUD-операцій.


## 🚀 Технологічний стек
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend:** NestJS, MongoDB (Mongoose)

---

## 🛠 Як запустити локально

### 1. Клонування репозиторію
```bash
git clone [https://github.com/ТВІЙ_НІК/arctic-test-task.git](https://github.com/ТВІЙ_НІК/arctic-test-task.git)
cd arctic-test-task 
```

 2. Запуск бекенду:
```Bash
  cd backend
  npm install
  npm run start:prod
```
  # Створіть файл .env на основі .env.example та вкажіть вашу MongoDB URL
  Новий термінал:
```bash
  cp .env.example .env 
  npm run start:dev
```

 3. Налаштування фронтенду:
  Новий термінал:
```bash
  cd frontend
  npm install
  npm run dev
```

 3. Як працюють АПІ:
  - `GET /snippets` — отримати список усіх сніпетів (підтримує `q`, `tag`, `page`, `limit`).
  - `GET /snippets/:id` — деталі конкретного сніпета.
  - `POST /snippets` — створення нового запису (Body: JSON).
  - `PATCH /snippets/:id` — редагування.
  - `DELETE /snippets/:id` — видалення.

 4. Запуск в продакшин:
  ### Backend
  Новий термінал:
```bash
  cd backend
  npm run build
  npm run start:prod
```

  ### Frontend
  Новий термінал:
```Bash
  cd frontend
  npm run build
  npm run start 
```

Які речі не встиг доробити: 
 - я не встиг розробити лоадінг для завантаження. Його я б завантажив в Інтернеті дав би абсолютне позиціонування та затримку 400мс.
 - я не зробив пагінацію. Її я б розробив шляхом розподілення карток не певну кількість (10 одиниць) на одній сторінці, ці картки я б показував би їх в залаженості від того де на яку сторінку користувач перегорнув. Я реалізовував таку пагінацію в своєму портфоліо проекті Phone Catalog.
