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
    $("#bkm_formgroup_add").on("click", function(){
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
    


});

//オンロード処理
onload = function() {
    init_insert_pos_select();
};

//範囲セレクトボックスのセッティング
function init_insert_pos_select() {
    var elms = document.querySelectorAll(".bkm_insert_pos");
    for(var i=0; i<elms.length; i++) {
        var elm = elms[i];
        var opt_fs = document.createElement("option");
        opt_fs.value="all";
        opt_fs.textContent="all";
        elm.appendChild(opt_fs);
        for(var j=1; j<=10; j++) {
            var opt = document.createElement("option");
            opt.value=j;
            opt.textContent=j;
            elm.appendChild(opt);
        }
    }
}

//bookmarklet生成
function bkm_create(){
    var bkm_body = "";
    bkm_body += `javascript:(function(){`;
    bkm_body += `var diag_tbl = diag_tbl = document.querySelector('#cmtTable');`;
    bkm_body += `var save_survey_btn = document.querySelector('button[name="update"]');`;
    bkm_body += `var hash = {"0": "未判定","1": "はい","9": "はい(注記)","2": "いいえ","3": "なし"};`;
    bkm_body += `var tab_sp = "<bkmk:tab>";`;
    bkm_body += `var br_sp = "<bkmk:br>";`;
    bkm_body += `var data_tab_sp = "<bkmk:data:tab>";`;
    bkm_body += `var data_br_sp = "<bkmk:data:br>";`;
    bkm_body += `var text_clean = function(str) {`;
    bkm_body += `str=str.replace(/^ +/m,"");`;
    bkm_body += `str=str.replace(/\\t+/m,"");`;
    bkm_body += `str=str.replace(/(\\r\\n|\\r|\\n)/g,""); `;
    bkm_body += `return str;`;
    bkm_body += `};`;
    bkm_body += `var br_encode = function(str) {return str.replace(/(\\r|\\n|\\r\\n)/mg, br_sp);};`;
    bkm_body += `var br_decode = function(str) {return str.replace(new RegExp(this.br_sp, "mg"), "\\r\\n");};`;
    bkm_body += `var m_diag_result = function(cell) {return cell.querySelector('select[id^="result_"]');};`;
    bkm_body += `var m_diag_comment =function(cell) {return cell.querySelector('textarea[id^="comment"]');};`;
    bkm_body += `var m_diag_description = function(cell) {return cell.querySelector('textarea[id^="src_"]')};`;
    bkm_body += `var m_diag_srccode = function(cell) {return cell.querySelector('textarea[id^="updsrc_"]')};`;
    bkm_body += `var m_diag_exists_ta = function(tr) {`;
    bkm_body += `if(tr.querySelectorAll('textarea').length > 0) return true;`;
    bkm_body += `else return false;`;
    bkm_body += `};`;
    bkm_body += `var get_survey_key = function(key_val) {`;
    bkm_body += `var ret_key = "";`;
    bkm_body += `for(var key in hash) {`;
    bkm_body += `var val = hash[key];`;
    bkm_body += `if(key_val == val) {`;
    bkm_body += `ret_key = key;`;
    bkm_body += `break;`;
    bkm_body += `}`;
    bkm_body += `}`;
    bkm_body += `return ret_key;`;
    bkm_body += `};`;
    bkm_body += `var m_diag_get_text = function(cell) {`;
    bkm_body += `var txt = cell.innerHTML;`;
    bkm_body += `var pt = new RegExp(/^([^<].+?)(<)/);`;
    bkm_body += `if(pt.test(txt)) {`;
    bkm_body += `return txt.match(pt)[1];`;
    bkm_body += `} else {`;
    bkm_body += `return txt;`;
    bkm_body += `}`;
    bkm_body += `};`;
    bkm_body += `var m_diag_get_survey = function(cell) {`;
    bkm_body += `var key = "";`;
    bkm_body += `var obj = m_diag_result(cell);`;
    bkm_body += `var opts = obj.getElementsByTagName("option");`;
    bkm_body += `var idx = obj.selectedIndex;`;
    bkm_body += `for(var j=0; j<opts.length; j++) {`;
    bkm_body += `var opt = opts[j];`;
    bkm_body += `if(j == idx) {`;
    bkm_body += `key = opt.value;`;
    bkm_body += `break;`;
    bkm_body += `}`;
    bkm_body += `}`;
    bkm_body += `return this.hash[key];`;
    bkm_body += `};`;
    bkm_body += `var m_diag_get_comment = function(cell) {return m_diag_comment(cell).value;};`;
    bkm_body += `var m_diag_get_description = function(cell) {return m_diag_description(cell).value;};`;
    bkm_body += `var m_diag_get_srccode = function(cell) {return m_diag_srccode(cell).value;};`;
    bkm_body += `var m_diag_set_survey = function(cell, flag) {`;
    bkm_body += `var obj = m_diag_result(cell);`;
    bkm_body += `var key = get_survey_key(flag);`;
    bkm_body += `var opts = obj.getElementsByTagName("option");`;
    bkm_body += `for(var j=0; j<opts.length; j++) {`;
    bkm_body += `var opt = opts[j];`;
    bkm_body += `if(opt.value == key) {`;
    bkm_body += `obj.selectedIndex = j;`;
    bkm_body += `break;`;
    bkm_body += `}`;
    bkm_body += `}`;
    bkm_body += `};`;
    bkm_body += `var m_diag_set_comment = function(cell, str) {m_diag_comment(cell).value = str;};`;
    bkm_body += `var m_diag_set_description = function(cell, str) {m_diag_description(cell).value = str;};`;
    bkm_body += `var m_diag_set_srccode = function(cell, str) {m_diag_srccode(cell).value = str;};`;
    bkm_body += `var trs = diag_tbl.rows;`;
	bkm_body += `var ta_cnt = 0;`;
	bkm_body += `var s_cnt = 0;`;
    
    var bkm_res_pos = document.getElementById("bkm_result_pos");
    var bkm_res_pos_idx = bkm_res_pos.getElementsByTagName("option")[bkm_res_pos.selectedIndex].value;
    if(bkm_res_pos_idx == "all"){
        bkm_body += `var s_cnt_idx = 1;`;
        bkm_body += `var s_all_cnt_flg = "all";`;
    } else {
        bkm_body += `var s_cnt_idx = ${bkm_res_pos_idx};`;
        bkm_body += `var s_all_cnt_flg = "single";`;
    }
    
    var bkm_dtl_pos = document.getElementById("bkm_detail_pos");
    var bkm_dtl_pos_idx = bkm_dtl_pos.getElementsByTagName("option")[bkm_dtl_pos.selectedIndex].value;
    if(bkm_dtl_pos_idx == "all") {
        bkm_body += `var ta_cnt_idx = 1;`;
        bkm_body += `var ta_all_cnt_flg = "all";`;
    } else {
        bkm_body += `var ta_cnt_idx = ${bkm_dtl_pos_idx};`;
        bkm_body += `var ta_all_cnt_flg = "single";`;
    }
    
    var bkm_results = document.getElementsByName("bkm_result");
    var bkm_result_val = "";
    for(var i=0; i<bkm_results.length; i++){
      if(bkm_results[i].checked==true){
        bkm_result_val = bkm_results[i].value;
        break;
      }
    }
    var bkm_comments_status = document.getElementsByName("bkm_comment_status");
    var bkm_comment_status_val = "";
    for(var i=0; i<bkm_comments_status.length; i++){
      if(bkm_comments_status.item(i).checked==true){
        bkm_comment_status_val = bkm_comments_status[i].value;
        break;
      }
    }
    var bkm_descripts_status = document.getElementsByName("bkm_descript_status");
    var bkm_descript_status_val = "";
    for(var i=0; i<bkm_descripts_status.length; i++){
      if(bkm_descripts_status[i].checked==true){
        bkm_descript_status_val = bkm_descripts_status[i].value;
        break;
      }
    }
    var bkm_srccodes_status = document.getElementsByName("bkm_srccode_status");
    var bkm_srccode_status_val = "";
    for(var i=0; i<bkm_srccodes_status.length; i++){
      if(bkm_srccodes_status[i].checked==true){
        bkm_srccode_status_val = bkm_srccodes_status[i].value;
        break;
      }
    }
    var bkm_autosaves = document.getElementsByName("bkm_autosave");
    var bkm_autosave_val = "";
    for(var i=0; i<bkm_autosaves.length; i++){
      if(bkm_autosaves[i].checked==true){
        bkm_autosave_val = bkm_autosaves[i].value;
        break;
      }
    }
    
    bkm_body += `for(var i=1; i<trs.length; i++) {`;
    bkm_body += `s_cnt = i;`;
    bkm_body += `var tr = trs[i];`;
    bkm_body += `if(m_diag_exists_ta(tr)) ta_cnt++;`;
    bkm_body += `for(var j=0; j<tr.cells.length; j++) {`;
    bkm_body += `var cell = tr.cells[j];`;
    bkm_body += `if(j==2) {`;
    bkm_body += `if(s_cnt == s_cnt_idx || s_all_cnt_flg == "all") {`;
    bkm_body += `m_diag_set_survey(cell, "${bkm_result_val}");`;
    bkm_body += `}`;
    bkm_body += `} else if(j==3) {`;
    bkm_body += `if(ta_cnt == ta_cnt_idx || ta_all_cnt_flg == "all") {`;

    if(bkm_comment_status_val=="0"){
        var val1 = document.getElementById("bkm_comments").value;
      val1 = br_escape(val1);
        if(document.getElementsByName("bkm_comment_overwrite").item(0).checked==true) {
          var ov_pos_src = document.getElementById("bkm_comment_overwrite_pos");
          var ov_pos = ov_pos_src.getElementsByTagName("option").item(ov_pos_src.selectedIndex).value;
          if(ov_pos === "after") {
            bkm_body += `var tmpv1=m_diag_get_comment(cell);`;
            bkm_body += `m_diag_set_comment(cell, tmpv1 + "\\n\\n" + "${val1}");`;
          } else {
            bkm_body += `var tmpv1=m_diag_get_comment(cell);`;
            bkm_body += `m_diag_set_comment(cell, "${val1}"  + "\\n\\n" + tmpv1);`;
          }
        }else{
          bkm_body += `m_diag_set_comment(cell, "${val1}");`;
        }
    }
    
    if(bkm_descript_status_val=="0"){
      var val2 = document.getElementById("bkm_descript").value;
      val2 = br_escape(val2);
        if(document.getElementsByName("bkm_srccode_overwrite").item(0).checked==true) {
          bkm_body += `var tmpv2=m_diag_get_description(cell)`;
          bkm_body += `m_diag_set_description(cell, tmpv2 + "\\n\\n" + "${val2}");`
        }else{
          bkm_body += `m_diag_set_description(cell, ${val2}");`
        }
    }
    
    if(bkm_srccode_status_val=="0"){
      var val3 = document.getElementById("bkm_srccode").value;
      val3 = br_escape(val3);
      if(document.getElementsByName("bkm_srccode_overwrite").item(0).checked==true) {
        bkm_body += `var tmpv3=m_diag_get_srccode(cell);`;
        bkm_body += `m_diag_set_srccode(cell, tmpv3 + "\\n\\n" + "${val3}");`
      } else {
         bkm_body += `m_diag_set_srccode(cell, "${val3}");`
      }
    } else if(bkm_srccode_status_val=="2") {
      var patval = document.getElementById("regx_text").value;
      var repval = document.getElementById("regx_after_text").value;
      bkm_body += `var pat=new RegExp(/${patval}/);`;
      bkm_body += `var regx_before_text=m_diag_get_description(cell);`;
      bkm_body += `var regx_after_text=regx_before_text.replace(pat, "${repval}");`;
      bkm_body += `m_diag_set_srccode(cell, regx_after_text);`;
    }
    
    bkm_body += `}`;
    bkm_body += `}`;
    bkm_body += `}`;
    bkm_body += `}`;
    
    if(bkm_autosave_val=="0"){
        bkm_body += `save_survey_btn.click();`;
    }
  
    bkm_body += `})();`;
    document.getElementById("bkm_code").value = bkm_body;
  }

  //テキストエリアクリア
  function clear_this_text(obj){
      document.getElementById(obj).value = "";
  }

  //改行連続の統一
  function br_escape(str) {
    var ret = str.replace(/(\r\n|\n)/mg, "\\n");
    return ret;
  }