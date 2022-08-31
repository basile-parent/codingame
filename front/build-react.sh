#!/usr/bin/env sh
set -x
set -e

JENKINS_HOME="/var/jenkins_home"
APPLICATION_NAME=$1
WORKSPACE=$2/$APPLICATION_NAME/front

EXPORT_FOLDER=$JENKINS_HOME/export_react_builds/$APPLICATION_NAME

# Create and clear destination folder
mkdir -p $EXPORT_FOLDER
rm -rf $EXPORT_FOLDER/*

# Copy configuration
cp -r /opt/configuration/$APPLICATION_NAME/.env.prod $WORKSPACE/.env

# Building sources
cd $WORKSPACE
npm install
#npm run test
npm run build

# Deploy the build
cp -rf $WORKSPACE/dist/* $EXPORT_FOLDER

set +x