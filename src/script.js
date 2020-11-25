jQuery(function($){
    
    //共用フィールドとメソッド（現時点では未使用）
    const tab_sp = "<bkmk:tab>";
	const br_sp = "<bkmk:br>";
    const data_tab_sp = "<bkmk:data:tab>";
    const data_br_sp = "<bkmk:data:br>";
    
    let text_clean = function(str) {
	    str=str.replace(/^ +/m,"");
	    str=str.replace(/\t+/m,"");
	    str=str.replace(/(\r\n|\r|\n)/g,""); 
	    return str;
	};

	let br_encode = function(str) {
		return str.replace(/(\r|\n|\r\n)/mg, br_sp);
	};

	let br_decode = function(str) {
		return str.replace(new RegExp(br_sp, "mg"), "\r\n");
	};
    
    //判定セレクトボックス生成
    var create_bkm_sv = function(e) {
        e.append(`<option value="0"></option>`);
        e.append(`<option value="1">はい</option>`);
        e.append(`<option value="9">はい(注記)</option>`);
        e.append(`<option value="2">いいえ</option>`);
        e.append(`<option value="3">なし</option>`);
    };
    create_bkm_sv($("#bkm_sv_1"));
    
    //追記箇所セレクトボックスを生成
    var create_bkm_comment_add_point = function(e) {
        e.append(`<option value="front">前</option>`);
        e.append(`<option value="back">後</option>`);
    };
    create_bkm_comment_add_point($("#bkm_comment_add_point_1"));
    
    //行を追加をクリック
    $("#bkm_formgroup_add_btn").on("click", function(){
        //下処理
        var nx = $("#bookmarklet-ui li").length + 1;
        $("#bookmarklet-ui li").clone().appendTo("ul");
        var current_li = "#bookmarklet-ui li:nth-child(" + nx + ")";
        //以下、クローンした行の重複id値を直していく（現時点では未完成）
        $(current_li).find("#bkm_nm_1").attr({id: "bkm_nm_" + nx, value: nx.toString()});

    });
    
    //行を削除クリック
    $("#bkm_formgroup_del_btn").on("click", function(){
        if($("#bookmarklet-ui li").length < 2) return;
        $("#bookmarklet-ui li:last-child").remove();
    });
    
    //LibraPlusUtilクラスを返却
    var get_code_base = function() {
        var code = "";
        code += `class bkmLibraPlusUtil {`;
        code += `constructor() {`;
        code += `this.url = window.location.href;`;
        code += `this.diag_tbl = document.querySelector('#cmtTable');`;
        code += `this.result = document.querySelectorAll('select[id^="result_"]');`;
        code += `this.comment = document.querySelector('textarea[id^="comment"]');`;
        code += `this.description = document.querySelector('textarea[id^="src_"]');`;
        code += `this.srccode = document.querySelector('textarea[id^="updsrc_"]');`;
        code += `this.save_survey_btn = document.querySelector('button[name="update"]');`;
        code += `this.hash = {`;
        code += `"0": "未判定",`;
        code += `"1": "はい",`;
        code += `"9": "はい(注記)",`;
        code += `"2": "いいえ",`;
        code += `"3": "なし"`;
        code += `};`;
        code += `this.tab_sp = "<bkmk:tab>";`;
        code += `this.br_sp = "<bkmk:br>";`;
        code += `this.data_tab_sp = "<bkmk:data:tab>";`;
        code += `this.data_br_sp = "<bkmk:data:br>";`;
        code += `this.status_page_url = "/libraplus/status/list/";`;
        code += `this.url_select = document.querySelector('#select_urlno');`;
        code += `this.owner_window = window.opener;`;
        code += `}`;
        code += `cursoled_obj() {`;
        code += `return document.activeElement;`;
        code += `}`;
        code += `parent_tr(obj) {`;
        code += `var parent = null;`;
        code += `try { parent = obj.parentElement; } catch(e) { return obj; }`;
        code += `if(obj.tagName.toString() == "TR") return obj;`;
        code += `else return this.parent_tr(parent);`;
        code += `}`;
        code += `is_body(obj) {`;
        code += `if(obj.tagName.toString() == "BODY") return true;`;
        code += `else return false;`;
        code += `}`;
        code += `diag_ta_group_count() {`;
        code += `return this.diag_tbl.querySelectorAll('textarea[id^="comment"]').length;`;
        code += `}`;
        code += `text_clean(str) {`;
        code += `str=str.replace(/^ +/m,"");`;
        code += `str=str.replace(/\\t+/m,"");`;
        code += `str=str.replace(/(\\r\\n|\\r|\\n)/g,""); `;
        code += `return str;`;
        code += `}`;
        code += `br_encode(str) {`;
        code += `return str.replace(/(\\r|\\n|\\r\\n)/mg, this.br_sp);`;
        code += `}`;
        code += `br_decode(str) {`;
        code += `return str.replace(new RegExp(this.br_sp, "mg"), "\\r\\n");`;
        code += `}`;
        code += `get_safe_value(val) {`;
        code += `if(typeof val === "undefined") return "";`;
        code += `else return val;`;
        code += `}`;
        code += `event_ignite(obj, type) {`;
        code += `var event = document.createEvent("HTMLEvents");`;
        code += `event.initEvent(type, true, false);`;
        code += `obj.dispatchEvent(event);`;
        code += `}`;
        code += `_single_result() {`;
        code += `var parent = null;`;
        code += `if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) {`;
        code += `if(this.diag_ta_group_count() == 1) parent = document;`;
        code += `else parent = this.diag_tbl.getElementsByTagName("tr")[1];`;
        code += `} else {`;
        code += `parent = this.parent_tr(this.cursoled_obj());`;
        code += `}`;
        code += `return parent.querySelectorAll('select[id^="result_"]');`;
        code += `}`;
        code += `_single_comment() {`;
        code += `var parent = null;`;
        code += `if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) parent = document;`;
        code += `else parent = this.parent_tr(this.cursoled_obj());`;
        code += `return parent.querySelector('textarea[id^="comment"]');`;
        code += `}`;
        code += `_single_description() {`;
        code += `var parent = null;`;
        code += `if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) parent = document;`;
        code += `else parent = this.parent_tr(this.cursoled_obj());`;
        code += `return parent.querySelector('textarea[id^="src_"]');`;
        code += `}`;
        code += `_single_srccode() {`;
        code += `var parent = null;`;
        code += `if(this.cursoled_obj() == null || this.is_body(this.cursoled_obj())) parent = document;`;
        code += `else parent = this.parent_tr(this.cursoled_obj());`;
        code += `return parent.querySelector('textarea[id^="updsrc_"]');`;
        code += `}`;
        code += `get_survey_single() {`;
        code += `var survey_str = "";`;
        code += `var results = this._single_result();`;
        code += `for(var i=0; i<results.length; i++) {`;
        code += `var key = "";`;
        code += `var opts = results[i].getElementsByTagName("option");`;
        code += `var idx = results[i].selectedIndex;`;
        code += `for(var j=0; j<opts.length; j++) {`;
        code += `var opt = opts[j];`;
        code += `if(j == idx) {`;
        code += `key = opt.value;`;
        code += `break;`;
        code += `}`;
        code += `}`;
        code += `if(key != "") survey_str += this.hash[key];`;
        code += `else survey_str += "";`;
        code += `if(i != (results.length - 1)) survey_str += "/";`;
        code += `}`;
        code += `return survey_str;`;
        code += `}`;
        code += `get_survey_key_single(key_val) {`;
        code += `var ret_key = "";`;
        code += `for(var key in this.hash) {`;
        code += `var val = this.hash[key];`;
        code += `if(key_val == val) {`;
        code += `ret_key = key;`;
        code += `break;`;
        code += `}`;
        code += `}`;
        code += `return ret_key;`;
        code += `}`;
        code += `get_comment_single() {`;
        code += `return this._single_comment().value;`;
        code += `}`;
        code += `get_description_single() {`;
        code += `return this._single_description().value;`;
        code += `}`;
        code += `get_srccode_single() {`;
        code += `return this._single_srccode().value;`;
        code += `}`;
        code += `set_survey_single(flag) {`;
        code += `var flag_arr = flag.split(/\\//mg);`;
        code += `var results = this._single_result();        `;
        code += `for(var i=0; i<results.length; i++) {`;
        code += `var key = this.get_survey_key_single(flag_arr[i]);`;
        code += `var opts = results[i].getElementsByTagName("option");`;
        code += `for(var j=0; j<opts.length; j++) {`;
        code += `var opt = opts[j];`;
        code += `if(opt.value == key) {`;
        code += `results[i].selectedIndex = j;`;
        code += `break;`;
        code += `}`;
        code += `}`;
        code += `}`;
        code += `}`;
        code += `set_comment_single(str) {`;
        code += `this._single_comment().value = str;`;
        code += `}`;
        code += `set_description_single(str) {`;
        code += `this._single_description().value = str;`;
        code += `}`;
        code += `set_srccode_single(str) {`;
        code += `this._single_srccode().value = str;`;
        code += `}`;
        code += `set_survey_fill(flag) {`;
        code += `var all_results = document.querySelectorAll('select[id^="result_"]');`;
        code += `for(var i=0; i<all_results.length; i++) {`;
        code += `var key = this.get_survey_key(flag);`;
        code += `var opts = all_results[i].getElementsByTagName("option");`;
        code += `for(var j=0; j<opts.length; j++) {`;
        code += `var opt = opts[j];`;
        code += `if(opt.value == key) {`;
        code += `all_results[i].selectedIndex = j;`;
        code += `break;`;
        code += `}`;
        code += `}`;
        code += `}`;
        code += `}`;
        code += `set_comment_fill(str) {`;
        code += `var all_comments = document.querySelectorAll('textarea[id^="comment"]');`;
        code += `for(var i=0; i<all_comments.length; i++) {`;
        code += `all_comments[i].value = str;`;
        code += `}`;
        code += `}`;
        code += `set_description_fill(str) {`;
        code += `var all_descriptions = document.querySelectorAll('textarea[id^="src_"]');`;
        code += `for(var i=0; i<all_descriptions.length; i++) {`;
        code += `all_descriptions[i].value = str;`;
        code += `}`;
        code += `}`;
        code += `set_srccode_fill(str) {`;
        code += `var all_srccodes = document.querySelectorAll('textarea[id^="updsrc_"]');`;
        code += `for(var i=0; i<all_srccodes.length; i++) {`;
        code += `all_srccodes[i].value = str;`;
        code += `}`;
        code += `}`;
        code += `diag_clean_single(flag) {`;
        code += `switch(flag) {`;
        code += `case "はい":`;
        code += `this.set_comment_fill("");`;
        code += `this.set_srccode_fill("");`;
        code += `break;`;
        code += `case "なし":`;
        code += `this.set_comment_fill("");`;
        code += `this.set_description_fill("");`;
        code += `this.set_srccode_all_fill("");`;
        code += `break;`;
        code += `}`;
        code += `}`;
        code += `_all_result(cell) {`;
        code += `return cell.querySelector('select[id^="result_"]');`;
        code += `}`;
        code += `_all_comment(cell) {`;
        code += `return cell.querySelector('textarea[id^="comment"]');`;
        code += `}`;
        code += `_all_description(cell) {`;
        code += `return cell.querySelector('textarea[id^="src_"]');`;
        code += `}`;
        code += `_all_srccode(cell) {`;
        code += `return cell.querySelector('textarea[id^="updsrc_"]');`;
        code += `}`;
        code += `_all_exists_ta(tr) {`;
        code += `if(tr.querySelectorAll('textarea').length > 0) return true;`;
        code += `else return false;`;
        code += `}`;
        code += `_all_get_text(cell) {`;
        code += `var txt = cell.innerHTML;`;
        code += `var pt = new RegExp(/^([^<].+?)(<)/);`;
        code += `if(pt.test(txt)) {`;
        code += `return txt.match(pt)[1];`;
        code += `} else {`;
        code += `return txt;`;
        code += `}`;
        code += `}`;
        code += `_all_get_survey(cell) {`;
        code += `var key = "";`;
        code += `var obj = this._all_result(cell);`;
        code += `var opts = obj.getElementsByTagName("option");`;
        code += `var idx = obj.selectedIndex;`;
        code += `for(var j=0; j<opts.length; j++) {`;
        code += `var opt = opts[j];`;
        code += `if(j == idx) {`;
        code += `key = opt.value;`;
        code += `break;`;
        code += `}`;
        code += `}`;
        code += `return this.hash[key];`;
        code += `}`;
        code += `_all_get_comment(cell) {`;
        code += `return this._all_comment(cell).value;`;
        code += `}`;
        code += `_all_get_description(cell) {`;
        code += `return this._all_description(cell).value;`;
        code += `}`;
        code += `_all_get_srccode(cell) {`;
        code += `return this._all_srccode(cell).value;`;
        code += `}`;
        code += `_all_set_survey(cell, flag) {`;
        code += `var obj = this._all_result(cell);`;
        code += `var key = this.get_survey_key_single(flag);`;
        code += `var opts = obj.getElementsByTagName("option");`;
        code += `for(var j=0; j<opts.length; j++) {`;
        code += `var opt = opts[j];`;
        code += `if(opt.value == key) {`;
        code += `obj.selectedIndex = j;`;
        code += `break;`;
        code += `}`;
        code += `}`;
        code += `}`;
        code += `_all_set_comment(cell, str) {`;
        code += `this._all_comment(cell).value = str;`;
        code += `}`;
        code += `_all_set_description(cell, str) {`;
        code += `this._all_description(cell).value = str;`;
        code += `}`;
        code += `_all_set_srccode(cell, str) {`;
        code += `this._all_srccode(cell).value = str;`;
        code += `}`;
        code += `}`;
        code += `let bkm_util = new bkmLibraPlusUtil();`;
        return code;
    };
    
    //クリアボタンクリック
    $("#bkm_clear_btn").on("click", function(){
        $("#bkm_body").val("");
    });
    
    //単一判定ボタンクリック
    $("#bkm_single_create_btn").on("click", function(){
        var code = get_code_base();
        var nx = $("#bookmarklet-ui li").length;
        var str_sv = "";
        var str_sv_cp = "any";
		var str_comment = "";
		var str_description = "";
		var str_srccode = "";
        
        //判定
        str_sv = $("#bkm_sv_" + nx + " option:selected").text();
        code += `bkm_util.set_survey_single("${str_sv}");`;
        
        //判定コメント
        var flg_comment = 
            ($("input[type=radio][name=bkm_comment_yes_no_" + nx + "]:checked").val() == "yes") ? true : false;
        var flg_comment_add = 
            ($("#bkm_comment_add_check_" + nx + ":checked").val() != undefined) ? true : false;
        var comment_add_pos = $("#bkm_comment_add_point_" + nx + " option:selected").val();
        //alert(comment_add_pos);
        
        if(flg_comment) {
            str_comment = $("#bkm_comment_" + nx).val();
            if(flg_comment_add) {
                if(comment_add_pos == "front") {
                    code += `var old_comm = bkm_util.get_comment_single();`;
                    code += `var new_comm = "${str_comment}" + "\\n\\n" + old_comm;`;
                    code += `bkm_util.set_comment_single(new_comm);`;
                } else {
                    code += `var old_comm = bkm_util.get_comment_single();`;
                    code += `var new_comm = old_comm + "\\n\\n" + "${str_comment}";`;
                    code += `bkm_util.set_comment_single(new_comm);`;
                }
            } else {
                code += `bkm_util.set_comment_single("${str_comment}");`;
            }
        }
        
        //対象ソースコード
        var flg_description = 
            ($("input[type=radio][name=bkm_description_yes_no_" + nx + "]:checked").val() == "yes") ? true : false;

        if(flg_description) {
            str_description = $("#bkm_description_" + nx).val();
            code += `bkm_util.set_description_single("${str_description}");`;
        }
                
        //修正ソースコード
        var type_srccode = $("input[type=radio][name=bkm_srccode_yes_no_regx_" + nx + "]:checked").val();
        var str_search = $("#bkm_regx_search_" + nx).val();
        var str_replace = $("#bkm_regx_replace_" + nx).val();
        
        switch(type_srccode) {
            case "yes":
                str_srccode = $("#bkm_srccode_" + nx).val();
                code += `bkm_util.set_srccode_single("${str_srccode}");`;
                break;
            case "regx":
                code += `var new_src = bkm_util.get_description_single();`;
                code += `var srch_pt = new RegExp(${str_search});`;
                code += `new_src = new_src.replace(srch_pt, "${str_replace}");`;
                code += `bkm_util.set_srccode_single(new_src);`;
                break;
            default:
                break;      
        }
        
        //生成したコードを出力
        $("#bkm_body").val(code);
        
    });

    


});