$(document).ready(function(){
   $("#movieListContainer").html(generatePage(movies,0,0)); //Initialize with all movies shown, in the grid view, sorted by year
   $("#listView").on("click",listview);
   $("#gridView").on("click",gridview);
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

function search(input){
    
}

function generatePage(data,sorting,viewMode){
    //sort the data, then iterate through it generating a chunk of html
    //for each movie
    if(sorting==0){//by year
        data["movies"].sort(function(a,b){return a.year - b.year;});
    }
    else{//by rating
        data.sort(function(a,b){return a.rating - b.rating});
    }
    var htmlString = "";
    $.map(data["movies"],function(movie,index){
        
        htmlString += template(movie.title,movie.year,movie.starring,movie.description,movie.HD,movie.photo,movie.rating,viewMode);
    });
    
    $("#movieListContainer").html(htmlString);
}

function template(title,year,starring,description,HD,photo,rating,viewMode){
    var HDimgPath = "";
    var ratingCode = "";
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

    return "<div class=\"movieItem\">"+
            "<div>"+
                "<img class=\"movieFrame\" src=\""+photo+"\">"+HDimgPath+
            "</div>"+
            "<div class=\"info\">"+
                "<p class=\"title\">"+title+"<span class=\"year\">("+year+"</span></p>"+
                "<p><b>Starring: </b>"+ starring +"</p>"+
                "<p><b>Rating</b>"+ratingCode+"</p>"+
                "<p class=\"desc\">"+description+"</p>"+
            "</div>"+
        "</div>"

}
