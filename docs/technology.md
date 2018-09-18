
<img src="../img/title.svg" alt="Drawing" style="height: 150px; display: block; margin: auto;"/>


## Vectorization Technology

dot Learn is able to achieve high levels of "compression" because of it's vector-grahics video codec, which is much more data-efficient for some kinds of video than existing formats such as mp4.


### Vector based video

Normal videos, like the ones you see on Netflix or YouTube, are just sequences of images which get updated quickly on the screen, to create the illusion of motion. Each image is composed of "pixels" - individual dots of color. Higher resolution means more pixels, better visual quality, and bigger file sizes.

![Pixel-Based](img/pixels.png)

In contrast, we use a concept called "vector-graphics" to render video. Instead of pixels, we represent everything on the screen using shapes, lines and curves, which can be represented as mathematical equations.


![Vector-Based](img/vector2.png)


Using these mathematical equations, we can re-draw any arbitrary shape on the screen - from the letter "T" to Bart Simpson's head. Furthermore, by adding information such as color, position on the screen, and how they move or change shape over time, you can create whole videos - including entire episodes of the Simpsons, with just sequences of mathematical equations.




### VVID file format


The core of our technology is ".vvid", a new file format for video which uses vector graphics, rather than pixels, to encode visual elements on the screen. For purely computer generated videos (such as screencasts or animations) it is up to 100x more data-efficient than using raster-graphics (mp4). 


The vvid videos are just zip files containing a master json file, and embedded media files, according to the vvid file standard.
 
 
 ![VVID](img/vvid.png)


The file standard is largely based off of SVG, but importantly deals heavily with moving elements and transitions over time.


The file standard is really in a prototype stage right now, and will undergo massive overhauls as we bring our vectorization service to product. You can find the preliminary prototype draft specifications [here](https://docs.google.com/document/d/1z4cqAmHZnFFYAt9elYkwj1z4_dywjA78BzOmQ_0liPc/edit?usp=sharing)


### Example VVID videos

Below are a 2 exmaple of videos, with MP4, VVID comparisons. If you see the filetype ".lrn", it is the same as ".vvid" - we are transitioning between naming conventions.

VVID/LRN files are just zip files, and you can unzip to explore the contents.

#### Khan Academy Style
* [MP4 file](https://www.dotlearn.io/demo/1/khan.mp4)
* [VVID file](https://s3-us-west-2.amazonaws.com/vv-lrn-dist-public/khan-academy-style.lrn)
* [Watch the VVID file](https://api.dotlearn.io/embed/demo/khan-academy-style)

#### College lecture style
* [MP4 file](https://drive.google.com/file/d/19rpC2lzKPhqgQCr-XArOnl5FUGv0NGZQ/view?usp=sharing)
* [VVID file](https://s3-us-west-2.amazonaws.com/vv-lrn-dist-public/coursera.lrn)
* [Watch the VVID file](https://api.dotlearn.io/embed/demo/coursera)


### VVID Player

To play .vvid files, we have developed a [Javascipt player library](https://github.com/dotLearn/Vectorized-Video-Player-Javascript), as well as an Android wrapper library. 

We are working on native Android and iOS libraries, as well as desktop players for Windows, Mac and Linux.
 
 To use these libraries in your app or website, please check out [Playing Videos](playing.md)



### Vectorization

Our vectorization algorithms take MP4 videos, and convert them to our vector-based ".vvid" format. While we are in beta, you can leverage our vectorization technology by sending us our videos here.



