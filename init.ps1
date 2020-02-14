param(
    [switch] $Ssh
)

Push-Location $PSScriptRoot

try {
    $RemoteRoot = "https://gitlab.com/minds"

    if ($Ssh) {
        $RemoteRoot = "git@gitlab.com:minds"
    }

    # Clone the main repo
    git checkout master
    git pull

    # Setup the other repos
    git clone $RemoteRoot/front.git front --config core.autocrlf=input
    git clone $RemoteRoot/engine.git engine --config core.autocrlf=input
    git clone $RemoteRoot/sockets.git socket --config core.autocrlf=input

    if ($LastExitCode -ne 0) {
        throw "Something failed"
    }
}
catch {
    Pop-Location
    exit 1
}
finally {
    Pop-Location
    exit 0
}
