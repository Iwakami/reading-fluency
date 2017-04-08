// // GET_USER.then(console.log)
document.querySelector('input[type=submit]').addEventListener('click', () => {
  let content = document.querySelector('textarea[name=content]').value;

  fetch('//web.ics.purdue.edu/~peter438/rfs/api.php/segment', {
    method: 'POST',
    body: JSON.stringify({
      text: content
    })
  })
    .then(response => response.json())
    .then(console.log);
});

// // t = title
// var t = $_POST["title"]
// var $txt = $t.".txt"
// // c = content
// var $c = $_POST["content"]
// // ic = invalid characters
// var $ic = array("\t",".","。"," ","　",",","、","!","！","?","？",";","；",":","：","\"","”","「","」","・","(","（","）",")","'","[","]","\n","\r\n","\r"," "," ")
// // nic = no invalid characters
// $nic = str_replace($ic, "", $c)
// $niclen = mb_strlen($nic)
// // jt = Japanese Text
// $jt = $_POST["jt"]
// // jchrc = Japanese Character Count
// $jchrc = 0
// // Mora Count
// $mc = 0

// file_put_contents($txt,$c)

// echo "Have your readers use your title (<b>".$t."</b>) to retreive this reading passage.<br><br>"

// echo "Total Character Count: <b>".$niclen."</b><br>"
// if ($jt == "jt"){
// 	$c = segment_jtext($c)
// 	$lines = explode("\n",$c)
// 	foreach($lines as $line){
// 		if(strpos($line, "記号") > 0 || $line == "EOS" || $line == ""){
// 			continue
// 		}
// 		else{
// 			$jchrc += 1
// 			// echo $line . "<br>"
// 			$readings = explode("\t",$line)
// 			$mc += mb_strlen($readings[1])
// 		}
// 	}
// 	echo "Total Mora Count: <b>".$mc."</b><br>"
// 	echo "Total Word Count: <b>".$jchrc."</b><br>(\"Words\" here are defined by a morphological analysis of the text using Purdue University's mecab service.)"
// }
// else {
// 	echo "Total Word Count: <b>".str_word_count($c)."</b><br>"
// }

// echo "<br><b>Title: ".$t."</b><br>"
// echo "<b><u>Text</u></b><br>".file_get_contents($txt)
