const contactPersonListItemStyles = {
  listItemPersonContact: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    py: "16px",
    px: "6px",
    borderBottom: "1px solid #9e896a",
    width: "100%",
    gap: "10px",
    cursor: "pointer",
  },

  personContactProfilePic: {
    width: "30px",
    height: "30px",
    border: "1px solid #9E896A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    fontSize: "14px",
  },

  personContentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
  },

  personLeftContentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    flexGrow: 1,
  },

  personLeftContentName: {
    fontFamily: "Poppins",
    fontSize: "16px",
    color: "#797A7B",
    fontWeight: "500",
  },

  personLeftContentLastMsg: {
    fontFamily: "Poppins",
    fontSize: "13px",
    color: "#797A7B",
    fontWeight: "300",
  },

  personRightContentContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    alignItems: "center",
  },

  lastMsgTime: {
    fontFamily: "Poppins",
    fontSize: "15px",
    color: "#797A7B",
    fontWeight: "300",
  },

  unseenMsgsNumber: {
    borderRadius: "50%",
    background: "#02346B",
    color: "white",
    width: "20px",
    height: "20px",
    fontFamily: "Poppins",
    fontSize: "14px",
    fontWeight: "300",
    textAlign: "center",
  },
};

export default contactPersonListItemStyles;
