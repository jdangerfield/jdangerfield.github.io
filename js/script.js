var drawPointer = function(post) {
	//find elements
	var article = $("#" + post.id).offset();
	var aside = $( "#author" ).offset();

	//get aside coods
	var articleRightX = article.left + this.outerWidth();
	var articleRightTopY = article.top;
	var articleRightBottomY = article.top + this.outerHeight();

	//get aside coods
	var asideLeftX = aside.left;
	var asideLeftTopY = aside.top;
	var asideLeftBottomY = aside.top + author.outerHeight();

	//draw shape
	var c = $("#canvas");
	var ctx = c.getContext("2d");
	ctx.beginPath();
		ctx.moveTo( articleRightX, articleRightTopY );
		ctx.lineTo( articleRightX, articleRightBottomY );
		ctx.lineTo( asideLeftX, asideLeftBottomY );
		ctx.lineTo( asideLeftX, asideLeftTopY);
	ctx.closePath();
	ctx.fillStyle = "#FF0000";
	ctx.fill();
};

//initialize count
var count = 0;

var trackArticle = function () {
	//sample
	//#posts container serves as relitive marker
	//<div id="posts">
	//		<article id="0"></article>
	//		<article id="1"></article>
	//		<article id="2"></article>
	//</div>

	//trace article.top relative to #posts container
	var containerHeight = $("#posts").height();
	var currentArticle = "article #" + count;
	var markerT = $(currentArticle).position().top;
	var markerB = markerT + currentArticle.outerHeight();

	// If article.bottom is above #posts container.top, go to next counter
	if ( markerB < 0 ) {
		count++;
	};
	// If article.top is below #posts container.bottom, go to previous counter
	if ( markerT > containerHeight ) {
		count--;
	};
	//find current article element
	var current = $("article:nthChild(" + count + ")");
	//get id attribute
	var postId = current.attr(id); //ex. "article1"	

	return postId;
};

$(window).on('scroll', '#posts', function(event) {
	event.preventDefault();
	drawPointer( { id: trackArticle() } );
});

$(window).on('resize', function(event) {
	event.preventDefault();
	drawPointer( { id: trackArticle() } );
});