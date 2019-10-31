# Favorite-fonts
Get a list of fonts from Google's API and play around with them.

## SPECIAL NOTICE

If you want to download this repository and use it locally, you'll need a key for Google Fonts Developer API.
You can get it here: https://developers.google.com/fonts/docs/developer_api

I've used it as an environment variable. If you have any questions about that, please feel free to ask me!


-------------------------------------------------------------------------------------------------

The Google Fonts developer API is called only once, when the page is loaded. Then we build the object "fontList" which contains all the fonts, sorted by popularity (descending).
Search is done on this list only.

I chose to load "lazily", only if the user asks for more fonts by scrolling down or by searching a font that isn't currently displayed. every time 20 fonts are loaded. It makes the experience a bit more bearable - instead of waiting for 960 fonts to be loaded :)

dark/light mode are based on adding a classname to body, and CSS changes to all the elements under it.

I want to use React for implementing this webpage, it seems like a good fit. It will be my next step.

Please feel free to contact me if you have any questions, ideas, or if you heard a really good knock-knock joke! :trollface:


Implemented:
- Get fonts list from Google developer API and display them
- Search by font name (family)
- Change displayed text for each font
- Light/dark mode
- List view
- Reset button

Not yet:
- Responsive design
- Implement with react
- Build a back-end
- Download font to local storage
- Figure out a better way to contain the api key for Google Fonts, maybe environment variables
