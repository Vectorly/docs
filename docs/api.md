# API

The API lets you perform the following operations on your videos

* [Upload](#uploading)
* [List](#listing-videos)
* [Search](#searching-videos)
* [Download](#listing-videos)

While the examples here use curl, we have also developed libraries for individual languages. You can find docs for each library on github

* [NodeJS](https://github.com/Vectorly/node-client)
* Python (coming soon)
* PhP (coming soon)
* Ruby (coming soon)
* Java (coming soon)

## Authentication

To use the API, you will also need an API key

**Getting your API key **

You can get your API key in the "Settings page", which you can view by clicking on the user icon in the top-right hand corner.

![APIkey](img/apikey.png)


##  Uploading

To upload videos to Vectorly programmatically,  you will need to use a tus client. Tus is an open source protocol that Vectorly uses to upload large files. This tutorial will use the tus python client, available through pip3, python 3’s package manager.

    pip3 install -U tus.py

Once tus is installed, you can upload videos using the following parameters:

    tus-upload --metadata api_key <api-key>  <file.mp4> https://tus.vectorly.io/files/


In the beginning of the response from tus, you’ll see the endpoint for getting information about your newly uploaded video.

    INFO Creating file endpoint
    INFO Created: https://tus.vectorly.io/files/[upload-id]

Once the video is done uploading, you can see it in the list of videos (see [library](#library)). The name of the video will be equivalent to the original name of the video uploaded. To specify a custom name for the video, you can add a name parameter to the upload call:

    tus-upload --metadata api_key <api-key>   --metadata name <name>  <file.mp4> https://tus.vectorly.io/files/

You can correlate uploaded videos with the output of "https://backend.vectorly.io/video/list" either by referencing the name of the video, or the upload_id

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


##  Analytics

We capture all relevent video events (load, play, finish, pause, buffer etc...) via [Segment](https://segment.com), and provide API endpoints both for high-level summaries, and low-level raw data logs.

** Overall summary of video playback over the last 30 days **

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/analytics/summary'

** Retrieve all events from the last 90 days for a particular video **

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/analytics/events/video/[video-id]'


## Account Management

You can check your current account usage & billing details using the /account endpoint

    curl -H 'X-Api-Key: <api-key>' 'https://api.vectorly.io/account/usage'