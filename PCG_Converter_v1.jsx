// IchigoJam用PCG Converter
// (1) PhotoshopでRGBカラー8×8ピクセルのドキュメントを作成します
// (2) このスクリプトを実行するとデスクトップに0bit.txtファイルが生成され、
// そこにIchigoJamのBASICプログラムが生成されます。
// 2015/11/24 (c)KaZuhiro FuRuhata
// ver 1.0
(function(){
	var data = [];
	for(var y=0; y<8; y++){
		var bit = 0;
		for(var x=0; x<8; x++){
			bit = bit << 1;
			bit = bit | getPixel(x,y);
		}
		data[y] = bit;
	}
	activeDocument.selection.deselect();
	var fileObj = new File("~/Desktop/0bit.txt");
	var flag = fileObj.open("w");
	if (flag){
		fileObj.write("POKE #700,");
		for(var i=0; i<8; i++){
			fileObj.write("#"+(data[i].toString(16)));
			if (i<7){ fileObj.write(","); }
		}
		fileObj.close();
	}
	//---------------------------------------------
	// ピクセル値(白黒)を取得する(8bitモード専用)
	// 戻り値は黒なら0、それ以外は1
	//---------------------------------------------
	function getPixel(x,y){
		var R = G= B= 0,data,i;
		var docObj = activeDocument;
		docObj.selection.select([[x,y],[x+1,y],[x+1,y+1],[x,y+1],[x,y]]);
		data = docObj.channels[0].histogram;
		for (i=0; i<256; i++) if (data[i] > 0) { R = i; break; }
		data = docObj.channels[1].histogram;
		for (i=0; i<256; i++) if (data[i] > 0) { G = i; break; }
		data = docObj.channels[2].histogram;
		for (i=0; i<256; i++) if (data[i] > 0) { B = i; break; }
		if ((R==0) && (G==0) && (B==0)) { return 1; }
		return 0;
	}
})();

