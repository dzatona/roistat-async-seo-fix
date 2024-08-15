<script>
(function(w, d) {
    var originalCreateElement = d.createElement;
    d.createElement = function(tagName) {
        var element = originalCreateElement.apply(this, arguments);
        if (tagName.toLowerCase() === 'script') {
            var originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name, value) {
                if (name === 'src' && value.includes('cloud.roistat.com')) {
                    console.log('[SUCCESS]: Roistat script download intercepted.');
                    var p = d.location.protocol == "https:" ? "https://" : "http://";
                    var h = 'cloud.roistat.com';
                    var moduleUrl = p + h + "/dist/module.js";
                    var initUrl = p + h + "/api/site/1.0/" + w.roistatProjectId + "/init";
                    function loadScript(url, callback, errorCallback) {
                        var js = originalCreateElement.call(d, 'script');
                        js.async = 1;
                        js.src = url;
                        var timeout = setTimeout(function() {
                            errorCallback(new Error('[ERROR]: Script load timeout!'));
                        }, 5000);
                        js.onload = function() {
                            clearTimeout(timeout);
                            callback();
                        };
                        js.onerror = function(error) {
                            clearTimeout(timeout);
                            errorCallback(error);
                        };
                        d.head.appendChild(js);
                    }
                    function loadRoistatScripts(retries = 3) {
                        loadScript(moduleUrl, function() {
                            if (typeof w.roistat === 'undefined') {
                                loadScript(initUrl, function() {
                                    console.log('[SUCCESS]: Roistat initialized.');
                                }, function(error) {
                                    console.error('[ERROR]: Failed to load init script:', error);
                                    if (retries > 0) {
                                        console.log('[RETRY]: Retrying init script...');
                                        loadRoistatScripts(retries - 1);
                                    } else {
                                        console.error('[FATAL ERROR]: Failed to load Roistat after multiple attempts.');
                                    }
                                });
                            } else {
                                console.log('[SUCCESS]: Roistat module loaded successfully.');
                            }
                        }, function(error) {
                            console.error('[ERROR]: Failed to load module script:', error);
                            if (retries > 0) {
                                console.log('[RETRY]: Retrying module script...');
                                loadRoistatScripts(retries - 1);
                            } else {
                                console.error('[FATAL ERROR]: Failed to load Roistat after multiple attempts.');
                            }
                        });
                    }
                    loadRoistatScripts();
                    return;
                }
                return originalSetAttribute.apply(this, arguments);
            };
        }
        return element;
    };
    var originalAppendChild = Node.prototype.appendChild;
    Node.prototype.appendChild = function(child) {
        if (child.tagName === 'SCRIPT' && child.src && child.src.includes('cloud.roistat.com')) {
            console.log('[SUCCESS]: Adding the original Roistat script is prevented.');
            return child;
        }
        return originalAppendChild.apply(this, arguments);
    };
})(window, document);
</script>