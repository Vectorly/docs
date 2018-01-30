
<img src="img/title.svg" alt="Drawing" style="height: 150px; display: block; margin: auto;"/>


## Overview

dot Learn is an ed-tech company in Lagos, Nigeria and is dedicated to making online video-learning accessible in Africa through proprietary data-light (1MB/hour) video-learning technology. We have a [full library of SHS/WASSCE/JAMB data-light videos](https://docs.google.com/spreadsheets/d/1Ryfv6iYeB0e6_qdVO0xx2KAEFyJtwBWZYWN8hayl9eQ/edit#gid=1018104657), and are currently partnering with local ed-tech companies in Nigeria/Ghana to distribute our videos.


## Technology

dot Learn has developed a proprietary data-light video-learning technology called ".lrn", which makes video learning fast and affordable by storing hours of video-lessons in a few MB (up to 100x smaller than via comparable mp4s).
This is possible because visual elements on the screen are stored not as streams of pixels, but rather as text-based vectors (equations, curves etc...), enabling efficient data-representation for certain kinds of videos

![Vector-Based](img/vector.svg)

Given that ".lrn" is a new file format that we have developed, it requires integrating a custom library into your platform (Web/Android/iOS etc...) in order to play ".lrn" videos (see the [Playing Videos section](playing) for details).

## Content

Using our technology, we have built [full video courses for WASSCE/WAEC and JAMB curricula](https://docs.google.com/spreadsheets/d/1Ryfv6iYeB0e6_qdVO0xx2KAEFyJtwBWZYWN8hayl9eQ/edit#gid=1018104657) , as well as general SS1, SS2 and SS3 material, for secondary students in Nigeria and Ghana. Our courses include:

* Math
* Physics
* Chemistry

and soon

* Biology
* Economics
* English

which are available to licensing to partner companies on a revenue share basis. For more info, see the [Licensing page](licensing)


## Getting started


### Get your server token ###

First and foremost, you will need a **server token**, which you can get by contacting [our technical team](mailto:sam@dotlearn.org). You should store this server token in a safe place on your server (as an environmental variable) or in a secret file which is _not stored in version control systems_. The **server token** will be used to for API calls to dot Learn's servers.


### Browse our library of content ###

We have [2000+ videos](https://docs.google.com/spreadsheets/d/1Ryfv6iYeB0e6_qdVO0xx2KAEFyJtwBWZYWN8hayl9eQ/edit#gid=1018104657) for Math, Physics and Chemistry, and are releasing more every week. See the [Licensing page](licensing) for more details on how to retrieve our full curriculum programatically.


### Import the .lrn player ###

In order to let users watch .lrn videos in your app/website, you will need to import the .lrn player library into your app / website. Specific details for each platform are show in the [api section](playing) .


