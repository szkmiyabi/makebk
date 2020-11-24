jQuery(function($){
    //番号セレクトボックス生成
    var create_bkm_nm = function(e) {
        for(var i=1; i<=20; i++) {
            e.append(`<option value="${i}">${i}</option>`);
        }
    };
    create_bkm_nm($("#bkm_nm_1"));
    
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
        $("#bookmarklet-ui").append("<li>");
        var line = "#bookmarklet-ui li:nth-child(" + nx + ")";
        $(line).attr("class", "form-line");
        $(line).append("<div>");
        $(line + " div").attr("class", "form-group");
        var line_inner = line + " div";
        $(line_inner).append("<div>").append("<div>").append("<div>").append("<div>").append("<div>");
        
        //番号グループ
        var nm_div = line_inner + " div:nth-child(1)";
        $(nm_div).append("<label>");
        $(nm_div + " label").text("番号");
        $(nm_div + " label").attr("for", "bkm_nm_" + nx);
        $(nm_div).append("<select>");
        $(nm_div + " select").attr({
            id: "bkm_nm_" + nx,
            class: "form-control"
        });
        create_bkm_nm($(nm_div + " select"));
        document.getElementById("bkm_nm_" + nx).selectedIndex = (nx-1);
        
        //検査結果グループ
        var sv_div = line_inner + " div:nth-child(2)";
        $(sv_div).append("<label>");
        $(sv_div + " label").text("検査結果");
        $(sv_div + " label").attr("for", "bkm_sv_" + nx);
        $(sv_div).append("<select>");
        $(sv_div + " select").attr({
            id: "bkm_sv_" + nx,
            class: "form-control"
        });
        create_bkm_sv($(sv_div + " select"));
        
        //判定コメントグループ
        var comment_div = line_inner + " div:nth-child(3)";
        $(comment_div).append("<label>");
        $(comment_div + " label").text("判定コメント");
        $(comment_div + " label").attr("for", "bkm_comment_" + nx);
        $(comment_div).append("<div>");
        $(comment_div + " div").attr("class", "form-check form-check-inline");
        var comment_opt_div = comment_div + " div";
        $(comment_opt_div).append("<input>");
        $(comment_opt_div).append("<label>");
        $(comment_opt_div).append("<input>");
        $(comment_opt_div).append("<label>");        
        $(comment_opt_div).append("<input>");        
        $(comment_opt_div).append("<label>");        
        $(comment_opt_div).append("<select>");
        $(comment_opt_div + " input").each(function(idx){
            switch(idx) {
                case 0:
                case 1:
                    $(this).attr({type: "radio", name: "bkm_comment_yes_no_" + nx});
                    break;
                case 2:
                    $(this).attr({type: "checkbox", id: "bkm_comment_add_check_" + nx});
                    break;
            }
        });
        $(comment_opt_div + " label").each(function(idx){
            $(this).attr({class: "form-check-label"});
            if(idx == 0) {
                $(this).text("する");
            }else if(idx == 1) {
                $(this).text("しない");
            }else {
                $(this).text("追記有効");
                $(this).attr({for: "bkm_comment_add_check_" + nx});
            }
        });
        create_bkm_comment_add_point($(comment_opt_div + " select"));
        $(comment_div).append("<textarea>");
        $(comment_div + " textarea").attr({id: "bkm_comment_" + nx, class: "form-control"});
        
        //対象ソースコードグループ
        var description_div = line_inner + " div:nth-child(4)";
        $(description_div).append("<label>");
        $(description_div + " label").text("対象ソースコード");
        $(description_div + " label").attr("for", "bkm_description_" + nx);
        $(description_div).append("<div>");
        $(description_div + " div").attr("class", "form-check form-check-inline");
        var description_opt_div = description_div + " div";
        $(description_opt_div).append("<input>");
        $(description_opt_div).append("<label>");
        $(description_opt_div).append("<input>");
        $(description_opt_div).append("<label>");
        $(description_opt_div + " input").each(function(idx){
            $(this).attr({type: "radio", name: "bkm_description_yes_no_" + nx});
        });
            $(description_opt_div + " label").each(function(idx){
            $(this).attr({class: "form-check-label"});
            if(idx == 0) {
                $(this).text("する");
            }else if(idx == 1) {
                $(this).text("しない");
            }
        });
        $(description_div).append("<textarea>");
        $(description_div + " textarea").attr({id: "bkm_description_" + nx, class: "form-control"});
        
        //修正ソースコードグループ
        var srccode_div = line_inner + " div:nth-child(5)";
        $(srccode_div).append("<label>");
        $(srccode_div + " label").text("修正ソースコード");
        $(srccode_div + " label").attr("for", "bkm_srccode_" + nx);
        $(srccode_div).append("<div>");
        $(srccode_div + " div").attr("class", "form-check form-check-inline");
        var srccode_opt_div = srccode_div + " div";
        $(srccode_opt_div).append("<input>");
        $(srccode_opt_div).append("<label>");
        $(srccode_opt_div).append("<input>");
        $(srccode_opt_div).append("<label>");
        $(srccode_opt_div).append("<input>");
        $(srccode_opt_div).append("<label>");
        $(srccode_opt_div + " input").each(function(idx){
            $(this).attr({type: "radio", name: "bmk_srccode_yes_no_regx_" + nx});
        });
            $(srccode_opt_div + " label").each(function(idx){
            $(this).attr({class: "form-check-label"});
            if(idx == 0) {
                $(this).text("する");
            }else if(idx == 1) {
                $(this).text("しない");
            }else {
                $(this).text("正規表現置換");
            }
        });
        $(srccode_div).append("<div>");
        $(srccode_div + " div + div").attr({class: "form-inline"});
        var regx_div = srccode_div + " div + div";
        $(regx_div).append("<label>").append("<input>").append("<label>").append("<input>");
        $(regx_div + " input").each(function(idx){
            if(idx == 0) {
                $(this).attr({id: "bkm_regx_search_" + nx, class: "form-control"});
            }else if(idx == 1) {
                $(this).attr({id: "bkm_regx_replace_" + nx, class: "form-control"});
            }
        });
        $(regx_div + " label").each(function(idx){
                if(idx == 0) {
                $(this).text("検索文字列");
            }else if(idx == 1) {
                $(this).text("置換文字列");
            }
        });
        $(srccode_div).append("<textarea>");
        $(srccode_div + " textarea").attr({id: "bkm_srccode_" + nx, class: "form-control"});
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
    
    //test code
    $("#bkm_single_create_btn").on("click", function(){
           var code = get_code_base();
            code += `bkm_util.set_survey_single("いいえ");`;
            $("#bkm_body").val(code);
    });

    


});