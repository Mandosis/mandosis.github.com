module.exports = function(grunt) {
   // Project configuration.
   grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       watch: {
         scripts: {
           files: ['src/**/*.js', 'src/**/*.scss'],
           tasks: ['uglify', 'sass'],
           options: {
             spawn: false,
           },
         },
       },
       sass: {
         dist: {
           options: {
             style: 'compressed'
           },
           files: {
             'assets/css/style.min.css': 'src/sass/style.scss'
           }
         }
       },
       uglify: {
           options: {
               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
               sourceMap: true,
               screwIE8: true
           },
           build: {
               src: ['src/js/client.js'],
               dest: 'assets/js/client.min.js'
           }
       },
       copy: {
           main: {
               expand: true,
               cwd: "node_modules/",
               src: [
                   "jquery/dist/jquery.min.js",
                   "jquery/dist/jquery.min.map",
                   "jquery-mousewheel/dist/jquery.mousewheel.js",
                   "font-awesome/css/*",
                   "font-awesome/fonts/*"
               ],
               "dest": "vendor/"
           }
       }
   });

   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-sass');

   // Default task(s).
   grunt.registerTask('default', ['copy', 'uglify', 'sass', 'watch']);

};
