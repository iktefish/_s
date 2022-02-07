with import <nixpkgs> { };
let
  unstableTarball =
    fetchTarball
      https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  pkgsUnstable = import unstableTarball { };
  julia-ls-install = pkgs.writeShellScriptBin ''julia-ls-install'' '' julia --project=~/.julia/environments/nvim-lspconfig -e 'using Pkg; Pkg.add("LanguageServer")' '';
  julia-ls-update = pkgs.writeShellScriptBin ''julia-ls-update'' '' julia --project=~/.julia/environments/nvim-lspconfig -e 'using Pkg; Pkg.update()' '';
  julia-initiate = pkgs.writeShellScriptBin ''julia-initiate'' '' julia --project=$PROJECT_ROOT -e 'using Pkg; Pkg.instantiate()' '';
  

in
stdenv.mkDerivation {
  name = "julia";
  buildInputs = with pkgsUnstable; [
    julia-bin

    julia-ls-install
    julia-ls-update
    julia-initiate
  ];
}
