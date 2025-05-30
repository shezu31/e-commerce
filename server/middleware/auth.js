import jwt from 'jsonwebtoken'

const auth = async (request, response, next) => {
  try {
    // Get token from cookie or authorization header
    const token = request.cookies.accessToken || request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Provide token",
        error: true,
        success: false
      });
    }

    // Verify token
    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    // Attach userId
    request.userId = decode.id;

    next();

  } catch (error) {
    // Differentiate between token errors and other errors
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return response.status(401).json({
        message: "Invalid or expired token",
        error: true,
        success: false
      });
    }

    // Generic error
    return response.status(500).json({
      message: error.message || "Authentication failed",
      error: true,
      success: false
    });
  }
}

export default auth;
