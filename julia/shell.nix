with import <nixpkgs> { };
let
  unstableTarball =
    fetchTarball
      https://github.com/NixOS/nixpkgs/archive/nixos-unstable.tar.gz;
  pkgsUnstable = import unstableTarball { };
  julia-ls-install = pkgs.writeShellScriptBin ''julia-ls-install'' '' julia --project=~/.julia/environments/nvim-lspconfig -e 'using Pkg; Pkg.add("LanguageServer")' '';
  julia-ls-update = pkgs.writeShellScriptBin ''julia-ls-update'' '' julia --project=~/.julia/environments/nvim-lspconfig -e 'using Pkg; Pkg.update()' '';
  julia-instantiate = pkgs.writeShellScriptBin ''julia-initiate'' '' julia --project=$PROJECT_ROOT -e 'using Pkg; Pkg.instantiate()' '';
  julia-activate = pkgs.writeShellScriptBin ''julia-activate'' '' julia --project=$PROJECT_ROOT -e 'using Pkg; Pkg.activate()' '';

  # %% FHS for Julia
  fhsCommand = pkgs.callPackage /home/iktefish/Arcane/_n/julia/scientific-fhs {
    juliaVersion = "julia_165";
  };
  # %% End

in
stdenv.mkDerivation
{
  name = "julia";
  buildInputs = with pkgs; [
    # %% Julia
    (fhsCommand "julia" "julia")
    (fhsCommand "julia-bash" "bash")
    # %% End

    conda

    julia-ls-install
    julia-ls-update
    julia-instantiate
    julia-activate
  ];
}
