var ChessPiece = function(x ,y, type, name, squares) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.name = name;
	this.squares = squares;  //上方还是下方
	this.placement();
};
ChessPiece.prototype.placement = function() {
	this.DOM = $('<i class="chesspiece squares-'+this.squares+'">');
	this.DOM.html(chessType[this.type].html[this.squares]);
	this.DOM.css({
		left: this.x*config.preTd - config.preChessPiece/2,
		top: this.y*config.preTd - config.preChessPiece/2
	});
	this.DOM.attr({
		'data-name': this.name,
		'data-type': this.type
	});
	pos[this.x+'-'+this.y] = this.DOM;   //通知pos
	$box.append(this.DOM);
};
ChessPiece.prototype.moveTarget = function(x, y) {
	if (isMoveAble(chessType[this.type].moveType, this.x, this.y, x, y, this.squares)) {
		this.targetAfter(x, y);
	}else{
		console.log('错误的位置！');
	};
};
ChessPiece.prototype.hitTarget = function(x, y, hitedDom) {
	if (isHitAble(chessType[this.type].hitType, this.x, this.y, x, y, this.squares)) {
		this.targetAfter(x, y, function(){
			if (hitedDom.data('name').split('_')[0] === 'jiang') {
				var winInfo = hitedDom.data('name').split('_')[1] === 'top'? '绿方':'红方';
				alert(winInfo + ' 胜利了！');
				return;
			};
			var chessPieceInfo = hitedDom.data('name').split('_');
			var squares = chessPieceInfo[1] === 'top'? '红方':'绿方';
			var type = chessType[chessPieceInfo[0]].html[chessPieceInfo[1]];
			var num = chessPieceInfo[2];

			var tagDiv = $('<div>');
			var historyBox = $('.game-history');
			tagDiv.html('并且吃掉了'+ squares + type +num +'号');
			historyBox.append(tagDiv);

			delete chessButler.Chess[hitedDom.data('name')]
			console.log('吃掉了'+ hitedDom.data('name'));
			hitedDom.remove();  //去掉被攻击的棋子
		});
	}else{
		console.log('错误的位置！');
	};
};
ChessPiece.prototype.targetAfter = function(x, y, callback) {
	addHistory(this.DOM.data('name'), this.x, this.y, x, y);
	pos[this.x+'-'+this.y] = false;
	pos[x+'-'+y] = this.DOM;
	this.x = x;
	this.y = y;
	this.DOM.css({
		zIndex: 10000
	});
	this.DOM.animate({
		left: this.x*config.preTd - config.preChessPiece/2,
		top: this.y*config.preTd - config.preChessPiece/2
	}, 600, function(){
		if (callback) callback();
		this.DOM.css({
			zIndex: 1
		});
	}.bind(this));
	isJiangJu(this.squares);
	//这个玩家走完了
	thisPlayerEnd();
};
