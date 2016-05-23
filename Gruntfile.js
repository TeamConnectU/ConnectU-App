module.exports = function(grunt) {
   // Project configuration.
   grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       watch: {
         scripts: {
           files: ['client/*.js'],
           tasks: ['uglify'],
           options: {
             spawn: false
           }
         }
       },
       uglify: {
           options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
           },
           build: {
               src: 'client/*.js',
               dest: 'server/public/assets/scripts/composite.all.min.js'
           }
       },
       copy: {
           main: {
               expand: true,
               cwd: "node_modules/",
               src: [
                   "bootstrap/dist/css/bootstrap.min.css",
                   "bootstrap/dist/js/bootstrap.min.js",
                   "jquery/dist/jquery.min.js",
                   "angular/angular.min.js",
                   "angular-route/angular-route.min.js",
                   "angular-animate/angular-animate.min.js",
                   "angular-aria/angular-aria.min.js",
                   "angular-material/angular-material.min.js",
                   "angular-material/angular-material.min.css",
                   "angular-smart-table/dist/smart-table.min.js",
                   "angular-ui-bootstrap/dist/ui-bootstrap-tpls.js"
               ],
               "dest": "server/public/vendor/"
           }
       }
   });

   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');

   // Default task(s).
   grunt.registerTask('default', ['copy', 'uglify']);

};
