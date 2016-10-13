$(document).ready(function(){
   $("#search").focus(function(){
       $("#liveResults").addClass("showLiveResults");
       $("#liveResults").removeClass("hideLiveResults");
   });
   
   $("#search").blur(function(){
       $("#liveResults").removeClass("showLiveResults");
       $("#liveResults").addClass("hideLiveResults");
       
   });
   
   $("#search").on('keyup',function(){liveSearch();});
   
   $("#searchbutton").on("click",searchResults);
   
   $("#listView").on("click",listview);
   
   $("#gridView").on("click",gridview);
   
   $("#sort").change(function(){generatePage(movies,$(this).val())});
   
   $("#movieListContainer").html(generatePage(movies,0)); //Initialize with all movies shown, in the grid view, sorted by year
});

function listview(){
    $("#listView").addClass("active");
    $("#gridView").removeClass("active");
    $("#viewModeSheet").attr("href","listView.css");
}

function gridview(){
    $("#gridView").addClass("active");
    $("#listView").removeClass("active");
    $("#viewModeSheet").attr("href","gridView.css");
    
}



function search(){
    var term = $("#search").val();
    var results = [];
    
    if(term==="")
        return;
    
    $.map(movies["movies"],function(movie,index){
        if(match(term, movie))
            results.push(movie);
    });
    
    return results;
}

function match(term, movie){
    if(movie.title.search(term.trim()) != -1)
        return true;
    else if(movie.year.toString().search(term.trim()) != -1)
        return true;
    else if(movie.starring.search(term.trim()) != -1)
        return true;
    else
        return false;
}

function liveSearch(){

    var html = "";
    var results = search();
    $.each(results, function(index, value){
        html += "<div class=\"result\"><b>" + value.title + "</b> (" + value.year + ") " + value.starring + "</div>";
    });
    $("#liveResults").html(html);
}

function searchResults(){
    var results = search();
    var html = "";
    $.each(results, function(index, value){
        html += template(value.title,value.year,value.starring,value.description,value.HD,value.photo,value.rating);
    });
    $("#movieListContainer").html(html);
}

function sort(data,sorting){
    if(sorting==0){//by year
        return data["movies"].sort(function(a,b){return b.year - a.year;});
    }
    else{//by rating
        return data["movies"].sort(function(a,b){return b.rating - a.rating;});
    }
}

function generatePage(data,sorting){
    //sort the data, then iterate through it generating a chunk of html
    //for each movie
    var movies = sort(data, sorting);
    
    var htmlString = "";
    $.map(movies,function(movie,index){
        htmlString += template(movie.title,movie.year,movie.starring,movie.description,movie.HD,movie.photo,movie.rating);
    });

    $("#movieListContainer").html(htmlString);
}

function template(title,year,starring,description,HD,photo,rating){
    var HDimgPath = "";
    var ratingCode = "";
    if(HD){
        HDimgPath = "<div class=\"hd\"><img src=\"img/HD.png\"></div>";
    }
    else{
        HDimgPath = "";
    }
    for(i=0;i<rating;i++){
        ratingCode+="<img class=\"star\" src=\"img/gold_star.png\">";
    }
    for(i=0;i<(5-rating);i++){
        ratingCode+="<img class=\"star\" src=\"img/regular_star.png\">";
    }

    return "<div class=\"movieItem\">"+
           "<div class=\"movieFrame\"><img src=\""+photo+"\"></div>"+    
            HDimgPath+
            "<div class=\"info\"><div class=\"title\">"+title+"<span class=\"year\"> ("+year+")</span></div>"+
            "<div class=\"starring\"><b>Starring:<br> </b>"+ starring +"</div>"+
            "<div class=\"rating\"><b>Rating:</b>"+ratingCode+"</div>"+
            "<div class=\"desc\">"+description+"</div>"+
            "</div></div>";

}
