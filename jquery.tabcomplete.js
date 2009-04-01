/**
 * TabComplete jquery plugin (@as-> = @asdf)
 * provides tab completion behavior for textarea input
 * Takes an options arg with the following keys
 * <tt>tabbingChar</tt> the character that the tab key triggers completion
 * <tt>dataFn</tt> a function that takes an array which it populates
 *     with data
 *
 * usage
 *
 *  function pushData(data) {
 *    data = ['foo','bar','baz'];
 *  }
 *  
 *  (function($) {
 *    $("#input").tabComplete({
 *      dataFn: pushData
 *    });
 *  })(jQuery);
 *
 *  use jquery version >= 1.2.6
 */
(function($) {

  /**
   * array of completion values
   */
  var values = [];
  
  /**
   * tab key code
   */
  var TAB = 9;
  
  $.fn.tabComplete = function(options) {
    
    /* 
     * merge options
     */
    var opts = $.extend({}, $.fn.tabComplete.defaults, options);
  
    opts.dataFn(values);
  
    return this.each(function() {     
			
      $(this).keydown(function(e) {
	      input = $(this);
        if(e.which==TAB) {
          var content = input.val();
          var lastAt = content.lastIndexOf(opts.tabbingChar);
          if(lastAt > -1) {
            var matched = '';
            if(lastAt != (content.length-1)) {
              var partial = content.substring(lastAt+1,
                                              content.length);
              matched = match(partial);
            } else {
              matched = match(null);
            }
            if(matched[0]) {
              input.val([content.substring(0,lastAt+1),
                                          matched[0],
                                          ' '].join(''));
            }
          }
          return false;
        }
      });
    });
  };
  
  function defaultData(data) {
    // no-op
  }
  
  /**
   * accessor for array of data
   */
  function data(){
     return values;
  }

  /**
   * filters out data matching part
   */
  function filter(part) {
    var r = new RegExp(['^',part].join(''),'i');
    return data().filter(function(val) {
       var stringVal = val.toString();
       try {
         if(r.exec(stringVal)) {
           return stringVal.substring(part.length-1, stringVal.length-1);
         } else {
           return null;
         }
       } catch (err) {
         alert(err);
       }
    });
  }

  /**
   * finds a match for the given val
   */
  function match(val) {
    return val != null ? filter(val) : "";
  }

  /**
   * default options
   */
  $.fn.tabComplete.defaults = {
	  tabbingChar: "@",
    dataFn: defaultData
  };  
 
})(jQuery);