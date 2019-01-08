# Compressing videos

You can compress videos via our API, or through our dashboard interface. To get started, create an account [here](https://vectorly.io/signup)


### Dashboard

Once your videos are compressed, you will be able to access them via the [dashboard](https://dashboard.vectorly.io). (We will create an account for you, to login to the dashboard and access your videos)

![Dashboard](img/platform-example.png)


From the dashboard, you will be able to

* Preview each video
* Download your videos
* Get code to embed the videos in your website


## API 


### Authentication

When you first sign up for Vectorly, you will be given an _account ID_ and a _secret token_, which are available in the settings tab on the Dashboard.

You will need to provide these credentials in each request, using basic HTTP authentication, as shown below

    curl -u '[account ID]:[secret token]' https://api.vectorly.io/v1/endpoint 


###  Compressing a video

To compress a video, send a POST request to `https://api.vectorly.io/v1/upload ` with the `video` parameter and the optional `callback` parameter

    curl -X POST -F 'video=@local_video_file' -F 'callback=https://my.domain.com/endpoint' \ 
    -u '[account ID]:[secret token]'  https://api.vectorly.io/v1/status
    
    
You will get back a JSON response as shows: 

    {
      video_id: "12312",
      status: "processing" 
    }
    
    
If a callback is provided, the our server will send a POST request to the specified callback, providing the following as arguments:

* `video_id`: Unique id of the video, corresponding to the id of the video sent in the original response from `https://api.vectorly.io/upload`

* `status`: Status of the video (should be `complete` or `error`)

* `url`: URL to download the video




### Monotiring

You can also monitor the  current progress of the video by sending a POST request to `https://api.vectorly.io/v1/status ` with the `video_id` parameter

    curl -X POST -F 'video_id=12312'  \ 
    -u '[account ID]:[secret token]'  https://api.vectorly.io/v1/status


You will get back a JSON response as shows: 

    {
      video_id: "12312",
      status: "processing" ,
      url: "https://api.vectorly.io/v1/file/[video_id]"
    }
    
    