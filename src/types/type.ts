import React from "react";

export interface commentType {
    id: number,
    key: number,
    name: string,
    text: string,
    time: string,
    attitude: number
}

export interface CommentItem {
    name: string;
    text: string;
    time: string;
}