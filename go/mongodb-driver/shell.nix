with import <nixpkgs> {}; let
  unstableTarball =
    fetchTarball
    https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  pkgsUnstable = import unstableTarball {};
  mongoGoDriver = buildGoModule {
    src =
      fetchFromGitHub
      {}
      + "github.com/mongodb/mongo-go-driver";
  };
  googleUuid = buildGoModule {
    src =
      fetchFromGitHub
      {}
      + "github.com/google/uuid";
  };
in
  stdenv.mkDerivation {
    name = "go-mongoDb";
    buildInputs = with pkgsUnstable; [
      go
      gopls
      graphviz
    ];
  }
