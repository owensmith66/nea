//Using this as a debug tool since dev tools are blocked on school laptops

// Global error handler to capture all errors
window.onerror = function (message, source, lineno, colno, error) {
    const errorContainer = document.getElementById('error-container');
  
    // Format the error message
    const errorMessage = `
      <strong>Error:</strong> ${message} <br>
      <strong>Source:</strong> ${source} <br>
      <strong>Line:</strong> ${lineno} <br>
      <strong>Column:</strong> ${colno} <br>
      <strong>Stack Trace:</strong> <pre>${error.stack}</pre>
    `;
  
    // Display the error in the container
    errorContainer.innerHTML = errorMessage;
  
    // Return true to prevent the default browser error handling
    return true;
  };
  




  