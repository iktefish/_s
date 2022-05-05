with import <nixpkgs> { };
let
  unstableTarball =
    fetchTarball
      https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  pkgsUnstable = import unstableTarball { };
  ebiten = buildGoModule {
    src = fetchFromGitHub
      { } + "github.com/hajimehoshi/ebiten/v2";
  };

in
stdenv.mkDerivation {
  name = "go";
  buildInputs = with pkgsUnstable; [
    gcc
    mesa
    xorg.libX11
    xorg.libXrandr
    xorg.libXcursor
    xorg.libXinerama
    xorg.libXi
    xorg.libXxf86vm
    xorg.libXext # for Xge.h
    xorg.libxcb
    libGL
    alsa-lib
    pkg-config

    go
    gopls
  ];
}
