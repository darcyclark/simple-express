var sortByKey = function(array, key) {
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

module.exports = sortByKey;
