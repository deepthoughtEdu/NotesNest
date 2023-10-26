const uuid = require('uuid');

const utiities = module.exports;

utiities.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

utiities.generateUUID = function () {
  const options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 5678,
  };

  return uuid.v1(options);
}

utiities.getISOTimestamp = function () {
  return new Date().toISOString();
}

utiities.paginate = (url, data, count, limit, page) => {
	url = utiities.updateQueryStringParameter(url, 'limit', limit);
	page = parseInt(page);

	var last_page = count ? Math.floor(count / limit) : 0;
	var first_page_url = utiities.updateQueryStringParameter(url, 'page', 0);
	var next_page_url = page === last_page ? null : utiities.updateQueryStringParameter(url, 'page', (page + 1));
	var prev_page_url = page === 0 ? null : utiities.updateQueryStringParameter(url, 'page', (page - 1));
	var last_page_url = utiities.updateQueryStringParameter(url, 'page', (Math.floor(count / limit)));

	return {
		data: data,
		// total: count,
		per_page: limit,
		current_page: page,
		first_page_url: first_page_url ? first_page_url.toString() : null,
		last_page_url: last_page_url ? last_page_url.toString() : null,
		next_page_url: next_page_url ? next_page_url.toString() : null,
		prev_page_url: prev_page_url ? prev_page_url.toString() : null,
		last_page: last_page,
		from: page * limit,
		to: page + 1,
	};
};


/**
 *
 * @date 14-02-2022
 * @function updateQueryStringParameter
 * @param {String} uri URL
 * @param {*} key
 * @param {*} value
 * @returns String
 */
utiities.updateQueryStringParameter = (uri, key, value) => {
	var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
	var separator = uri.indexOf('?') !== -1 ? '&' : '?';
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + '=' + value + '$2');
	}
	return uri + separator + key + '=' + value;
};