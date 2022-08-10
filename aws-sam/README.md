🌙 aws-lambda-posts
====

## 📦 ディレクトリ構造

```
.
├── docker （各種Daemon）
│   │
│   ├── awscli （Docker のDynamoDBへアクセスする為のAWS-CLIコンソール ）
│   └── docker-compose.yml
│
├── posts （SAMプロジェクト）
│   ├── data
│   ├── schema
│   ├── tests
│   ├── app.js
│   └── package.json
├── dc.sh （Dockerの起動用スクリプト）
├── samconfig.toml （SAM Deploy 用設定ファイル）
└── template.yaml （SAM テンプレート）
```

## 🔧 開発環境の構築

```
# AWS SAM CLIをインストール
$ brew tap aws/tap
$ brew install aws-sam-cli
$ sam --version

# Docker内のDynamoDBにアクセスする為の設定ファイルを作成する
$ aws configure --profile test
AWS Access Key ID [None]: test
AWS Secret Access Key [None]: test
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

## 🖊️ Docker 操作用シェルスクリプトの使い方

```
Usage:
  dc.sh [command] [<options>]

Options:
  stats|st                 Dockerコンテナの状態を表示します。
  init                     Dockerコンテナ・イメージ・生成ファイルの状態を初期化します。
  start                    すべてのDaemonを起動します。
  stop                     すべてのDaemonを停止します。
  build                    SAMでBuild&Invokeを実行します。
  --version, -v     バージョンを表示します。
  --help, -h        ヘルプを表示します。
```

## 💬 使い方

```
# DockerでDynamoDBを起動する
$ ./dc.sh start

# DynamoDBにテーブルを作成する
$ aws dynamodb create-table --cli-input-json file://app/schema/posts.json --endpoint-url http://localhost:8000  --billing-mode PAY_PER_REQUEST
$ aws dynamodb list-tables  --endpoint-url http://localhost:8000 
$ aws dynamodb scan --table-name posts  --endpoint-url http://localhost:8000
(テーブルを削除する場合)
$ aws dynamodb delete-table --table-name posts --endpoint-url http://localhost:8000

# APIを起動する（Expressを利用する場合）
$ ./dc.sh api-start

# APIを起動する (SAMを利用する場合)
$ sam build
$ sam local invoke
$ sam local start-api --env-vars task/env.json

# 登録
$ curl -X POST -H "Content-Type: application/json" -d @app/data/post.json http://localhost:3000/posts
# 一覧取得
$ curl http://127.0.0.1:3000/posts
# 単一取得
$ curl http://127.0.0.1:3000/posts/49e3de26-f28b-4140-becf-06d8b3279914/
# 更新
$ curl -X PUT -H "Content-Type: application/json" -d @app/data/post.json http://localhost:3000/posts/49e3de26-f28b-4140-becf-06d8b3279914/
# 削除
$ curl -X DELETE http://127.0.0.1:3000/posts/49e3de26-f28b-4140-becf-06d8b3279914/
```

### 本番環境（AWS） にデプロイ
```
# Layer（共通モジュール）をデプロイ
$ cd layer
$ zip -r ../layer.zip .
$ cd ..

# Layer.zip をS3にアップロード
$ aws s3 rm s3://aws-isystk-com-sam/aws-lambda-posts-layer/layer.zip
$ aws s3 cp ./layer.zip s3://aws-isystk-com-sam/aws-lambda-posts-layer/

# S3の Layer.zip をデプロイ
$ aws cloudformation delete-stack --stack-name aws-lambda-posts-layer
$ aws cloudformation deploy --stack-name aws-lambda-posts-layer --template-file layer-sam.yaml

# 作成されたLayerのArnは後で使うので確認しておく
$ aws cloudformation describe-stacks --stack-name aws-lambda-posts-layer --query "Stacks[].Outputs"

# Lambda をデプロイする
$ sam build
$ sam deploy

# 動作確認
"https://obew4p54y9.execute-api.ap-northeast-1.amazonaws.com/Prod/posts"
{"statusCode":200,"body":[{"id":"bbe53be9-79ee-4ba0-96d3-dc2d2a443b49","data":{"regist_datetime":"2022-06-03T08:03:50+00:00","description":"いいい","photo":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAA
・・・

# Lambdaを削除する
sam delete --stack-name web-rtc
```

## 🎨 参考

| プロジェクト| 概要|
| :---------------------------------------| :-------------------------------|
| [AWS SAM CLI 再入門 2021.08](https://qiita.com/hayao_k/items/7827c3778a23c514e196)| AWS SAM CLI 再入門 2021.08|
| [aws-sam-cliでLambda,DynamoDBのサーバーレスアプリケーション開発に入門してみる](https://qiita.com/umeneri/items/6fb3f7560f4a878f6dfd)| aws-sam-cliでLambda,DynamoDBのサーバーレスアプリケーション開発に入門してみる |
| [Lambda Layers をnode.js(SAM)で試してみる](https://qiita.com/monamu/items/96d63dd2151a8ab7e6cf)| Lambda Layers をnode.js(SAM)で試してみる |
| [serverless-expressでAPI GatewayからLambdaを実行する](https://zenn.dev/yuta_saito/articles/8b543a1957c375593ee5)| serverless-expressでAPI GatewayからLambdaを実行する |



## 🎫 Licence

[MIT](https://github.com/isystk/aws-lambda-posts/blob/master/LICENSE)

## 👀 Author

[isystk](https://github.com/isystk)
