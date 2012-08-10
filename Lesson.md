Here's a log of the things that I learned, and did while I tried to develop this app. The aim is for other 3rd party OpenMinds Developers to learn from this, if possible.

1. Created a repo on GitHub.
It was an empty repository. I then added all the files from sample Flashcards app.

2. Next, I needed to create an AppId on OpenMinds. To tell it that such an app exists, and that I will be coming to OpenMinds to fetch jeopardy related questions.
(I did that by following the instructions in the Root-1/flashcards repo)

3. Getting the App Id
In the API_Explorer's JSON text box, I entered the following
{"name": "JepReady", "description": "A simple flashcards based app for reviewing Jeopardy! questions", "formats": ["multipleChoice", "vocabulary", "sentenceWord"]} 
I wasn't sure what to put for the URL, so I left it blank.

4. I got the AppId, 021953d94d94a0dc100126f which I added to the jepready.js file

But when I ran it, I got an Invalid AppId error.
Turns out that I was leaving out the first digit. The AppId should really be
5021953d94d94a0dc100126f

5. I got past that, and then I get this error message:
"redirect uri does not match app uri"
When I registered the APP, I had not provided a redirect URL. 
