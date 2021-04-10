# Operator Automation Frontend (OPA-Frontend)
Operator Automation react Frontend

![Node.js](https://github.com/evoila/devoilapers-frontend/workflows/Node.js/badge.svg)

## Project structure
The project structure will probably change during the project.

- /src/api: Directory for swagger files (auto generated)
- /scripts: Directory for necessary scripts (i.e. build scripts)
- /.github: Directory for Github actions

## Script overview
- InstallSwaggerGenerator 
    - Software to generate a swagger api client out of a swagger.yaml from devoilappers-backend
    - Execute to generate api.ts 
    - devoilappers-backend api definition https://github.com/evoila/devoilapers-backend/blob/main/api/swagger.yaml
    - Details: https://github.com/swagger-api/swagger-codegen
    

## Getting started
Ensure you have Node.js **v14.15.4** installed.

### Build and run without IDE
1. Start the devoilapers-backend: https://github.com/evoila/devoilapers-backend/blob/main/ReadMe.md#build-and-run-without-ide
2. Open a Browser on https://127.0.0.1:8080/swagger/index.html and accept the self-signed certificate
3. Execute `npm install`
4. Execute `npm start`
5. Open a Browser on http://localhost:4200/

### Branch naming conventions
Use underscores to replace spaces or special characters

| Abbreviation                        | Description            |
| ------------                        | -----------            |
| feat/<ticket_or_issue_reference>    | Feature                |       
| bug/<ticket_or_issue_reference>     | Bug fix                |
| org/<ticket_or_issue_reference>     | Organizational         |
| junk/<any_title>                    | Experiment-branch      |
| release/<release_info>              | Stable releases        |
