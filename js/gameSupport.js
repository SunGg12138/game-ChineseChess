var nowPlayer = 'squares-top';   //现在是上方走
function thisPlayerEnd() {
	if (nowPlayer === 'squares-top') {
		nowPlayer = 'squares-bottom';
	}else {
		nowPlayer = 'squares-top';
	};
	updateGameInfo();
}
function updateGameInfo() {
	var playerTitle;
	if (nowPlayer === 'squares-top') {
		playerTitle = '<span style="color:#c40;">红方 走棋<span>';
	}else {
		playerTitle = '<span style="color:rgb(54, 141, 24);">绿方 走棋<span>';
	};
	$('.game-info').find('h2').html(playerTitle);
}
function addHistory(chessPieceName, x1, y1, x2, y2, tagType) {
	var li = $('<li>');
	var historyBox = $('.game-history');
	var chessPieceInfo = chessPieceName.split('_');
	var squares = chessPieceInfo[1] === 'top'? '红方':'绿方';
	var type = chessType[chessPieceInfo[0]].html[chessPieceInfo[1]];
	var num = chessPieceInfo[2];
	li.html(squares+type+num+'号：（'+x1+', '+y1+'）=>（'+x2+', '+y2+'）');
	historyBox.append(li);
}