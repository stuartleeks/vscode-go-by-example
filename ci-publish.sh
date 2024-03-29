#!/bin/bash

docker build -t vscode-go-by-example-devcontainer -f ./.devcontainer/Dockerfile ./.devcontainer
docker run -v ${PWD}:/workspaces/vscode-go-by-example -e MARKETPLACE_PUBLISH_PAT --workdir /workspaces/vscode-go-by-example vscode-go-by-example-devcontainer bash -c "yarn install && yarn package-web && yarn run publish"
