const cancelablePromise = (promise) => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      data => (isCanceled ? reject(new Error('was Canceled')) : resolve(data)),
      err => (isCanceled ? reject(new Error('was Canceled')) : reject(err)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCanceled = true;
    },
  };
};

export default cancelablePromise;
