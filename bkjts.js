function includeHTML() {
  var z, i, elmnt, file, xhttp;
  //Loop through a collection of all HTML elements:
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    //search for elements with a certain atrribute:
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      // Make an HTTP request using the attribute value as the file name:
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          elmnt.innerHTML = this.responseText;
        }
        if (this.status == 404) {
          elmnt.innerHTML = "No Data";
        }
        // Remove the attribute, and call this function once more:
        elmnt.removeAttribute("w3-include-html");
        includeHTML();
      };

      xhttp.open("GET", file, true);
      xhttp.send();
      // Exit the function:
      return;
    }
  }
}

function int2str(num) {
  if (isNaN(num)) {
    console.warn("Empty Number!!");
  } else {
    if (num <= 9) {
      var str = "0" + num.toString();
    } else {
      var str = num.toString();
    }
    return str;
  }
}

function dow2eng(dow) {
  var tmp_dow = " ";

  if ((dow & 64) == 64) {
    tmp_dow += "Su";
  }
  if ((dow & 32) == 32) {
    tmp_dow += "Mo";
  }
  if ((dow & 16) == 16) {
    tmp_dow += "Tu";
  }
  if ((dow & 8) == 8) {
    tmp_dow += "We";
  }
  if ((dow & 4) == 4) {
    tmp_dow += "Th";
  }
  if ((dow & 2) == 2) {
    tmp_dow += "Fr";
  }
  if ((dow & 1) == 1) {
    tmp_dow += "Sa";
  }

  return tmp_dow;

}


function code2time(alarm_code) {
  var en, hh, mm, dow;
  var i, time_format;
  mm = int2str(alarm_code % 100);
  alarm_code = alarm_code / 100;
  hh = int2str(alarm_code % 100);
  alarm_code = alarm_code / 100;
  en = alarm_code % 10;
  dow = alarm_code / 10;
  mm = Math.floor(mm);
  hh = Math.floor(hh);
  en = Math.floor(en);
  dow = Math.floor(dow);
  return {
    hh: hh,
    mm: mm,
    en: en,
    dow: dow
  };
}

function genTimeFormat(tf_hh, tf_mm, tf_en, tf_dow) {
  var time_format = int2str(tf_hh) + ":" + int2str(tf_mm) + " " + tf_dow;
  if (tf_en == 1) {
    time_format = time_format + "==> ENABLED";
  } else {
    time_format = time_format + "==> DISABLED";
  }
  return time_format;
}

function dow2bits(dow) {
  var Su, Mo, Tu, We, Th, Fr, Sa = false;

  if ((dow & 64) == 64) {
    Su = true;
  }
  if ((dow & 32) == 32) {
    Mo = true;
  }
  if ((dow & 16) == 16) {
    Tu = true;
  }
  if ((dow & 8) == 8) {
    We = true;
  }
  if ((dow & 4) == 4) {
    Th = true;
  }
  if ((dow & 2) == 2) {
    Fr = true;
  }
  if ((dow & 1) == 1) {
    Sa = true;
  }
  var tmp_dow = [Su, Mo, Tu, We, Th, Fr, Sa];
  return tmp_dow;
}

function getConfig(url, callback) {
  if (window.XMLHttpRequest) {
    var xmlhttp = new XMLHttpRequest();
  } else {
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadyState = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function putConfig(url, data, callback) {
  if (window.XMLHttpRequest) {
    var xmlhttp = new XMLHttpRequest();
  } else {
    var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadyState = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("PUT", url, true);
  xmlhttp.send(JSON.stringify(data));
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


function genValues(getElem, getType) {
  var tmpElem = getElem + getType;
  var bkj_dom = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Hr", "Mi", "En"];
  bkj_dom[0] = tmpElem + "Su";
  bkj_dom[1] = tmpElem + "Mo";
  bkj_dom[2] = tmpElem + "Tu";
  bkj_dom[3] = tmpElem + "We";
  bkj_dom[4] = tmpElem + "Th";
  bkj_dom[5] = tmpElem + "Fr";
  bkj_dom[6] = tmpElem + "Sa";
  bkj_dom[7] = tmpElem + "Hour";
  bkj_dom[8] = tmpElem + "Min";
  bkj_dom[9] = tmpElem + "En";
  var bkj_TimeValue = 0;
  var isError = false;
  var error = "";
  if (parseInt(document.getElementById(bkj_dom[7]).value) < 0 || parseInt(document.getElementById(bkj_dom[7]).value) > 23) {
    error = error + " Invalid " + bkj_dom[7];
    console.log(parseInt(document.getElementById(bkj_dom[7]).value));
    isError = 1;
  }
  if (parseInt(document.getElementById(bkj_dom[8]).value) < 0 || parseInt(document.getElementById(bkj_dom[8]).value) > 59) {
    error = error + " Invalid " + bkj_dom[8];
    isError = 1;
  }

  if (isError == 0) {
    for (var p = 0; p < 7; p++) {
      r = document.getElementById(bkj_dom[p]).checked;
      if (r == true) {
        bkj_TimeValue = bkj_TimeValue + parseInt(document.getElementById(bkj_dom[p]).value);
      }
    }
    if (bkj_TimeValue == 0) {
      bkj_TimeValue = 127;
    }
    bkj_TimeValue = bkj_TimeValue * 100000;
    if (document.getElementById(bkj_dom[9]).checked == true) {
      bkj_TimeValue = bkj_TimeValue + 10000;
    }
    bkj_TimeValue = bkj_TimeValue + (parseInt(document.getElementById(bkj_dom[7]).value) * 100);
    bkj_TimeValue = bkj_TimeValue + (parseInt(document.getElementById(bkj_dom[8]).value));
  } else {
    window.alert(error);
    return "Err";
  }
  return bkj_TimeValue;
}

function myAlarmButton() {
  console.log("Alarm button clicked !");
  var alarm1OnTime, alarm1OffTime, alarm2OnTime, alarm2OffTime = 0;
  var elem = "alarm";
  var type = "On";
  var error = "";
  var isError = 0;

  elem = "alarm1";
  alarm1OnTime = genValues(elem, "On");
  console.log("alarm1OnTime:" + alarm1OnTime);
  if (alarm1OnTime == "Err") {
    return;
  }
  alarm1OffTime = genValues(elem, "Off");
  console.log("alarm1OffTime:" + alarm1OffTime);
  if (alarm1OnTime == "Err") {
    return;
  }
  elem = "alarm2";
  alarm2OnTime = genValues(elem, "On");
  console.log("alarm2OnTime:" + alarm2OnTime);
  if (alarm2OnTime == "Err") {
    return;
  }
  alarm2OffTime = genValues(elem, "Off");
  console.log("alarm2OffTime:" + alarm2OffTime);
  if (alarm2OffTime == "Err") {
    return;
  } else {
    if (isNaN(alarm2OffTime)) {
      console.log("Empty");
    }
  }
  var data = {
    alarm1OnTime: alarm1OnTime,
    alarm1OffTime: alarm1OffTime,
    alarm2OnTime: alarm2OnTime,
    alarm2OffTime: alarm2OffTime
  };

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      console.log(key + "->" + data[key]);
    }
  }

  // Send JSON data to server using POST.
  var xhr = new XMLHttpRequest();
  var url = "/saveAlarmSettings";

  xhr.onreadystatechange = function() {
    if (this.onreadyState == 4 && this.status == 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.open("POST", url, true);
  xhr.send(JSON.stringify(data));
  window.alert("Redirecting...");
  location.href = "settings.htm";

  /*
  putConfig("saveAlarmSettings", data, function(response) {
    console.log(response);
    alert(response);
  });
  */
}

function mySsidButton() {
  console.log("Ssid button clicked !");
  var tsSsid = document.getElementById("setSSID").value;
  var tsPwd = document.getElementById("setPWD").value;
  var tsName = document.getElementById("setmyName").value;
  var data = {
    tsSsid: tsSsid,
    tsPwd: tsPwd,
    tsName: tsName
  };

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      console.log(key + "->" + data[key]);
    }
  }

  // Send JSON data to server using POST.
  var xhr = new XMLHttpRequest();
  var url = "saveSsidSettings";

  xhr.onreadystatechange = function() {
    if (this.onreadyState == 4 && this.status == 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.open("POST", url, true);
  xhr.send(JSON.stringify(data));
  alert("SSID settings saved. Will attempt to connect to " + tsSsid);
  /*
  putConfig("/saveSsidSettings", data, function(response) {
    console.log(response);
    alert(response);
  });*/
}