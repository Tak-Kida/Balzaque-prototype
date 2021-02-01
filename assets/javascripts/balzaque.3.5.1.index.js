'use strict';

var alldata=[];
var filterdata=[];

// ナビゲーションドロワー
$(function() {
  $('.drawer').drawer();
});

// 一覧表示の関数
function lineUp(itemId,itemCaption,imagePath,itemName,itemPrice) {
  $('.p-index-itemField__itemList').append(`
    <li data-id="${itemId}" class="p-index-itemList__item">
      <div class="p-index-item__itemWrapper">
        <div class="p-index-itemWrapper__itemModal">
          <div class="p-index-itemModal__modalTop">
            <h4>${itemName}</h4>
            <br>
            <p class="p-index-modalTop__modalText">${itemCaption}</p>
          </div>
          <div class="p-index-itemModal__modalBottom">
            <div class="p-index-modalBottom__btn--close">
              <h4 class="p-index-btn__btnText">詳細を閉じる</h4>
            </div>
          </div>
        </div>
        <div class="p-index-item__imageBox">
          <img
            src="${imagePath}"
            alt="bitter"
            class="p-index-imageBox__itemImg"
          />
        </div>
        <div class="p-index-item__detailBox">
          <h2 class="p-index-detailBox__itemName">${itemName}</h2>
          <h3 class="p-index-detailBox__itemPrice">&yen;${itemPrice}</h3>
          <div class="p-index-detailBox__amount">
            <div class="p-index-amount__amountNote">個数&#058;</div>
            <div class="p-index-amount__inputAmount">
              <input  class="p-index-amount__amountForm" type="number" name="num1" min="1" max="500" value="1" step="1" required>
            </div>
          </div>
          <div class="p-index-detailBox__btn--addToCart">
            <h4 class="p-index-btn__btn-text">カートに入れる</h4>
          </div>
        </div>
      </div>
    </li>
  `);
}

// 商品のファイルを受け取り、並べる関数
function arraySeparator(item, index) {
  var itemId = index+1
  var itemCaption = item.itemCaption
  var imagePath = item.imagePath
  var itemName = item.name
  var itemPrice = item.price
  lineUp(itemId,itemCaption,imagePath,itemName,itemPrice)
}

//商品件数の表示の関数
function listAmount(amount) {
  $('.p-index-searchZone__itemAmount').text(amount+"件表示中");
}

// SP版しぼりこみモーダルをとじる
function categoryClose(){
  var target =  $('.p-index-itemArea__categoryModal');
  if (target.hasClass("u-caption--shown")) {
    $(target).removeClass("u-caption--shown");
    $(target).fadeOut();
  } else {
    target.fadeIn(400).addClass("u-caption--shown");
  }
}

// 画面遷移時(主部)
$(function () {
  //json読み込み
  $.ajax({url: './assets/items.json', dataType: 'json'})
    .done(function(data) {
      alldata=data;
      filterdata=alldata;
      filterdata.forEach(function(item,index){
        arraySeparator(item, index);
      })
      listAmount(filterdata.length); 
    })
    .fail(function(data) {
      window.alert('読み込みエラー');
    })

  // 商品カテゴリクリック時
  $(".l-wrap").on('click','.p-index-searchArea__categoryBtn',function () {
    categoryClose();
  });

  // SP版しぼりこみモーダルを閉じる
  $(".l-wrap").on('click','.p-index-category__categoryLink--all',function () {
    $(".p-index-itemArea__categoryModal").removeClass("u-caption--shown");
    $(".p-index-itemArea__categoryModal").fadeOut();
  });

  // ヘッダーメニュータップ時にSP版しぼりこみモーダルを閉じる
  $('.l-wrap').on('click','.drawer-toggle',function () {
    $(".p-index-itemArea__categoryModal").removeClass("u-caption--shown");
    $(".p-index-itemArea__categoryModal").fadeOut(100);
  });

  //商品詳細モーダル
  $(".l-wrap").on('click','.p-index-imageBox__itemImg',function () {
    var caption = $(this).parents(`li`).find(".p-index-itemWrapper__itemModal");
    if (caption.hasClass("u-caption--shown")) {
      // do nothing
    } else {
      caption.fadeIn(400).addClass("u-caption--shown");
    }
  });

  // 商品詳細モーダルを閉じる
  $(".l-wrap").on('click','.p-index-itemModal__modalBottom',function () {
    $(".p-index-itemWrapper__itemModal").removeClass("u-caption--shown");
    $(this).parent().fadeOut();
  });

  // カート追加モーダルを開く
  $(".l-wrap").on('click','.p-index-detailBox__btn--addToCart',function () {
    // $(".l-modalWrap").removeClass("u-caption--shown");
    $(".l-modalWrap").fadeIn(0);
  });

  // カート追加モーダルを閉じる
  $('.l-modalWrap').on('click','.p-index-modalHeader__icon--crossMark',function () {
    $(".l-modalWrap").fadeOut();
  });
  $('.l-modalWrap').on('click','.p-index-modalFooter__closeBar',function () {
    $(".l-modalWrap").fadeOut();
  });

  //すべてを表示
  $('.l-wrap').on('click','.p-index-categoryLink__lineUpText',function () {
    $('.p-index-itemList__item').remove();
    filterdata=alldata;
    filterdata.forEach(function(item,index){
      arraySeparator(item, index);
    })
    listAmount(filterdata.length);
    $(".p-index-itemArea__categoryModal").removeClass("u-caption--shown");
    $(".p-index-itemArea__categoryModal").fadeOut();
  })

  // しぼりこみ表示
  $('.l-wrap').on('click','.p-index-categoryList__categoryLink',function () {
    $('.p-index-itemList__item').remove();
    var cate = $(this).data('class');
    var type = $(this).data('type');
    filterdata=[];
    switch(cate) {
      case "taste":
        filterdata=$.grep(alldata, 
          function(elem, index){
            return elem.category.taste === type
          }
        );
      break;
      case "strength":
        filterdata=$.grep(alldata, 
          function(elem, index){
            return elem.category.strength === type
          }
        )
      break;
      case "milk":
        filterdata=$.grep(alldata, 
          function(elem, index){
            return elem.category.milk === type
          }
        )
      break;
      case "caffein":
        filterdata=$.grep(alldata, 
          function(elem, index){
            return elem.category.caffeine === type
          }
        )
      break;
    }
    filterdata.forEach(function(item,index){
      arraySeparator(item, index);
    })
    listAmount(filterdata.length);
    // ウィンドウサイズで判定
    var winW = $(window).width();
    var devW = 768;
    if (winW <= devW) {
      //768px以下の処理
      categoryClose();
    } else {
      // do nothing
    }
  });

  // SP版商品検索
  $('.l-wrap').on('click','#search-btn--SP',function () {
    var input_itemName = document.getElementById("input_itemName--SP").value;
    var emptyText = $('#emptyText');
    $('.p-index-itemList__item').remove();
    filterdata=[];
    filterdata=$.grep(alldata, 
      function(elem, index){
        return elem.name.indexOf(input_itemName) > -1
      }
    );
    if (filterdata.length === 0) {
      emptyText.addClass("u-caption--shown");
      emptyText.fadeIn(400);
    }else{
      if(emptyText.hasClass("u-caption--shown")){
        $(emptyText).removeClass("u-caption--shown");
        $(emptyText).fadeOut(100);
      }
      filterdata.forEach(function(item,index){
        arraySeparator(item, index);
      })
    }
    listAmount(filterdata.length);
  });

  // PC版商品検索
  $('.l-wrap').on('click','#search-btn--PC',function () {
    var input_itemName = document.getElementById("input_itemName--PC").value;
    var emptyText = $('#emptyText');
    $('.p-index-itemList__item').remove();
    filterdata=[];
    filterdata=$.grep(alldata, 
      function(elem, index){
        return elem.name.indexOf(input_itemName) > -1
      }
    );
    if (filterdata.length === 0) {
      emptyText.addClass("u-caption--shown");
      emptyText.fadeIn(400);
    }else{
      if(emptyText.hasClass("u-caption--shown")){
        $(emptyText).removeClass("u-caption--shown");
        $(emptyText).fadeOut(100);
      }
      filterdata.forEach(function(item,index){
        arraySeparator(item, index);
      })
    }
    listAmount(filterdata.length);
  });

  // jsファイルを読み込めているか確認
  console.log("ready to go!!");
});