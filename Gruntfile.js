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
                    region: 'us-west-2',
                    bucket: 'vectorly.io',
                    differential: true // Only uploads the files that have changed
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**', '!**/*~'],
                        dest: 'docs'
                    }
                ]
            }

        }


    });



    grunt.registerTask('push', ['aws_s3:docs']);





};

