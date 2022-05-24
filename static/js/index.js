'use strict';

import { ArticleFeed, UserFeed, UserCard } from './articleFeed'
import { UserProfileController } from './myaccount'
import { View, PubSub, ListMenu, Server, Modal, LightBox } from './framework'
import { SigninModal } from './signinModal'
import { Card } from './card'
import { Form } from './form'
import AdLoader from './advertising'
import {SubscribeForm} from './signup'


window.Acme = window.Acme || {};
// window.Acme.UserProfileController = UserProfileController;
// window.Acme.View.UserFeed = UserFeed;
window.Acme.ArticleFeed = ArticleFeed;
window.Acme.Usercard = UserCard;
window.Acme.Card = Card;
window.Acme.Form = Form;
// window.Acme.listMenu = ListMenu;
// window.Acme.lightBox = LightBox;
window.Acme.modal = Modal;
window.Acme.server = Server;
window.Acme.PubSub = PubSub;
window.Acme.articleFeeds = {};
const ads = new AdLoader();
ads.LoadAds();



// var layouts = {
//     "signin": 'signinFormTmpl',
//     "register": 'registerTmpl',
//     "forgot": 'forgotFormTmpl',
//     "spinner": 'spinnerTmpl',
//     "expired": 'expiredNotice',
//     "userPlan": 'userPlanMessage',
//     "userPlanChange": 'userPlanOkCancel'
// }

// Acme.SigninView = new SigninModal('modal', 'signin-modal', layouts);

// $('#signinBtn, #articleSigninBtn, .j-signin').on('click', function () {
//     Acme.SigninView.render("signin", "Sign in");
// });


function sidebarMenuOpen() {
	var getMenuClick = document.querySelector(".js-menu");
	getMenuClick.addEventListener("click", openMenuFunction);
	function openMenuFunction() {
		document.querySelector(".c-sidebarMenu").classList.add("sidebar-active");
		document.querySelector("body").classList.add("u-noscroll");
	}
}
sidebarMenuOpen();

function sidebarMenuClose() { 
	var getMenuClick = document.querySelector(".js-closeMenu");
	getMenuClick.addEventListener("click", closeMenuFunction);
	function closeMenuFunction() {
		document.querySelector(".c-sidebarMenu").classList.remove("sidebar-active");
		document.querySelector(".body").classList.remove("u-noscroll");
	}
}

sidebarMenuClose();


$("img.lazyload").lazyload({
    effect: "fadeIn"
});


var cardHolder = '';
clearTimeout(cardHolder);
cardHolder = setTimeout((function () {
    $('.j-truncate').dotdotdot({
        watch: true
    });
}), 750);


window.Acme.scrollThumbs = function(elem) {
    if (elem.length === 0) {
        return;
    }
    var elem = $(elem);
    var elemWidth = elem.width();
    var container = elem.parent();
    var containerWidth = container.width();
    var scrollAmount = container.scrollLeft();
    var containerView = [scrollAmount, containerWidth + scrollAmount];

    var middle = (containerView[1] - containerView[0]) / 2 ;
    var middle = scrollAmount + middle;
    var elempos = elem[0].offsetLeft + elemWidth/2;

    if ( elempos > middle ) {
        var scroll = true;
        var scrollpos = scrollAmount + (elempos - middle);
    } else if ( elem[0].offsetLeft < middle ) {
        var scroll = true;
        var scrollpos = scrollAmount - (middle - elempos);
    }

    if (scroll) {
        container.animate({
            scrollLeft : scrollpos
        });
    }
}


window.Acme.scrollThumbsVertical = function(elem) {
    if (elem.length === 0) {
        return;
    }
    var elem = $(elem);
    var elemHeight = elem.height();
    var container = elem.parent();
    var containerHeight = container.height();
    var scrollAmount = container.scrollTop();
    var containerView = [scrollAmount, containerHeight + scrollAmount];

    var middle = (containerView[1] - containerView[0]) / 2 ;
    var middle = scrollAmount + middle;

    var elempos = elem[0].offsetTop + elemHeight/2;

    if ( elempos > middle ) {
        var scroll = true;
        var scrollpos = scrollAmount + (elempos - middle);
    } else if ( elem[0].offsetLeft < middle ) {
        var scroll = true;
        var scrollpos = scrollAmount - (middle - elempos);
    }

    if (scroll) {
        container.animate({
            scrollTop : scrollpos
        });
    }
}

window.Acme.scrollThumbsHorizontal = function(elem) {
    if (elem.length === 0) {
        return;
    }
    var elem = $(elem);
    var elemWidth = elem.width();
    var container = elem.parent();
    var containerWidth = container.width();
    var scrollAmount = container.scrollLeft();
    var containerView = [scrollAmount, containerWidth + scrollAmount];

    var middle = (containerView[1] - containerView[0]) / 2 ;
    var middle = scrollAmount + middle;
    var elempos = elem[0].offsetLeft + elemWidth/2;

    if ( elempos > middle ) {
        var scroll = true;
        var scrollpos = scrollAmount + (elempos - middle);
    } else if ( elem[0].offsetLeft < middle ) {
        var scroll = true;
        var scrollpos = scrollAmount - (middle - elempos);
    }

    if (scroll) {
        container.animate({
            scrollLeft : scrollpos
        });
    }
}


$("#owl-gallery-image").owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    navText: [
        "",
        ""
    ]
});   



//this is used for the gallery template
$("#owl-gallery-article").owlCarousel({
    items: 1,
    thumbs: true,
    thumbsPrerendered: true,
    URLhashListener:true,
    startPosition: 'URLHash',
    pagination: true,
    dots: false,
    nav: true,
    navText: [
        "",
        ""
    ]
});  

// function counter(event) {
//     var element = event.target;
//     var items = event.item.count;
//     var item = event.item.index + 1;

//     // it loop is true then reset counter from 1
//     if (item > items) {
//         item = item - items
//     }
//     $('#counter').html(item + " of " + items)
// }

//sidebar function

