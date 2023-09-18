# LINE transfer for Google App Script
Forward gmail emails that match the conditions to LINE Notify.  
条件に一致するGMailメールをLINE Notifyへ転送します。  

## Overview:概要

GMailに届いたもののうち、条件に合ったものを自動でLINE Notifyに通知します。  
このコードをGoogle App Scriptに設置し、トリガーで指定時間ごと実行させることで、Gmailの条件一致を検索し、LINE Notifyへの通知を行います。

## Setting:設定方法

1. [LINE Notify](https://notify-bot.line.me/ja/)からアクセストークンを発行します。
1. GMailで自分のメールアドレスを開設します。
1. それとは別に判定条件メールアドレスを用意し、判定条件メールアドレスから自分のメールアドレスへ自動転送するように設定します。
1. 自分のGoogle App Scriptにindex.gsを設置します。
1. ⚙プロジェクト設定→スクリプト設定より以下を設定します。  
```
CONDITION  判定条件メールアドレスを指定する
INTERVAL  監視間隔を指定する（分）
LINE_TOKEN  LINE Notifyのアクセストークンを指定する
```
1. ⏰トリガーより以下を設定します。  
```
実行する関数  main
デプロイ時に実行  Head
イベントのソースを選択  main
時間ベースのトリガータイプを選択  分ベースのタイマー
時間の間隔を選択（分） （INTERVALより短い数字を指定します）
エラー通知設定  毎日通知を受け取る
```
1. 判定条件メールアドレスを送信元へ通知・設定します。

## Use:使い道

家族間に関わる各種手続きからのメールをLINEで共有するなどに用います。  

## Reference article:参考記事

* 参考1：[特定のメールの内容を所属している LINE グループに自動連携する](https://qiita.com/triangleprism/items/197d486b595f4b62cff9)  
* 参考2：[[GAS&LINE Notify]家族向けのメールをLINEグループに自動転送するGASを組んでみた](https://note.com/shinya_kajigaya/n/n4cce3e5cf7ca)  
