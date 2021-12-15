with import <nixpkgs> {};
let nodeNix = import ~/Arcane/_n/node/default.nix {};
    html-languageserver = pkgs.writeShellScriptBin ''vscode-html-language-server'' ''html-languageserver "$@"'';
    css-languageserver = pkgs.writeShellScriptBin ''vscode-css-language-server'' ''css-languageserver "$@"'';
    scripts = pkgs.writeShellScriptBin ''scripts'' ''jq ".scripts" package.json'';
    run = pkgs.writeShellScriptBin ''run'' ''exec npm run "$@"'';

in stdenv.mkDerivation {
    name = "node";
    buildInputs = [
        jq
        nodejs
        nodeNix.typescript
        nodeNix.typescript-language-server
        nodeNix.vscode-html-languageserver-bin
        nodeNix.vscode-css-languageserver-bin
        nodeNix.diagnostic-languageserver
        nodeNix.emmet-ls
        nodeNix.prettier
        nodeNix.eslint_d
        html-languageserver
        css-languageserver
        scripts
        run
    ];
}
