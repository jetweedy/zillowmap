# zillowmap
Chrome Extension to Map Zillow Saved Homes

## Installation

1. Download this repo.
2. Edit the Google Maps API Key in the .php file
3. Move that PHP file to a web server that can run it. 
4. In Chrome: Settings > More Tools > Extensions
5. Add Unpacked Extension
6. Select the folder of the repo you just downloaded
7. In your Extensions, ideally pin it to the bar (or you have to go in the menu to click the button)

## Use

When on your Saved Homes List, just click the Extension button and it'll scrape your Saved Homes page(s) and then display a map using the Google Maps API. It'll (slowly, to avoid rate limit violations) add your saved homes to the map.

## To Do

* Include hyperlinks to homes in _blank window.
* Include other details?
* Maybe even grab the thumbnail photos to display in the map bubbles?
* Optimize Driving Routes for selected pins on the map?
* ... suggestions?

