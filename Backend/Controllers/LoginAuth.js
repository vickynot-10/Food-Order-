export const LoginAuthUser = async(req, res) => {
    
    if (!req.user) {
        return res.status(400).json({

            isLoggedInobj: false,
            userdata: null
        })
    }
    res.status(200).json({
        isLoggedInobj: true,
        userdata: req.user
    })
}