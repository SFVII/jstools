/**
jQuery FakeLazyLoader

The MIT License (MIT)
Copyright (c) 2016 Brice D

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Require jQuery >= 1.11

How to Use ?

        Set your configuration like all your item are idem except item index before the init Value.
        That will put directly,
        Just Declare a new object eg:
            var scroll = new scrollTool($(#tableScrollable tbody tr), {init : 5, pagination : 5});

        and for the finish you have to put this on a Event window like :
        window.onscroll = function(){
            scroll.lazyLoader();
        }
*/


var scrollTool = function(element, opt) {
    var that = this;
    this.scrollCounter = false;
    this.scrollInit = opt.init;
    this.pagination = opt.pagination;
    this.current = this.scrollInit;
    this.getMyScroll = function(statement) {
        var id = setInterval(function() {
            if (that.scrollCounter = $(element).length) {
                clearInterval(id);
            }
        }, 1);
    }
    this.onScroll = function() {
        return that.scrollCounter;
    }
    this.getTabIndex = function() {
        if (that.scrollCounter) {
            that.current = that.current + 1;
            that.current = that.current <= that.scrollCounter ? that.current : that.scrollCounter;
        }
        return that.current;
    }
    this.lazyLoader = function() {
        if (that.scrollCounter == false) {
            that.getMyScroll();
        } else {
            $(element + ':eq(' + that.getTabIndex() + ')').show(250);
        }
    }
}

var sParams = {
    init: 5,
    pagination: 1
}

var scroll = new scrollTool("#scrollable tbody tr", sParams);

window.onscroll = function() {
    scroll.lazyLoader();
}