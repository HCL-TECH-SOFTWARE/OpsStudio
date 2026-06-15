!macro customInstall
  DetailPrint "Generating TLS certificate..."
  nsExec::ExecToLog '"$INSTDIR\resources\server.exe" "--generate-cert-only" "--tls-cert=$APPDATA\BigFix Ops Studio\tls\server.pem" "--tls-key=$APPDATA\BigFix Ops Studio\tls\server.key"'
  Pop $0
  ${If} $0 != 0
    DetailPrint "Certificate generation failed with code $0 - will be generated on first launch."
  ${Else}
    DetailPrint "TLS certificate created successfully."
  ${EndIf}
!macroend

!macro customUnInstall
  RMDir /r "$APPDATA\BigFix Ops Studio\tls"
!macroend
