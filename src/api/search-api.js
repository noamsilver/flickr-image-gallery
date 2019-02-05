const flickrImageSearch = async (text, page) => {
  try {
    const searchResponse = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${encodeURIComponent(text)}&page=${page}`);
    return searchResponse.json();
  } catch (err) {
    return {err: err.message};
  }
}

export default flickrImageSearch;