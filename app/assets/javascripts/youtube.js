const KEY = gon.youtube_key;
let url = 'https://www.googleapis.com/youtube/v3/search?'; // APIURL
url += 'type=video'; //動画を検索する
url += '&part=snippet';//検索結果にすべてのプロパティを含む
url += '&videoEmbeddable=true';//WEBページに埋め込み可能な動画のみ検索
url += '&videoSyndicated=true';//youtube.com以外で再生できる動画飲みに限定
url += '&maxResults=9';//動画の最大取得件数
url += '&key=' + KEY;//APIKEY

$(function(){
  $('.header__box__top__search__box').on('change', function(){
    let input = $(".header__box__top__search__box").val();
    console.log(input)
    let search = '&q=' + input;
    $.ajax({
      url: url + search,
      dataType : 'jsonp'
    }).done(function(data){
      if(data.items){
        setData(data);
      } else{
        console.log(data);
        alert('該当するデーターが見つかりませんでした。')
      }
    }).fail(function(data){
      alert('通信に失敗しました。');
    });
  });
});

function setData(data){
  let result = '';
  let video = '';
  //動画を表示するHTMLを作る
  for (let i = 0; i < data.items.length; i++){
    video = '<div class="video-box">' + '<iframe class="video-start" src="https://www.youtube.com/embed/';
    video += data.items[i].id.videoId;
    video += '" data-lity="data-lity" allowfullscreen></iframe></div>';
    video += '<a href="https://www.youtube.com/embed/';
    video += data.items[i].id.videoId;
    video += '" data-lity="data-lity"class="video">ポップアップ</a>';
    console.log(video)
    result += '<div class="video-start">' + video + '</div>'
  }
  $('.pickup__article__box__content').html(result);
}