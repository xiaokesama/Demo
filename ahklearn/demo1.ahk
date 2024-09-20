#Requires AutoHotkey v2.0
#SingleInstance
#Include <stdlib>

$F4::{
    Reload
}

$F5::{
    arr := [ "ball", "foo", "bar", "ttt" ]

    ; Gets the first three items of the array
    b := arr[1, 3] ; ["ball", "foo", "bar"]

    ToolTip(b[3])






}