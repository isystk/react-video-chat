#! /bin/bash

DOCKER_HOME=./docker
DOCKER_COMPOSE="docker-compose -f $DOCKER_HOME/docker-compose.yml"

function usage {
    cat <<EOF
$(basename ${0}) is a tool for ...

Usage:
  $(basename ${0}) [command] [<options>]

Options:
  stats|st                 Dockerコンテナの状態を表示します。
  init                     Dockerコンテナ・イメージ・生成ファイルの状態を初期化します。
  start                    すべてのDaemonを起動します。
  stop                     すべてのDaemonを停止します。
  --version, -v     バージョンを表示します。
  --help, -h        ヘルプを表示します。
EOF
}

function version {
    echo "$(basename ${0}) version 0.0.1 "
}

case ${1} in
    stats|st)
        docker container stats
    ;;

    init)
        # 停止＆削除（コンテナ・イメージ・ボリューム）
        pushd $DOCKER_HOME
        docker-compose down --rmi all --volumes
    ;;

    start)
        $DOCKER_COMPOSE up -d
    ;;
    
    stop)
        pushd $DOCKER_HOME
        docker-compose down
        popd
    ;;

    api-start)
      pushd app
      yarn start
      popd
    ;;

    aws)
      case ${2} in
          local)
              $DOCKER_COMPOSE exec awscli /bin/bash
          ;;
          *)
              usage
          ;;
      esac
    ;;
    
    help|--help|-h)
        usage
    ;;

    version|--version|-v)
        version
    ;;
    
    *)
        echo "[ERROR] Invalid subcommand '${1}'"
        usage
        exit 1
    ;;
esac


