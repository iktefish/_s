{pkgs ? import <nixpkgs> {}}:
with pkgs;
  mkShell {
    name = "nannou";
    shellHook = ''export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:${pkgs.lib.makeLibraryPath [
        pkgs.alsaLib
        pkgs.udev
        pkgs.vulkan-loader
        xorg.libX11
        xorg.libXcursor
        xorg.libXrandr
        xorg.libXi
      ]}"'';
    buildInputs = [
      cargo
      pkgconfig
      udev
      alsaLib
      lutris
      xlibsWrapper
      xorg.libXcursor
      xorg.libXrandr
      xorg.libXi
      vulkan-tools
      vulkan-headers
      vulkan-loader
      vulkan-validation-layers
    ];
  }
