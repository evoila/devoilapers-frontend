#!/bin/sh

SAGGER_YAML_FILE="./swagger.json"

SWAGGER_API_OUTPUT_FOLDER="../src/app/rest/"
SWAGGER_API_OUTPUT_FILE=$SWAGGER_API_OUTPUT_FOLDER"api.ts"

echo "Download start your backend service"
# curl https://raw.githubusercontent.com/evoila/devoilapers-backend/main/api/swagger.json -o $SAGGER_YAML_FILE
curl -k https://127.0.0.1:8080/swagger/doc.json -o $SAGGER_YAML_FILE

# generate swagger api.ts
echo "Generate swagger code"
swagger-codegen generate -l typescript-angular -i $SAGGER_YAML_FILE --additional-properties supportsES6=true -o $SWAGGER_API_OUTPUT_FOLDER

# replace imports 
echo "Applying Workaround https://github.com/swagger-api/swagger-codegen/issues/10417"
# sed -i 's/import localVarRequest = require(\x27request\x27);/import localVarRequest from "request";/' $SWAGGER_API_OUTPUT_FILE
# sed -i 's/import http = require(\x27http\x27);/import http from "http";/' $SWAGGER_API_OUTPUT_FILE
sed -i 's/ModuleWithProviders {/ModuleWithProviders<ApiModule> {/' $SWAGGER_API_OUTPUT_FOLDER"api.module.ts"

echo "Deleting files"
rm $SAGGER_YAML_FILE

echo "Exit"