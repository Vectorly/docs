# API 

The API lets you perform the following operations on your videos

* [Upload](#uploading)
* [List](#listing-videos)
* [Search](#searching-videos)
* [Download](#listing-videos)
* [Tags](#updating-videos)
* [Privacy](#updating-videos)
* [Archive](#updating-videos)


### Libraries
While the examples here use curl, we have also developed libraries for individual languages. You can find docs for each library on github

* [NodeJS](https://github.com/Vectorly/node-client)
* [Python](https://github.com/Vectorly/python-client)
* [PhP](https://github.com/Vectorly/PhP-Client)
* [Java](https://github.com/Vectorly/vectorly-java-client)

## Authentication

To use the API, you will also need an API key

**Getting your API key **

You can get your API key in the "Settings page", which you can view by clicking on the user icon in the top-right hand corner. 

![APIkey](img/apikey.png)

## Uploading

To upload videos to Vectorly programmatically, you can either use one of our [libraries](#libraries), or you can use a tus upload client. Tus is an open source protocol for uploading large files. Tus has [implementations](https://tus.io/implementations.html) for most major languages and frameworks. The following examples use the python tus client, but the same parameters can be used with any other tus client.

    pip3 install -U tus.py

Once tus is installed, you can upload videos using the following parameters:

    tus-upload --metadata api_key <api-key>  <file.mp4> https://tus.vectorly.io/files/

In the beginning of the response from tus, you’ll see the endpoint for getting information about your newly uploaded video.

    INFO Creating file endpoint
    INFO Created: https://tus.vectorly.io/files/[upload-id]

Once the video is done uploading, you can see it in the list of videos (see [library](#library)). The name of the video will be equivalent to the original name of the video uploaded. To specify a custom name for the video, you can add a name parameter to the upload call:

    tus-upload --metadata api_key <api-key>   --metadata name <name>  <file.mp4> https://tus.vectorly.io/files/

When an upload is complete, the video will be assigned a unique video id. You can get a video's id from it's upload ID using the Get Videos up upload id call below

## Library

### Listing videos

You can list your videos using the /videos/list endpoint

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/videos/list'

When videos have the status "ready", you can begin playing the video, or you can download it


### Getting video by upload\_id

You can get the video details using videos/get endpoint with an upload\_id

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/videos/get/[upload-id]'



### Searching videos

You can also search for videos using the /videos/search endpoint. The search term is case insensitive. This will return an array

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/videos/search/<search-term>'

### Download

If you want to download an individual video, you can use the /videos/download endpoint, which will download the compressed video to your system

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/videos/download/<video-id>' --output myfile.mp4

### Updating videos

## Tags
(coming soon)

You can set tags to a video, using the /videos/update endpoint. You can define tags to add and remove in the request payload before sending us your request.

    curl -X POST \
         'https://api.vectorly.io/videos/update' \
         -H 'Content-Type: application/json' \
         -H 'X-Api-Key: <api-key>' \
         -d '{
                "video_id":  <video-id>,
                "param_type": "tag",
                "param_value": {
                    "add": [ <tags-to-add> ],
                    "remove": [ <tags-to-remove> ]
                }
            }'

You can get all the tags of your organisation, using the /videos/tags endpoint.

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/videos/tags'

## Privacy
(coming soon)

You can change the video privacy using the /videos/privacy endpoint. You can set the boolean in the request payload as true to make a video private and set it to false to make it public.

    curl -X POST \
         'https://api.vectorly.io/videos/private' \
         -H 'Content-Type: application/json' \
         -H 'X-Api-Key: <api-key>' \  
         -d '{
                "video_id":  <video-id>,
                "is_private": <is_private-boolean (true/false)>
             }'

## Archive
(coming soon)

    curl -X POST \
         'https://api.vectorly.io/videos/archive' \
         -H 'Content-Type: application/json' \
         -H 'X-Api-Key: <api-key>' \
         -d '{
                "video_id":  <video-id>
             }'

## Analytics

We capture all relevent video events (load, play, finish, pause, buffer etc...) via [Segment](https://segment.com), and provide API endpoints both for high-level summaries, and low-level raw data logs.

** Overall summary of video playback over the last 30 days **

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/analytics/summary'

** Retrieve all events from the last 90 days for a particular video **

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/analytics/events/video/[video-id]'


## Account Management

You can check your current account usage & billing details using the /account endpoint

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/account/usage'
