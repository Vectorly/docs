
<img src="../img/vector-graphics.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>


# Video Vectorization


Vectorly is developing a new kind of video compression technology, which uses computer vision and vector graphics to reduce bitrates for video content by an order of magnitude (or more) compared to HEVC, while **improving video** quality. 

This would be primarily effective for "vector friendly" video content, which would include animations, screen-casts, many e-learning videos and potentially 3d gaming content. 

By leveraging existing vector-graphics rendering capabilities on all devices, this codec wouldn't require end-users, OEMs or browsers to install special software to enable playback of these videos.

__We are still in the early phases of developing this technology__.

You can learn more about the technology in our [whitepaper](https://files.vectorly.io/whitepaper.pdf)


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
 
We are building a video-format based on the SVG standard, extending it with Javascript to enable video features such as a timeline and key-frames. We package the resulting video data within an MP4 container, which can be streamed and distributed using existing video infrastructure (such as HLS/DASH, and DRM systems).

    <video src="vectorized.mp4" type="video/svg">

We are pragmatic, and don't want to create a standard [for the sake of creating a standard](https://xkcd.com/927/).  To that end, we've created libraries and SDKs that enable playback of our vector-graphics videos using standard / native interfaces like so

    <script src="vectorly.js">

    <video src="vectorized.mp4" type="video/svg">
    // This will work on all major browsers today


## Demos / Proof of concept

Our first vectorized proof of concept / demo is a 20 second clip of the Simpsons located here.  The source video is a 1440p H264 encoded video located here.








