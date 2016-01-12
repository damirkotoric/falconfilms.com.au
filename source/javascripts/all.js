//= require_tree .

// https://github.com/anselmh/object-fit
objectFit.polyfill({
    selector: 'video', // this can be any CSS selector
    fittype: 'cover', // either contain, cover, fill or none
    disableCrossDomain: 'true' // either 'true' or 'false' to not parse external CSS files.
});
