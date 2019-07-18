module.exports = {
  getLanguage: function(langString) {
    return langString.split(',')[0];
  },
  getSoftware: function(uaString) {
    var regex = /\(([^\)]+)\)/;
    var software = uaString.match(regex)[1];
    return software;
  }
}