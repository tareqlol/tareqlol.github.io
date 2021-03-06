import _ from 'node_modules/underscore/underscore-min';

/**
 * [keywordBasedKeysMapper mutate the keys of the response from the api to our view keys.
 *   view Key vs the api key. the mapper is dynamic. if there is a value needed we just add to
 *   the mapper. neat right :D  ]
 * @type {Object}
 */
const keywordBasedKeysMapper = {
  url: 'bitly_url',
  images: 'images',
  title: 'slug',
};

/**
 * [keywordImagesKeysMapper same as the view key vs api key, but with the parent key ]
 * @type {Object}
 */
const keywordImagesKeysMapper = {
  downsized_small: {
    apiKey: 'mp4',
    desired: 'gifImage',
  },
  downsized_still: {
    apiKey: 'url',
    desired: 'stillImage',
  },
};
/**
 * [randomBasedKeysMapper mutate the keys of the response from the api to our view keys.
 *   view Key vs the api key. the mapper is dynamic. if there is a value needed we just add to
 *   the mapper. neat right :D  ]
 * @type {Object}
 */
const randomBasedKeysMapper = {
  url: 'url',
  title: 'caption',
  gifImage: 'image_mp4_url',
  stillImage: 'fixed_width_small_still_url',
};

 /**
 * [formatImageData format the image object for the desired images keys]
 * @param  {[array]} images [images props that is needed to be filterd]
 * @return {[object]}        [of the desired keys with values]
 */
const formatImageData = (images) => {
  const res = {};
  _.each(keywordImagesKeysMapper, (value, key) => {
    const desiredKey = value.desired;
    const apiKey = value.apiKey;
    res[desiredKey] = images[key][apiKey];
  });

  return res;
};

/**
 * [formatResults formats the Search Results and Random Results to get them ready to be renderd]
 * @param  {[array]} response [array of objects for the images]
 * @param  {[boolean]} random [random bool]
 * @return {[array]}          [array of formated resutls]
 */
const formatResults = (response, random) => {
  let data = response.data.data;

  // since this method can have an array of object results, and a single object from
  // the random api endpoint then we nee to normalize it.
  data = _.isArray(data) ? data : [data];

  let res = [];
  const currentQueryTypeMapper = (random ? randomBasedKeysMapper : keywordBasedKeysMapper);
  _.each(data, (imageObject) => {
    let singleImageObject = {};
    _.each(currentQueryTypeMapper, (value, key) => {
      if (key === 'images') {
        // this will happen if the images are an property inside the image response
        // extend the images with the base object
        singleImageObject = _.extend({}, singleImageObject, formatImageData(imageObject[value]));
      } else {
        singleImageObject[key] = imageObject[value];
      }
    });
    // each image is paused by default
    singleImageObject.isPlaying = false;

    if (random) {
      // since random query returns a single object
      // then a single mutated object should be returned
      res = singleImageObject;
    } else {
      // push into the array
      res.push(singleImageObject);
    }
  });
  return res;
};

/**
 * [formatResults a promise wrapper for the formatters of the resutls ]
 * @param  {[array]} response [array of objects for the images]
 * @param  {[bool]} random [boolean check for if the query is random vs query]
 * @return {[Promise]}     [Promise]
 */
const formatResultsPromiseWrapper = (response, random) => {
  const promise = new Promise((resolve, reject) => {
    if (!response) {
      reject({
        message: 'There is an error happend !!',
      });
    } else {
      resolve(formatResults(response, random));
    }
  });
  return promise;
};

export default {
  formatResults: formatResultsPromiseWrapper,
};
