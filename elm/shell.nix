with import <nixpkgs> {};
let nodeNix = import ~/Arcane/_n/node/default.nix {};
    html-languageserver = pkgs.writeShellScriptBin ''vscode-html-language-server'' ''html-languageserver "$@"'';
    css-languageserver = pkgs.writeShellScriptBin ''vscode-css-language-server'' ''css-languageserver "$@"'';
    elm = pkgs.writeShellScriptBin ''elm'' ''$HOME/Arcane/_s/elm/node_modules/.bin/elm "$@"'';
    elm-format = pkgs.writeShellScriptBin ''elm-format'' ''$HOME/Arcane/_s/elm/node_modules/.bin/elm-format "$@"'';
    elm-test = pkgs.writeShellScriptBin ''elm-test'' ''$HOME/Arcane/_s/elm/node_modules/.bin/elm-test "$@"'';
    scripts = pkgs.writeShellScriptBin ''scripts'' ''jq ".scripts" package.json'';
    run = pkgs.writeShellScriptBin ''run'' ''exec npm run "$@"'';

in stdenv.mkDerivation {
    name = "elm";
    buildInputs = [
        jq
        nodejs-16_x
        nodeNix.typescript
        nodeNix.typescript-language-server
        nodeNix.vscode-html-languageserver-bin
        nodeNix.vscode-css-languageserver-bin
        nodeNix.emmet-ls
        html-languageserver
        css-languageserver
        elm
        elm-format
        elm-test
        nodeNix."@elm-tooling/elm-language-server"
        scripts
        run
    ];
}
