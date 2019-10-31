!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "UnstoppableBrowser" "Software\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\UnstoppableBrowser" "" "UnstoppableBrowser HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\UnstoppableBrowser\Application" "AppUserModelId" "UnstoppableBrowser"
  WriteRegStr SHCTX "SOFTWARE\Classes\UnstoppableBrowser\Application" "ApplicationIcon" "$INSTDIR\UnstoppableBrowser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\UnstoppableBrowser\Application" "ApplicationName" "UnstoppableBrowser"
  WriteRegStr SHCTX "SOFTWARE\Classes\UnstoppableBrowser\Application" "ApplicationCompany" "UnstoppableBrowser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\UnstoppableBrowser\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\UnstoppableBrowser\DefaultIcon" "DefaultIcon" "$INSTDIR\UnstoppableBrowser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\UnstoppableBrowser\shell\open\command" "" '"$INSTDIR\UnstoppableBrowser.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "UnstoppableBrowser" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "UnstoppableBrowser" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser" "" "UnstoppableBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\DefaultIcon" "" "$INSTDIR\UnstoppableBrowser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities" "ApplicationName" "UnstoppableBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities" "ApplicationIcon" "$INSTDIR\UnstoppableBrowser.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities\FileAssociations" ".htm" "UnstoppableBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities\FileAssociations" ".html" "UnstoppableBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities\URLAssociations" "http" "UnstoppableBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities\URLAssociations" "https" "UnstoppableBrowser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\Capabilities\StartMenu" "StartMenuInternet" "UnstoppableBrowser"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser\shell\open\command" "" "$INSTDIR\UnstoppableBrowser.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\UnstoppableBrowser"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\UnstoppableBrowser"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "UnstoppableBrowser"
!macroend