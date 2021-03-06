module.exports = function(grunt) {
    // prettier-ignore
    grunt.registerTask('default', 'Default: build web app', [
        'build-web-app',
        'sign-html'
    ]);

    // prettier-ignore
    grunt.registerTask('dev', 'Build project and start web server and watcher', [
        'build-web-app',
        'devsrv'
    ]);

    // prettier-ignore
    grunt.registerTask('devsrv', 'Start web server and watcher', [
        'webpack-dev-server'
    ]);

    // prettier-ignore
    grunt.registerTask('desktop', 'Build web and desktop apps for all platforms', [
        'default',
        'build-desktop'
    ]);

    // prettier-ignore
    grunt.registerTask('cordova', 'Build cordova app', [
        'default',
        'build-cordova'
    ]);
};
