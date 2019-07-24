
<img src="../img/vector-graphics.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>


# Video Vectorization


Vectorly is developing a new kind of video compression technology, which uses computer vision and vector graphics to reduce bitrates for video content by an order of magnitude (or more) compared to HEVC, while **improving video** quality. 

This would be primarily effective for "vector friendly" video content, which would include animations, screen-casts, many e-learning videos and potentially 3d gaming content. 

By leveraging existing vector-graphics rendering capabilities on all devices, this codec wouldn't require end-users, OEMs or browsers to install special software to enable playback of these videos.

__We are still in the early phases of developing this technology__. In late 2019, we plan to release several demos and a white paper outlining our technology and progress in more detail.



## The Core Idea

The core insight behind this project was that you could use vector-graphics based animations to simulate "videos" in a way that is indistinguishable from a traditional raster-graphics based video format such as an h264 video stream in an MP4 container.


### Raster Graphics

Normal videos, like the ones you see on Netflix or YouTube, are just sequences of images which get updated quickly on the screen, to create the illusion of motion. Each image is composed of "pixels" - individual dots of color. Higher resolution means more pixels, better visual quality, and bigger file sizes.

![Pixel-Based](img/pixels.png)

Almost all video on the internet is of this format, known as "raster graphics". Video compression algorithms like h264 are just very efficient at using fewer data-points to reconstruct the pixels in any given frame, and at storing only the differences in pixels between frames of a video. 


### Vector Grapics video

In contrast, we use a concept called "vector-graphics" to render video. Instead of pixels, we represent everything on the screen using shapes, lines and curves, which can be represented as mathematical equations (vector graphics).


![Vector-Based](img/vector2.png)


Using these mathematical equations, we can re-draw any arbitrary shape on the screen - from the letter "T" to Bart Simpson's head. Furthermore, by adding information such as color, position on the screen, and how they move or change shape over time, you can create whole videos - including entire episodes of the Simpsons, with just sequences of mathematical equations.


### Why vectorization?

The core insight behind this project was that for a certain kind of "vector-friendly" video content, storing the video using vector graphics would be much more efficient than using raster graphics (in some cases, up to 2 orders of magnitude more efficient).


This idea is not substantively different from the idea of Flash based animations about 20 years ago. Why do this now?

**No need for a decoder**: Most devices now support SVG, HTML5 and/or some form of vector-graphics rendering. That lets you render vector-graphics content on any device without require end-users, OEMs or browsers to install special software to enable playback of vector-graphics content. App developers would only need to include an appropriate library or SDK in their website or app to enable playback within native or 3rd player video players.

**Computer vision**: Our patented vectorization technology relies heavily on computer vision to convert raster-graphics videos to a vector format. Leveraging the advancement & commoditization of Computer Vision, and the ease of running batch computer-vision heavy tasks on the cloud, it's feasible to 'vectorize' large volumes of video at scale now, in a way that wasn't possible even 5 years ago.

 
### Vector graphics video format
 
We propose developing a new, open-source file format for vector-graphics based videos ".vvid" - a "video" version of "SVG". We assert that this new file format should include the following properties:

Robust enough to capture most possible animated and visual elements that one could find in "vector friendly" videos, including animations, desktop screensharing and 3d graphics.

It should conform as well as possible to existing standards. Specifically, it should copy and build as much as possible from the SVG standard for vector-graphics components, while copying other relevant codec standards and container formats for aspects such as specifying tracks, etc…

This format should be extensible, with an eye for future development version and development by 3rd parties

It should be playable within a video tag/player, the same way that SVG images are viewable within image tags/viewers.

    <video src="myvideo.vvid" type="application/vvid+xml">
 
We are pragmatic, and don't want to create a standard [for the sake of creating a standard](https://xkcd.com/927/).  To that end, we've created libraries and SDKs that enable playback of our vector-graphics videos using standard / native interfaces like so

    <script src="vvid.js">
    <video src="myvideo.vvid" type="application/vvid+xml"> 
    // This will work on all major browsers today

If our format proves popular, then we would seek to promote it as an alternative video format.

## Early proof of concept

We proved the concept of vector-based video in 2018 by piloting an [e-learning app](https://app.mschool.xyz), with 2000 learning videos created in a vector format. This app has been used by over 100,000 students in West Africa, many on very slow connections and using low-end android devices.



## Examples of what Vector Graphics video files look like

Below is an example of some vector graphics videos, with MP4 and vector graphics files for comparison

Vector videos are just zip files, with text files inside

#### Khan Academy Style
* [Watch the vector file](https://vectorly.io/demo/1/)

#### Coding lecture Style
* [Watch the vector file](https://api.dotlearn.io/embed/alpha/coding-demo)

#### Animation
* [Watch the vector file](https://vectorly.io/demo/5/)





<script>
    window.intercomSettings = {
        app_id: "g1cpn78z"
    };
</script>
<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/g1cpn78z';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>
