const MAX_RECONNECT_TIMEOUT = 5000;

class WebsocketClient {
  constructor(url, path, options = { onConnect: () => {}, onDisconnect: () => {}}) {
    this.socket = io(url, { path });
    this.isConnected = false;
    this.options = options;
    this.reconnectionTimeout = 300;

    this._initReconnectingProcess();
    this.socket.connect();
  }

  _initReconnectingProcess = () => {
    this.socket.on('connect', () => {
      console.log("Connected")
      this.isConnected = true;

      this.reconnectionTimeout = 300;
      this.options && this.options.onConnect && this.options.onConnect();
    });
    this.socket.on('connect_error', () => {
      console.log("Erreur lors de la connexion. Tentative de reconnexion...");
      this._reconnect();
    });
    this.socket.on('disconnect', () => {
      this.isConnected = false;
      this.options && this.options.onDisconnect && this.options.onDisconnect();
      this._reconnect();
    });
  };

  _reconnect = () => {
    setTimeout(() => {
        this.socket.open();
        this.reconnectionTimeout = Math.min(MAX_RECONNECT_TIMEOUT, this.reconnectionTimeout * 1.5);
      },
      this.reconnectionTimeout);
  };

  on = (channel, func) => {
    this.socket.on(channel, func);
  };

  emit = (channel, message) => {
    console.debug("Emit message :", channel, ">", message);
    if (!this.isConnected) {
      console.error("Cannot emit message : WebSocket is disconnected.");
      return false;
    }
    this.socket.emit(channel, message);
    return true;
  }

}