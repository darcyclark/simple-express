// utils

exports = module.exports

// copy of a useful Rails helper
exports.blank = function(obj) {
  function blank(obj) { 
    var cache;

    if((cache = typeof obj) !== 'boolean' && (cache !== 'number' || isNaN(obj)) && !obj)
        return true;
    if(cache == 'string' && obj.replace(/\s/g, '').length === 0)
        return true;
    if(cache == 'object') {
        if((cache = toString.call(obj)) == '[object Array]' && obj.length === 0)
            return true;
        if(cache == '[object Object]') {
            for(cache in obj) {
                return false;
            }
            return true;
        }
    }
    return false;
  }
}

// sort array of arrays by a specified array element
exports.sortByKey = function(array, key) {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    if (typeof x == "string")
    {
      x = x.toLowerCase(); 
      y = y.toLowerCase();
    }
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}
