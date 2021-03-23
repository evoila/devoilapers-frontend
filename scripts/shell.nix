{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
	name="service-manager-frontend-dev-environment";
	buildInputs = [
    nodejs

    # For Dev
    # nodePackages.tslint
    nodePackages.typescript
    nodePackages.typescript-language-server

    swagger-codegen

    # IDE
    emacs
    chromium

	];
	shellHook = ''
		export BROWSER=chromium
		export CHROME_BIN=chromium
		alias swagger-codegen-update-api="sh scripts/SwaggerClientTsUpdate.sh"
	'';
}
