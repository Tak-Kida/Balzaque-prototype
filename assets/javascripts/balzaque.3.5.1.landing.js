'use strict';

$(function () {
  //header--PC
  $("header a").click(function () {
    var id = $(this).attr("href");
    var position = $(id).offset().top;
    $("html, body").animate({ scrollTop: position }, 500);
  });

  // header--SP
  $(".drawer").drawer();
  $(".drawer-nav a").on("click", function () {
    $(".drawer").drawer("close");
  });

  // about__modal--PC
  $("#derivation-open-btn--PC").click(function () {
    $("#name-derivation-modal").fadeIn();
  });

  $(".p-home-modalHeader__icon--crossMark").click(function () {
    $(".l-modalWrap").fadeOut();
  });

  $(".p-home-modalFooter__closeBar").click(function () {
    $(".l-modalWrap").fadeOut();
  });

  //about--SP
  $(".p-home-about__explainList--SP li").click(function () {
    var caption = $(this).find(".p-home-explain__caption");
    if (caption.hasClass("u-caption--shown")) {
      $(caption).removeClass("u-caption--shown");
      $(caption).fadeOut();
    } else {
      caption.fadeIn(400).addClass("u-caption--shown");
    }
  });

  //about-accordion--SP
  $("#derivation-open-btn--SP").click(function () {
    if ($("#derivation__accordion--SP").hasClass("u-derivation__accordion--close")) {
      // change btn "close" to "open"
      $(".p-home-about__derivationBtn--SP").removeClass("u-derivation__btn--close");
      $(".p-home-about__derivationBtn--SP").addClass("u-derivation__btn--open");
      // show the accordion
      $(".p-home-about__derivationAccordion").fadeIn();
      $(".p-home-about__derivationAccordion").removeClass("u-derivation__accordion--close");
    } else {
      // change btn "open" to "close"
      $(".p-home-about__derivationBtn--SP").removeClass("u-derivation__btn--open");
      $(".p-home-about__derivationBtn--SP").addClass("u-derivation__btn--close");
      // hide the accordion
      $(".p-home-about__derivationAccordion").fadeOut();
      $(".p-home-about__derivationAccordion").addClass("u-derivation__accordion--close");
    }
  });

  $("#derivation-close-btn--SP").click(function () {
    // change btn "open" to "close"
    $(".p-home-about__derivationBtn--SP").removeClass("u-derivation__btn--open");
    $(".p-home-about__derivationBtn--SP").addClass("u-derivation__btn--close");
    // hide the accordion
    $("#derivation__accordion--SP").fadeOut();
    $("#derivation__accordion--SP").addClass("u-derivation__accordion--close");
    //scroll to yurai-button
    var position = $("#derivation-back-point--SP").offset().top - 75;
    $("html, body").animate({ scrollTop: position }, 500);
  });
});
