#!/bin/sh

SAGGER_YAML_FILE="./swagger.yaml"

SWAGGER_API_OUTPUT_FOLDER="../src/api/"
SWAGGER_API_OUTPUT_FILE=$SWAGGER_API_OUTPUT_FOLDER"api.ts"

echo "Download"
curl https://raw.githubusercontent.com/evoila/devoilapers-backend/main/api/swagger.yaml -o $SAGGER_YAML_FILE

# generate swagger api.ts
echo "Generate swagger code"
swagger-codegen generate -l typescript-node -i $SAGGER_YAML_FILE --additional-properties supportsES6=true -o $SWAGGER_API_OUTPUT_FOLDER

# replace imports 
echo "Fix Imports"
sed -i 's/import localVarRequest = require(\x27request\x27);/import localVarRequest from "request";/' $SWAGGER_API_OUTPUT_FILE
sed -i 's/import http = require(\x27http\x27);/import http from "http";/' $SWAGGER_API_OUTPUT_FILE

echo "Deleting files"
rm $SAGGER_YAML_FILE

echo "Exit"