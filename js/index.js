var $body;
var $box;
var config = {
	preChessPiece: 40,
	preTd: 50,
	preWventLayer: 14
};
var chessButler;
var selectedChess = null;  //选中的棋子
//位置网
var pos = {};
//事件层
var eventLayers = function() {
	for (var i=0; i<9; i++) {
		for (var j=0; j<10; j++) {
			pos[i+'-'+j] = false;
			var eventLayer = $('<div class="event-layer">');
			eventLayer.css({
				width: config.preWventLayer,
				height: config.preWventLayer,
				left: config.preTd*i - config.preWventLayer/2,
				top: config.preTd*j - config.preWventLayer/2,
			});
			eventLayer.attr({
				'data-x': i,
				'data-y': j
			});
			eventLayer.addClass('class-'+i+'-'+j);
			$box.append(eventLayer);
		};
	};
};
function addEvent() {
	//添加事件层
	eventLayers();
	$box.on('click', '.event-layer', function(e){
		e.stopPropagation();
		if (selectedChess) {
			chessButler.targetLayer($(this).data('x'), $(this).data('y'));
		};
	});
	$box.on('click', '.chesspiece', function(e){
		if (selectedChess instanceof jQuery) {
			var classList = this.className;
			var squaresClass = /\s*(squares-\w+)/.exec(classList)[1];
			if (selectedChess.hasClass(squaresClass)) {
				selectedChess.removeClass('active');
			}else{
				var thisButler = chessButler.Chess[$(this).data('name')];
				chessButler.targetLayer(thisButler.x, thisButler.y, $(this));
				return;
			};
		};
		if ($(this).hasClass(nowPlayer)) {
			$(this).addClass('active');
			selectedChess = $(this);
		};
	});
}
var butler = function () {
	var Chess = {
		//上方所有棋子
		ju_top_1: new ChessPiece(0, 0, 'ju', 'ju_top_1','top'),
		ju_top_2: new ChessPiece(8, 0, 'ju', 'ju_top_2','top'),
		ma_top_1: new ChessPiece(1, 0, 'ma', 'ma_top_1','top'),
		ma_top_2: new ChessPiece(7, 0, 'ma', 'ma_top_2','top'),
		xiang_top_1: new ChessPiece(2, 0, 'xiang', 'xiang_top_1','top'),
		xiang_top_2: new ChessPiece(6, 0, 'xiang', 'xiang_top_2','top'),
		shi_top_1: new ChessPiece(3, 0, 'shi', 'shi_top_1','top'),
		shi_top_2: new ChessPiece(5, 0, 'shi', 'shi_top_2','top'),
		jiang_top: new ChessPiece(4, 0, 'jiang', 'jiang_top','top'),
		bing_top_1: new ChessPiece(0, 3, 'bing', 'bing_top_1','top'),
		bing_top_2: new ChessPiece(2, 3, 'bing', 'bing_top_2','top'),
		bing_top_3: new ChessPiece(4, 3, 'bing', 'bing_top_3','top'),
		bing_top_4: new ChessPiece(6, 3, 'bing', 'bing_top_4','top'),
		bing_top_5: new ChessPiece(8, 3, 'bing', 'bing_top_5','top'),
		pao_top_1: new ChessPiece(1, 2, 'pao', 'pao_top_1','top'),
		pao_top_2: new ChessPiece(7, 2, 'pao', 'pao_top_2','top'),
		//下方所有棋子
		ju_bottom_1: new ChessPiece(0, 9, 'ju', 'ju_bottom_1','bottom'),
		ju_bottom_2: new ChessPiece(8, 9, 'ju', 'ju_bottom_2','bottom'),
		ma_bottom_1: new ChessPiece(1, 9, 'ma', 'ma_bottom_1','bottom'),
		ma_bottom_2: new ChessPiece(7, 9, 'ma', 'ma_bottom_2','bottom'),
		xiang_bottom_1: new ChessPiece(2, 9, 'xiang', 'xiang_bottom_1','bottom'),
		xiang_bottom_2: new ChessPiece(6, 9, 'xiang', 'xiang_bottom_2','bottom'),
		shi_bottom_1: new ChessPiece(3, 9, 'shi', 'shi_bottom_1','bottom'),
		shi_bottom_2: new ChessPiece(5, 9, 'shi', 'shi_bottom_2','bottom'),
		jiang_bottom: new ChessPiece(4, 9, 'jiang', 'jiang_bottom','bottom'),
		bing_bottom_1: new ChessPiece(0, 6, 'bing', 'bing_bottom_1','bottom'),
		bing_bottom_2: new ChessPiece(2, 6, 'bing', 'bing_bottom_2','bottom'),
		bing_bottom_3: new ChessPiece(4, 6, 'bing', 'bing_bottom_3','bottom'),
		bing_bottom_4: new ChessPiece(6, 6, 'bing', 'bing_bottom_4','bottom'),
		bing_bottom_5: new ChessPiece(8, 6, 'bing', 'bing_bottom_5','bottom'),
		pao_bottom_1: new ChessPiece(1, 7, 'pao', 'pao_bottom_1','bottom'),
		pao_bottom_2: new ChessPiece(7, 7, 'pao', 'pao_bottom_2','bottom')
	};
	function targetLayer(targetX, targetY, hitedDOM) {
		if (pos[targetX+'-'+targetY]) {
			Chess[selectedChess.data('name')].hitTarget(targetX, targetY, hitedDOM);
		}else{
			Chess[selectedChess.data('name')].moveTarget(targetX, targetY);
		};
		selectedChess.removeClass('active');
		selectedChess = null;
	};
	return {
		targetLayer: targetLayer,
		Chess: Chess
	};
};
function init() {
	$body = $(document.body);
	$box = $('#main')
	addEvent();
	chessButler = butler();
	updateGameInfo();
};
window.onload = init;
