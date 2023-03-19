# webpack-config

* ## Описание
Выше представлен `webpack.config.js` с **минимальным настройками**, а также все необходимые файлы, при помощи которых можно без проблем собрать **лэндинг**. При сборке файлы будут находиться в каталоге dist, изображения и шрифты - dist/images и dist/fonts соответственно. Все основные плагины, кототорые требуются для корректной работы, описаны ниже.

В каталоге `config 2.0` также находится `webpack.config.js` с **минимальным настройками** и католог `src`, которые служат примером сборки 2-х и более страничного сайта.

* ### Источники:

1. [Оригинальная документация.](https://webpack.js.org/concepts/ "")
2. [Документация на русском.](https://runebook.dev/ru/docs/webpack/-index- "")
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
 1. `npm i -D image-minimizer-webpack-plugin imagemin` (оптимизирует изображения, стабилен и работает со всеми типами изображений).
     * `npm i -D imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo` (оптимизация без потерь качества);
     * `npm i -D imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo` (оптимизация с потерей качества).
 2. [Другие плагины для оптимизации изображений.](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/ "")
 3. `npm i -D mini-css-extract-plugin` (чтобы сборщик мог извлекать CSS из файлов .js).
 4. `npm i - D copy-webpack-plugin` (копирует отдельные файлы или целые каталоги, которые уже существуют, в каталог сборки, например папку assets из src в папку dist).
 5. `npm i -D html-loader` (в данной сборке используется для обновления путей к изображениям в html файле при сборке).
 
 ***

### Note
 1. Файлы package.json и package-lock.json изначально пусты, будут заполняться по мере установки плагинов. 
 2. Файлы .babelrc и postcss.config.js трогать не нужно.
 3. `copy-webpack-plugin` закомментирован в конфиге, при создании билда все изображения собираются в dist/images при помощи генератора, а все шрифты - в dist/fonts. Пути к ним обновляются как в html файле, так и в css при помощи **publicPath** и html-loader'a.
 4. `copy-webpack-plugin` не может в процессе разработки добавлять файлы (например, если сделать билд и добавить в src/assets изображение, то оно не будет добавлено в билд, нужно заново прописывать `npm run dev`). 
 5. Если по каким-то причинам `dev-server` при запуске и дальнейшей разработке не собирает файлы, либо не обновляет страницу браузера, хотя опция `hot: true` прописана, можно принудительно сделать это с помощью параметра [writeToDisk](https://github.com/webpack/webpack-dev-middleware#writetodisk "") (уже реализовано в данном билде) или плагина [write-file-webpack-plugin](https://github.com/gajus/write-file-webpack-plugin "").
 5. Если при npm run serve (плагин "webpack-dev-server") возникает ошибка `Module not found: Error: Can’t resolve` или `Field <название поля> doesn't contain a valid alias configuration`:
     * Проверить путь к папке "node_modules", название папок не должно содержать символов по типу "#, $, %, *" и т.д., даже если такое наименование поддерживается вашей ОС, т.к. сервер не будет корректно работать;
     * Если переименование не помогло, можно попробовать явно указать путь к модулям: 
     
     ```
      resolve: {
        alias: {
         'webpack-dev-server': path.resolve(__dirname, 'node_modules/webpack-dev-server'),
        },
     },
    ```
  
    * Переустановить плагин;
    * [Если ничего не помогло](https://webpack.js.org/configuration/dev-server/).
 6. Если при работе с Powershel возникла ошибка `Set-ExecutionPolicy : Отказано в доступе к разделу реестра`:
    *  Запустить Powershell от имени администратора;
    *  Прописать `Set-ExecutionPolicy`;
    *  Прописать `RemoteSigned`;
    *  Подвердить (Y).
