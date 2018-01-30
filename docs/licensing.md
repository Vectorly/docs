# Listing content

We have [2000+ videos](https://docs.google.com/spreadsheets/d/1Ryfv6iYeB0e6_qdVO0xx2KAEFyJtwBWZYWN8hayl9eQ/edit#gid=1018104657) for Math, Physics and Chemistry, and are releasing more every week. To play these videos, you will need tokens (see [Playing Videos](playing))

Our curriculum is broken down into:
* **Courses** - the main subjects such as Math, Physics, English, Economics etc...
* **Sections** - Major section within each course (like "Algebra" or "Statistics" for Math), equivalent to "Chapters" in a book
* **Subsections** - Smaller subsections within each section
* **Lessons** - Lessons - groups of videos which are related to a particular topic (e.g. Number bases)
* **Videos** - Individual videos, which are between 2 and 5 minutes long, explaining a particular concept

The heirarchy is Courses -> Sections -> Lessons -> Videos

To access view our curriculum programatically, you can use our [API](#API) or our [Android Library](#Android-Library)


# API

You can access the API via GET calls to ````https://api.dotlearn.io/curriculum/... ````, which will return responses in JSON format.

### Courses
To list available courses, submit a GET request to `https://api.dotlearn.io/curriculum/courses`, which will return a JSON array as shown below

````
    [
        {
          "name": "Mathematics",
          "id": "math"
        },
        {
          "name": "Physics",
          "id": "physics"
        },

        {
          "name": "Chemistry",
          "id": "chemistry"
        }
    ]

````


### Get videos

You can list the available videos in a course, by submitting a GET request to `https://api.dotlearn.io/curriculum/videos/in/course/[course-id]`, so for example, to list all videos in the math course, it would be `https://api.dotlearn.io/curriculum/videos/in/course/math`

It will return an array of video objects, as shown below

````
    [
        {
          "id": "0554fc1d-e75a-4612-aae0-c2e476e1fb62",
          "name": "Pt.1_adding of number bases",
          "version": 1,
          "type": "video"
        },

        ...
    ]

````

You will need the video IDS to play the vides (see the [Playing Videos](playing) section)).






### Sections, Subsections and Lessons

Remember, the heirarchy for the curriculum is Courses -> Sections -> Subsections -> Lessons -> Videos

To find sections in a course, you can use

 `https://api.dotlearn.io/curriculum/sections/in/course/[course-id]`

To find subsections in a section, you can use

  `https://api.dotlearn.io/curriculum/subsections/in/section/[section-id]`

To find lessons in a subsection, you can use

  `https://api.dotlearn.io/curriculum/lessons/in/subsection/[subsection-id]`

To find videos in a lesson, you can use

 `https://api.dotlearn.io/curriculum/videos/in/lessson/[lesson-id]`


 You can also search for videos in a section

 `https://api.dotlearn.io/curriculum/videos/in/section/[section-id]`


  and lessons in a course

  `https://api.dotlearn.io/curriculum/lessons/in/course/[course-id]`


    etc....


### Searching

Instead of browsing each topic, you can also search for terms, using the following API

 `https://api.dotlearn.io/curriculum/search/[term]/course/[course-id]`


For example,

 `https://api.dotlearn.io/curriculum/search/geometry/course/math`



# Android

LRNCurriculum is a simple library that you can plugin to your Android apps to quickly get the curriculum from dot Learn servers.

## Install
The Gradle dependency is available via jCenter. jCenter is the default Maven repository used by Android Studio.

Add this in your (app) module's `build.gradle` file:
```groovy
    implementation 'io.dotlearn.lrncurriculum:1.0.0'
```

## Basic Tutorial

#### Intro
The curriculum is made up of four main types of objects listed below:
        Courses
           ↓
        Sections
           ↓
        Lessons
           ↓
        Videos

1. Course - This is also called a subject.
2. Section - A collection of related lessons. Can also be called topics
3. Lesson - A collection of videos explaining a concept
4. Video - A lesson video

Usually, you will follow the steps below when using this library:
1. Load all available courses
2. When a course is clicked, load all the sections in the clicked course
3. When a section is clicked, load all lessons in the clicked section
4. When a lesson is clicked, load all the videos in the lesson
5. When a video is clicked, play the selected video using the `LRNPlayerView`

The flow for your app can be different from this. As you will see at the bottom of the documentation,
you can jump some steps.

#### Load all available courses
Use the code below to load a list of all available courses
```kotlin
    CurriculumProvider.loadCourses(object: CurriculumProvider.CourseCallback {
                override fun onCoursesLoaded(courses: List<Course>) {
                    // The list of available courses was successfully loaded
                }

                override fun onCoursesLoadFailed(t: Throwable) {
                    // An error occurred while loading courses
                }

            })
```

#### Load sections in a course
Use the code below to load all sections in a course
```kotlin
    CurriculumProvider.loadSections(courseId, object: CurriculumProvider.SectionCallback {

                override fun onSectionsLoaded(courseId: String, sections: List<Section>) {
                    // The list of sections under the specified course was loaded successfully
                }

                override fun onSectionsLoadFailed(courseId: String, t: Throwable) {
                    // An error occurred while loading sections
                }

            })
```

#### Load lessons in a section
To load all the lessons in a section, use the code below
```kotlin
CurriculumProvider.loadLessonsInSections(sectionId, object: CurriculumProvider.SectionLessonCallback {
            override fun onLessonsLoaded(sectionId: String, lessons: List<Lesson>) {
                // The list of lessons under the provided section was loaded successfully
            }

            override fun onLessonsLoadFailed(sectionId: String, t: Throwable) {
                // An error occurred while loading lessons
            }

        })
```

#### Load videos in a lesson
Finally, to load all the videos in a lesson, use the code below
```kotlin
CurriculumProvider.loadVideosInLesson(lessonId, object: CurriculumProvider.LessonVideoCallback {

            override fun onVideosLoaded(lessonId: String, videos: List<Video>) {
                // The list of videos in the specified lesson has loaded successfully
            }

            override fun onVideosLoadFailed(lessonId: String, t: Throwable) {
                // An error occurred while loading videos
            }

        })
```

#### Additional functionality
The tutorial above was just a basic example/flow. There are a few other functions that
allows you to jump a few steps down the tree.

#### 1. Search for videos with a specific name
You can easily search for videos in a particular course using the code below
```kotlin
CurriculumProvider.searchForVideos(searchQuery, courseId, object: CurriculumProvider.SearchVideoCallback {

            override fun onVideosLoaded(searchQuery: String, courseId: String, videos: List<Video>) {
                // Successfully loaded videos containing the specified name
            }

            override fun onVideosLoadFailed(searchQuery: String, courseId: String, t: Throwable) {
                // Error loading videos
            }

        })
```

#### 2. Get all lessons in a course
You can skip the sections and load all the lessons in a course using the code below
```kotlin
CurriculumProvider.loadLessonsInCourse(courseId, object: CurriculumProvider.CourseLessonCallback {
            override fun onLessonsLoaded(courseId: String, lessons: List<Lesson>) {
                //
            }

            override fun onLessonsLoadFailed(courseId: String, t: Throwable) {
                //
            }

        })
```

#### 3. Get all videos in a course
You can load all videos in a course without going through sections and lessons.
```kotlin
CurriculumProvider.loadVideosInCourse(courseId, object: CurriculumProvider.CourseVideoCallback {

            override fun onVideosLoaded(courseId: String, videos: List<Video>) {
                //
            }

            override fun onVideosLoadFailed(courseId: String, t: Throwable) {
                //
            }

        })
```

#### 4. Get all videos in a section
And you can load all videos in a section without going through lessons
```kotlin
CurriculumProvider.loadVideosInSection(sectionId, object: CurriculumProvider.SectionVideoCallback {

            override fun onVideosLoaded(sectionId: String, videos: List<Video>) {
                //
            }

            override fun onVideosLoadFailed(sectionId: String, t: Throwable) {
                //
            }

        })
```

That's all. You can see all this in action in the `CurriculumActivity` in the sample project in
 the `app` module.