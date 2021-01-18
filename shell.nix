{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
	name="dev-environment";
	buildInputs = [
		nodejs

		# dev tools
		vscodium
		git
		swagger-codegen
		chromium
	];
	shellHook = ''
		shopt -s expand_aliases
		export BROWSER=chromium
		export CHROME_BIN=chromium
		alias install="npm install"
		alias run="npm start"
		alias test="npm test"
		alias updateAPI="sh scripts/SwaggerClientTsUpdate.sh"
		codium .
	'';
}