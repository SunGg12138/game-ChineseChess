var ChessPiece = function(x ,y, type, name, squares) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.name = name;
	this.squares = squares;  //上方还是下方
	this.placement();
};
//把棋子放置在页面中
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
			var hitedInfo = hitedDom.data('name').split('_'),
				hitedType = hitedInfo[0],
				squares = hitedInfo[1] === 'top'? '红方':'绿方',
				hitedText = chessType[hitedType].html[hitedInfo[1]],
				num = hitedInfo[2]? hitedInfo[2] : '',
				tagDiv = $('<div>');
			//判断是否胜利
			if (hitedType === 'jiang') {
				var winer = hitedInfo[1] === 'top'? '绿方':'红方';
				tagDiv.html('并且吃掉了'+ squares + hitedText +num +'<br/>');
				tagDiv[0].innerHTML+='还赢得了本局游戏！';
				isEnd = true;
				alert(winer + ' 胜利了！');
			} else {
				tagDiv.html('并且吃掉了'+ squares + hitedText +num +'号');
			};
			//添加历史记录
			historyBox.append(tagDiv);
			//删除棋子的构造函数、和页面的DOM结构
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
	//是否将
	isJiangJu(this.squares);
	//这个玩家走完了
	thisPlayerEnd();
};
