/**
 * remoteEmbed.js
 *
 * @desc embed a remote iframe and resize it
 * @version 1.1.0
 * @author Nabil Redmann <repo@bananaacid.de>
 * @see https://jsfiddle.net/BananaAcid/04v5su2f
 * @see https://codesandbox.io/s/remote-embed-ifrm-yz0xl  -- full working example
 * @ref https://stackoverflow.com/a/42308842/1644202
 * @license MIT
 */
/*eslint no-cond-assign: "off"*/
(function() {
  // Note the id and scriptName, we need to set this correctly on the script tag responsible for
  // requesting this file. If both are null, get element by current script filename (might not work
  // in all circumstances - you need to test when using)
  var scriptId = null, //'my-iframe-content-loader-script-tag', // script tag id to use the script block
    scriptName = null; //'remoteEmbed.js',  // script filename to use to find the script block

  // iframe config
  var ifrmId = "remote-embed-script-elem", // new iframe id
    contentName = "https://bakigervalla.github.io/booking/", // target file in same domain and folder as this loader js, and REQUIRES valid doctype !
    ifrmClass = ""; // extra classes to add to iframe

  // get the current scripts filename
  function getScriptName() {
    var error = new Error(),
      source,
      lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/),
      currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/),
      currentStackFrameRegexFF = new RegExp(/getScriptName@.+\/(.*):\d+:\d+/);

    if ((source = currentStackFrameRegex.exec(error.stack.trim()))) {
      // webkit
      //console.log('!webkit', source);
      return source[1];
    }
    if ((source = currentStackFrameRegexFF.exec(error.stack.trim()))) {
      // firefox
      //console.log('!FF', source);
      return source[1];
    } else if (
      (source = lastStackFrameRegex.exec(error.stack.trim())) &&
      source[1] !== ""
    ) {
      // firefox would take last file
      //console.log('!rest', source);
      return source[1];
    } else if (error.fileName !== undefined) return error.fileName;
  }

  var scriptTag = scriptId
    ? document.getElementById(scriptId)
    : scriptName
    ? document.querySelector(
        '[src*="' + scriptName.replace(/http[s]*:/i, "") + '"]'
      )
    : document.querySelector(
        '[src*="' + (getScriptName() || "").replace(/http[s]*:/i, "") + '"]'
      );

  var frmOpts;
  // parse as JavaScript Object, do not require JSON.
  try {
    // eslint-disable-next-line no-new-func
    frmOpts = new Function("return " + scriptTag.innerHTML + ";")();
  } catch (ex) {}
  frmOpts = frmOpts || {
    log: true,
    bodyBackground: "transparent" /* inPageLinks: true */
  };

  // adjust id and class
  ifrmId = frmOpts.id || ifrmId; // extra param for <script ...>{ id:'' .. }</script>
  ifrmClass = frmOpts.class || ifrmClass; // extra param for <script ...>{ class:'' .. }</script>

  // allow cross domain com http://davidjbradshaw.github.io/iframe-resizer/#checkorigin
  frmOpts.checkOrigin = frmOpts.checkOrigin || false;

  // lead the iframe element into the page
  function loadIFrame() {
    var ifrm = document.createElement("iframe");
    ifrm.id = ifrmId;
    // replace this file name with the content file name, preserving the rest of the URL
    ifrm.setAttribute(
      "src",
	  contentName
	  /*
      scriptTag.src.replace(
        scriptTag.src.substring(scriptTag.src.lastIndexOf("/")),
        "/" + contentName
      )
	  */
    );
    ifrm.style.width = "100%";
    ifrm.style.border = 0;
    // go transparent on the iframe
    ifrm.style.background = "transparent";
    ifrm.className = ifrmClass;
    // we initially hide the iframe to avoid seeing the iframe resizing
    ifrm.style.opacity = 0;
    var t;
    var onload = function() {
      clearTimeout(t);
      // this will resize our iframe, initiate iframe-resizer, go transparent on the iframe
      // eslint-disable-next-line no-undef
      iFrameResize(frmOpts, "#" + ifrmId);
      // make our iframe visible
      ifrm.style.opacity = 1;
    };
    // enforce showing the form (there might be an JS error or whatever)
    t = setTimeout(function() {
      ifrm.style.opacity = 1;
    }, 1000);
    ifrm.onload = onload;
    // append the iframe after the script element
    scriptTag.insertAdjacentElement("afterend", ifrm);
  }

  // init
  if (!window.iFrameResize) {
    // We first need to ensure we inject the js required to resize our iframe.

    var resizerScriptTag = document.createElement("script");
    resizerScriptTag.type = "text/javascript";

    // IMPORTANT: insert the script tag before attaching the onload and setting the src.
    scriptTag.insertAdjacentElement("afterend", resizerScriptTag);

    // IMPORTANT: attach the onload before setting the src.
    resizerScriptTag.onload = loadIFrame;

    // This a CDN resource to get the iFrameResizer code.
    // NOTE: You must have the below "coupled" script hosted by the content that
    // is loaded within the iframe:
    // https://unpkg.com/iframe-resizer@4.2.10/js/iframeResizer.contentWindow.min.js
    resizerScriptTag.src =
      "//unpkg.com/iframe-resizer@4.2.10/js/iframeResizer.min.js";
  } else {
    // Allright, the was allready included on the client page - add the iframe
    loadIFrame();
  }
})();

// Polyfill insertAdjacentElement (old Firefox, IE)
/*
 * insertAdjacentHTML.js
 *   Cross-browser full HTMLElement.insertAdjacentHTML implementation.
 *
 * 2011-10-10
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

if (
  self.document &&
  !(
    "insertAdjacentHTML" in
    document.createElementNS("http://www.w3.org/1999/xhtml", "_")
  )
) {
  HTMLElement.prototype.insertAdjacentHTML = function(position, html) {
    "use strict";

    var ref = this,
      container = ref.ownerDocument.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "_"
      ),
      ref_parent = ref.parentNode,
      node,
      first_child,
      next_sibling;

    container.innerHTML = html;

    // eslint-disable-next-line default-case
    switch (position.toLowerCase()) {
      case "beforebegin":
        while ((node = container.firstChild)) {
          ref_parent.insertBefore(node, ref);
        }
        break;
      case "afterbegin":
        first_child = ref.firstChild;
        while ((node = container.lastChild)) {
          first_child = ref.insertBefore(node, first_child);
        }
        break;
      case "beforeend":
        while ((node = container.firstChild)) {
          ref.appendChild(node);
        }
        break;
      case "afterend":
        next_sibling = ref.nextSibling;
        while ((node = container.lastChild)) {
          next_sibling = ref_parent.insertBefore(node, next_sibling);
        }
        break;
    }
  };
}
