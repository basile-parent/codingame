pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Log env') {
            steps {
                sh 'env'
            }
        }
                stage('Build websocket node application') {
                    environment {
                        PORT=3340
                        FOLDER_NAME="codingame"
                        CONTAINER_TAG="node-codingame"
                        CONTAINER_NAME="codingame"
                    }
                    steps {
                        sh 'chmod +x ./back/build-node.sh'
                        sh "./back/build-node.sh $FOLDER_NAME $WORKSPACE $CONTAINER_TAG"

                        sh "docker_stop $CONTAINER_NAME"
                        sh "docker run -d -p $PORT:3000 -v /tmp:/tmp --name $CONTAINER_NAME $CONTAINER_TAG"
                    }
                }
                stage('Build front application') {
                    environment {
                        PORT=3330
                        FOLDER_NAME="codingame"
                    }
                    steps {
                        sh 'chmod +x ./front/build-react.sh'
                        sh "./front/build-react.sh $FOLDER_NAME $WORKSPACE"
                    }
                }
    }
}