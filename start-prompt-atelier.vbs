Option Explicit

Dim shell, folder, nodePath, serverPath
Set shell = CreateObject("WScript.Shell")
folder = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
nodePath = "node.exe"
serverPath = Chr(34) & folder & "\server.js" & Chr(34)
shell.CurrentDirectory = folder
shell.Run nodePath & " " & serverPath, 0, False
WScript.Sleep 700
shell.Run "http://127.0.0.1:4173/", 1, False
