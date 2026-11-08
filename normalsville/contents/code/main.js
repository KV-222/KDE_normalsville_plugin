function init() {
    comic.comicAuthor = "Florence";
    print("            22222              ");
    comic.websiteUrl = "https://normalsville.the-comic.org/comics/";
    comic.firstIdentifier = "1";
    comic.requestPage(comic.websiteUrl, comic.User);
}
function pageRetrieved(id, data) {

    if (id === comic.User) {
        var re = new RegExp('<link rel="prev" href="/comics/([^/]+)/"');
        var match = re.exec(data);
        if (match !== null) {
            comic.previousIdentifier = match[1];
        }
        re = new RegExp('<link rel="next" href="/comics/([^/]+)/"');
        match = re.exec(data);
        if (match !== null) {
            comic.nextIdentifier = match[1];
        }
        re = new RegExp('<title>Normalsville - (.+)</title>');
        match = re.exec(data);
        if (match !== null){
            comic.title = match[1];
            comic.additionalText = "harood";
        }
        comic.websiteUrl += comic.identifier;
        comic.requestPage(comic.websiteUrl, comic.Page);
    }



    //ACTUALLY GET THE IMAGE AND TITLE
    if (id === comic.Page) {
    var re = new RegExp('<meta property="og:image" content="([^"]+)"');  //look for this, and
    var match = re.exec(data);
    // get image's embed or whatever u call it
    //that URL, will give us the image.
    //match[1] is 10239120392103210.png something


    if (match != null) {
        comic.requestPage(match[1], comic.Image);   //this'll give the image
    }   else {
        comic.error();
        return;
    }
    // GET TITLE
    re = new RegExp('<title>Normalsville - (.+)</title>');
    match = re.exec(data);
    if (match !== null){
        comic.title = match[1];
        comic.additionalText = "harood";
    }
    // TRY TO GET OTHER IDENTIFIERS
    re = new RegExp('<link rel="prev" href="/comics/([^/]+)/"');
    match = re.exec(data);
    if (match !== null) {
        comic.previousIdentifier = match[1];
    }
    re = new RegExp('<link rel="next" href="/comics/([^/]+)/"');
    match = re.exec(data);
    if (match !== null) {
        comic.nextIdentifier = match[1];
    }

    }










}
