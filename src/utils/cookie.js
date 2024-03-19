export function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie is the one we're looking for
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null; // Cookie not found
}

export function setCookie(name, value, minutes) {
  const expires = new Date();
  expires.setTime(expires.getTime() + minutes * 60 * 1000); // Calculate expiration time

  // Construct the cookie string with name, value, and expiration date
  const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;HttpOnly;Secure`;

  // Set the cookie in the browser
  document.cookie = cookieString;
}
