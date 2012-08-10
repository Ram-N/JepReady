* Lessons from Trying to get my first OpenMinds App working *

Here's a log of the things that I learned, and did while I tried to develop this app. The aim is for other 3rd party OpenMinds Developers to learn from this, if possible.

1. Created a repo on GitHub.
It was an empty repository. I then added all the files from sample Flashcards app.

2. Next, I needed to create an AppId on OpenMinds. To tell it that such an app exists, and that I will be coming to OpenMinds to fetch jeopardy related questions. (I did that by following the instructions in the Root-1/flashcards repo)

3. Getting the App Id
In the Developer's OpenMinds page, I entered whatever I could about the App I hoped to develop.
I wasn't sure what to put for the App URL or the redirect URL, so I left it blank.

4. I got the AppId, which I added in the appropriate place in the jepready.js file (If you don't do this correctly, you will get an Invalid AppId error.)

5. When I pulled up the App on my machine (localhost), I was asked to log in to OpenMinds. I then got another  error message:
"redirect uri does not match app uri"
When I registered the APP, I had not provided a redirect URL. 

6. I went back to the developers/app tab in OpenMinds.io and tried adding localhost/~u163202/JepReady/oauth_redirect.html to redirect URL

Finally, I was able to get the App working. Hope this is helpful to you if you are trying to get it running on your machine.


