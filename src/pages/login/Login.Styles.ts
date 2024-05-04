const loginStyles = {
  mainContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  registerContainer: {
    width: { xs: "96%", sm: "75%", md: "45%", lg: "35%", xl: "22%" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "strech",
    border: "0px",
    borderRadius: "10px",
    gap: "20px",
    px: "15px",
    py: "30px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },

  title: {
    font: "800 26px Poppins",
    color: "#000",
    textAlign: "center",
  },

  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },

  textFieldStyle: {
    "& .MuiInputBase-input": {
      padding: "0px",
      px: "18px",
      height: "44px",
    },
    input: {
      "&::placeholder": {
        color: "#808080",
        fontSize: "14px",
        fontFamily: "Poppins",
        fontWeight: "300",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "1px solid #ADADAD",
        borderRadius: "10px",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #ADADAD",
      },
      "&:hover fieldset": {
        borderColor: "#ADADAD",
      },
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },

  signupButton: {
    background: "#E48700",
    height: "44px",
    textTransform: "capitalize",
    color: "#ffffff",
    fontSize: "16px",
    fontFamily: "Poppins",
    fontWeight: "500",
    borderRadius: "10px",
    boxShadow: "none",
    alignSelf: "strech",
    width: "100%",
    "&:hover": {
      boxShadow: "none",
      background: "#E48700",
    },
  },

  alreadyText: {
    font: "400 16px Poppins",
    color: "#000",
  },

  registerHereText: {
    font: "400 16px Poppins",
    color: "#E48700",
    cursor: "pointer",
  },
};

export default loginStyles;
