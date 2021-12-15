with import <nixpkgs> {};
stdenv.mkDerivation {
    name = "rust";
    buildInputs = [
        rustc
        cargo
        rust-analyzer
        rustfmt
    ];
}
