The localize-html.js script provides automatic localization of
HTML nodes and attributes using `strings.json` and the `$L()` command.

For some use cases, it makes sense to duplicate your HTML for each
language, but in many instances when you just have short phrases that
need localization it is preferable to use the `$L()` method.

## Installation

To use this script, download the localize-html.js file and put it
somewhere in your app (I usually use a top-level `javascripts` folder
for this kind of generic script).

Assuming you're also using a `javascripts` folder, add the following
line to your `sources.json` file:

    {"source": "javascripts/localize-html.js"}

Then in your first scene assistant, start it running in the setup
function:

    start_localize_html();

And to prevent memory leaks, stop it in the cleanup function:

    stop_localize_html();

If you are using multiple stages, you'll need to pass the stage's body
element as an argument to both functions.

In your HTML view files for any elements that need to be localized
add the special `x-localize` attribute:

    <div x-localize="innerHTML">Localized Text</div>
    
    <img src="localize_text.jpg" alt="Localized Text" x-localize="alt" />

Valid values for `x-localize` are any attribute name, or "innerHTML".
The specified attribute (or the element's contents) will be replaced
by the value in the appropriate `strings.json` file.

## In the wild

I wrote `localize-html.js` for use in [TouchNote][1]. If I hear of
it being used anywhere else, I'll note it here.

## Released under an MIT license

Copyright (c) 2010 Ian Beck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.