/**
 * Created by sam on 16-7-25.
 */


var exec= require('child_process').exec;



module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.config.init({


        aws_s3: {
            options: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use the variables
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // You can also use env variables
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5 // 5 simultaneous downloads
            },
            docs: {
                options: {
                    region: 'eu-west-1',
                    bucket: 'docs.dotlearn.io',
                    differential: true // Only uploads the files that have changed
                },
                files: [
                    {
                        expand: true,
                        cwd: 'site',
                        src: ['**', '!**/*~'],
                        dest: ''
                    }
                ]
            }

        }


    });




    grunt.registerTask('build', 'runs mkdocs build', function () {

        var done = this.async();


        exec('mkdocs build --clean', {}, function (err, stdout, stderr) {

            if(err) return grunt.fail.warn(err);

            if(stderr) grunt.log.error(stderr);

            grunt.log.write(stdout);

            done();

        });

    });



    grunt.registerTask('push', ['build', 'aws_s3:docs']);





};

