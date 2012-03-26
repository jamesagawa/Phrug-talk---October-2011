

    function foo() {
      setTimeout(function(){
        console.log('foo');
      }, 2000);
    }

    function bar() {
      console.log('bar');
    }


    foo();
    bar();
