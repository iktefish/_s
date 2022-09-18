with import <nixpkgs> {}; let
  ts-node = pkgs.writeShellScriptBin ''ts-node'' ''$PROJECT_ROOT/node_modules/.bin/ts-node "$@"'';
  tsc = pkgs.writeShellScriptBin ''tsc'' ''$PROJECT_ROOT/node_modules/.bin/tsc'';
  nodemon = pkgs.writeShellScriptBin ''nodemon'' ''$PROJECT_ROOT/node_modules/.bin/nodemon "$@"'';
  scripts = pkgs.writeShellScriptBin ''scripts'' ''jq ".scripts" package.json'';
  run = pkgs.writeShellScriptBin ''run'' ''exec npm run "$@"'';
in
  stdenv.mkDerivation {
    name = "nodejs";
    buildInputs = with pkgs; [
      jq
      ts-node
      tsc
      nodemon
      scripts
      run
    ];
  }
