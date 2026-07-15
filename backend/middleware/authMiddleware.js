const authHeader = req.headers.authorization;

console.log("Authorization Header:", authHeader);

if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
        message: "Access Denied"
    });
}

const token = authHeader.split(" ")[1];

console.log("Token:", token);

try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();

} catch (error) {

    console.log(error);

    return res.status(401).json({
        message: error.message
    });

}