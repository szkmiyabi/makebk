javascript:(function(){
	var diag_tbl = diag_tbl = document.querySelector('#cmtTable');
	var save_survey_btn = document.querySelector('button[name="update"]');
	var hash = {"0": "未判定","1": "はい","9": "はい(注記)","2": "いいえ","3": "なし"};
	var tab_sp = "<bkmk:tab>";
    var br_sp = "<bkmk:br>";
    var data_tab_sp = "<bkmk:data:tab>";
    var data_br_sp = "<bkmk:data:br>";
    var text_clean = function(str) {
	    str=str.replace(/^ +/m,"");
	    str=str.replace(/\t+/m,"");
	    str=str.replace(/(\r\n|\r|\n)/g,""); 
	    return str;
	};
	var br_encode = function(str) {return str.replace(/(\r|\n|\r\n)/mg, br_sp);};
	var br_decode = function(str) {return str.replace(new RegExp(this.br_sp, "mg"), "\r\n");};
	var m_diag_result = function(cell) {return cell.querySelector('select[id^="result_"]');};
	var m_diag_comment =function(cell) {return cell.querySelector('textarea[id^="comment"]');};
	var m_diag_description = function(cell) {return cell.querySelector('textarea[id^="src_"]')};
	var m_diag_srccode = function(cell) {return cell.querySelector('textarea[id^="updsrc_"]')};
	var m_diag_exists_ta = function(tr) {
		if(tr.querySelectorAll('textarea').length > 0) return true;
		else return false;
	};
	var get_survey_key = function(key_val) {
		var ret_key = "";
		for(var key in hash) {
			var val = hash[key];
			if(key_val == val) {
				ret_key = key;
				break;
			}
		}
		return ret_key;
	};
	var m_diag_get_text = function(cell) {
		var txt = cell.innerHTML;
		var pt = new RegExp(/^([^<].+?)(<)/);
		if(pt.test(txt)) {
			return txt.match(pt)[1];
		} else {
			return txt;
		}
	};
	var m_diag_get_survey = function(cell) {
		var key = "";
		var obj = m_diag_result(cell);
		var opts = obj.getElementsByTagName("option");
		var idx = obj.selectedIndex;
		for(var j=0; j<opts.length; j++) {
			var opt = opts[j];
			if(j == idx) {
				key = opt.value;
				break;
			}
		}
		return this.hash[key];
	};
	var m_diag_get_comment = function(cell) {return m_diag_comment(cell).value;};
	var m_diag_get_description = function(cell) {return m_diag_description(cell).value;};
	var m_diag_get_srccode = function(cell) {return m_diag_srccode(cell).value;};
	var m_diag_set_survey = function(cell, flag) {
		var obj = m_diag_result(cell);
		var key = get_survey_key(flag);
		var opts = obj.getElementsByTagName("option");
		for(var j=0; j<opts.length; j++) {
			var opt = opts[j];
			if(opt.value == key) {
				obj.selectedIndex = j;
				break;
			}
		}
	};
	var m_diag_set_comment = function(cell, str) {m_diag_comment(cell).value = str;};
	var m_diag_set_description = function(cell, str) {m_diag_description(cell).value = str;}
	var m_diag_set_srccode = function(cell, str) {m_diag_srccode(cell).value = str;};
	var trs = diag_tbl.rows;
	var ta_cnt = 0;
	var s_cnt = 0;
	var ta_cnt_idx = 1;
	var s_cnt_idx = 1;
	var s_all_cnt_flg = "all";
	var ta_all_cnt_flg = "all";
	for(var i=1; i<trs.length; i++) {
		s_cnt = i;
		var tr = trs[i];
		if(m_diag_exists_ta(tr)) ta_cnt++;
		for(var j=0; j<tr.cells.length; j++) {
			var cell = tr.cells[j];
			if(j==2) {
				if(s_cnt == s_cnt_idx || s_all_cnt_flg == "all") {
					m_diag_set_survey(cell, "いいえ");		
				}
			} else if(j==3) {
				if(ta_cnt == ta_cnt_idx || ta_all_cnt_flg == "all") {
					m_diag_set_comment(cell, "comment");
					m_diag_set_description(cell, "description");
					m_diag_set_srccode(cell, "srccode");
				}
			}
		}
	}

})();