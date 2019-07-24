#!/usr/bin/env bash

git pull origin dev
yarn install
NODE_ENV=svt forever restart app.js
