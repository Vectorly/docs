
<img src="img/title.svg" alt="Drawing" style="height: 150px; display: block; margin: auto;"/>


## Overview

dot Learn makes video learning fast and affordable in connectivity-challenged environments through our ".lrn" video file format, which can store hours of video-lessons in a few MB (up to 100x smaller than via comparable mp4s).
This is possible because visual elements on the screen are stored not as streams of pixels, but rather as text-based vectors (equations, curves etc...), enabling efficient data-representation for certain kinds of videos

![Vector-Based](img/vector.svg)

Like with any file format, there are encoders to create .lrn files, and decoders for playback. To make integration easy, we have developed software to create videos natively in the .lrn format (accessible via the [dashboard](https://dashboard.dotlearn.io)), as well as player software for multiple platforms (see the [api section](#playing-videos) for details).

![Vector-Based](img/flow.svg)

The video files are hosted on the cloud, and accessed via an API (see [the flow section](#playing-videos) for details)

## Getting started

As these APIs are still a work in progress, the process is a bit manual.

** Get your server token **

First and foremost, you will need a **server token**, which you can get by contacting [our technical team](mailto:sam@dotlearn.org). You should store this server token in a safe place on your server (as an environmental variable) or in a secret file which is _not stored in version control systems_. The **server token** will be used to for API calls to dot Learn's servers.

** Import the .lrn player **

In order to let users watch .lrn videos in your app/website, you will need to import the .lrn player library into your app / website (you can get them from [the technical team](mailto:sam@dotlearn.org)). Specific details for each platform are show in the [api section](#playing-videos) .

** Video IDs **

To play a video using our SDKs, you will need the video's unique ID. If you don't already have it, you can get a full list of available videos, with descriptions, previews and IDs from [our partnerships team](mailto:tunde@dotlearn.org).


## Playing Videos

All videos are hosted on dot Learn's servers. To enable users to watch your videos, you must import the .lrn library into your app/website. When you want to watch a video (after importing the library), you will need to provide an _access_token_ (see the examples for each platform below) as a parameter, along with the id of the video you want to load, and it will then download and play the video from the server


### Access tokens

To start playing around with the videos, we can provide you a _sandbox token_, but for security reasons, you will need to move to the production flow before integrating it into your life product.


#### Sandbox testing

We can provide you with a _sandbox token_, which you use for development / testing purposes.


While fast and simple for testing, this method _should not be used in production_ as it is _insecure_. If the key is stored anywhere in your production app/website, no amount of clever software engineering will prevent a sufficiently motivated hacker from retrieving this token and impersonating your organization. To prevent abuse, we limit the number of sandbox transactions per organization per day.


#### Production flow

You can provide a _temporary access token_, which will be valid for 10 min. You can obtain such a token via an API call from your server, authenticated with your server token.

To get a _temporary_access_token_, submit a POST request to `https://api.dotlearn.io/auth/video`, sending as the body a JSON object, with the parameters

    {
      "server_token": ....,
      "video_id": .....,
      "user_id": .....
    }


With the id of the video you wish your end user to watch, and the user_id of the user you wish to grant access to the video to, _according to your database records_. This will return a the _temporary access token_, which you can then send to your user's device.

An example flow would be:

1. Your app sends a request to your server for a temporary access token
2. Your server then makes a call to `https://api.dotlearn.io/auth/video`
3. `https://api.dotlearn.io/auth/video` returns a temporary access token to your server
4. Your server returns the temporary access token to your app


### Android

In your project, open your_app | Gradle Scripts | build.gradle (Module: app) and add the following compile statement to the dependencies{} section to compile the latest version of our library:

    compile 'org.dotlearn:lrnplayer:0.1.0'

To play a video, you will need to add a .lrn videoView element in your layout

    <org.dotlearn.lrnplayer.LRNPlayer
            android:id="@+id/lrnVideo"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/>


You can open the LRNPlayer in your activity, and then call the `load` function, which will start to download the video.

        LRNPlayer lrnPlayer = (LRNPlayer) findViewById(R.id.lrnVideo);

        lrnPlayer.load(accessToken, videoID);

        lrnPlayer.onReady(new LRNPlayer.onReadyListener(){

                  public void onReady(LRNPlayer lp) {
                       lp.play();   //Default behavior is to play
                   }

        });

        /*
            lrnplayer.onDownloadStart(onDownloadStartListner);
            lrnplayer.onDownloadComplete(onDownloadCompleteListner);
            lrnplayer.onDownloadProgress(onDownloadProgressListener);
            lrnPlayer.onMetaData(onMetaDataReadyListener);
            lrnPlayer.onError(onErrorListener);
            lrnplayer.play();
            lrnplayer.pause();
            lrnPlayer.seek(1000); //millisenconds
            lrnplayer.stop;
        */


### iFrame

To view a .lrn video on the web, the easiest way is to use an iframe. You need to provide 2 parameters - the client token, and the videoID:

        <iframe
        src="https://api.dotlearn.org/embed/token/myAccessToken/video/selectedVideoID"
        height="600" width="800" />



### Javascript

You can download the .lrn player via CDN:

    <script src="https://cdn.dotlearn.io/lrn.js">

Or, you can get the player via npm, or from "libraries" tab in [dashboard](https://dashboard.dotlearn.io))




    var options = {autoplay: true};
    lrn.load(accessToken, 'myVideo', 'idOfDivToPlaceVideo', options, function(video){

       /*
        video.onDownloadStart(function(){});
        video.onDownloadComplete(function(){}));
        video.onDownloadProgress(function(downloadProgress){}));
        video.onMediaReady(function(){}));
        video.onMetaData(function(metaData){}));
        video.onError(function(e){}));
        video.play();
        video.pause();
        video.seek(1000); //milliseconds
        video.stop;

        */
    });



## Creating videos

We are still working on the documentation for creating videos



