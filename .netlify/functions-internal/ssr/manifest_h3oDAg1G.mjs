import 'cookie';
import './chunks/astro_HRyy38CH.mjs';
import 'clsx';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.3.1_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/articles.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/articles\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"articles.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/articles.json.ts","pathname":"/api/articles.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/register.ts","pathname":"/api/auth/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signin","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signin\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signin.ts","pathname":"/api/auth/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/auth/signout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/auth\\/signout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/auth/signout.ts","pathname":"/api/auth/signout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const t=\"dark\",n=\"COLOUR_MODE\",s=\"LIGHT\",l=\"DARK\",o=document.querySelector(\"[data-theme-toggle]\"),e=document.documentElement;o&&o.addEventListener(\"click\",()=>{e.classList.toggle(t);const c=e.classList.contains(t)?l:s;window.localStorage.setItem(n,c)});\n"}],"styles":[{"type":"external","src":"/_astro/create.JDLrkr3L.css"},{"type":"inline","content":"[data-astro-cid-x3pjskd3][data-theme-toggle]{cursor:pointer;border-radius:10px;padding:5px 10px;transition:all .2s ease-in-out;background:#0c080826}[data-astro-cid-x3pjskd3][data-theme-toggle]:hover{transform:scale(.9);background:#ffffff40}[data-astro-cid-x3pjskd3][data-theme-toggle]:active{transform:scale(1)}.sun[data-astro-cid-x3pjskd3]{fill:transparent}.dark .sun[data-astro-cid-x3pjskd3]{fill:#111010}.dark .moon[data-astro-cid-x3pjskd3]{fill:#000;fill:transparent}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const t=\"dark\",n=\"COLOUR_MODE\",s=\"LIGHT\",l=\"DARK\",o=document.querySelector(\"[data-theme-toggle]\"),e=document.documentElement;o&&o.addEventListener(\"click\",()=>{e.classList.toggle(t);const c=e.classList.contains(t)?l:s;window.localStorage.setItem(n,c)});\n"}],"styles":[{"type":"external","src":"/_astro/create.JDLrkr3L.css"},{"type":"inline","content":"[data-astro-cid-x3pjskd3][data-theme-toggle]{cursor:pointer;border-radius:10px;padding:5px 10px;transition:all .2s ease-in-out;background:#0c080826}[data-astro-cid-x3pjskd3][data-theme-toggle]:hover{transform:scale(.9);background:#ffffff40}[data-astro-cid-x3pjskd3][data-theme-toggle]:active{transform:scale(1)}.sun[data-astro-cid-x3pjskd3]{fill:transparent}.dark .sun[data-astro-cid-x3pjskd3]{fill:#111010}.dark .moon[data-astro-cid-x3pjskd3]{fill:#000;fill:transparent}\n"}],"routeData":{"route":"/create","isIndex":false,"type":"page","pattern":"^\\/create\\/?$","segments":[[{"content":"create","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/create.astro","pathname":"/create","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"\n"}],"styles":[{"type":"external","src":"/_astro/create.JDLrkr3L.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/create.JDLrkr3L.css"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const t=\"dark\",n=\"COLOUR_MODE\",s=\"LIGHT\",l=\"DARK\",o=document.querySelector(\"[data-theme-toggle]\"),e=document.documentElement;o&&o.addEventListener(\"click\",()=>{e.classList.toggle(t);const c=e.classList.contains(t)?l:s;window.localStorage.setItem(n,c)});\n"}],"styles":[{"type":"external","src":"/_astro/create.JDLrkr3L.css"},{"type":"inline","content":"[data-astro-cid-x3pjskd3][data-theme-toggle]{cursor:pointer;border-radius:10px;padding:5px 10px;transition:all .2s ease-in-out;background:#0c080826}[data-astro-cid-x3pjskd3][data-theme-toggle]:hover{transform:scale(.9);background:#ffffff40}[data-astro-cid-x3pjskd3][data-theme-toggle]:active{transform:scale(1)}.sun[data-astro-cid-x3pjskd3]{fill:transparent}.dark .sun[data-astro-cid-x3pjskd3]{fill:#111010}.dark .moon[data-astro-cid-x3pjskd3]{fill:#000;fill:transparent}\n"}],"routeData":{"route":"/update","isIndex":false,"type":"page","pattern":"^\\/update\\/?$","segments":[[{"content":"update","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/update.astro","pathname":"/update","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/create.astro",{"propagation":"none","containsHead":true}],["C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/update.astro",{"propagation":"none","containsHead":true}],["C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/register.astro",{"propagation":"none","containsHead":true}],["C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/src/pages/signin.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/node_modules/.pnpm/astro@4.3.1_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_Iot20KTX.mjs","/src/pages/register.astro":"chunks/pages/register_gOsMLcDG.mjs","/src/pages/api/auth/register.ts":"chunks/pages/register_y0j3pAIp.mjs","/src/pages/signin.astro":"chunks/pages/signin_VioCSPR5.mjs","/src/pages/api/auth/signin.ts":"chunks/pages/signin_FC8EYr2r.mjs","/src/pages/api/auth/signout.ts":"chunks/pages/signout_RgzXmP_E.mjs","/src/pages/update.astro":"chunks/pages/update_UILoX8yK.mjs","\u0000@astrojs-manifest":"manifest_h3oDAg1G.mjs","C:/Users/a2kg0/Local Documents/mini-repos/frontend-repos/astro-repos/news-crud/node_modules/.pnpm/@astrojs+react@3.0.10_@types+react-dom@18.2.19_@types+react@18.2.58_react-dom@18.2.0_react@18.2.0_vite@5.0.12/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_7a5sIVmK.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.3.1_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_ZIvEvQwD.mjs","\u0000@astro-page:src/pages/api/articles.json@_@ts":"chunks/articles_jlX8NcXm.mjs","\u0000@astro-page:src/pages/api/auth/register@_@ts":"chunks/register_6h6oeVan.mjs","\u0000@astro-page:src/pages/api/auth/signin@_@ts":"chunks/signin_pfvEWhqR.mjs","\u0000@astro-page:src/pages/api/auth/signout@_@ts":"chunks/signout_QMsnDjFi.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_Twyf4M6B.mjs","\u0000@astro-page:src/pages/create@_@astro":"chunks/create_RNcNcFfK.mjs","\u0000@astro-page:src/pages/register@_@astro":"chunks/register_mK9FEhHz.mjs","\u0000@astro-page:src/pages/signin@_@astro":"chunks/signin_0_n8xrd3.mjs","\u0000@astro-page:src/pages/update@_@astro":"chunks/update_wbcjeXtk.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.w40geAFS.js","/astro/hoisted.js?q=1":"_astro/hoisted.-TFsGCHu.js","@/components/DeleteButton":"_astro/DeleteButton.KB9xcwbl.js","@/components/CreateForm.tsx":"_astro/CreateForm.OibUSBEo.js","@/components/UpdateModal":"_astro/UpdateModal.4j5ZirX5.js","@astrojs/react/client.js":"_astro/client.z9pbgFlK.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/create.JDLrkr3L.css","/arkgrouplogo.svg","/arklogo3.svg","/favicon.svg","/_astro/browser.Q6OzlgWg.js","/_astro/client.z9pbgFlK.js","/_astro/CreateForm.OibUSBEo.js","/_astro/DeleteButton.KB9xcwbl.js","/_astro/index.LFf77hJu.js","/_astro/supabase.9Iv7BTZc.js","/_astro/UpdateModal.4j5ZirX5.js"],"buildFormat":"directory"});

export { manifest };
