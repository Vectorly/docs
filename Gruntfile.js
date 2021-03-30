/**
 * Created by sam on 16-7-25.
 */


var exec= require('child_process').exec;



module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-cloudfront');

    grunt.config.init({


        aws_s3: {
            options: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use the variables
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // You can also use env variables
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5 // 5 simultaneous downloads
            },
            production: {
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
            },

            staging: {
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
                        dest: 'docs_staging'
                    }
                ]
            }

        },

        cloudfront: {
            options: {
                region:'us-west-2', // your AWS region
                distributionId:"E2XU8J1PRAM207", // DistributionID where files are stored
                listInvalidations:true, // if you want to see the status of invalidations
                listDistributions:false, // if you want to see your distributions list in the console
                version:"1.0" // if you want to invalidate a specific version (file-1.0.js)
            },
            production: {
                CallerReference: Date.now().toString(),
                Paths: {
                    Quantity: 1,
                    Items: [ '/docs/*' ]
                }
            },
            staging: {
                CallerReference: Date.now().toString(),
                Paths: {
                    Quantity: 1,
                    Items: [ '/docs_staging/*' ]
                }
            }
        }


    });



    grunt.registerTask('production', ['aws_s3:production', 'cloudfront:production']);
    grunt.registerTask('staging', ['aws_s3:staging',  'cloudfront:staging']);





};

