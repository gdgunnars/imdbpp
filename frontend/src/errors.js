const errorCodes = {
  ClientDataStorage: {
    toJson: 409,
    parseJson: 410,
    storeData: 418,
    retrieveData: 419,
    keyNotFound: 420,
    clearSessionData: 421,
  },
  ApiFetch: {
    noInternet: 69,
    serverError: 500,
  },
};

class ToJsonError extends Error {
  constructor(message = 'Failed to cast data to json') {
    super(message);
    this.name = 'ToJsonError';
    this.code = errorCodes.ClientDataStorage.toJson;
  }

}
class NoInternet extends Error {
  constructor(message = 'Got no connection brah') {
    super(message);
    this.name = 'noInternet';
    this.code = errorCodes.ApiFetch.noInternet;
  }
}

class ParseJsonError extends Error {
  constructor(message = 'Failed to parse json data') {
    super(message);
    this.name = 'ParseJsonError';
    this.code = errorCodes.ClientDataStorage.parseJson;
  }
}

class StoreDataError extends Error {
  constructor(message = 'Failed to store data in ClientDataStorage') {
    super(message);
    this.name = 'StoreDataError';
    this.code = errorCodes.ClientDataStorage.storeData;
  }
}

class RetrieveStorageDataError extends Error {
  constructor(message = 'Failed to retrieve data from storage') {
    super(message);
    this.name = 'RetrieveStorageData';
    this.code = errorCodes.ClientDataStorage.retrieveData;
  }
}
class StorageDataWithKeyNotFound extends Error {
  constructor(message = 'No data with given key exist') {
    super(message);
    this.name = 'StorageDataWithKeyNotFound';
    this.code = errorCodes.ClientDataStorage.keyNotFound;
  }
}

class StorageClearAllSessionData extends Error {
  constructor(message = 'Failed to clear all session data') {
    super(message);
    this.name = 'StorageClearAllSessionData';
    this.code = errorCodes.ClientDataStorage.clearSessionData;
  }
}

class ApiGetDataError extends Error {
  constructor(message = 'Failed to receive data from api') {
    super(message);
    this.name = 'ApiGetDataError';
    this.code = errorCodes.ApiFetch.serverError;
  }
}

export {
  errorCodes,
  ToJsonError,
  ParseJsonError,
  StoreDataError,
  RetrieveStorageDataError,
  ApiGetDataError,
  StorageDataWithKeyNotFound,
  StorageClearAllSessionData,
  NoInternet
};
