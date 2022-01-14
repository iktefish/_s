with import <nixpkgs> { };
let
  unstableTarball =
    fetchTarball
      https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  pkgsUnstable = import unstableTarball { };

in
stdenv.mkDerivation {
  name = "rust";
  buildInputs = with pkgsUnstable; [
    rustc
    cargo
    rust-analyzer
    rustfmt
  ];
}
