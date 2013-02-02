As featured in [LifeHacker](http://lifehacker.com/5977679/no-hulu-ads-mutes-annoying-ads-on-hulu) and [Mashable](http://mashable.com/2013/01/21/hulu-ad-blocking/).

Yay! Except that it got the attention of Hulu's team which worked to counter the extension.

In particular, they added the following:

    var a = "#NoHuluAdsMask"; 
    $.client && $.client.browser == "Chrome" && window.setInterval(function() {
    var b = document.location;
    if (!/\/watch\/(\d+)/.test(b.pathname)) return;
    var c = $(a);
    c.length > 0 && c.remove();
    }, (new Date).getTime() % 2e3 + 2e3);

and removed some of their player's APIs, namely `getCurrentState`, `mute` and `pauseVideo`, removing all hope of working around that again.

Fair game.

If it isn't clear, the new code periodically looks for the element with ID `NoHuluAdsMask` (the mask I create) and removes it from the DOM.
There are a couple of interesting things: first of all, they do that only if your browser is Chrome.
Why not do that for all browsers? Probably not to add unnecessary work for other browsers, but it seems a bit of premature optimization.

The second thing I find interesting is how they calculate the interval to use: `(new Date).getTime() % 2e3 + 2e3`.
The 2000-modulo of the current time (in milliseconds), plus 2000. So the interval can vary from 2000 to 3999, or 2 to 4s.
I find it odd there could be so much variance in the interval length, depending on when the code is actually run.
However, I imagine it's so that it scatters the various intervals set in other places… This doesn't seem to be a very valid concern.

Anyway, it was fun while it lasted… I kind of wish I had kept it for myself, so that it would still work. :)

This is thus for educational purposes only.

--

Hello there,

this is just a few lines of JavaScript that mutes the ads on Hulu, packaged in a Chrome extension.

In more details: the ads will be automatically muted and masked when
they come on, and unmasked when the commercial break is over. If desired,
it will also pause the video when the break is over, so you can
step out with the knowledge that you won't miss anything.

![Screenshot](https://raw.github.com/Timothee/Interhulude/master/images/screenshot2-1280x800.png)

Provided under the MIT License.

[Available in the Chrome Web
Store.](https://chrome.google.com/webstore/detail/no-hulu-ads/cdjcidbbokfiifpnpcglbehanlligmlh)

Also ported to GreaseMonkey by reddit user [atticusalien](http://www.reddit.com/user/atticusalien): [http://userscripts.org/scripts/show/152373](http://userscripts.org/scripts/show/152373)

Enjoy,

Tim

[timotheeboucher.com](http://timotheeboucher.com)

