/*
 * line_transfer_for_gas
 * Forward gmail emails that match the conditions to LINE Notify.
 * GAS用LINE転送
 * 条件一致のgmailメールをLINE Notifyへ転送
 *
 * 参考1：特定のメールの内容を所属している LINE グループに自動連携する
 * https://qiita.com/triangleprism/items/197d486b595f4b62cff9
 *
 * 参考2：[GAS&LINE Notify]家族向けのメールをLINEグループに自動転送するGASを組んでみた 
 * https://note.com/shinya_kajigaya/n/n4cce3e5cf7ca
 */

/** スクリプトプロパティ */
const PROP = PropertiesService.getScriptProperties().getProperties();

/** LINE notify token */
const LINE_TOKEN = PROP.LINE_TOKEN;

/** 条件指定：メールタイトルに特定の文字列を含む、かつ、特定の送信者 */
const CONDITION = PROP.CONDITION;

/** 1分前～現在の新着メールを取得、トリガーをこれに合わせておく！！ */
const INTERVAL = PROP.INTERVAL;

/** LINEへ送信 */
function sendLine(Me) {
  if(Me.length <= 0) {
    return;
  }

  for(var i = Me.length-1; i >= 0; i--){
    const payload = {'message' : Me[i]};
    const options ={
      "method"  : "post",
      "payload" : payload,
      "headers" : {"Authorization" : "Bearer "+ LINE_TOKEN}
    };
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
  }
};

/** メインルーチン */
function main() {
  console.log("start!");

  /** 取得間隔 */
  var now_time= Math.floor(new Date().getTime() / 1000) ;//現在時刻を変換
  /** 分→秒に変換して+5秒しておく(0秒だと失敗しちゃうことがある) */
  var time_term = now_time - ((60 * INTERVAL) + 5);

  //検索条件指定
  var strTerms = 'after:' + time_term + ' '+ CONDITION;

  //取得
  console.log("make line:"+strTerms);
  var myThreads = GmailApp.search(strTerms);
  var myMsgs = GmailApp.getMessagesForThreads(myThreads);
  var valMsgs = [];
  console.log("valMsgs.count:"+valMsgs.length);
  for(var i in myMsgs){
    console.log("myMsgs["+i+"].count:"+myMsgs[i].length);
    for(var j in myMsgs[i]){
      if(!myMsgs[i][j].isStarred()){
        const temp = "\n【日付】: " +  Utilities.formatDate(myMsgs[i][j].getDate(), 'Asia/Tokyo', 'MM/dd HH:mm') // MM/dd HH:mm の形式で日時を表示
            + "\n【送信元】: " + myMsgs[i][j].getFrom() //送信元情報を取得
            + "\n【題】: " + myMsgs[i][j].getSubject() //メール件名を取得
            + "\n【本文】: \n" + myMsgs[i][j].getPlainBody().slice(0, 1000); //本文(1000文字まで)を通知
        valMsgs.push(temp);

        // line に送信したメールにはスターを付与する
        myMsgs[i][j].star();
      }
    }
  }
  console.log("send line:"+valMsgs.length+".");
  sendLine(valMsgs);

  console.log("end.");
}
