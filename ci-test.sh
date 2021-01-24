#!/bin/bash

docker build -t vscode-go-by-example-devcontainer -f ./.devcontainer/Dockerfile ./.devcontainer
docker run -v ${PWD}:/workspaces/vscode-go-by-example --workdir /workspaces/vscode-go-by-example vscode-go-by-example-devcontainer bash -c "yarn run pretest"
