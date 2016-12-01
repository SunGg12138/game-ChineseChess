var chessType = {
	'ju': {
		html: {
			top: '車',
			bottom: '车'
		},
		hitType: 'line',
		moveType: 'line'
	},
	'bing': {
		html: {
			top: '兵',
			bottom: '卒'
		},
		hitType: 'one',
		moveType: 'one'
	},
	'pao': {
		html: {
			top: '砲',
			bottom: '炮'
		},
		hitType: 'pao',
		moveType: 'line'
	},
	'ma': {
		html: {
			top: '馬',
			bottom: '马'
		},
		hitType: 'ma',
		moveType: 'ma'
	},
	'xiang': {
		html: {
			top: '相',
			bottom: '象'
		},
		hitType: 'xiang',
		moveType: 'xiang'
	},
	'shi': {
		html: {
			top: '仕',
			bottom: '士'
		},
		hitType: 'shi',
		moveType: 'shi'
	},
	'jiang': {
		html: {
			top: '帅',
			bottom: '将'
		},
		hitType: 'jiang',
		moveType: 'jiang'
	}
};
function isMoveAble(type, x1, y1, x2, y2, squares) {
	var minX = x1 < x2? x1:x2,
		maxX = x1 < x2? x2:x1,
		minY = y1 < y2? y1:y2,
		maxY = y1 < y2? y2:y1,
		obj = {
		line: function() {
			if (minX===maxX && minY===maxY) {
				return false;
			};
			if (minX!==maxX && minY!==maxY) {
				return false;
			};
			if (minY===maxY) {
				for (var i=minX+1;i<maxX;i++) {
					if (pos[i+'-'+maxY]) {
						return false;
					};
				};
				return true;
			}else{
				for (var i=minY+1;i<maxY;i++) {
					if (pos[maxX+'-'+i]) {
						return false;
					};
				};
				return true;
			};
		},
		one: function() {
			if (squares === 'top') {
				if (y2 < y1) {
					return false;
				};
				if (y1 < 5 && minX!==maxX) {
					return false;
				};
			}else {
				if (y2 > y1) {
					return false;
				};
				if (y1 > 4 && minX!==maxX) {
					return false;
				};
			};
			if  (maxX-minX > 1 || maxY-minY > 1) {
				return false;
			};
			if (minX===maxX && minY===maxY) {
				return false;
			};
			if (minX!==maxX && minY!==maxY) {
				return false;
			};
			return true;
		},
		ma: function() {
			if (maxX-minX === 1 && maxY-minY === 2) {
				if (y2 === maxY && !pos[x1+'-'+(y1+1)]) {
					return true;
				};
				if (y1 === maxY && !pos[x1+'-'+(y1-1)]) {
					return true;
				};
			};
			if (maxX-minX === 2 && maxY-minY === 1) {
				if (x2 === maxX && !pos[(x1+1)+'-'+y1]) {
					return true;
				};
				if (x1 === maxX && !pos[(x1-1)+'-'+y1]) {
					return true;
				};
			};
			return false;
		},
		xiang: function() {
			if (squares === 'top') {
				if (y2 > 4) {
					return false;
				};
			}else{
				if (y2 < 5) {
					return false;
				};
			};
			if ((maxX-minX === 2 && maxY-minY === 2) || (maxX-minX === 2 && maxY-minY === 2)) {
				return true;
			};
			return false;
		},
		shi: function() {
			if (squares === 'top') {
				if (x2 > 5 || x2 < 3 || y2 > 2) {
					return false;
				};
			}else{
				if (x2 > 5 || x2 < 3 || y2 < 7) {
					return false;
				};
			};
			if ((maxX-minX === 1 && maxY-minY === 1) || (maxX-minX === 1 && maxY-minY === 1)) {
				return true;
			};
			return false;
		},
		jiang: function(){
			if (squares === 'top') {
				if (x2 > 5 || x2 < 3 || y2 > 2) {
					return false;
				};
			}else{
				if (x2 > 5 || x2 < 3 || y2 < 7) {
					return false;
				};
			};			
			if  (maxX-minX > 1 || maxY-minY > 1) {
				return false;
			};
			if (minX===maxX && minY===maxY) {
				return false;
			};
			if (minX!==maxX && minY!==maxY) {
				return false;
			};
			return true;
		}
	};
	return obj[type]();
}
function isHitAble(type, x1, y1, x2, y2, squares) {
	var obj = {
		line: function() {
			return isMoveAble(type, x1, y1, x2, y2, squares);
		},
		one: function() {
			return isMoveAble(type, x1, y1, x2, y2, squares);
		},
		pao: function() {
			var minX = x1 < x2? x1:x2,
				maxX = x1 < x2? x2:x1,
				minY = y1 < y2? y1:y2,
				maxY = y1 < y2? y2:y1;
			if  (maxX-minX === 1 || maxY-minY === 1) {
				return false;
			};
			if (minX===maxX && minY===maxY) {
				return false;
			};
			if (minX!==maxX && minY!==maxY) {
				return false;
			};
			var count = 0;
			if (minY===maxY) {
				for (var i=minX+1;i<maxX;i++) {
					if (pos[i+'-'+maxY]) {
						count++;
					};
				};
			}else{
				for (var i=minY+1;i<maxY;i++) {
					if (pos[maxX+'-'+i]) {
						count++;
					};
				};
			};
			if (count !== 1) {
				return false;
			};
			return true;
		},
		ma: function() {
			return isMoveAble(type, x1, y1, x2, y2, squares);
		},
		xiang: function() {
			return isMoveAble(type, x1, y1, x2, y2, squares);
		},
		shi: function() {
			return isMoveAble(type, x1, y1, x2, y2, squares);
		},
		jiang: function() {
			return isMoveAble(type, x1, y1, x2, y2, squares);
		}
	};
	return obj[type]();
}
