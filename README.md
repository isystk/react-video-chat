๐ react-video-chat
====

[![CircleCI](https://circleci.com/gh/isystk/react-video-chat/tree/master.svg?style=svg)](https://circleci.com/gh/isystk/react-video-chat/tree/master)
![GitHub issues](https://img.shields.io/github/issues/isystk/react-video-chat)
![GitHub forks](https://img.shields.io/github/forks/isystk/react-video-chat)
![GitHub stars](https://img.shields.io/github/stars/isystk/react-video-chat)
![GitHub license](https://img.shields.io/github/license/isystk/react-video-chat)

## ๐ ใใญใธใงใฏใใฎๆฆ่ฆ

React.js(Next.js)ใงไฝๆใใใใใช&ใใฃใใใขใใชใฑใผใทใงใณใงใใ<br/>
ใใฃใใๆฉ่ฝใฏใAWS Lambda ใฎ WebSocketๆฉ่ฝใๅฉ็จใใฆใใพใใ<br/>
ใใใช้่ฉฑใซใฏใAWS Kinesis Video Streamใๅฉ็จใใฆใใพใใ

## ๐ Demo

https://react-video-chat-isystk.vercel.app

![ๆ็จฟ็ป้ข](./app.png "ๆ็จฟ็ป้ข")


## ๐ฆ ใใฃใฌใฏใใชๆง้ 

```
.
โโโ LICENSE
โโโ README.md
โโโ app.png
โโโ aws-sam
โ   โโโ layers
โ   โโโ onconnect
โ   โโโ ondisconnect
โ   โโโ samconfig.toml
โ   โโโ sendmessage
โ   โโโ template.yaml
โโโ jest.config.js
โโโ next-env.d.ts
โโโ next.config.js
โโโ node_modules
โโโ public
โ   โโโ apple-touch-icon.png
โ   โโโ favicon.ico
โ   โโโ images
โ   โโโ manifest.json
โ   โโโ ogp-image.png
โ   โโโ sounds
โโโ src
โ   โโโ @types
โ   โโโ API.ts๏ผamplify๏ผ
โ   โโโ assets
โ   โโโ aws-exports.js๏ผamplify๏ผ
โ   โโโ components
โ   โโโ constants
โ   โโโ graphql๏ผamplify๏ผ
โ   โโโ models๏ผamplify๏ผ
โ   โโโ pages
โ   โโโ services
โ   โโโ stores
โ   โโโ utils
โโโ tsconfig.jest.json
โโโ tsconfig.json
โโโ yarn.lock
```

## ๐๏ธ ็ฐๅขๆง็ฏ

IAM ใฆใผใถใผใ็จๆใใ
```
ใฆใผใถๅ๏ผใlambda-userใ
ใขใฏใปในๆจฉ้๏ผ
ใAmazonKinesisVideoStreamsFullAccessใ
ใAdministratorAccessใ
```

SAMใณใใณใใใคใณในใใผใซใใ
```
$ pip install aws-sam-cli
```

AWSใซใDynamoDBใLambda&APIGatewayใCFnใงๆง็ฏใใ
```
$ WebSocket - AWS ใฎ API Gateway ใจ Lambda ใงใซใผใ ๆฉ่ฝไปใใฎchatใไฝใๆใฎไปๆงใ่ใใ
$ sam build
$ sam deploy --config-env stg
```
[{"M":{"icon":{"S":"avatar"},"connectionId":{"S":"Wxs75dHHNjMCElA="},"username":{"S":"taro"}}},{"M":{"icon":{"S":"avatar"},"connectionId":{"S":"Wxs9XdooNjMCIcA="},"username":{"S":"taro"}}}]
WebSocketใฎๅไฝใ็ขบ่ชใใ
```
$ wscat -c wss:///xxxxxx.execute-api.ap-northeast-1.amazonaws.com/Prod?roomId=test
Connected (press CTRL+C to quit)
< { "action": "sendmessage", "data": {"type": "test", "value": "hello world" }}
```

AWSใใใDynamoDBใLambda&APIGatewayใๅ้คใใ
```
$ cd aws-sam
$ sam delete --stack-name reactVideoChat
```

Amplify ใฎ็ฐๅขใๆง็ฏใใ
```
$ amplify pull --appId d1gaaytviiyq79 --envName dev
```

## ๐ฌ ไฝฟใๆน

```
$ cp .env.example .env
$ yarn
$ yarn dev
```

## ๐จ ๅ่

| ใใญใธใงใฏใ| ๆฆ่ฆ|
| :---------------------------------------| :-------------------------------|
| [Material Icons](https://v4.mui.com/components/material-icons/)| Material Icons |
| [Amazon Kinesis Video Streams WebRTC ใๅใใใฆใฟใ](https://qiita.com/massie_g/items/b6d3513d06a28ba89677)| Amazon Kinesis Video Streams WebRTC ใๅใใใฆใฟใ |
| [Amazon Kinesis Video Streams WebRTC ใง็ก็ใใ่คๆฐไบบใฎใใใชใใฃใใใไฝใ](https://qiita.com/massie_g/items/4cdf475ab623757a2630)| Amazon Kinesis Video Streams WebRTC ใง็ก็ใใ่คๆฐไบบใฎใใใชใใฃใใใไฝใ |
| [WebSocket - AWS ใฎ API Gateway ใจ Lambda ใงใซใผใ ๆฉ่ฝไปใใฎchatใไฝใๆใฎไปๆงใ่ใใ](https://qiita.com/anfangd/items/ebcd77173341b10b3684)| WebSocket - AWS ใฎ API Gateway ใจ Lambda ใงใซใผใ ๆฉ่ฝไปใใฎchatใไฝใๆใฎไปๆงใ่ใใ |


## ๐ซ Licence

[MIT](https://github.com/isystk/react-video-chat/blob/master/LICENSE)

## ๐ Author

[isystk](https://github.com/isystk)

