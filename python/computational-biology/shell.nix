with import <nixpkgs> { };
let
  # unstableTarball =
  #   fetchTarball
  #     https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  # pkgsUnstable = import unstableTarball { };
  # nodeNix = import ~/Arcane/_n/node/default.nix { };
  pylsp = pkgs.writeShellScriptBin ''pylsp'' ''poetry run pylsp'';
  # python = pkgs.writeShellScriptBin ''python'' ''poetry run python "$@"'';

in
stdenv.mkDerivation {
  name = "python";
  buildInputs = with pkgs; [
    # nodePackages.vscode-langservers-extracted
    # nodeNix.emmet-ls

    nodePackages.pyright
    # python39Packages.pylsp-mypy
    python39Packages.black

    python39Full
    python39Packages.numpy
    python39Packages.matplotlib
    python39Packages.scipy
    # poetry
    # cmake
    # ninja
    # libstdcxx5
    # stdenv.cc.cc.lib
    # gcc
    # glibc
    # libcxx

    # pylsp
    # python
  ];
  # system = builtins.currentSystem;
  # shellHook = ''
  #   SOURCE_DATE_EPOCH=$(date +%s)
  #   export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:${stdenv.cc.cc.lib}/lib/libstdc++.so.6
  # '';
}
