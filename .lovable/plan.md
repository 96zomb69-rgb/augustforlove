## Можно ли превратить проект в чисто статичный Vite-сайт с сохранением RSVP?

Да. RSVP-форма уже работает через браузерный Supabase-клиент (`supabase.from("rsvp_responses").insert(...)`), используя публикуемый ключ и RLS-политику `INSERT` для роли `anon`. Никаких server functions / SSR / TanStack Start для бекенда формы не требуется. Бекенд (база Lovable Cloud) остаётся как есть и продолжает принимать записи по HTTPS прямо из браузера.

Конвертирую проект в стандартный Vite + React (SPA), без TanStack Start/Router и без SSR. Один маршрут `/`, поэтому роутер вообще не нужен.

### Что изменится

1. **Стек**
   - Убираем: `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `nitro`, `@lovable.dev/vite-tanstack-config`.
   - Оставляем: React 19, Vite 8, Tailwind v4, shadcn/ui, `@supabase/supabase-js`, `@tanstack/react-query` (опционально — можно тоже удалить, форма его не использует).
   - Добавляем: `@vitejs/plugin-react` уже есть; новый `vite.config.ts` на чистом React-плагине + `@tailwindcss/vite`.

2. **Файловая структура**
   - Новый `index.html` в корне (точка входа SPA, со всеми мета-тегами, шрифтами Google и og:image, которые сейчас живут в `__root.tsx`).
   - Новый `src/main.tsx` — монтирует `<App />` в `#root`.
   - Новый `src/App.tsx` — рендерит компонент `Invitation` напрямую.
   - `src/routes/index.tsx` → `src/pages/Invitation.tsx`: убираем `createFileRoute(...)`, оставляем сам компонент и весь UI/логику без изменений.
   - Удаляем: `src/routes/__root.tsx`, `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`, `src/routes/README.md`, всю папку `src/integrations/supabase/` кроме `client.ts` и `types.ts` (auth-middleware/attacher/client.server больше не нужны).
   - `src/styles.css` остаётся.

3. **Supabase-клиент**
   - `src/integrations/supabase/client.ts` остаётся почти без изменений, читает `VITE_SUPABASE_URL` и `VITE_SUPABASE_PUBLISHABLE_KEY` из `.env`. Эти переменные публикуемые — нормально, что они попадают в JS-бандл.
   - Никаких server-only ключей в проекте нет и не появится. Service role ключ не используется и не должен использоваться из SPA.

4. **package.json / скрипты**
   - `scripts.dev` → `vite`, `build` → `vite build`, `preview` → `vite preview`. Команда `build:dev` остаётся как `vite build --mode development` (Lovable использует её для сборки).
   - Чистим зависимости от удалённых пакетов.

5. **Что НЕ меняется**
   - Дизайн, тексты, тайминги, dress-code, секция «Пожелания», форма RSVP, валидация, состояние ok/sending/error — всё как сейчас.
   - Таблица `rsvp_responses` и её RLS-политика в Lovable Cloud не трогаются.
   - Опубликованный URL/кастомный домен продолжат работать после нажатия Publish.

### Последствия / на что обратить внимание

- Сайт станет полностью клиент-рендерным. Краулерам (Telegram, WhatsApp, Twitter) превью карточки соберётся из тегов в `index.html` — поэтому переносим og:title/description/image туда. Шеринг продолжит выглядеть так же.
- SSR/пререндера больше не будет, но для одностраничного приглашения это и не нужно — первый рендер быстрый, заметного влияния на UX нет.
- `requireSupabaseAuth`, edge-функции, защищённые маршруты в проекте не используются — после конвертации возможность добавить их «по-быстрому» уйдёт. Если позже понадобится логин/админка с просмотром ответов, нужно будет либо вернуть серверный слой, либо добавить отдельную защищённую страницу на Lovable Cloud.
- RLS уже разрешает только `INSERT` для `anon`. Чтение ответов из браузера невозможно — это правильно, ответы можно смотреть только в Backend UI.

### Шаги выполнения (после одобрения)

1. Создать `index.html`, `src/main.tsx`, `src/App.tsx`, `src/pages/Invitation.tsx` (копия текущего `index.tsx` без `createFileRoute`).
2. Переписать `vite.config.ts` на `@vitejs/plugin-react` + `@tailwindcss/vite` + `vite-tsconfig-paths`.
3. Удалить TanStack-файлы и серверные интеграции Supabase.
4. Обновить `package.json` (зависимости и скрипты), запустить `bun install`.
5. Проверить сборку и работу формы (отправка тестового ответа в `rsvp_responses`).
