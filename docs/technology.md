## AI Video Compression

Vectorly's AI compression technology is based on a concept called [super-resolution](https://en.wikipedia.org/wiki/Super-resolution_imaging), which uses AI to upscale, de-noise and enhance images.

By training AI models on a variety of different kinds of video content, we're able to upscale video effectively by 2X or even 4X, acheiving good-quality 1080p video from a 240p video stream.


<img src="../img/ai-compression-2.svg" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

While such AI enhancement tasks are usually computationally expensive and only used on servers, we have developed proprietary AI architectures which can upscale video content at over 100 frames per second even on low-end smartphones. We then use a standard called [WebGL](https://caniuse.com/webgl) to run our models and perform the video upscaling on a user's device as they are watching a video.

Effectively, this let's us stream a low-resolution video to the user. The AI then upscaled the SD video to HD, providing an HD viewing experience while only consuming the bandwidth for the low-resolution video (about 90% less data than for the HD video)


### How it works

Implementing AI compression involves 2 parts: The playback, and the AI encoding


#### Playback / Upscaling

We've created a javascript library which performs the AI upscaling on the user's device. It works the way that playing any web-video would, with the main difference being that you will need to supply a JSON file with the AI model / weights, via the `x-upscaler-model` attribute

        <head>
               <script src="video.js">
               <script src="vectorly.js">
        </head>

        <body>
               <video class="video-js">
                     <source src="my-video.mp4" x-upscaler-model="my-video-model.json">
               </video>
        </body>

The library works as a plugin to existing javascript players such as Video JS or JWPlayer, however we've also created our own player based on Shaka player.


#### Encoding

The AI model is obtained from the initial encoding step. In Vectorly's Stream's archicture, we've created our own AI transcoder, which both simultaneously does the transcoding of a video, as well as analysis and generation of the AI model.


<img src="../img/ai-transcoding.svg" alt="Drawing" style="height: 400px; display: block; margin: auto;"/>


This model, filled with the model weights, is then stored as a JSON file along with the packaged output in cloud storage.


### Compatibility


For web playback, we leverage a Web standard called [WebGL](https://caniuse.com/webgl), which enables hardware-accelerated rendering of graphics and video content across devices, and which is supported by over 97% of web-enabled devices

We have an Android SDK, and our WebGL player can be used in iOS via a web view. We play to relase native OpenGL based mobile SDKs in 2021.

Because this upscaler runs on the client side, it can be disabled by the user, or programatically on the frontend as well.

### Performance

The main limiting factor for AI based compression is client-side performance. Vectorly has developed proprietary AI architectures which can upscale video content to 720p at over 100 fps even on mid-tier Android smartphones, and we recommend keeping video resolutions at 720p.

Watching higher-resolution video content (1440p or 4K) requires more computation, and can run into performance issues and increased battery consumption, especially on low-end devices.

When performance runs at below 30fps, the vectorly player will drop frames to ensure smooth video playback. If performance issues persist, upscaling can be disabled and the video can revert to standard ABR logic, loading higher-bandwidth video content as needed.





### Whitepaper & Demos

We will be releasing a whitepaper with more detailed technical information, including performance benchmarks and quality metrics, as well as a comprenhensive set of demos in early 2021

