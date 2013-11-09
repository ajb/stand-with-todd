// Generated by CoffeeScript 1.6.2
(function() {
  (function($){
  $.getUrlParam = function(key){
    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
  };
})(jQuery);;
  var addSigners;

  addSigners = function(data) {
    var s, _i, _len, _ref, _results;

    _ref = data.signers;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      s = _ref[_i];
      _results.push($('ul.signers').append("<li><img src='" + s.picture_url + "' alt='" + s.name + "' title='" + s.name + "' /></li>"));
    }
    return _results;
  };

  $(function() {
    var loading, skip;

    if ($.getUrlParam('signed')) {
      $('h1.signed').show();
      $('h1.not-signed').hide();
    }
    $.getJSON('http://localhost:3000', function(data) {
      addSigners(data);
      return $('.signers-count').text(data.count);
    });
    skip = 10;
    loading = false;
    return $('a.load-more').click(function() {
      var _this = this;

      if (loading) {
        return;
      }
      loading = true;
      $(this).data('original-text', $(this).text());
      $(this).text('Loading...');
      return $.getJSON("http://localhost:3000/more?skip=" + skip, function(data) {
        addSigners(data);
        skip = skip + data.signers.length;
        loading = false;
        return $(_this).text($(_this).data('original-text'));
      });
    });
  });

}).call(this);
