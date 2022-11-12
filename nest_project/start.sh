#!/bin/bash
npm install
brew install postgresql@14
brew services restart postgresql@14
npm run start:dev