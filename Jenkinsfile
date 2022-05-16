/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    tools { nodejs 'NodeJs' }
    environment {
        SERVER_IP_ADDRESS = credentials('server-ip-address')
    }
    stages {
        stage('Check') {
            steps {
                sh '''
                    npm --version
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                   npm install
                   npm run build
                   cd client/
                   npm install --force
                   npm run build
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh "cd ${WORKSPACE}"
                /* groovylint-disable-next-line GStringExpressionWithinString, LineLength */
                sh 'sudo rsync -avr -e "ssh -l jmismail" --exclude="client". jmismail@$SERVER_IP_ADDRESS:/home/jmismail/ts-notes-app'
                /* groovylint-disable-next-line , GStringExpressionWithinString, LineLength */
                sh 'sudo rsync -avz --stats --rsync-path="echo toor | sudo -Sv && sudo rsync" ${WORKSPACE}/client/dist/ jmismail@$SERVER_IP_ADDRESS:/var/www/ts-notes-app/'
            }
        }
    }
}
