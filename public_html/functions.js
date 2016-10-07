$(document).ready(function(){
   $("#listView").on("click",listview);
   $("#gridView").on("click",gridview);
   $("#sort").on("change",generatePage(movies,this.value));
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

function search(input){
    
}

function generatePage(data,sorting){
    //sort the data, then iterate through it generating a chunk of html
    //for each movie
    console.log(sorting);
    if(sorting===0){//by year
        data["movies"].sort(function(a,b){return b.year - a.year;});
    }
    else{//by rating
        data["movies"].sort(function(a,b){return b.rating - a.rating;});
    }
    var htmlString = "";
    $.map(data["movies"],function(movie,index){
        
        htmlString += template(movie.title,movie.year,movie.starring,movie.description,movie.HD,movie.photo,movie.rating);
    });
    
    $("#movieListContainer").html(htmlString);
}

function template(title,year,starring,description,HD,photo,rating){
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
            "<div class=\"movieIMGS\">"+
                "<img class=\"movieFrame\" src=\""+photo+"\">"+
                HDimgPath+
            "</div>"+
            "<div class=\"info\">"+
                "<p class=\"title\">"+title+"<span class=\"year\">("+year+")</span></p>"+
                "<p><b>Starring: </b>"+ starring +"</p>"+
                "<p class=\"rating\"><b>Rating</b>"+ratingCode+"</p>"+
                "<p class=\"desc\">"+description+"</p>"+
            "</div>"+
        "</div>"

}
