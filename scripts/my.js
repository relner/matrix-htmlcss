var initVaribles = {
    menuButton: null,
    menu: null,
    closeButton: null,
    haveSub: null,
    backButton: null,
    mobileActive: false,
    openElements: [],
    header: null,
    searchButton: null,
    searchPopup: null,
    searchPopupBG: null,
    inputSearfch: null,

    init: function(){
        this.menuButton = $get("menuButton");
        this.menu = $get('menu');
        this.closeButton = $get('closeButton');
        this.haveSub = document.getElementsByClassName('have-Sub');
        this.backButton = $get('backButton');
        this.header = $get('headerWrapper');
        this.searchButton = $get('searchButton');
        this.searchPopup = $get('searchPopup');
        this.searchWrapper = $get('searchWrapper');
        this.inputSearfch = $get('inputSearfch');

    }
}

var functionManager = {

    init: function(){
        initVaribles.init();
        this.initListeners();
        this.animationScroll();

        myParaxify = paraxify('.paraxify',{
            speed: 5,
            boost: 1
        });
    },

    initListeners: function(){
        initVaribles.menuButton.addEventListener('click', this.openMobileMenu, false);
        initVaribles.closeButton.addEventListener('click', this.closeMobileMenu, false);
        window.addEventListener('scroll', this.animatedHeader, false);
        initVaribles.searchButton.addEventListener('click', this.searchAnimation, false);
        initVaribles.searchPopup.addEventListener('click', this.searchAnimation, false);
        
        for (let i = 0; i < initVaribles.haveSub.length; i++) {
            initVaribles.haveSub[i].addEventListener('click', this.rowClicked, false);
        }
    },

    openMobileMenu: function(){
        initVaribles.menu.classList.add('active');
        initVaribles.mobileActive = true;
    },
    closeMobileMenu: function(){
        if(initVaribles.openElements.length > 0){
            initVaribles.openElements[initVaribles.openElements.length - 1].classList.remove('active');
            initVaribles.openElements.pop();
        } else {
            initVaribles.menu.classList.remove('active');
            initVaribles.mobileActive = false;
        }

        if(initVaribles.openElements.length == 0){
            
            initVaribles.closeButton.classList.remove('back');
        }

    },
    rowClicked: function(){
        
        if(initVaribles.mobileActive == false) {

            var thisMenu =this.parentElement.querySelector('.sub-menu'); 

            if(thisMenu.classList.contains('desktopHelper')){
                thisMenu.classList.remove('desktopHelper');
                thisMenu.style.left = '';
            } else {
                thisMenu.classList.add('desktopHelper');
                functionManager.fixElementPositionFromPin(event, this, thisMenu)
            }

            this.parentElement.querySelector('.triang').classList.toggle('actv');
            this.classList.toggle('deskActive');
            return;
        } 

        initVaribles.openElements.push(this.parentElement.querySelector('.sub-menu'));

        this.parentElement.querySelector('.sub-menu').classList.add('active');

        initVaribles.closeButton.classList.add('back');
    },

    fixElementPositionFromPin: function(e, pin, element){
		var mouseX = e.pageX ? e.pageX : e.clientX + document.body.scrollLeft;
		var rightFromPin = this.getElementPosition(pin)["rightFromElement"];
        element.style.left = element.offsetWidth < rightFromPin ?  0 :   - element.offsetWidth + rightFromPin + 10 + "px";

    },
    
    getElementPosition: function(elem)	{

	    var w = elem.offsetWidth;
        var h = elem.offsetHeight;
	  
	    var l = 0;
	    var t = 0;

	    var appWidth = document.documentElement.clientWidth;
	    var appHeight = document.documentElement.clientHeight;
	  
	    while (elem)
	    {
	        l += elem.offsetLeft;
	        t += elem.offsetTop;
	        elem = elem.offsetParent;
	    }

	    var rightFromElement = appWidth - (l + w);
	    var bottomFromElement = appHeight - (t + h);


	    return {"left":l, "top":t, "width": w, "height":h, "rightFromElement": rightFromElement, "bottomFromElement": bottomFromElement};
    },
    
    animationScroll: function(){
        // Select all links with hashes
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')  &&  location.hostname == this.hostname ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 500, function() { });
                }
            }
        });
    },

    animatedHeader: function(){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            initVaribles.header.classList.add('scrolled');
        } else {
            initVaribles.header.classList.remove('scrolled');
        }
    },

    searchAnimation: function(){
        initVaribles.searchWrapper.classList.toggle('open');
        initVaribles.searchPopup.classList.toggle('open');
        initVaribles.inputSearfch.focus();
    }


}

//var $get = function (id) { return document.getElementById(id); }
//var $get = (id) => document.getElementById(id); 

var $get = (id) => {
    if(id.indexOf('.', 0) !== -1){
        return document.getElementsByClassName(id);
    }
    else {
        return document.getElementById(id);
    }
}


window.onload = function(){
    functionManager.init();
}