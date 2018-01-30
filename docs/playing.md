# Playing Videos

All videos are hosted on dot Learn's servers. To enable users to watch your videos, you must import the .lrn library into your app/website. When you want to watch a video (after importing the library), you will need to provide an _access_token_ (see the examples for each platform below) as a parameter, along with the id of the video you want to load, and it will then download and play the video from the server


## Access tokens

To start playing around with the videos, we can provide you a _sandbox token_, but for security reasons, you will need to move to the production flow before integrating it into your life product.


### Sandbox testing

We can provide you with a _sandbox token_, which you use for development / testing purposes.


While fast and simple for testing, this method _should not be used in production_ as it is _insecure_. If the key is stored anywhere in your production app/website, no amount of clever software engineering will prevent a sufficiently motivated hacker from retrieving this token and impersonating your organization. To prevent abuse, we limit the number of sandbox transactions per organization per day.


### Production flow

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

# Web

### iFrame

To view a .lrn video on the web, the easiest way is to use an iframe. You need to provide 2 parameters - the client token, and the videoID:

        <iframe
        src="https://api.dotlearn.io/embed/token/[token]/video/[video-id]"
        height="600" width="800" />

** Sizing **

By default, the video will try to scale to the size of the iframe, while maintaning a 16:9 aspect ratio for the video. If the the aspect ratio of the iframe is greater than 16:9 (wider), then the video will occupy the full height, but center horizontally, and if the aspect ratio is less than 16:9, it will occupy the full width and center vertically

<img src="../img/iframe_example.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

<img src="../img/iframe_example_2.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

** Parameters **

Additionally, there are several other parameters you can pass via the src url, to configure playback of the video, using the following format

        <iframe
        src="https://api.dotlearn.io/embed/token/[token]/video/[video-id]/parameter1/[value1]/parameter2/[value2]" />


* **height** You can set the height in pixels of the video to be loaded. This will override the default sizing discussed above, and set the height of the video to the specified value. The video will be centered vertically within the iframe, regardless of whether the video is larger or smaller than the iframe
* **width** You can set the width in pixels of the video to be loaded. This will override the default sizing discussed above, and set the width of the video to the specified value.  The video will be centered horizontally within the iframe, regardless of whether or not the video is larger or smaller than the iframe.
* **autoplay** Whether the video plays automatically when loaded (default, false)
* **quality** Chooses a quality for the audio track. Options include "amr_nb5" (default), "mp3_24", and "mp3_128". "amr_nb5" results in the most compact videos, but can sound fuzzy sometimes. "mp3_128" is the highest quality audio, while "mp3_24" is a medium value. For human speech, the difference between mp3_24 and mp3_128 is imperceptable.

For example, you can load a video to autoplay, with height=900, width=1600, audio-quality=mp3_24 and autoplay=true with the following code:

        <iframe
        src="https://api.dotlearn.io/embed/token/[token]/video/[video-id]/quality/mp3_24/width/1600/height/900/autoplay/true" />


Keep in mind that the /token and /video parameters need to be specified first, in that order. The order of the subsequent parameters doesn't matter.


### Javascript

As an alternative to the iframe, you can use

You can download the .lrn player via CDN:

    <script src="https://cdn.dotlearn.io/lrn.js">

Or, you can get the player via npm, or from "libraries" tab in [dashboard](https://dashboard.dotlearn.io))



#### Loading the video

Once imported, you can access the library via the lrn namespace. The primary method is npm.load, which returns a "load promise",
with the API as shown below.

    var options = {autoplay: true};
    lrn.load(accessToken, 'myVideo', 'idOfDivToPlaceVideo', options).then(function(video){

    }).onError(function(err){

    }).onDownloadProgress(function(progress){

    }).onMetaData(function(metaData){

    });


#### Video Controls

The load promise returns video object, which provides methods for controlling video playback

    lrn.load(accessToken, 'myVideo', 'idOfDivToPlaceVideo', options).then(function(video){


      //Video info
      video.getTime();
      video.meta; //Meta data


      //Playback Controls
      video.play();
      video.seek(1000); //Seek to 1s
      video.pause();

      // Event Listeners
      video.onPlay(function(){

      });

      video.onPause(function(){

      });

      video.onSeek(function(newTime){

      });


      video.onEnd(function(){

      });

    });



# Android
LRNPlayerView is a simple View that you can plugin to your Android apps to quickly get vectorized video playback working.

## Install
The Gradle dependency is available via jCenter. jCenter is the default Maven repository used by Android Studio.

Add this in your (app) module's `build.gradle` file:
```groovy
    implementation 'io.dotlearn.lrnplayer:1.0.0'
```

## Usage

#### Layouts
The layout for your player Activity can be very simple. You only need a LRNPlayerView, all the controls and everything else are created by the player view itself.
```xml
    <io.dotlearn.lrnplayer.LRNPlayerView
        android:id="@+id/lrn_player_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
```

<b>Note:</b> Ensure the `layout_height` is set to `wrap_content`. Based on the width of the view, the height is automatically calculated to maintain a 16:9 aspect ratio.

#### Basic Code Setup

Playing a video with the View is very simple. You just need to pass an `aceesToken`, `videoId`, `autoStart` flag and an `OnPreparedListener` that gets notified when the video is ready.
```kotlin
    val accessToken = "accessToken"
    val videoId = "videoId"

    val lrnPlayerView = findViewById<LRNPlayerView>(R.id.lrn_player_view)
    lrnPlayerView.prepare(accessToken, videoId, false, object: OnPreparedListener {

        override fun onPrepared(lrnPlayerView: LRNPlayerView) {
            // The video has been prepared and is ready for playback. If you set autoStart
            // to false, you can manually start playback here, else you don't have to do
            // anything here
            lrnPlayerView.start()
        }

    })
```

You can control video playback programmatically using any of the functions below:
```kotlin
    lrnPlayerView.start() // Starts video playback
    lrnPlayerView.pause() // Pause video playback
    lrnPlayerView.seekTo(seekPos) // Seeks to the specified position
```

Before calling any of the playback control functions above, ensure that a video has been prepared on the player view. If a video has not been prepared and no error listener was set, the control function will throw a `LRNPlayerNotPreparedException` exception. To set an error listener and prevent an exception from being thrown, use the code below:
```kotlin
    // Set a listener that gets called when an error occurred while working with the LRNPlayerView
    lrnPlayerView.setOnErrorListener(object: OnErrorListener {

        override fun onError(lrnPlayerView: LRNPlayerView, e: LRNPlayerException) {
            // Do something when an error occurs
        }

    })
```

<b>Note:</b> Its really important that you call the `lrnPlayerView.pause()` function in your `Activity` or `Fragment` `onPause` lifecycle callback. If you do not explicitly pause playback, the video and audio will continue to play even if the user is in another Activity.

If the player view is no longer needed or the `Activity` is being destroyed, you should call the `release` function on the View to release system resources.
```kotlin
    lrnPlayerView.release()
```

To support the full screen functionality, you will need to set an `OnFullScreenToggledListener` that toggles between landscape and portrait orientation. We have provided a helper class called `FullScreenUtils` to help you toggle the phone orientation:
```kotlin
    // Sets a listener that gets called when the full screen button is clicked
    lrnPlayerView.setOnFullScreenToggledListener(object: OnFullScreenToggledListener{

        override fun onFullScreenToggled(lrnPlayerView: LRNPlayerView) {
            // The full screen button was clicked, toggle the phone orientation
            FullScreenUtils.toggleOrientation(activity)
        }

    })
```

#### Additional functionality
If you want to show some information about the video, you can set an `OnMetadataLoadedListener` that gets called when the video metadata is ready (loaded):
```kotlin
    // Sets a listener when the video metadata is loaded
    lrnPlayerView.setOnMetadataLoadedListener(object: OnMetadataLoadedListener{

        override fun onMetadataLoaded(lrnPlayerView: LRNPlayerView, metadata: Metadata) {
            // Do something with the video metadata
        }

    })
```

To get notified as a video is being downloaded, set the `OnDownloadProgressListener` listener:
```kotlin
    // Set a download progress listener that gets called as each chunk of the video is downloaded
    lrnPlayerView.setOnDownloadListener(object: OnDownloadProgressListener{

        override fun onDownloadProgress(lrnPlayerView: LRNPlayerView, progressPercent: Float) {
            // Do something with the download progress. The library already shows a progress bar
            // so there is no need for you to also show a progress bar
    }

    })
```

You can also get notified when a video playback completes by setting an `OnPlaybackCompletionListener` listener:
```kotlin
    // Set a listener that gets notified when the video playback completes
    lrnPlayerView.setOnCompletionListener(object: OnPlaybackCompletionListener {

        override fun onPlaybackCompletion(lrnPlayerView: LRNPlayerView) {
            // Do something when the video completes
        }

    })
```

To debug the player and view the logs, you can enable debugging with just one line of code:
```kotlin
lrnPlayerView.debug(true)
```

That's all. You could see all this in action in the sample project in the `app` module.