# Angular Youtube directive

Declaratively embed YouTube playlists into your apps.

Behind the scenes, the iframe API is used to create a player and construct a playlist.

## Usage

### Load the angular library

Install the `nimbus-youtube-library` module and dependencies:
    
    <script src="components/youtube-library/youtube-library.min.js"></script>
    
The library will take care of downloading and installing the Youtube iFrame scripts.    

### Use the Library

The key new element is the `<nimbus-youtube-player>` tag. 
    
    <nimbus-youtube-player target="myPlayer" width="800" height="400">
        <nimbus-playlist>
            <entry id="hEJnMQG9ev8" title="Mad Max" description="Mad Max: Fury Road is a 2015 action film"></entry>
            <entry id="sGbxmsDFVnE" title="Star Wars: The Force awakens" description="Approximately 30 years after the second
            Death Star was destroyed, Luke Skywalker, the last Jedi, has disappeared."></entry>
            <entry id="zSWdZVtXT7E" title="Interstellar" description="A widespread catastrophic crop blight on Earth has made
            farming increasingly difficult and threatens the existence of humanity."></entry>
            <entry id="S3AVcCggRnU" title="Ted 2" description="Newlywed couple Ted and Tami-Lynn want to have a baby, but in
            order to qualify to be a parent, Ted will have to prove he's a person in a court of law."></entry>
        </nimbus-playlist>
        <div id="myPlayer"></div>
    </nimbus-youtube-player>
 

See the demo app for other cool features.

### Tests and demo
 
After cloning this repo, set up the code with

    npm install
    # if you don't have grunt installed
    npm install grunt-cli
    grunt build
    
Run tests with 
    
    npm test

The demo app can be run with
    
    grunt build && npm start
    
The demo app will be served on `http:localhost:8000/demo/`
    
    
# Reference

##  `<nimbus-youtube-player>`

The main youtube playlist tag.

### Attributes:

* `target`: *Required*. A string containing the id of a child element to replace with the youtube player widget
* `width`: *Optional*. The width of the Player widget
* `height`: *Optional*. The height of the Player widget
 
Within the scope of the `<nimbus-youtube-player>` tags, you have access to the playlist controller through the `vc`
  variable.`vc` is an instance of [`PlaylistController`](#PlaylistController) which provides a ton of flexibility with
  respect to what you can do with your playlist.
  
## `<nimbus-playlist>`

Defines a static list of videos to play, along with additional metadata. There are no attributes for this tag, but
 there should be a single `<entry>` tag for each video you want in the playlist.

## `<entry>`

Defines an entry into the playlist.

### Attributes

* 'id': *Required*. The youtube videoID. e.g. hEJnMQG9ev8
* 'title': *Required*. A title for the clip (for some reason the Youtube API doesn't allow fetching of the title). You're 
free to provide any title you wish here. String only. HTML tags are not marked up.
* 'Description'. *Optional*. A description for the clip. Text  String only. HTML tags are not marked up.

## `PlaylistController`

For those wishing to dynamically drive the playlist, the controller is exposed via the `vc` variable. The following
properties and methods are available:

### Properties

#### `current`

An object containing metadata about the currently playing video. The keys in the object are 
   
* `title`: The current title, or 'Nothing playing' if no video is playing
* `duration`: The clip length, in seconds, or 0.0
* `description`: The clip description
* `id`: The video Id

### `state.value`

The current state of the player. The integer value refers to `YT.Playerstate` and has the following interpretation:

* Not Started: -1
* ENDED: 0
* PLAYING: 1
* PAUSED: 2
* BUFFERING: 3
* CUED: 5

### Methods

The `PlaylistController` has the following public methods. Note that most of them return a *Promise*, rather than 
blocking and waiting for the results to be loaded. This doesn't make them terribly useful for use in templates, but are
included here for completeness.

#### getPlayer

Returns a promise for a YouTube player instance. Each controller maintains a single instance of `YT.Player`,
so multiple calls to this method will resolve to the same object.

#### getPlaylistIDs

Returns a promise that resolves to the video ID list of the current playlist

#### getCurrentlyPlayingInfo

Returns a promise for the current video metadata. In templates use the `current` property instead.

#### createPlaylist

Creates a new playlist for the YT.Player instance. Also additional metadata for the titles and descriptions
are stored locally for display purposes.

##### Parameters:
         
* *ids* {Array} - a list of video ID strings
* *titles* {Array} - Custom titles for the video IDs. Must be same length and order as ids
* *descriptions* {Array} - optional. Description HTML strings. Must be same length and order as ids
         
#### playNext

Plays the next video in the playlist. This can be used in components to drive the playlist; e.g.

    <button ng-click="vc.playNext()">Next</button>

#### playPrev

Plays the next video in the playlist. This can be used in components to drive the playlist; e.g.

    <button ng-click="vc.playPrev()">Prev</button>
    
    
#### playVideo

Plays the *i-th* video in the playlist. This can be used in components to drive the playlist; e.g.

    <button ng-click="vc.playVideo(2)">Play 3rd video</button>
    
#### getTitles

Returns a list of titles in the playlist. The list is returned, and not a promise.

#### getDescriptions

Returns a list of descriptions in the playlist. The list is returned, and not a promise.

#### getTitleAndDescriptions

Returns a map of  titles and descriptions in the playlist. The list is returned, and not a promise.

#### getInfoFor

Returns a promise for the *i-th* video's metadata. The same information as `current` is provided.