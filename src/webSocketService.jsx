import React, { useEffect, useState, useMemo } from "react";
import movieSlicer from "./redux/movieSlicer";
import { addMovie } from "./redux/movieSlicer";

class WebSocketService {
    constructor() {
      this.socket = null;
      this.url = 'ws://localhost:8080/moviesocket';
      this.connect = this.connect.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleError = this.handleError.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.reconnect = this.reconnect.bind(this);
    }
  
    connect() {
      this.socket = new WebSocket(this.url);
      this.socket.onopen = this.handleOpen;
      this.socket.onmessage = this.handleMessage;
      this.socket.onerror = this.handleError;
      this.socket.onclose = this.handleClose;
    }
  
    handleOpen() {
      console.log('WebSocket Connected');
    }
  
    handleMessage(event) {
        const movie = JSON.parse(event.data);
        store.dispatch(movieSlicer.actions.addMovie(movie));
    }
    
  
    handleError(error) {
      console.log('WebSocket Error: ', error);
      this.reconnect();
    }
  
    handleClose() {
      console.log('WebSocket Disconnected');
      this.reconnect();
    }
  
    reconnect() {
      setTimeout(() => this.connect(), 5000);  
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  
    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        console.log('WebSocket is not connected.');
      }
    }
  }
  
  export default new WebSocketService();