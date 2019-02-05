# Playing Videos

Through vectorly's web platform, you can compress and host your videos, and deliver the videos to your users using our embed links, libraries or plugins.

# Web

### iframe Embed links

The easiest way to deliver videos to your users is through our embed link. When in the dashboard, you will be able to see all of our videos. For each videos, there will be a code "< >" icon, which provides an example embed url


![Embed](img/embed.png) 


An example embed code would look like this

    <iframe src="https://api.vectorly.io/embed/demo/9716efb8-f4a8-475b-a28b-4d7fa70b08bb"  
    width="800" height="515" 
    frameborder="0" allowfullscreen  />


Placing the embed link in your website will load the video, if your video is public. If you choose to make your video private, you will need to add a bit of code to your server to authorize each user (see the Security section below)


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


### Security

When hosting your videos with Vectorly, you can make your videos public or private. 

#### Public videos
If your videos are public, you will only need to copy and paste the embed link into your website to play back the video. The iframe embed code contains an obscure, long-form url similar to Youtube's "unlisted videos" - such that only those who know the link can access the video. 

We don't publically host your videos on a common video portal, like YouTube or Vimeo. When your upload videos on Vectorly's platform, you are the only one who can even see that the video exists. The videos are only viewable via the embed code, meaning you can choose how to host them.

#### Private video
If you need greater control of who can watch your videos, you can make your videos private. This allows you to control access to your videos, and authorize only specific users (for example, paying customers). To do this, we assume you have some user management system, and you will need to write a bit of server code.

To authorize an individual user to watch a specific video, you will need to:
* Create a JWT token on your server
* Sign the JWT with your API key
* Add the token as a parameter to the embed link

**Getting your API key ** 
You can get your API key in the "Settings page", which you can view by clicking on the user icon in the top-right hand corner. 


![APIkey](img/apikey.png) 


**Creating a token ** 
You will need to create a JWT token. You can find out about JWT tokens [here](https://jwt.io/). You can easily create JWT tokens with 1 line of code, using libraries for every major language.

For the token, you need to specify 2 parameters: the video id, and the expiry data.

***video_id*** : Id of the video you want to provide access to. This is the UUID in the embed and preview links

***expiry***: [Epoch time](https://en.wikipedia.org/wiki/Unix_time), in milliseconds, for when you want the token to expire

An example payload would look like this

      {
        "video_id": "9716efb8-f4a8-475b-a28b-4d7fa70b08bb",
        "expiry": 1549403395728
      }

You would then sign the token with your API key


** Creating the embed link url **

You will need to point the iframe to a new url, using the following schema

    https://api.vectorly.io/embed/v1/video/[video-id]/token/[token]
    
Your embed code would then look like this:

       <iframe src="https://api.vectorly.io/embed/v1/video/[video-id]/token/[token]"  
        width="800" height="515" 
        frameborder="0" allowfullscreen  />
    
If constructed properly, your video should load. 

Because each token is unique, time limited and generated at runtime, a user can't just copy & paste the embed link and put it on their own website. Because the token is signed by your API key, we can ensure that you, and only you, are authorizing individual users to watch videos.




### Javascript


Coming soon


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