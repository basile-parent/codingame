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
                        dir("back") {
                            sh 'chmod +x ./build-node.sh'
                            sh "./build-node.sh $FOLDER_NAME $WORKSPACE $CONTAINER_TAG"

                            sh "docker_stop $CONTAINER_NAME"
                            sh "docker run -d -p $PORT:3000 -v /tmp:/tmp --name $CONTAINER_NAME $CONTAINER_TAG"
                        }
                    }
                }
    }
}