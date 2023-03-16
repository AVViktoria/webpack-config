# webpack-config

* ### Источники:
+[Документация на русском](https://runebook.dev/ru/docs/webpack/-index- "")
+[Оригинальная документация](https://webpack.js.org/concepts/ "")
+[Пошаговое руководство по настройке сборщика Webpack 5 для совместной работы с такими инструментами как Pug, Sass, JavaScript, React и Markdown](https://habr.com/ru/post/701724/ "")

* ### Основные плагины для старта проекта:

+ npm i -D webpack webpack-cli
+ npm i -D html-webpack-plugin (автоматическое создание html файла в готовой сборке из исходного шаблона)
+ npm i -D clean-webpack-plugin (удаляет старый билд при создании нового)
+ npm i -D babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-class-properties (Babel - это компилятор, который адаптирует новые функции JavaScript для устаревших браузеров.)
+ npm i -D sass-loader postcss-loader css-loader style-loader postcss-preset-env node-sass (для использования Sass, CSS)
+ npm i -D webpack-dev-server (для автоматического обновления страницы браузера)

* ### Плагины для оптимизации:

1. npm i -D svgo (минификатор, который удаляет лишний код в разметке SVG и тем самым уменьшает размер файла)
2. npm i -D image-minimizer-webpack-plugin imagemin
