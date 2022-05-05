with import <nixpkgs> { };
let
  unstableTarball =
    fetchTarball
      https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  pkgsUnstable = import unstableTarball { };
  nodeNix = import ~/Arcane/_n/node/default.nix { };
  hardhat = pkgs.writeShellScriptBin ''hardhat'' ''$PROJECT_ROOT/node_modules/.bin/hardhat'';
  ts-node = pkgs.writeShellScriptBin ''ts-node'' ''$PROJECT_ROOT/node_modules/.bin/ts-node "$@"'';
  scripts = pkgs.writeShellScriptBin ''scripts'' ''jq ".scripts" package.json'';
  run = pkgs.writeShellScriptBin ''run'' ''exec npm run "$@"'';

in
stdenv.mkDerivation {
  name = "node";
  buildInputs = with pkgsUnstable; [
    nodejs
    nodePackages.typescript
    nodePackages.typescript-language-server
    nodePackages.vscode-langservers-extracted
    nodeNix.emmet-ls

    jq

    hardhat
    ts-node
    scripts
    run
  ];
}
