$(function(){
	//タイトル行数の初期値
	var TITLE_ROWS = parseInt($("#title").attr("rows"));
	//ドラフト行数の初期値
	var DRAFT_ROWS = parseInt($("#draft").attr("rows"));
	var storage = localStorage;
	//storage.clear();
	if(storage.getItem("save_title") == null){//タイトルのデータが保存されていない場合
		$("#history_title").text("no title");
		console.log("ok");
	}else{
		var loaded = storage.getItem("save_title");
		$("#history_title").text(loaded);
	}

	if(storage.getItem("save_draft") == null){//ドラフトのデータが保存されていない場合
		$("#history_title").text("no text");
	}else{
		var loaded = storage.getItem("save_draft");
		$("#history_draft").text(loaded);
	}
	
	$("#draft").bind("change keyup",function(){
		//草案の文字数を計算
		var cnt = $(this).val().replace(/\n/g,"").length;
		$("#num").text(cnt);

		//ドラフトの変更を保存
		var key = "save_draft";
		var value = $(this).val();
		storage.setItem(key,value);
	});
	
	//タイトルの変更を保存
	$("#title").bind("change keyup",function(){
		var title_key = "save_title";
		var title_value = $(this).val()
		storage.setItem(title_key,title_value);
	});
	
	$("#load").click(function(){
		var loaded = storage.getItem("save_draft");
		$("#draft").val(loaded);

		loaded = storage.getItem("save_title");
		$("#title").val(loaded);
	});

	
	//テキストエリアの縦を可変にする	
	$("textarea").bind("keyup",function(){
		var id = $(this).attr("id");
		var cur = this;
		//改行文字数
		var len = 0;

		if($(this).val().match(/\n/g)){
			//改行の個数+1行目
			len = $(this).val().match(/\n/g).length + 1;
		}
		
		//テキストエリアの文字数を計算
		var value = $(this).val().replace(/\n/g,"");
		//編集中のテキストエリアの行数を計算
		var row = Math.max(Math.floor(value.length / cur.cols),1);

		//行数の初期値を設定
		if(id == "title")var init_row = TITLE_ROWS;
		else if(id == "draft")var init_row = DRAFT_ROWS;

		if(row + len > init_row) $(this).attr("rows",row + len);
		else $(this).attr("rows",init_row);
	});
});
