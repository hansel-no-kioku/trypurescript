# Try PureScript (ヘンゼル版)

[Try PureScript (ヘンゼル版)](https://try.purescript.han-sel.com) is an online PureScript code editor for quickly experimenting with PureScript code snippets and ideas.

This is a fork of the official [Try PureScript](https://try.purescript.org).

## How to Add a New Backend

* Create a `pulpunte.json` file with all the dependencies you want to be available for the library backend and optionally an extra `Try` module if you want.
* Write an example in a github gist and name it `Main.purs`. [Example Gist](https://gist.github.com/hansel-no-kioku/1d809a04fbd6f229d74c163b440a7a3a)
* add a backend button and a backend option in `index.html` and `API.purs` respectively.
    * Note to link the gist from the previous bullet in the `mainGist` field in `API.purs`
* Ask hansel-no-kioku to update the `core` main gist to link to the new backend

## Features:

* Writing code using the [CodeMirror](https://codemirror.net/)
* Automatic compilation
* PureScript syntax highlighting
* Run and print output or show resulting JavaScript
* Multiple view modes: code, output or both
* Persistent session
* Load PureScript code from Github Gists
* ~~Save PureScript code as anonymous Github Gists~~


## Control Features via the Query String

Most of these features can be controlled not only from the toolbar, but also using the [query parameters](https://en.wikipedia.org/wiki/Query_string):

* **Load From Gist**: Load PureScript code from Gist id using the `gist` parameter
    * Example: `gist=37c3c97f47a43f20c548` will load the code from this Gist if the file was named `Main.purs`

* **View Mode**: Control the view mode using the `view` parameter
    * Options are: `code`, `output`, `both`
    * Example: `view=output` will only display the output

* **Backend**: Control which backend will compile your code using the `backend` parameter
    * Options are: `core`, `thermite`, `slides`, `flare`, `mathbox`, `behavior`
    * Example: `backend=thermite` will use the thermite backend

* **Auto Compile**: Automatic compilation can be turned off using the `compile` parameter
    * Options are: `true`, `false`
    * Example: `compile=false` will turn auto compilation off

* **JavaScript Code Generation**: Print the resulting JavaScript code in the output window instead of the output of the program using the `js` parameter
    * Options are: `true`, `false`
    * Example: `js=true` will print JavaScript code instead of the program's output

* **Session**: Load code from a session which is stored with [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) using the `session` parameter
    * Usually managed by Try PureScript
    * Example: `session=9162f098-070f-4053-60ea-eba47021450d` (Note: will probably not work for you)
    * When used with the `gist` query parameter the code will be loaded from the Gist and not the session

## Compiler and Packages

* The compiler version for Try-PureScript can be viewed [here](https://github.com/hansel-no-kioku/try-purescript-server/blob/master/package.json).
* The packages set version for Try-PureScript can be viewed [here](https://github.com/hansel-no-kioku/try-purescript-server/blob/master/backend/core/pulpunte.json).
