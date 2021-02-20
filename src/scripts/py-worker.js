const pyodideWorker = new Worker('./pyodide/webworker.js');

export const run = (script, context, onSuccess, onError) => {
  pyodideWorker.onerror = onError;
  pyodideWorker.onmessage = (e) => onSuccess(e.data);
  pyodideWorker.postMessage({
    ...context,
    python: script,
  });
};

// Transform the run (callback) form to a more modern async form.
// This is what allows to write:
//    const {results, error} = await asyncRun(script, context);
// Instead of:
//    run(script, context, successCallback, errorCallback);
export const asyncRun = (script, context) => {
  return new Promise(function(onSuccess, onError) {
    run(script, context, onSuccess, onError);
  });
};

