var nowPlayer = 'squares-top';   //现在是上方走
function thisPlayerEnd() {
	if (nowPlayer === 'squares-top') {
		nowPlayer = 'squares-bottom';
	}else {
		nowPlayer = 'squares-top';
	};
	updateGameInfo();
}
//到谁走棋
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
	var li = $('<li>'),
		chessPieceInfo = chessPieceName.split('_'),
		squares = chessPieceInfo[1] === 'top'? '红方':'绿方',
		type = chessType[chessPieceInfo[0]].html[chessPieceInfo[1]],
		num = chessPieceInfo[2]? chessPieceInfo[2]+'号' : '';
	li.html(squares+type+num+'：（'+x1+', '+y1+'）=>（'+x2+', '+y2+'）');
	historyBox.append(li);
}
function isJiangJu (squares) {
	var notSquares = squares==='top'? 'bottom':'top',   //敌方阵营
		SquaresJiang = chessButler.Chess['jiang_'+squares],   //我方首领
		notSquaresJiang = chessButler.Chess['jiang_'+notSquares],   //敌方首领
		isMeJiangJu = false,
		isHeJiangJu = false;
	//是否将军
	for (var i=0; i<9; i++) {
		for (var j=0; j<10; j++) {
			if (pos[i+'-'+j] && 
				pos[i+'-'+j].hasClass('squares-'+squares) && 
				isHitAble(chessType[pos[i+'-'+j].data('type')].hitType, i, j, notSquaresJiang.x, notSquaresJiang.y, squares)) {
				isMeJiangJu = true;
			};
		};
	};
	//是否敌方将我
	for (var i=0; i<9; i++) {
		for (var j=0; j<10; j++) {
			if (pos[i+'-'+j] && 
				pos[i+'-'+j].hasClass('squares-'+notSquares) && 
				isHitAble(chessType[pos[i+'-'+j].data('type')].hitType, i, j, SquaresJiang.x, SquaresJiang.y, notSquares)) {
				$('.jiangju-'+squares).slideDown();
				isHeJiangJu = true;
			};
		};
	};
	if (isMeJiangJu) {
		$('.jiangju-'+notSquares).slideDown();
	} else {
		$('.jiangju-'+notSquares).hide();
	};
	if (isHeJiangJu) {
		$('.jiangju-'+squares).slideDown();
	} else {
		$('.jiangju-'+squares).hide();
	}
}