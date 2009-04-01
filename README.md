## Tab Complete
tab that sh!t.
a simple [jQuery](http://http://jquery.com/) javascript tab completion plugin

### description

Adds tab completion behavoir to html textareas. Start typing a predefined
value after a _tabbingChar_ and hit the tab key to auto complete the value. Similar to most irc clients for completing names.

### install & usage


    <textarea id="input"></textarea>
    
    <script text="text/javascript" src="jquery.tabcomplete.js"></script>

    function assignData(options) {
      options = ['foo','bar'];
    }
  
    (function($) {
      $("#input").tabComplete({
        dataFn:assignData
       });
    })(jQuery);

## TODO
  * kill ring cycling would be nice

Doug Tangren (softprops) 2009