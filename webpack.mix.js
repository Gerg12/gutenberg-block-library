let mix = require('laravel-mix');
let path = require('path');

mix.setResourceRoot('../');
mix.setPublicPath(path.resolve('./'));

mix.webpackConfig({
    devtool: 'source-map',
    watchOptions: {
        ignored: [
            path.posix.resolve(__dirname, './node_modules'),
            path.posix.resolve(__dirname, './dist'), // Ignore the 'dist' folder
        ],
    },
});

mix.js('src/block.js', 'dist'); // Compile block.js to dist/block.build.js

mix.sass('src/styles.scss', 'dist').sourceMaps(); // Compile styles.scss to dist/styles.css

mix.browserSync({
    proxy: 'http://wordpress-gatsby.local', // Replace with your WordPress development URL
    host: 'wordpress-gatsby.local',
    open: 'external',
    port: 3020,
    injectChanges: true,
    files: ['**/*.html', '**/*.php', '**/*.css'],
});

if (mix.inProduction()) {
    mix.version();
} else {
    mix.options({ manifest: false });
}
