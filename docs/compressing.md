# Compressing videos

We are currently in beta, and are primarily taking video compression requests through our [upload form](https://dotlearn.io/start)

By early 2019, we will release a Web version of our compression service, as well as an API for automatic video conversion.


## API (not public)

Our API is currently in development, and is not yet public. The following documentation provides a rough outline of our current API.

### Authentication

When you first sign up for dot Learn, you will be given an _account ID_ and a _secret token_. 

You will need to provide these credentials in each request, using basic HTTP authentication, as shown below

    curl -u '[account ID]:[secret token]' https://api.dotlearn.io/v1/endpoint 

### 



###  Compressing a video

To compress a video, send a POST request to `https://api.dotlearn.io/v1/upload ` with the `video` parameter and the optional `callback` parameter

    curl -X POST -F 'video=@local_video_file' -F 'callback=https://my.domain.com/endpoint' \ 
    -u '[account ID]:[secret token]'  https://api.dotlearn.io/v1/status
    
    
You will get back a JSON response as shows: 

    {
      video_id: "12312",
      status: "processing" 
    }
    
    
If a callback is provided, the our server will send a POST request to the specified callback, providing the following as arguments:

* `video_id`: Unique id of the video, corresponding to the id of the video sent in the original response from `https://api.dotlearn.io/upload`

* `status`: Status of the video (should be `complete` or `error`)

* `url`: URL to download the video




### Monotiring

You can also monitor the  current progress of the video by sending a POST request to `https://api.dotlearn.io/v1/status ` with the `video_id` parameter

    curl -X POST -F 'video_id=12312'  \ 
    -u '[account ID]:[secret token]'  https://api.dotlearn.io/v1/status


You will get back a JSON response as shows: 

    {
      video_id: "12312",
      status: "processing" ,
      url: "https://api.dotlearn.io/v1/file/[video_id]"
    }
    
    