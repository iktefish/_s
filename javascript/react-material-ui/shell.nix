with import <nixpkgs> {}; let
  scripts = pkgs.writeShellScriptBin ''scripts'' ''jq ".scripts" package.json'';
  run = pkgs.writeShellScriptBin ''run'' ''exec npm run "$@"'';
in
  stdenv.mkDerivation {
    name = "material-ui";
    buildInputs = with pkgs; [
      jq
      scripts
      run
    ];
  }
