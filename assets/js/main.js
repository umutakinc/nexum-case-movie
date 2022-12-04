const $container = $('.container');
const $resultList = $('#result-list');
const $search = $('#search');
const $searchInput = $('#search-input');
const $searchIconGlass = $('#search-icon .glass');
const $searchIconArrow = $('#search-icon .arrow');
const $resultFooter = $('#result-footer');


$(document).ready(function() {

    function highlight(word, query) {
        let check = new RegExp(query, "ig")
        return word.toString().replace(check, function(matchedText) {
            return "<u style='background-color: #F4C095'>" + matchedText + "</u>"
        })
    }

    $resultList.hide();
    $searchIconArrow.hide();
    $resultFooter.hide();

    $searchInput.keyup(function() {
        let search = $(this).val()
        let results = ""
        if (search == "") {
            $resultList.hide();
            $searchIconArrow.hide();
            $searchIconGlass.show();
        } else {
            $searchIconArrow.show();
            $searchIconGlass.hide();
        }

        $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", s: search }, function(data) {
            if (data.Search !== undefined) {
                $.each(data.Search, function(index, value) {
                    if (index < 2) {
                        $.getJSON("https://www.omdbapi.com/?", { apikey: "fd161998", i: value.imdbID }, function(movieData) {
                            if (movieData) {
                                results += '<div class="card">'
                                results += '<div class="image-box"><img src=' + movieData.Poster + ' style="width: 170px; height: 250px;"/></div>'
                                results += '<div class="text-box">'
                                results += '<div class="top"><h3 class="title">'+ highlight(movieData.Title, $searchInput.val()) +'</h3><div class="rating"><span class="active"><i class="fa-solid fa-star"></i>'+ movieData.imdbRating +'</span><span>/10</span></div></div>'
                                results += '<div class="bottom">'
                                results += '<div class="info"><p><b>Dil:</b>' + movieData.Language + '</p><p><b>Oyuncular:</b>' + movieData.Actors.split(",").slice(0, 3) +'</p><a href="#">Tüm listeyi gör >></a></div>'
                                results += '<div>Language: '+ movieData.Language + '</div>'
                                results += '<div class="description">' + movieData.Plot.slice(0, 100) + '<a href="#">Detaylar</a></div>'
                                results += '</div>'
                                results += '</div>'
                                results += "</div>"
                                $resultList.html(results)
                            }
                        })
                    }
                });
                $resultList.show();
                $resultFooter.show();
                $container.css('display', 'block');
                $container.css('margin-top', '2rem');
                $search.css('width', '100%');
            }
        });
    });
});