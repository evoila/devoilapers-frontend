{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
	name="service-manager-frontend-dev-environment";
	buildInputs = [
    nodejs
    swagger-codegen
	];
	shellHook = ''
		shopt -s expand_aliases
		export BROWSER=chromium
		export CHROME_BIN=chromium
		alias install="npm install"
		alias run="npm start"
		alias test="npm test"
		alias updateAPI="sh scripts/SwaggerClientTsUpdate.sh"
		alias build="npm run-script build"
		alias buildClean="rm -r dist"
		alias help="echo 'command: install, run, test, updateAPI, build, buildClean'"
    echo ""
		echo "type help to see all available commands"
	'';
}
