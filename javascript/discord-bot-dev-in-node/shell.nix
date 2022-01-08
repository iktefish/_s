with import <nixpkgs> {};
let 
  unstableTarball =
    fetchTarball
      https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  pkgsUnstable = import unstableTarball {};
  nodeNix = import ~/Arcane/_n/node/default.nix {};
  html-languageserver = pkgs.writeShellScriptBin ''vscode-html-language-server'' ''html-languageserver "$@"'';
  css-languageserver = pkgs.writeShellScriptBin ''vscode-css-language-server'' ''css-languageserver "$@"'';
  prettier = pkgs.writeShellScriptBin ''prettier'' ''$HOME/Arcane/_s/javascript/discord-bot-dev-with-node/node_modules/.bin/prettier "$@"'';
  eslint = pkgs.writeShellScriptBin ''eslint'' ''$HOME/Arcane/_s/javascript/discord-bot-dev-with-node/node_modules/.bin/eslint "$@"'';
  scripts = pkgs.writeShellScriptBin ''scripts'' ''jq ".scripts" package.json'';
  run = pkgs.writeShellScriptBin ''run'' ''exec npm run "$@"'';

in stdenv.mkDerivation {
  name = "node";
  buildInputs = with pkgsUnstable; [
    jq
    nodejs
    nodeNix.typescript
    nodeNix.typescript-language-server
    nodeNix.vscode-html-languageserver-bin
    nodeNix.vscode-css-languageserver-bin
    nodeNix.emmet-ls
    html-languageserver
    css-languageserver
    prettier
    eslint 
    scripts
    run
  ];
}
