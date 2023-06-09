# webpack-config

* ## Описание

* ### Источники:
1. [Документация на русском.](https://runebook.dev/ru/docs/webpack/-index- "")
2. [Оригинальная документация.](https://webpack.js.org/concepts/ "")
3. [Пошаговое руководство по настройке сборщика Webpack 5 для совместной работы с такими инструментами как Pug, Sass, JavaScript, React и Markdown.](https://habr.com/ru/post/701724/ "")

***

* ### Основные плагины для старта проекта:
1. `npm i -D webpack webpack-cli`.
2. `npm i -D html-webpack-plugin` (автоматическое создание html файла в готовой сборке из исходного шаблона).
3. `npm i -D clean-webpack-plugin` (удаляет старый билд при создании нового).
4. `npm i -D babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties` (Babel - это компилятор, который адаптирует новые функции JavaScript для устаревших браузеров).
5. `npm i -D sass-loader postcss-loader css-loader style-loader postcss-preset-env node-sass` (для использования Sass, CSS).
6. `npm i -D webpack-dev-server` (для автоматического обновления страницы браузера).

***

* ### Плагины для оптимизации изображений и удобства работы:
 1. `npm install image-minimizer-webpack-plugin imagemin --save-dev` (оптимизирует изображения, стабилен и работает со всеми типами изображений).
     * `npm i imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev` (оптимизация без потерь качества);
     * `npm i imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev` (оптимизация с потерей качества).
 2. [Другие плагины для оптимизации изображений.](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/ "")
 3. `npm i -D mini-css-extract-plugin` (чтобы сборщик мог извлекать CSS из файлов .js).
 4. `npm i - D copy-webpack-plugin` (копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки, например папку assets из src в папку dist).
 5. `npm i -D html-loader` (в данной сборке используется для обновления путей к изображениям в html файле при сборке).
 
 ***

### Note
 1. Файлы package.json и package-lock.json изначально пусты, для наполнения нужно установить плагины. 
 2. Файлы .babelrc и postcss.config.js трогать не нужно.
 3. **minimize** при dev и prod сборках отключен (закомментирован в конфиге).
 4. `copy-webpack-plugin` закомментирован в конфиге, при создании билда все картинки собираются в dist/assets, а пути к ним обновляются как в html файле, так и в css при помощи **publicPath** и генератора (16 и 130 строки конфига соответственно)
 4. `copy-webpack-plugin` по умолчанию не может в процессе разработки добавлять файлы (например, если запустить dev-server и добавить в html разметку изображение, то оно не отобразится/не будет добавлено). Чтобы `webpack-dev-server` записывал файлы в выходной каталог во время разработки, можно принудительно сделать это с помощью параметра [writeToDisk](https://github.com/webpack/webpack-dev-middleware#writetodisk "") или плагина [write-file-webpack-plugin](https://github.com/gajus/write-file-webpack-plugin "").
 5. При запуске `webpack-dev-server` создается папка дист, однако она будет пустая, так как бандл будет отправляться браузеру и при каждом изменения в файлах он будет отправлять браузеру новый бандл. Можно оптимизировать процесс, чтобы бандл не пересобирался полностью, а только та часть, которая была изменена. Для этого нужно добавить в plagins следующее: `new webpack.HotModuleReplacementPlugin()` (уже добавлено в этой сборке).
 5. Если при npm run serve (плагин "webpack-dev-server") возникает ошибка `Module not found: Error: Can’t resolve` или `Field <название поля> doesn't contain a valid alias configuration`:
     * Проверить путь к папке "node_modules", название папок не должно содержать символов по типу "#, $, %, *" и тд., даже если такое наименование поддерживается вашей ОС, т.к. сервер не будет автоматически обновляться;
     * Если переименование не помогло, можно попробовать явно указать путь к модулям: 
     
     ```
      resolve: {
        alias: {
         'webpack-dev-server': path.resolve(__dirname, 'node_modules/webpack-dev-server'),
        },
     },
    ```
  
    * Переустановить плагин.
 6. Если при работе с Powershel возникла ошибка `Set-ExecutionPolicy : Отказано в доступе к разделу реестра`:
    *  Запустить Powershell от имени администратора;
    *  Прописать `Set-ExecutionPolicy`;
    *  Прописать `RemoteSigned`;
    *  Подвердить (Y).
