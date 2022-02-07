with import <nixpkgs> { };
let
  unstableTarball =
    fetchTarball
      https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  pkgsUnstable = import unstableTarball { };
  nodeNix = import ~/Arcane/_n/node/default.nix { };
  ts-node = pkgs.writeShellScriptBin ''ts-node'' ''$PROJECT_ROOT/node_modules/.bin/ts-node "$@"'';
  tsc = pkgs.writeShellScriptBin ''tsc'' ''$PROJECT_ROOT/node_modules/.bin/tsc "$@"'';
  nodemon = pkgs.writeShellScriptBin ''nodemon'' ''$PROJECT_ROOT/node_modules/.bin/nodemon "$@"'';
  scripts = pkgs.writeShellScriptBin ''scripts'' ''jq ".scripts" package.json'';
  run = pkgs.writeShellScriptBin ''run'' ''exec npm run "$@"'';

in
stdenv.mkDerivation {
  name = "ts-node";
  buildInputs = with pkgsUnstable; [
    nodejs
    nodePackages.typescript
    nodePackages.typescript-language-server
    nodePackages.vscode-langservers-extracted
    nodeNix.emmet-ls

    jq

    ts-node
    tsc
    nodemon
    scripts
    run
  ];
}
