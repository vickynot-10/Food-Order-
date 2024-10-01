export const LoginAuthUser = async(req, res) => {
    
    if (!req.user) {
        return res.status(400).json({

            isLoggedIn: false,
            userdata: null
        })
    }
    res.status(200).json({
        isLoggedIn: true,
        userdata: req.user
    })
}