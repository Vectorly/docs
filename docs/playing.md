# Playing Videos

To enable users to watch your videos, you must import the .vvid library into your app/website, or if you use a content management system like Wordpress or Moodle, you can use a plugin. 


# Web

### iFrame

When we convert videos for you, we host a copy of the videos on our servers and provide you with a link to view the video online. The easiest way to embed them in your website is through an iframe.

Just set the source of the iframe to the same link

        <iframe
        src="https://api.dotlearn.io/embed/demo/[video-id]"
        height="600" width="800" />

** Sizing **

By default, the video will try to scale to the size of the iframe, while maintaning a 16:9 aspect ratio for the video. If the the aspect ratio of the iframe is greater than 16:9 (wider), then the video will occupy the full height, but center horizontally, and if the aspect ratio is less than 16:9, it will occupy the full width and center vertically

<img src="../img/iframe_example.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

<img src="../img/iframe_example_2.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

** Parameters **

Additionally, there are several other parameters you can pass via the src url, to configure playback of the video, using the following format

        <iframe
        src="https://api.dotlearn.io/embed/demo/[video-id]/parameter1/[value1]/parameter2/[value2]" />


* **height** You can set the height in pixels of the video to be loaded. This will override the default sizing discussed above, and set the height of the video to the specified value. The video will be centered vertically within the iframe, regardless of whether the video is larger or smaller than the iframe
* **width** You can set the width in pixels of the video to be loaded. This will override the default sizing discussed above, and set the width of the video to the specified value.  The video will be centered horizontally within the iframe, regardless of whether or not the video is larger or smaller than the iframe.
* **autoplay** Whether the video plays automatically when loaded (default, false)

For example, you can load a video to autoplay, with height=900, width=1600, audio-quality=mp3_24 and autoplay=true with the following code:

        <iframe
        src="https://api.dotlearn.io/embed/token/[token]/video/[video-id]/width/1600/height/900/autoplay/true" />


Keep in mind that the /video parameter need to be specified first.  The order of the subsequent parameters doesn't matter.


### Javascript

As an alternative to the iframe, you can use

You can download the .vvid player via CDN:

    <script src="https://cdn.dotlearn.io/vv.js">


#### Loading the video

You will need to access a .vvid object as a blob


        var oReq = new XMLHttpRequest();

        oReq.onload = function(e) {
            var arraybuffer = oReq.response;
            var blob = new Blob([oReq.response], {type: "application/zip"});
        };
        oReq.open("GET", "demo.vvid");
        oReq.responseType = "arraybuffer";
        oReq.send();


Once you have a blob in javascript, you can load the video into a the player

      vv.load(blob, "container", {width: 800, height:450 });


#### Video Options  / Controls

    vvid.load(vvidBlob, 'container-id', options);  // Load a video

**container-id** - The id of the div element you wish to place the video in

**options**  - Options object, with the following parameters

**width** - Width, in pixels, of the video
**height** - Height, in pixels, of the video
**callback** - Function to call after video is loaded. The callback will pass a video object as it's first argument

    video.play() // Play the video


    video.pause(); // Pause the video


    video.stop(); //Stop the video


# Desktop

Coming soon. If you need a desktop player, let us know at <team@dotlearn.io> so we can prioritize releasing it.


#Mobile

## iOS
Coming soon


## Android (Deprecated)

Please use the javascript version of the library. We are working on a new wrapper for Android and iOS.


### Install
The Gradle dependency is available via jCenter. jCenter is the default Maven repository used by Android Studio.

Add this in your (app) module's `build.gradle` file:
```groovy
    implementation 'io.dotlearn.lrnplayer:1.0.0'
```

### Usage

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



#Plugins
We are currently developing plugins for Wordpress and Moodle. If you use another content management system such as

* Squarespace

* Wix

* Joomla

* etc...

Please let our team know at <team@dotlearn.io> 