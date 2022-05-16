/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    tools { nodejs 'NodeJs' }
    stages {
        stage('Test Npm') {
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
        // stage('Deploy') {
        //     steps {
        //         sh 'sudo rm -rf /var/www/ts-notes-app'
        //         sh "cd ${WORKSPACE} && ls"
        //         sh "sudo cp -r ${WORKSPACE}/client/dist/ /var/www/ts-notes-app"
        //         // sh "sudo cp -r ${WORKSPACE}/ /home/jmismail/" // Copy all
        //         sh "cd ${WORKSPACE}/ && ls"
        //         // sh 'sudo cp -r !(client) /home/jmismail/'
        //         sh "sudo rsync -av --progress --exclude='client' ${WORKSPACE}/ /home/jmismail/ts-notes-app"
        //     }
        // }
        stage('Deploy') {
            steps {
                sh "cd ${WORKSPACE}"
                /* groovylint-disable-next-line LineLength */
                sh "sudo rsync -avr -e 'ssh -l jmismail' --exclude='client' . jmismail@192.168.2.126:/home/jmismail/ts-notes-app"
                sh "cd ${WORKSPACE}/client/dist && pwd"
                /* groovylint-disable-next-line LineLength */
                sh "sudo rsync -avr -e 'ssh -l jmismail' * jmismail@192.168.2.126:/var/www/ts-notes-app"
            }
        }
    }
}
