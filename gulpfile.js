var elixir = require('laravel-elixir')
require('laravel-elixir-vueify')

elixir(function(mix) {
    mix.browserify('src/main.js', 'dist/main.js', '.')
})