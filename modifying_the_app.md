* Making a few changes to the Flashcards App *

Here are a few things I wanted to try:

1. Change the background color. Make the FlashCard look like a "Jeopardy" card
2. Make the Answer show up on the REVERSE side of the card
3. Create a dropdown of ListIds to choose from

* 1. Playing around with Appearance of the cards:
#  main.css is the file to modify.
# By right-clicking on "Inspect Elements" on the App, we see that the element we want to change the color of is is div element #app.
## Let's try adding a bg color to #app (in main.css)
## You can try changing the text and background colors of a number of elements in main.css

`
#app {
  width: 600px;
  height: 400px;
  margin: 10 auto;
  text-align: center;
  background-color: green;
}
`

* 2. How to make the "answer" show up on the reverse side?
Thoughts:
* We can show the same card twice. In the first showing, show the word,
in the second showing, show both word and defn