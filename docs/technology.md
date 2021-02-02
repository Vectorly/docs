## AI Video Compression

Vectorly's AI compression technology is based on a concept called [super-resolution](https://en.wikipedia.org/wiki/Super-resolution_imaging), which uses AI to upscale and enhance images. Through Super Resolution, we can upscale and clean-up low-resolution video, making it look close to HD quality.

<img src="../img/ducks-720p.png" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

While AI enhancement tasks normally require lots of computaiton, we've developed ultra-fast upscaling technology which can run in real time, even on low-end smartphones.

<img src="../img/ai-compression-2.svg" alt="Drawing" style="height: 350px; display: block; margin: auto;"/>

This lets you stream SD video streams to users, and upscale it to HD in real time as they're watching it, providing an HD viewing experience while only consuming the bandwidth for the low-resolution video (about 90% less data than for the HD video)


### How it works

Implementing AI upscaling is entirely a client-side operation. For web platforms, this comes in the form of a javascript library, and requires no re-encoding of content.


#### Playback / Upscaling

We've created a javascript library which performs the AI upscaling on the user's device. It works the way that playing any web-video would, with the main difference being that it uses an AI model (supplied in the form of a JSON file) do the upscaling.


<img src="../img/ai-upscale-code.svg" alt="Drawing" style="height: 400px; display: block; margin: auto;"/>

The library works as a plugin to existing javascript players such as Video JS or JWPlayer.

You can think of AI upscaling as a final, optional layer at the end of the video streaming pipeline. AI upscaling upscales video content after is decoded and rendered by the browser, meaning that it is compatible with any codec, any streaming architecture (HLS/DASH etc…), and works equally well on live and video-on-demand content.

We are currently working on Android and iOS mobile SDKs, to implement AI upscaling on mobile platforms as well.



#### AI Models

The only real "dependency" for the AI upscaler is the upscaler model. The "AI model" is just a JSON file, containing the trained neural network parameters to be used by the upscaler. This JSON file can be loaded as a static file, just like the Javascript player.

<img src="../img/ai-model-json.svg" alt="Drawing" style="height: 400px; display: block; margin: auto;"/>


While our Javascript player comes with a general upscaler which upscales any type of content, you can obtain better visual quality by using a model pre-trained on specific types of content (such as sports, or cartoons,  or screencasts).

<img src="../img/ai-json-models.svg" alt="Drawing" style="height: 400px; display: block; margin: auto;"/>


We generate these models by training our AI on specific thousands of videos from specific genres of content, and can train/generate new models as needed. We could conceivably train models on individual videos for very high performance, however each model requires hours of training, making it impractical to do for every video.


### Compatibility


For web playback, we leverage a Web standard called [WebGL](https://caniuse.com/webgl), which enables hardware-accelerated rendering of graphics and video content across devices, and which is supported by over 97% of web-enabled devices

For our Mobile SDKs, we will use OpenGL (Metal for iOS), which is compatible with all Android and iOS versions since 2011.

Because this upscaler runs on the client side, it can be disabled by the user, or programatically on the frontend as well.

### Performance

The main limiting factor for AI based compression is client-side performance. Vectorly has developed proprietary AI architectures which can upscale video content to 720p at over 30 fps even on low-end smartphones, and at over 100fps on mid-teir phones and laptops. You can see specific performance information in our whitepaper.


### Whitepaper

Here is a preliminary version of our [whitepaper](https://docs.google.com/document/d/1pR9iaUB0i4ouhYZchKxHqMVLQ75fGqzZ_PLHohzyUIA/edit?usp=sharing) (published Feb 1st, 2021).

### Demos

Below are a few demos of our upscaling technology. We recommend viewing them  using a desktop version of Chrome (version 70+). We will release support for other browsers (via WebGL 1.0 and other fixes)  in early February.


[Jellyfish](https://files.vectorly.io/demo/jellyfish-240p-001/index.html)

<img src="../img/jellyfish-demo.png" alt="Drawing" style="height: 300px; display: block; margin: auto;"/>


[Tractor](https://files.vectorly.io/demo/tractor-240p-001/index.html)

<img src="../img/tractor-demo.png" alt="Drawing" style="height: 300px; display: block; margin: auto;"/>


[Ducks](https://files.vectorly.io/demo/ducks-240p-001/index.html)

<img src="../img/duck-demo.png" alt="Drawing" style="height: 300px; display: block; margin: auto;"/>


[Factory](https://files.vectorly.io/demo/factory-240p-001/index.html)

<img src="../img/factory-demo.png" alt="Drawing" style="height: 300px; display: block; margin: auto;"/>

