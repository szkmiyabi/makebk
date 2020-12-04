jQuery(function($){
    
    //共用フィールドとメソッド
    const tab_sp = "<bkmk:tab>";
	const br_sp = "<bkmk:br>";
    const data_tab_sp = "<bkmk:data:tab>";
    const data_br_sp = "<bkmk:data:br>";
    const hash = {
        "0": "未判定",
        "1": "はい",
        "9": "はい(注記)",
        "2": "いいえ",
        "3": "なし"
    };
    
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
    
    let get_safe_value = function(val) {
        if(typeof val === "undefined") return "";
        else return val;
    };

    //行単位に付随するクリアボタンの挙動をセットアップ
    var bind_comment_clear_btn = function() {
        $("button[id*=bkm_comment_clear_]").each(function(){
            var nx = parseInt($(this).attr("id").replace(/bkm_comment_clear_/, ""));
            $(this).on("click", function(){
                $("#bkm_comment_" + nx).val("");
            })
        });
        $("button[id*=bkm_description_clear_]").each(function(){
            var nx = parseInt($(this).attr("id").replace(/bkm_description_clear_/, ""));
            $(this).on("click", function(){
                $("#bkm_description_" + nx).val("");
            })
        });
        $("button[id*=bkm_srccode_clear_]").each(function(){
            var nx = parseInt($(this).attr("id").replace(/bkm_srccode_clear_/, ""));
            $(this).on("click", function(){
                $("#bkm_srccode_" + nx).val("");
            })
        });
    };
    bind_comment_clear_btn();
    
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
        //行をクローン
        $("#bookmarklet-ui li:last-child").clone().appendTo("ul");
        var nx = $("#bookmarklet-ui li").length;
        var current_li = "#bookmarklet-ui li:last-child";
        //重複するid属性値とname属性値を修正（末尾の連番をインクリメントする）
        $(current_li).find("input[id*=bkm_nm_]").attr({id: "bkm_nm_" + nx, value: nx});
        $(current_li).find("input[id*=check_row_]").attr({id: "check_row_" + nx, value: nx});
        $(current_li).find("select[id*=bkm_sv_]").attr({id: "bkm_sv_" + nx});
        $(current_li).find("input[name*=bkm_comment_yes_no_]").each(function(){
            $(this).attr({name: "bkm_comment_yes_no_" + nx});
        });
        $(current_li).find("input[id*=bkm_comment_add_check_]").attr({id: "bkm_comment_add_check_" + nx});
        $(current_li).find("select[id*=bkm_comment_add_point_]").attr({id: "bkm_comment_add_point_" + nx});
        $(current_li).find("textarea[id*=bkm_comment_]").attr({id: "bkm_comment_" + nx});
        $(current_li).find("button[id*=bkm_comment_clear_]").attr({id: "bkm_comment_clear_" + nx});
        $(current_li).find("input[name*=bkm_description_yes_no_]").each(function(){
            $(this).attr({name: "bkm_description_yes_no_" + nx});
        });
        $(current_li).find("textarea[id*=bkm_description_]").attr({id: "bkm_description_" + nx});
        $(current_li).find("button[id*=bkm_description_clear_]").attr({id: "bkm_description_clear_" + nx});
        $(current_li).find("input[name*=bkm_srccode_yes_no_regx_]").each(function(){
            $(this).attr({name: "bkm_srccode_yes_no_regx_" + nx});
        });
        $(current_li).find("input[id*=bkm_regx_search_]").attr({id: "bkm_regx_search_" + nx});
        $(current_li).find("input[id*=bkm_regx_replace_]").attr({id: "bkm_regx_replace_" + nx});
        $(current_li).find("textarea[id*=bkm_srccode_]").attr({id: "bkm_srccode_" + nx});
        $(current_li).find("button[id*=bkm_srccode_clear_]").attr({id: "bkm_srccode_clear_" + nx});
        bind_comment_clear_btn();
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
        code += `save_survey() {`;
        code += `this.save_survey_btn.click();`;
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
        code += `var key = this.get_survey_key_single(flag);`;
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
        code += `force_survey_ok() {`;
        code += `this.set_survey_fill("はい");`
        code += `this.set_comment_fill("");`
        code += `this.set_srccode_fill("");`
        code += `this.save_survey();`
        code += `}`;
        code += `force_survey_na() {`;
        code += `this.set_survey_fill("なし");`;
        code += `this.set_comment_fill("");`;
        code += `this.set_srccode_fill("");`;
        code += `this.save_survey();`;
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

    //単一検査データ文字列を配列にバインドして返却
    var _data_bind_single = function(data) {
        var arr = new Array();
        var str_sv = "";
        var str_sv_cp = "";
        var str_comment = "";
        var str_description = "";
        var str_srccode = "";
        var tmp = data.split(tab_sp);
        if(tmp != null) {
            str_sv = tmp[1].toString().trim();
            str_sv_cp = tmp[2].toString().trim();
            if(str_sv_cp === "") str_sv_cp = "no";
            str_comment = br_decode(get_safe_value(tmp[4]));
            str_description = br_decode(get_safe_value(tmp[5]));
            str_srccode = br_decode(get_safe_value(tmp[6]));
            arr.push(str_sv);
            arr.push(str_sv_cp);
            arr.push(str_comment);
            arr.push(str_description);
            arr.push(str_srccode);
            return arr;
        } else {
            return null;
        }
    };
    
    //クリアボタンクリック
    $("#bkm_clear_btn").on("click", function(){
        $("#bkm_body").val("");
    });

    $("#bkm_data_paste_clear_btn").on("click", function(){
        $("#bkm_paste_source").val("");
    });

    //URL置換ボタンクリック
    $("#bkm_url_replacer").on("click", function(){
        var code = "";
        var current_check = $("input[id*='check_row_']:checked");
        if(current_check.length == 0) {
            alert("行が選択されていません");
            return;
        }
        if(current_check.length > 1) {
            alert("複数行が選択されています");
            return;
        }
        var nx = null;
        try {nx = parseInt($("input[id*='check_row_']:checked").attr("id").replace(/check_row_/, ""));} catch(e) { return; }
        var old_domain = $("#bkm_regx_search_" + nx).val();
        var new_domain = $("#bkm_regx_replace_" + nx).val();
        code += `javascript:(function(){`;
        code += `var odm="${old_domain}";`;
        code += `var ndm="${new_domain}";`;
        code += `var ocmstr = location.href;`;
        code += `var ndmstr = ocmstr.replace(odm,ndm);`;
        code += `location.href = ndmstr;`;
        code += `})();`;
        $("#bkm_body").val(code);
    });
    
    //要素強調をクリック
    $("#bkm_tag_marker").on("click", function(){
        var code = "";
        var current_check = $("input[id*='check_row_']:checked");
        if(current_check.length == 0) {
            alert("行が選択されていません");
            return;
        }
        if(current_check.length > 1) {
            alert("複数行が選択されています");
            return;
        }
        var nx = null;
        try {nx = parseInt($("input[id*='check_row_']:checked").attr("id").replace(/check_row_/, ""));} catch(e) { return; }
        var tag = $("#bkm_regx_search_" + nx).val();
        code += `javascript:(function(){`;
        code += `var ats = document.getElementsByTagName("${tag}");`;
        code += `for(var i=0; i<ats.length; i++){`;
        code += `var at = ats[i];`;
        code += `at.setAttribute("style", "display:inline-block;border:2px solid red;");`;
        code += `}`;
        code += `})();`;
        $("#bkm_body").val(code);
    });
     
    //属性明示をクリック
    $("#bkm_attr_marker").on("click", function(){
        var code = "";
        var current_check = $("input[id*='check_row_']:checked");
        if(current_check.length == 0) {
            alert("行が選択されていません");
            return;
        }
        if(current_check.length > 1) {
            alert("複数行が選択されています");
            return;
        }
        var nx = null;
        try {nx = parseInt($("input[id*='check_row_']:checked").attr("id").replace(/check_row_/, ""));} catch(e) { return; }
        var tag = $("#bkm_regx_search_" + nx).val();
        if(tag == "") tag = "*";
        var attr = $("#bkm_regx_replace_" + nx).val();
        code += `javascript:(function(){`;
        code += `var ts = document.getElementsByTagName("${tag}");`;
        code += `for(var i=0; i<ts.length; i++){`;
        code += `var t = ts[i];`;
        code += `var span_html = "";`;
        code += `var span_style = "";`;
        code += `var span_id = "bkm-label-span-" + i;`;
        code += `var type="";`;
        code += `if(t.hasAttribute("${attr}")) {`;
        code += `type = "${attr}-is-yes";`;
        code += `span_style = "padding-right:5px;color:#fff;font-size:12px;padding:1px;background:#3A87AD;border-radius:5px;";`;
        code += `} else {`;
        code += `type = "${attr}-is-no";`;
        code += `span_style = "padding-right:5px;color:#fff;font-size:12px;padding:1px;background:#C00000;border-radius:5px;";`;
        code += `}`;
        code += `if(type === "${attr}-is-yes") {`;
        code += `var vl = t.getAttribute("${attr}");`;
        code += `span_html = (vl === "") ? "${attr}属性有:(空)" : "${attr}属性有: " + vl;`;
        code += `span_html = '&lt;' + t.tagName.toLowerCase() + '&gt; , ' + span_html;`;
        code += `} else if(type === "${attr}-is-no") {`;
        code += `span_html = '&lt;' + t.tagName.toLowerCase() + '&gt; , ${attr}属性なし';`;
        code += `}`;
        code += `var span  = '<span id="' + span_id + '" style="' + span_style + '">' + span_html + '</span>';`;
        code += `var addelm = document.createElement("span");`;
        code += `addelm.style.cssText = span_style;`;
        code += `addelm.innerHTML = span;`;
        code += `t.prepend(addelm);`;
        code += `}`;
        code += `})();`;
        $("#bkm_body").val(code);
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

        var auto_save = 
        ($("input[type=checkbox][id=bkm_auto_save]:checked").val() == "yes") ? true : false;
        if(auto_save) code += `bkm_util.save_survey();`;
        
        //生成したコードを出力
        $("#bkm_body").val(code);
        
    });

    //複数行フォームコントロール値を配列で返却
    var _create_all_line_data = function() {
        var src_arr = new Array();
        var cnt = $("input[id*=check_row_]").length;
        for(var i=0; i<cnt; i++) {
            var row_arr = new Array();
            //番号
            var str_nm = $("#bkm_nm_" + (i+1)).val();
            //判定
            var str_sv = $("#bkm_sv_" + (i+1) + " option:selected").text();
            //判定コメント
            var str_comment = $("#bkm_comment_" + (i+1)).val();
            var flg_comment = 
                ($("input[type=radio][name=bkm_comment_yes_no_" + (i+1) + "]:checked").val() == "yes") ? true : false;
            var flg_comment_add = 
                ($("#bkm_comment_add_check_" + (i+1) + ":checked").val() != undefined) ? true : false;
            var comment_add_pos = $("#bkm_comment_add_point_" + (i+1) + " option:selected").val();
            //対象ソースコード
            var str_description = $("#bkm_description_" + (i+1)).val();
            var flg_description = 
                ($("input[type=radio][name=bkm_description_yes_no_" + (i+1) + "]:checked").val() == "yes") ? true : false;
            //修正ソースコード
            var str_srccode = $("#bkm_srccode_" + (i+1)).val();
            var type_srccode = $("input[type=radio][name=bkm_srccode_yes_no_regx_" + (i+1) + "]:checked").val();
            var str_search = $("#bkm_regx_search_" + (i+1)).val();
            var str_replace = $("#bkm_regx_replace_" + (i+1)).val();
            row_arr.push(str_nm);
            row_arr.push(str_sv);
            row_arr.push(str_comment);
            row_arr.push(flg_comment);
            row_arr.push(flg_comment_add);
            row_arr.push(comment_add_pos);
            row_arr.push(str_description);
            row_arr.push(flg_description);
            row_arr.push(str_srccode);
            row_arr.push(type_srccode);
            row_arr.push(str_search);
            row_arr.push(str_replace);
            src_arr.push(row_arr);
        }
        return src_arr;
    };

    //複数判定ボタンクリック
    $("#bkm_all_create_btn").on("click", function(){
        var code = get_code_base();
        code += `var trs = bkm_util.diag_tbl.rows;`;
        //複数行フォームコントロール値を配列で取得
        var data = _create_all_line_data();
        var nx = data.length;
        //配列でループ
        for(var i=0; i<data.length; i++) {
            var row = data[i];
            var str_nm = row[0];
            var str_sv = row[1];
            var str_comment = row[2];
            var flg_comment = row[3];
            var flg_comment_add = row[4];
            var comment_add_pos = row[5];
            var str_description = row[6];
            var flg_description = row[7];
            var str_srccode = row[8];
            var type_srccode = row[9];
            var str_search = row[10];
            var str_replace = row[11];
            //順次判定を入れていく（tableはループしない）
            code += `var tr_${i+1} = trs[${i+1}];`;
            //判定select格納セル
            code += `var sv_cell_${i+1} = tr_${i+1}.cells[2];`;
            //判定コメント/対象ソースコード/修正ソースコードtextareaの格納セル
            code += `var body_cell_${i+1} = tr_${i+1}.cells[3];`;
            //判定
            code += `bkm_util._all_set_survey(sv_cell_${i+1}, "${str_sv}");`;
            //判定コメント
            if(flg_comment) {
                if(flg_comment_add) {
                    if(comment_add_pos == "front") {
                        code += `var old_comm_${i+1} = bkm_util._all_get_comment(body_cell_${i+1});`;
                        code += `var new_comm_${i+1} = "${str_comment}" + "\\n\\n" + old_comm_${i+1};`;
                        code += `bkm_util._all_set_comment(body_cell_${i+1}, new_comm_${i+1});`;
                    } else {
                        code += `var old_comm_${i+1} = bkm_util._all_get_comment(body_cell_${i+1});`;
                        code += `var new_comm_${i+1} = old_comm_${i+1} + "\\n\\n" + "${str_comment}";`;
                        code += `bkm_util._all_set_comment(body_cell_${i+1}, new_comm_${i+1});`;
                    }
                } else {
                    code += `bkm_util._all_set_comment(body_cell_${i+1}, "${str_comment}");`;
                }
            }
            //対象ソースコード
            if(flg_description) {
                code += `bkm_util._all_set_description(body_cell_${i+1}, "${str_description}");`;
            }
            //修正ソースコード
            switch(type_srccode) {
                case "yes":
                    code += `bkm_util._all_set_srccode(body_cell_${i+1}, "${str_srccode}");`;
                    break;
                case "regx":
                    code += `var new_src_${i+1} = bkm_util._all_get_description(body_cell_${i+1});`;
                    code += `var srch_pt_${i+1} = new RegExp(${str_search});`;
                    code += `new_src_${i+1} = new_src_${i+1}.replace(srch_pt_${i+1}, "${str_replace}");`;
                    code += `bkm_util._all_set_srccode(body_cell_${i+1}, new_src_${i+1});`;
            }
        }

        //生成したコードを出力
        $("#bkm_body").val(code);
    });

    //単一貼付ボタンクリック
    $("#bkm_data_paste_single").on("click", function(){
        var current_check = $("input[id*='check_row_']:checked");
        if(current_check.length == 0) {
            alert("行が選択されていません");
            return;
        }
        if(current_check.length > 1) {
            alert("複数行が選択されています");
            return;
        }
        var src = $("#bkm_paste_source").val().trim();
        var arr = _data_bind_single(src);
        var nx = null;
        try {nx = parseInt($("input[id*='check_row_']:checked").attr("id").replace(/check_row_/, ""));} catch(e) { return; }
        var cnt = 0;
        $("#bkm_sv_" + nx).find("option").each(function(){
            var txt = $(this).text();
            if(arr[0] == txt) {
                $("#bkm_sv_" + nx).prop("selectedIndex", cnt);
            }
            cnt++;
        });
        $("#bkm_comment_" + nx).val(arr[2]);
        $("#bkm_description_" + nx).val(arr[3]);
        $("#bkm_srccode_" + nx).val(arr[4]);
    });

    //行選択ボタンクリック
    $("#bkm_all_line_select").on("click", function(){
        $("input[id*=check_row_").each(function(){
            var chk = $(this).prop("checked");
            if(!chk) {
                $(this).prop("checked", "checked");
            }
        });
    });

    //行選択解除ボタンクリック
    $("#bkm_all_line_unselect").on("click", function(){
        $("input[id*=check_row_").each(function(){
            var chk = $(this).prop("checked");
            if(chk) {
                $(this).prop("checked", "");
            }
        });
    });



});