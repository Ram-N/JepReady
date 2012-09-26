Here's what I did to get my WebApp to work on GitHub.

1. Went to OpenMinds and registered a new app. This is required because the app on github will have its own REDIRECT URL. It is important to give the REDIRECT URI correctly. It should be `http://{username}.github.com/{AppName}/oauth_redirect.html`. Replace your github username and your OpenMinds AppName.

2. GitHub will render any pages in its `gh-pages` branch, which is how we will run our web app.

3. In my local repository (PC) I created a new branch:
`git branch gh-pages`
`git checkout gh-pages`

4. Modified my main *.js file, the one where I give the REDIRECT URL. Make sure that the URLs in your js file  matches the one you registered with OpenMinds *exactly*

5. Pushed out these changes to my github repo
`git push origin gh-pages`
This creates a `gh-pages` branch in the github repo.

App should work on github at `http://{username}.github.com/{AppName}`