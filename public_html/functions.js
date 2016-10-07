$(document).ready(function(){
   $("#movieListContainer").html(generatePage(0,0));
});

function search(input){
    
}

function generatePage(sorting,viewMode){
    //sort the data, then iterate through it generating a chunk of html
    //for each movie
    if(sorting==0){//by year
        movies.sort(function(a,b){return a.year - b.year;});

    }
    else{//by rating
        movies.sort(function(a,b){return a.rating - b.rating});
    }
    $.map(movies,function(index,movie){
        template(movie.title,movie.year,movie.starring,movie.description,movie.HD,movie.photo,movie.rating,sorting,viewMode);
    });
}

function template(title,year,starring,description,HD,photo,rating,sorting,viewMode){
    var HDimgPath;
    var ratingCode;
    if(HD){
        HDimgPath = "<img src=\"img/HD.png\" class=\"hd\">";
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
    
    $("#movieListContainer").append(
        "<div class=\"movieItem\">"+
            "<div class=\"movieFrame\">"+
                "<img src=\""+photo+"\">"+HDimgPath+
            "</div>"+
            "<div class=\"info\">"+
                "<p class=\"title\">"+title+"<span class=\"year\">("+year+"</span></p>"+
                "<p><b>Starring: </b>"+ starring +"</p>"+
                "<p><b>Rating</b>"+ratingCode+"</p>"+
                "<p>"+description+"</p>"+
            "</div>"+
        "</div>"
    );
}
