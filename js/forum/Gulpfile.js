var flarum = require('flarum-gulp');

flarum({
    files: [
        'library/quill.js'
    ],
    modules: {
        'sledov/quill': [
            'src/**/*.js'
        ]
    }
});