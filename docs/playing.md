# Playing Videos

To enable users to watch your videos, you must import the .vvid library into your app/website, or if you use a content management system like Wordpress or Moodle, you can use a plugin. 


# Web

### iFrame

When we convert videos for you, we host a copy of the videos on our servers and provide you with a link to view the video online. The easiest way to embed them in your website is through an iframe.

Just set the source of the iframe to the same link

        <iframe
        src="https://api.vectorly.io/embed/demo/[video-id]"
        height="600" width="800" />

** Sizing **

By default, the video will try to scale to the size of the iframe, while maintaning a 16:9 aspect ratio for the video. If the the aspect ratio of the iframe is greater than 16:9 (wider), then the video will occupy the full height, but center horizontally, and if the aspect ratio is less than 16:9, it will occupy the full width and center vertically

<img src="../img/iframe_example.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

<img src="../img/iframe_example_2.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

** Parameters **

Additionally, there are several other parameters you can pass via the src url, to configure playback of the video, using the following format

        <iframe
        src="https://api.vectorly.io/embed/demo/[video-id]/parameter1/[value1]/parameter2/[value2]" />


* **height** You can set the height in pixels of the video to be loaded. This will override the default sizing discussed above, and set the height of the video to the specified value. The video will be centered vertically within the iframe, regardless of whether the video is larger or smaller than the iframe
* **width** You can set the width in pixels of the video to be loaded. This will override the default sizing discussed above, and set the width of the video to the specified value.  The video will be centered horizontally within the iframe, regardless of whether or not the video is larger or smaller than the iframe.
* **autoplay** Whether the video plays automatically when loaded (default, false)

For example, you can load a video to autoplay, with height=900, width=1600, audio-quality=mp3_24 and autoplay=true with the following code:

        <iframe
        src="https://api.vectorly.io/embed/token/[token]/video/[video-id]/width/1600/height/900/autoplay/true" />


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




#Mobile


## Android

Coming soon


## iOS
Coming soon


# Desktop

Coming soon. If you need a desktop player, let us know at <team@vectorly.io> so we can prioritize releasing it.






#Plugins
We are currently developing plugins for Wordpress and Moodle. If you use another content management system such as

* Squarespace

* Wix

* Joomla

* etc...

Please let our team know at <team@vectorly.io> 