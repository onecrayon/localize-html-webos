/*
---

script: localize-html.js

description: Provides automatic localization of HTML nodes and attributes using strings.json $L() command

license: MIT license <http://www.opensource.org/licenses/mit-license.php>

authors:
- Ian Beck

version: 1.0.0

To use, call `start_localize_html()` in your first scene's setup function.

To prevent memory leaks, `stop_localize_html()` should be called in your
first scene's cleanup function.

If using a multi-stage app, make sure to pass your stage's body element
to both functions.

Use the special x-localize attribute to trigger localization:

    <div x-localize="innerHTML">Localized Text</div>
    
    <img src="localize_text.jpg" alt="Localized Text" x-localize="alt" />

...
*/

// This starts the event listeners to localize HTML as it's loaded
var start_localize_html = function(stageBody) {
	if (Object.isUndefined(stageBody)) {
		var stageBody = document.body;
	}
	Element.extend(stageBody).observe('DOMNodeInserted', function(event) {
		x_localize_html(event.relatedNode);
	});
};

// This stops the event listeners for localizing HTML
var stop_localize_html = function(stageBody) {
	if (Object.isUndefined(stageBody)) {
		var stageBody = document.body;
	}
	Element.extend(stageBody).stopObserving('DOMNodeInserted');
};

// This function does all the dirty work
var x_localize_html = function(baseNode) {
	// Default to searching the body
	if (Object.isUndefined(baseNode)) {
		var baseNode = Element.extend(document.body);
	} else {
		baseNode = Element.extend(baseNode);
	}
	
	baseNode.select('*[x-localize]').each(function(el) {
		var target = el.readAttribute('x-localize');
		var key = null;
		if (target.toLowerCase() == 'innerhtml') {
			// Trying to fetch innerHTML, so grab it directly
			key = el.innerHTML.strip();
		} else {
			// Presumably looking for an attribute of some sort
			key = el.readAttribute(target);
		}
		// Don't mess with empty keys
		if (key == null) {
			Mojo.Log.warn('Empty key found by localize_html');
			return;
		}
		// Grab the localized version
		var localizedStr = $L(key);
		if (target.toLowerCase() == 'innerhtml') {
			el.innerHTML = localizedStr;
		} else {
			// Write the localized version
			el.writeAttribute(target, localizedStr);
		}
		// Remove the x-localize attribute to prevent redundant translations
		el.writeAttribute('x-localize', null);
	});
};