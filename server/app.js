import express from "express";
import { getUser, getEmail, getEmail2, addUser, deleteUser, viewUser, edit, getName } from "./model.js";
import isAuthen from "./auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import sendCookie from "./cook.js";
import dotenv from 'dotenv';

dotenv.config();
const server = express();
server.use(express.json());
server.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173", // Update this with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204, // Set the response to preflight requests to 204
};

server.use(cors(corsOptions));

// Root Route
server.get("/", (req, res) => {
    res.json({
        message: "Hello World",
    });
});

// Login Route
server.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getEmail(email);

        if (user && user.s_pwd === password) {
            sendCookie(user, res, `${user.s_username}`, 200);
        } else {
            if (!res.headersSent) {
                res.json({
                    success: false,
                    message: "Invalid Credentials",
                });
            }
        }
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});
// View Users Route
server.get("/view", async (req, res) => {
    try {
        await isAuthen(req, res);
        const show = await getUser();
        return res.json(show);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error retrieving users",
        });
    }
});

// Logout Route
server.post("/logout", async (req, res) => {
    try {
        const authUser = await isAuthen(req, res);
        if (!authUser) return; // Ensure we don't proceed if the user is not authenticated

        res.status(200)
            .cookie("token", "", {
                maxAge: 1,
                httpOnly: true,
                sameSite: "none",
                secure: "false",
            })
            .json({
                success: true,
                message: "Logged out Successfully",
            });
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                message: "Error during logout",
            });
        }
    }
});


// Register Route
server.post("/register", async (req, res) => {
    try {
        const { name, email, no, designation, course, gender } = req.body;
        const user = await getEmail2(email);

        if (user) {
            return res.json({
                success: false,
                message: "User already exists",
            });
        } else {
            const row = await addUser(name, email, no, designation, course, gender);
            if (row) {
                return res.json({
                    success: true,
                    message: "User added successfully",
                });
            } else {
                return res.json({
                    success: false,
                    message: "Error adding user",
                });
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});

// Delete User Route
server.delete("/delete/:id", async (req, res) => {
    try {
        await isAuthen(req, res);
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "Not Authorized",
                success: false
            });
        }

        const { id } = req.params;
        await deleteUser(id);
        return res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error deleting user"
        });
    }
});

// Edit User Route
server.put("/edit/:id", async (req, res) => {
    try {
        await isAuthen(req, res);
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "Not Authorized",
                success: false
            });
        }

        const { id } = req.params;
        const { name, email, no, designation, course, gender } = req.body;
        console.log(id);
        const result = await edit(id, name, email, no, designation, course, gender);
        console.log(result);
        return res.status(200).json({
            success: true,
            message: "Updated Successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error updating user"
        });
    }
});

// Get User by ID Route
server.get("/user/:id", async (req, res) => {
    try {
        await isAuthen(req, res);
        const { id } = req.params;
        const user = await viewUser(id);
        console.log(user);
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error retrieving user"
        });
    }
});

// Profile Route
server.get("/profile", async (req, res) => {
    try {
        const user = await isAuthen(req, res);
        const user2 = await getName();
        return res.status(200).json({
            success: user2
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error retrieving profile"
        });
    }
});

// Start the Server
server.listen(3000, () => {
    console.log("Server started on 3000");
});
