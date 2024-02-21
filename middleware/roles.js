const checkUserRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: "Unauthorized action for this user" });
      }
  
      next();
    };
  };
  
  const checkAdmin = checkUserRole(['admin']);
  const checkPremium = checkUserRole(['premium']);
  const checkAdminOrPremium = checkUserRole(['admin', 'premium']);
  
  module.exports = {
    checkAdmin,
    checkPremium,
    checkAdminOrPremium,
  };
  