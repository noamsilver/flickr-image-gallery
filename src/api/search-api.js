const flickrImageSearch = async (text) => {
  try {
    const searchResponse = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${encodeURIComponent(text)}`);
    return searchResponse.json();
  } catch (err) {
    return err.message;
  }
}

const flickrAllImages = async () => {
  try {
    const searchResponse = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1`);
    return searchResponse.json();
  } catch (err) {
    return err.message;
  }
}

export {
  flickrImageSearch,
  flickrAllImages,
}